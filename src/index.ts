import * as fse from 'fs-extra';
import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { genPulumiComponentProp } from './lib/pulumi';
import { genComponentInputs } from './lib/component';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { TriggerConfig, FcTrigger } from './lib/fc/trigger';
import _ from 'lodash';
import { isFile } from './lib/file';
import { ICredentials } from './lib/profile';
import { IProperties, IInputs } from './interface';
import promiseRetry from './lib/retry';
import { handlerKnownErrors } from './lib/error';

const SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];

export default class FcBaseComponent {
  @core.HLogger('FC-BASE') logger: core.ILogger;

  access: string;
  appName: string;
  projectName: string;
  curPath: any;

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
    const properties: IProperties = inputs?.props;
    this.access = inputs?.project?.access;
    const credentials: ICredentials = await core.getCredential(this.access);
    const args = inputs?.args;
    this.projectName = inputs?.project?.projectName;
    this.appName = inputs?.appName;
    this.curPath = inputs?.path;

    const serviceConfig: ServiceConfig = properties?.service;
    const functionConfig: FunctionConfig = properties?.function;
    const triggersConfig: TriggerConfig[] = properties?.triggers;
    const { region } = properties;
    // 初始化 FcService, FcFunction, FcTrigger, FcCustomDomain 对象
    let fcFunction: FcFunction;
    const fcTriggers: FcTrigger[] = [];

    this.logger.debug(`instantiate serviceConfig with : ${JSON.stringify(serviceConfig, null, '  ')}`);
    const fcService = new FcService(serviceConfig, credentials, region);
    fcService.validateConfig();
    await fcService.init(this.access, this.appName, this.projectName, this.curPath);
    if (!_.isEmpty(functionConfig)) {
      this.logger.debug(`functionConfig not empty: ${JSON.stringify(functionConfig, null, '  ')}, instantiate it.`);
      fcFunction = new FcFunction(functionConfig, credentials, region, serviceConfig?.name);
      fcFunction.validateConfig();
      await fcFunction.init(this.access, this.appName, this.projectName, this.curPath);
    }

    if (!_.isEmpty(triggersConfig)) {
      this.logger.debug(`triggersConfig not empty: ${JSON.stringify(triggersConfig, null, '  ')}, instantiate them.`);
      for (const triggerConf of triggersConfig) {
        const fcTrigger: FcTrigger = new FcTrigger(triggerConf, credentials, region, serviceConfig?.name, functionConfig?.name);
        fcTrigger.validateConfig();
        await fcTrigger.init(this.access, this.appName, this.projectName, this.curPath);
        fcTriggers.push(fcTrigger);
      }
    }

    return {
      fcService,
      fcFunction,
      fcTriggers,
      args,
    };
  }

  async deploy(inputs: IInputs): Promise<any> {
    const {
      fcService,
      fcFunction,
      fcTriggers,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-base', 'deploy', fcService.credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assume-yes', 's', 'silent'] });
    const argsData: any = parsedArgs?.data || {};
    const assumeYes = argsData.y || argsData['assume-yes'];
    const isSilent = argsData.s || argsData.silent;
    const isDebug = argsData.debug || process.env?.temp_params?.includes('--debug');

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
    const pulumiComponentIns = await core.load('devsapp/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
    const pulumiInputs = genComponentInputs('pulumi-alibaba', this.access, this.appName, `${this.projectName}-pulumi-project`, pulumiComponentProp, this.curPath, pulumiComponentArgs);
    return await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const pulumiRes = await pulumiComponentIns.up(pulumiInputs);
        if (pulumiRes?.stderr && pulumiRes?.stderr !== '') {
          this.logger.error(`deploy error: ${pulumiRes?.stderr}`);
          return;
        }
        // 返回结果
        return pulumiRes?.stdout;
      } catch (e) {
        this.logger.debug(`error when deploy, error is: \n${e}`);
        handlerKnownErrors(e);
        this.logger.log(`\tretry ${times} times`, 'red');
        retry(e);
      }
    });
  }

  async remove(inputs: IInputs): Promise<any> {
    const {
      fcService,
      fcFunction,
      fcTriggers,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-base', 'remove', fcService.credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assume-yes', 's', 'silent'] });
    const argsData: any = parsedArgs?.data || {};
    const nonOptionsArgs = argsData._;
    const assumeYes = argsData.y || argsData['assume-yes'];
    const isSilent = argsData.s || argsData.silent;
    const isDebug = argsData.debug;
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

    const flags: any = { isDebug, isSilent, assumeYes };
    if (nonOptionsArg === 'service') {
      this.logger.info(`waiting for service: ${fcService.serviceConfig.name} to be removed`);
      const removeRes: any = await fcService.remove(this.access, this.appName, this.projectName, this.curPath, flags);
      if (removeRes?.stderr) {
        this.logger.error(`remove service error:\n ${removeRes?.stderr}`);
        return;
      }
      return removeRes;
    } else if (nonOptionsArg === 'function') {
      if (_.isEmpty(fcFunction)) {
        this.logger.error(`please add function config in your serverless service: ${this.projectName}`);
        return;
      }
      const removeRes: any[] = [];
      for (let i = 0; i < fcTriggers.length; i++) {
        if (await fcTriggers[i].isImported()) {
          this.logger.info(`waiting for trigger ${fcTriggers[i].triggerConfig.name} to be removed`);
          const removeTriggerRes: any = await fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags);
          removeRes.push(removeTriggerRes?.stdout);
        }
      }
      this.logger.info(`waiting for function: ${fcFunction.functionConfig.name} to be removed`);
      const removeFunctionRes: any = await fcFunction.remove(this.access, this.appName, this.projectName, this.curPath, flags);

      removeRes.push(removeFunctionRes);

      return removeRes;
    } else if (nonOptionsArg === 'trigger') {
      if (_.isEmpty(fcTriggers)) {
        this.logger.error(`please add trigger config in your serverless service: ${this.projectName}`);
        return;
      }
      const removeRes: any[] = [];
      const targetTriggerName = argsData?.n || argsData?.name;

      for (let i = 0; i < fcTriggers.length; i++) {
        if (_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name) {
          this.logger.info(`waiting for trigger ${fcTriggers[i].triggerConfig.name} to be removed`);
          const removeTriggerRes: any = await fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags);
          removeRes.push(removeTriggerRes?.stdout);
        }
      }
      return removeRes;
    }

    return `not supported args: ${nonOptionsArg}`;
  }
}
