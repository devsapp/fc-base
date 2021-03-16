import * as os from 'os';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as core from '@serverless-devs/core';
import { FcBase } from './lib/fc/fc-base';
import { genStackId, ServiceConfig } from './lib/fc/service';
import { cpPulumiCodeFiles, genPulumiInputs } from './lib/pulumi';

import { FunctionConfig } from './lib/fc/function';
import { TriggerConfig } from './lib/fc/trigger';
import * as shell from 'shelljs';
import { promptForConfirmContinue } from './lib/init/prompt';

const PULUMI_CACHE_DIR: string = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'fc-base');
const SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];

export default class FcBaseComponent {
  @core.HLogger('FC_BASE') logger: core.ILogger;

  validateConfig(serviceConfig: ServiceConfig, functionConfig: FunctionConfig, triggersConfig: TriggerConfig[]): boolean {
    if (!serviceConfig && !functionConfig && !triggersConfig) {
      this.logger.error('There should be service/function/triggers in your properties');
      return false;
    }
    if (!serviceConfig) {
      this.logger.error('There should be service in your properties');
      return false;
    }
    if (!functionConfig && triggersConfig) {
      this.logger.error('There should be functionConfig in your properties when triggersConfig exists');
      return false;
    }

    if (functionConfig && serviceConfig.name !== functionConfig.service) {
      this.logger.error(`Function ${functionConfig.name} is not under service ${serviceConfig.name}`);
      return false;
    }

    if (triggersConfig) {
      for (const trigger of triggersConfig) {
        let errorInfo: string;
        if (trigger.function !== functionConfig.name) {
          errorInfo = `Trigger ${trigger.name} is not under function: ${functionConfig.name}`;
        }
        if (trigger.service !== serviceConfig.name) {
          const info = `Trigger ${trigger.name} is not under service: ${serviceConfig.name}`;
          errorInfo = errorInfo ? `${errorInfo}\n${info}` : info;
        }
        if (errorInfo) {
          this.logger.error(errorInfo);
          return false;
        }
      }
    }
    return true;
  }

  // 解析入参
  async handlerInputs(inputs) {
    const project = inputs?.project || inputs?.Project;
    // const projectName = inputs?.project?.projectName || inputs?.project?.ProjectName || inputs?.Project?.projectName || inputs?.Project?.ProjectName;
    const properties = inputs?.properties || inputs?.Properties;
    // const credentials = inputs?.Credentials;
    const provider = project?.Provider || project?.provider;
    const accessAlias = project?.AccessAlias || project?.accessAlias;
    const credentials = await core.getCredential(provider, accessAlias || '');
    const args = inputs?.Args || inputs?.args;


    const serviceConfig: ServiceConfig = properties?.service;
    const functionConfig: FunctionConfig = properties?.function;

    const triggersConfig: TriggerConfig[] = properties?.triggers;
    if (!this.validateConfig(serviceConfig, functionConfig, triggersConfig)) {
      throw new Error('Properties check failed, please re-check your properties.');
    }
    const { region } = properties;

    // 初始化this对象
    // this.id = `${credentials.AccountID}_${region}_${serviceName}`;

    return {
      project,
      properties,
      credentials,
      serviceConfig,
      functionConfig,
      args,
      region,
      triggersConfig,
    };
  }

  async deploy(inputs): Promise<any> {
    const {
      project,
      credentials,
      serviceConfig,
      functionConfig,
      region,
      triggersConfig,
      args,
    } = await this.handlerInputs(inputs);

    const stackId = genStackId(credentials.AccountID, region, serviceConfig.name);
    const parsedArgs = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    // @ts-ignore
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    const serviceExists = false;
    if (serviceExists) {
      // import service
    }
    const functionExists = false;
    if (functionExists) {
      // import function
    }
    if (triggersConfig) {
      for (const triggerConfig of triggersConfig) {
        const triggerExists = false && triggerConfig;
        if (triggerExists) {
          // import trigger
        }
      }
    }


    /**
     * 初始化中间文件:
     *   1. 创建缓存文件夹
     *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
     *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
     *   4. 安装依赖
     */

    const pulumiStackDirOfService = path.join(PULUMI_CACHE_DIR, stackId);
    this.logger.debug(`Ensuring ${pulumiStackDirOfService}...`);
    await fse.ensureDir(pulumiStackDirOfService, 0o777);
    const fcConfigJsonFile = path.join(pulumiStackDirOfService, 'fc-config.json');

    const fcBaseIns = new FcBase(functionConfig, serviceConfig, triggersConfig, fcConfigJsonFile);

    await fcBaseIns.addConfigToJsonFile(assumeYes);

    await cpPulumiCodeFiles(pulumiStackDirOfService);
    shell.exec(`cd ${pulumiStackDirOfService} && npm i`, { silent: true });
    // 部署 fc 资源
    const pulumiComponentIns = await core.load('pulumi-alibaba', 'alibaba');
    const pulumiInputs = genPulumiInputs(credentials, project, stackId, region, pulumiStackDirOfService);
    const upRes = await pulumiComponentIns.up(pulumiInputs);
    if (upRes.stderr && upRes.stderr !== '') {
      this.logger.error(`deploy error: ${upRes.stderr}`);
      return;
    }
    // 返回结果
    return upRes.stdout;
  }

  async remove(inputs): Promise<any> {
    const {
      project,
      credentials,
      serviceConfig,
      functionConfig,
      region,
      triggersConfig,
      args,
    } = await this.handlerInputs(inputs);

    const stackId = genStackId(credentials.AccountID, region, serviceConfig.name);
    const pulumiStackDirOfService = path.join(PULUMI_CACHE_DIR, stackId);
    const fcConfigJsonFile = path.join(pulumiStackDirOfService, 'fc-config.json');
    const fcBaseIns = new FcBase(functionConfig, serviceConfig, triggersConfig, fcConfigJsonFile);

    const parsedArgs = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    // @ts-ignore
    const nonOptionsArgs = parsedArgs.data?._;
    // @ts-ignore
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
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

    const pulumiComponentIns = await core.load('pulumi-alibaba', 'alibaba');
    const pulumiInputs = genPulumiInputs(credentials, project, stackId, region, pulumiStackDirOfService);
    let pulumiRes;
    if (nonOptionsArg === 'service') {
      const fcFunctions = await fcBaseIns.getFunctionNamesInConfigFile();
      if (assumeYes || !fcFunctions || fcFunctions.length === 0 || await promptForConfirmContinue(`Remove service: ${serviceConfig.name} and functions: [${fcFunctions}] belonging to it?`)) {
        // destroy
        pulumiRes = await pulumiComponentIns.destroy(pulumiInputs);

        if (pulumiRes.stderr && pulumiRes.stderr !== '') {
          this.logger.error(` remove service error: ${pulumiRes.stderr}`);
          return;
        } else {
          await fse.unlink(fcConfigJsonFile);
        }
      } else {
        return 'remove service canceled';
      }
    } else if (nonOptionsArg === 'function') {
      const fcTriggers = await fcBaseIns.getTriggerNamesInConfigFile();
      if (assumeYes || !fcTriggers || fcTriggers.length === 0 || await promptForConfirmContinue(`Remove function: ${functionConfig.name} and triggers: [${fcTriggers}] belonging to it?`)) {
        // update
        await fcBaseIns.delFunctionConfigInConfigFile();
        pulumiRes = await pulumiComponentIns.up(pulumiInputs);
      } else {
        return 'remove function canceled';
      }
    } else if (nonOptionsArg === 'trigger') {
      // update
      // @ts-ignore
      const triggerName = parsedArgs.data?.n || parsedArgs.data?.name || undefined;
      await fcBaseIns.delTriggerConfigInConfigFile(triggerName);
      pulumiRes = await pulumiComponentIns.up(pulumiInputs);
    }
    if (pulumiRes.stderr) {
      this.logger.error(`remove error:\n ${pulumiRes.stderr}`);
      return;
    }
    return {
      Result: pulumiRes,
    };
  }
}
