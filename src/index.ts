import * as fse from 'fs-extra';
import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { genPulumiComponentProp } from './lib/pulumi';
import { genComponentInputs } from './lib/component';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { TriggerConfig, FcTrigger } from './lib/fc/trigger';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { ICredentials } from './lib/profile';
import { isFile } from './lib/file';

const SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];

export default class FcBaseComponent {
  @core.HLogger('FC-BASE') logger: core.ILogger;

  // 解析入参
  async handlerInputs(inputs) {
    const project = inputs?.project || inputs?.Project;
    const properties = inputs?.properties || inputs?.Properties;
    const provider: string = project?.Provider || project?.provider;
    const accessAlias: string = project?.AccessAlias || project?.accessAlias;
    const credentials: ICredentials = await core.getCredential(provider, accessAlias || '');
    const args = inputs?.Args || inputs?.args;
    const projectName: string = project.projectName || project.ProjectName;

    const serviceConfig: ServiceConfig = properties?.service;
    const functionConfig: FunctionConfig = properties?.function;
    const triggersConfig: TriggerConfig[] = properties?.triggers;
    const { region } = properties;

    // 初始化 FcService, FcFunction, FcTrigger, FcCustomDomain 对象
    let fcFunction: FcFunction;
    const fcTriggers: FcTrigger[] = [];

    this.logger.debug(`instantiate serviceConfig with : ${JSON.stringify(serviceConfig)}`);
    const fcService = new FcService(serviceConfig, credentials, region);
    fcService.validateConfig();
    fcService.initServiceConfigFileAttr();

    if (!_.isEmpty(functionConfig)) {
      this.logger.debug(`functionConfig not empty: ${JSON.stringify(functionConfig)}, instantiate it.`);
      fcFunction = new FcFunction(functionConfig, credentials, region, serviceConfig?.name);
      fcFunction.validateConfig();
      fcFunction.initFunctionConfigFileAttr();
    }

    if (!_.isEmpty(triggersConfig)) {
      this.logger.debug(`triggersConfig not empty: ${JSON.stringify(triggersConfig)}, instantiate them.`);
      for (const triggerConf of triggersConfig) {
        const fcTrigger = new FcTrigger(triggerConf, credentials, region, serviceConfig?.name, functionConfig?.name);
        fcTrigger.validateConfig();
        fcTrigger.initTriggerConfigFileAttr();
        fcTriggers.push(fcTrigger);
      }
    }

    return {
      projectName,
      accessAlias,
      fcService,
      fcFunction,
      fcTriggers,
      args,
    };
  }

  async deploy(inputs): Promise<any> {
    const {
      projectName,
      accessAlias,
      fcService,
      fcFunction,
      fcTriggers,
      args,
    } = await this.handlerInputs(inputs);
    await fcService.preparePulumiCode();
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    const isSilent = parsedArgs.data?.s || parsedArgs.data?.silent;
    // TODO: import online service/function/trigger


    /**
     * 初始化中间文件:
     *   1. 创建缓存文件夹
     *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
     *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
     *   4. 安装依赖
     */

    await fcService.addServiceInConfFile(assumeYes);

    if (!_.isNil(fcFunction)) {
      await fcFunction.addFunctionInConfFile(assumeYes);
    }
    if (!_.isEmpty(fcTriggers)) {
      for (let i = 0; i < fcTriggers.length; i++) {
        await fcTriggers[i].addTriggerInConfFile(assumeYes);
      }
    }
    // 部署 fc 资源
    const pulumiComponentIns = await core.load('alibaba/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiInputs = genComponentInputs(fcService.credentials, `${projectName}-pulumi-project`, accessAlias, 'pulumi-alibaba', pulumiComponentProp, isSilent ? '-s' : undefined);
    const pulumiRes = await pulumiComponentIns.up(pulumiInputs);
    if (pulumiRes?.stderr && pulumiRes?.stderr !== '') {
      this.logger.error(`deploy error: ${pulumiRes?.stderr}`);
      return;
    }
    // 返回结果
    return pulumiRes?.stdout;
  }

  async remove(inputs): Promise<any> {
    const {
      projectName,
      accessAlias,
      fcService,
      fcFunction,
      fcTriggers,
      args,
    } = await this.handlerInputs(inputs);

    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
    const nonOptionsArgs = parsedArgs.data?._;
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    const isSilent = parsedArgs.data?.s || parsedArgs.data?.silent;
    if (_.isEmpty(nonOptionsArgs)) {
      this.logger.error(' error: expects argument.');
      // help info
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      return;
    }
    const nonOptionsArg = nonOptionsArgs[0];
    if (!SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
      this.logger.error(` remove ${nonOptionsArg} is not supported now.`);
      // help info
      return;
    }
    if (!await fse.pathExists(fcService.pulumiStackDir) || await isFile(fcService.pulumiStackDir)) {
      this.logger.error('please deploy resource first');
      return;
    }
    const pulumiComponentIns = await core.load('alibaba/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiInputs = genComponentInputs(fcService.credentials, `${projectName}-pulumi-project`, accessAlias, 'pulumi-alibaba', pulumiComponentProp, isSilent ? '-s' : undefined);

    let pulumiRes;
    if (nonOptionsArg === 'service') {
      this.logger.info(`waiting for service: ${fcService.serviceConfig.name} to be removed`);
      const fcFunctionsArr = await fcService.getFunctionNames();

      if (assumeYes || _.isEmpty(fcFunctionsArr) || await promptForConfirmContinue(`Are you sure to remove service: ${fcService.serviceConfig.name} and functions: [ ${fcFunctionsArr} ] under it?`)) {
        // destroy
        pulumiRes = await pulumiComponentIns.destroy(pulumiInputs);
      } else {
        this.logger.info(`cancel removing service ${fcService.serviceConfig.name}`);
        return;
      }
    } else if (nonOptionsArg === 'function') {
      if (_.isEmpty(fcFunction)) {
        this.logger.error(`please add function config in your serverless service: ${projectName}`);
        return;
      }
      this.logger.info(`waiting for function: ${fcFunction.functionConfig.name} to be removed`);
      const fcTriggersArr: string[] = await fcFunction.getTriggerNames();
      if (assumeYes || _.isEmpty(fcTriggersArr) || await promptForConfirmContinue(`Remove function: ${fcFunction.functionConfig.name} and triggers: [ ${fcTriggersArr} ] belonging to it?`)) {
        // update
        const isFunctionBeRemoved = await fcFunction.delFunctionInConfFile();
        if (isFunctionBeRemoved) {
          await fcFunction.delTriggersUnderFunction();
          pulumiRes = await pulumiComponentIns.up(pulumiInputs);
        }
      } else {
        this.logger.info(`cancel removing function ${fcFunction.functionConfig.name}`);
        return;
      }
    } else if (nonOptionsArg === 'trigger') {
      // update
      // @ts-ignore
      const targetTriggerName = parsedArgs.data?.n || parsedArgs.data?.name || undefined;

      let isTriggersBeRemoved = false;
      for (let i = 0; i < fcTriggers.length; i++) {
        if (_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name) {
          this.logger.info(`waiting for trigger ${fcTriggers[i].triggerConfig.name} to be removed`);
          const isTriggerBeRemoved = await fcTriggers[i].delTriggerInConfFile();
          isTriggersBeRemoved = isTriggersBeRemoved || isTriggerBeRemoved;
        }
      }
      if (isTriggersBeRemoved) { pulumiRes = await pulumiComponentIns.up(pulumiInputs); }
    }
    if (pulumiRes?.stderr) {
      this.logger.error(`remove error:\n ${pulumiRes?.stderr}`);
      return;
    }
    if (nonOptionsArg === 'service') {
      fse.removeSync(fcService.pulumiStackDir);
    }
    return pulumiRes?.stdout || 'nothing changes';
  }
}
