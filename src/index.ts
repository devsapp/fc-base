import * as fse from 'fs-extra';
import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { genPulumiComponentProp } from './lib/pulumi';
import { genComponentInputs } from './lib/component';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { TriggerConfig, FcTrigger } from './lib/fc/trigger';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { isFile } from './lib/file';
import { ICredentials } from './lib/profile';
import { IProperties, IInputs } from './interface';

const SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];

export default class FcBaseComponent {
  @core.HLogger('FC-BASE') logger: core.ILogger;

  async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    core.reportComponent(componentName, {
      command,
      uid,
    });
  }
  // 解析入参
  async handlerInputs(inputs: IInputs) {
    process.setMaxListeners(0);
    const properties: IProperties = inputs?.props;
    const access = inputs?.project?.access;
    const credentials: ICredentials = await core.getCredential(access);
    this.logger.debug(`credentials: ${JSON.stringify(credentials)}`);
    const args = inputs?.args;
    const projectName: string = inputs?.project?.projectName;
    const appName: string = inputs?.appName;
    const curPath: string = inputs?.path;

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
      appName,
      projectName,
      fcService,
      fcFunction,
      fcTriggers,
      args,
      curPath,
      access,
    };
  }

  async deploy(inputs: IInputs): Promise<any> {
    const {
      appName,
      projectName,
      fcService,
      fcFunction,
      fcTriggers,
      args,
      curPath,
      access,
    } = await this.handlerInputs(inputs);
    await this.report('fc-base', 'deploy', fcService.credentials.AccountID);
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
    const pulumiComponentIns = await core.load('pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, isSilent ? '-s' : undefined);
    const pulumiRes = await pulumiComponentIns.up(pulumiInputs);
    if (pulumiRes?.stderr && pulumiRes?.stderr !== '') {
      this.logger.error(`deploy error: ${pulumiRes?.stderr}`);
      return;
    }
    // 返回结果
    return pulumiRes?.stdout;
  }

  async remove(inputs: IInputs): Promise<any> {
    const {
      appName,
      projectName,
      fcService,
      fcFunction,
      fcTriggers,
      args,
      curPath,
      access,
    } = await this.handlerInputs(inputs);
    await this.report('fc-base', 'remove', fcService.credentials.AccountID);
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
    const pulumiComponentIns = await core.load('pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, isSilent ? '-s' : undefined);

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
