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

    this.logger.debug(`instantiate serviceConfig with : ${JSON.stringify(serviceConfig)}`);
    const fcService = new FcService(serviceConfig, credentials, region);
    fcService.validateConfig();
    await fcService.init();
    if (!_.isEmpty(functionConfig)) {
      this.logger.debug(`functionConfig not empty: ${JSON.stringify(functionConfig)}, instantiate it.`);
      fcFunction = new FcFunction(functionConfig, credentials, region, serviceConfig?.name);
      fcFunction.validateConfig();
      await fcFunction.init();
    }

    if (!_.isEmpty(triggersConfig)) {
      this.logger.debug(`triggersConfig not empty: ${JSON.stringify(triggersConfig)}, instantiate them.`);
      for (const triggerConf of triggersConfig) {
        const fcTrigger: FcTrigger = new FcTrigger(triggerConf, credentials, region, serviceConfig?.name, functionConfig?.name);
        fcTrigger.validateConfig();
        await fcTrigger.init();
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

  async importResource(fcService: FcService, fcFunction?: FcFunction, fcTriggers?: FcTrigger[]): Promise<void> {
    await fcService.importResource(this.access, this.appName, this.projectName, this.curPath);
    if (!_.isEmpty(fcFunction)) {
      await fcFunction.importResource(this.access, this.appName, this.projectName, this.curPath);
    }
    if (!_.isEmpty(fcTriggers)) {
      for (const fcTrigger of fcTriggers) {
        await fcTrigger.importResource(this.access, this.appName, this.projectName, this.curPath);
      }
    }
  }

  async deploy(inputs: IInputs): Promise<any> {
    const {
      fcService,
      fcFunction,
      fcTriggers,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-base', 'deploy', fcService.credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });

    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    const isSilent = parsedArgs.data?.s || parsedArgs.data?.silent;
    const isDebug = parsedArgs.data?.debug || process.env?.temp_params?.includes('--debug');

    await this.importResource(fcService, fcFunction, fcTriggers);
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
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
    const nonOptionsArgs = parsedArgs.data?._;
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    const isSilent = parsedArgs.data?.s || parsedArgs.data?.silent;
    const isDebug = parsedArgs.data?.debug;
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

    const pulumiComponentIns = await core.load('devsapp/pulumi-alibaba');

    const pulumiComponentProp = genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
    const pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
    const pulumiInputs = genComponentInputs('pulumi-alibaba', this.access, this.appName, `${this.projectName}-pulumi-project`, pulumiComponentProp, this.curPath, pulumiComponentArgs);

    let pulumiRes;

    if (nonOptionsArg === 'service') {
      this.logger.info(`waiting for service: ${fcService.serviceConfig.name} to be removed`);
      if (!await fcService.configFileExists()) {
        this.logger.warn('there is no resource in pulumi stack, please execute deploy command first!');
        return 'nothing changes';
      }
      const fcFunctionsArr = await fcService.getFunctionNames();

      if (assumeYes || _.isEmpty(fcFunctionsArr) || await promptForConfirmContinue(`Are you sure to remove service: ${fcService.serviceConfig.name} and functions: [ ${fcFunctionsArr} ] under it?`)) {
        // destroy
        pulumiRes = await promiseRetry(async (retry: any, times: number): Promise<any> => {
          try {
            return await pulumiComponentIns.destroy(pulumiInputs);
          } catch (e) {
            this.logger.debug(`error when remove service, error is: \n${e}`);

            this.logger.log(`\tretry ${times} times`, 'red');
            retry(e);
          }
        });
        await fcService.clear();
      } else {
        this.logger.info(`cancel removing service ${fcService.serviceConfig.name}`);
        return;
      }
    } else if (nonOptionsArg === 'function') {
      if (_.isEmpty(fcFunction)) {
        this.logger.error(`please add function config in your serverless service: ${this.projectName}`);
        return;
      }
      this.logger.info(`waiting for function: ${fcFunction.functionConfig.name} to be removed`);
      const fcTriggersArr: string[] = await fcFunction.getTriggerNames();
      if (assumeYes || _.isEmpty(fcTriggersArr) || await promptForConfirmContinue(`Remove function: ${fcFunction.functionConfig.name} and triggers: [ ${fcTriggersArr} ] belonging to it?`)) {
        // update
        const isFunctionBeRemoved = await fcFunction.delFunctionInConfFile();
        if (isFunctionBeRemoved) {
          if (!_.isEmpty(fcTriggersArr)) { await fcFunction.delTriggersUnderFunction(); }

          pulumiRes = await promiseRetry(async (retry: any, times: number): Promise<any> => {
            try {
              return await pulumiComponentIns.up(pulumiInputs);
            } catch (e) {
              this.logger.debug(`error when remove function, error is: \n${e}`);

              this.logger.log(`\tretry ${times} times`, 'red');
              retry(e);
            }
          });
          fcFunction.clear();
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
      const removedFcTriggers: FcTrigger[] = [];
      for (let i = 0; i < fcTriggers.length; i++) {
        if (_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name) {
          this.logger.info(`waiting for trigger ${fcTriggers[i].triggerConfig.name} to be removed`);
          const isTriggerBeRemoved = await fcTriggers[i].delTriggerInConfFile();
          if (isTriggerBeRemoved) { removedFcTriggers.push(fcTriggers[i]); }
          isTriggersBeRemoved = isTriggersBeRemoved || isTriggerBeRemoved;
        }
      }
      if (isTriggersBeRemoved) {
        pulumiRes = await promiseRetry(async (retry: any, times: number): Promise<any> => {
          try {
            return await pulumiComponentIns.up(pulumiInputs);
          } catch (e) {
            this.logger.debug(`error when remove trigger, error is: \n${e}`);

            this.logger.log(`\tretry ${times} times`, 'red');
            retry(e);
          }
        });
        for (const removedFcTrigger of removedFcTriggers) { removedFcTrigger.clear(); }
      }
    }
    if (pulumiRes?.stderr) {
      this.logger.error(`remove error:\n ${pulumiRes?.stderr}`);
      return;
    }
    return pulumiRes?.stdout || 'nothing changes';
  }
}
