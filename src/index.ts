import * as os from 'os';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as core from '@serverless-devs/core';
import { FcBase } from './lib/fc/fc-base';
import { genStackId, ServiceConfig } from './lib/fc/service';
import { cpPulumiCodeFiles, genPulumiComponentProp } from './lib/pulumi';
import { genComponentInputs } from './lib/component';
import { FunctionConfig } from './lib/fc/function';
import { TriggerConfig, instanceOfTimerTriggerConfig, instanceOfHttpTriggerConfig } from './lib/fc/trigger';
import * as shell from 'shelljs';
import { promptForConfirmContinue } from './lib/init/prompt';
import { instanceOfLogTriggerConfig } from './lib/log';
import { instanceOfCdnTriggerConfig } from './lib/cdn';
import { instanceOfOssTriggerConfig } from './lib/oss';
import { instanceOfMnsTriggerConfig } from './lib/mns';

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
      for (const triggerConfig of triggersConfig) {
        let errorInfo: string;
        if (triggerConfig.function !== functionConfig.name) {
          errorInfo = `Trigger ${triggerConfig.name} is not under function: ${functionConfig.name}`;
        }
        if (triggerConfig.service !== serviceConfig.name) {
          const info = `Trigger ${triggerConfig.name} is not under service: ${serviceConfig.name}`;
          errorInfo = errorInfo ? `${errorInfo}\n${info}` : info;
        }
        const { config } = triggerConfig;
        switch (triggerConfig.type) {
          case 'log': {
            if (!instanceOfLogTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          case 'cdn_events': {
            if (!instanceOfCdnTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          case 'mns_topic': {
            if (!instanceOfMnsTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          case 'oss': {
            if (!instanceOfOssTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          case 'timer': {
            if (!instanceOfTimerTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          case 'http': {
            if (!instanceOfHttpTriggerConfig(config)) {
              errorInfo = `config: ${JSON.stringify(config)} is not for ${triggerConfig.type} trigger`;
            }
            break;
          }
          default: {
            throw new Error(`Trigger type: ${triggerConfig.type} is not supported now`);
          }
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
    const properties = inputs?.properties || inputs?.Properties;
    const provider = project?.Provider || project?.provider;
    const accessAlias = project?.AccessAlias || project?.accessAlias;
    const credentials = await core.getCredential(provider, accessAlias || '');
    const args = inputs?.Args || inputs?.args;
    const projectName: string = project.projectName || project.ProjectName;

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
      projectName,
      accessAlias,
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
      projectName,
      accessAlias,
      credentials,
      serviceConfig,
      functionConfig,
      region,
      triggersConfig,
      args,
    } = await this.handlerInputs(inputs);

    const stackId = genStackId(credentials.AccountID, region, serviceConfig.name);
    this.logger.debug(`generated stack id: ${stackId}`);
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
    this.logger.info('waiting for preparing for pulumi resource list...');
    const pulumiStackDirOfService = path.join(PULUMI_CACHE_DIR, stackId);
    this.logger.debug(`Ensuring ${pulumiStackDirOfService}...`);
    await fse.ensureDir(pulumiStackDirOfService, 0o777);
    const fcConfigJsonFile = path.join(pulumiStackDirOfService, 'fc-config.json');

    const fcBaseIns = new FcBase(serviceConfig, region, credentials, functionConfig, triggersConfig, fcConfigJsonFile);

    await fcBaseIns.addConfigToJsonFile(assumeYes);

    await cpPulumiCodeFiles(pulumiStackDirOfService);
    shell.exec(`cd ${pulumiStackDirOfService} && npm i`, { silent: true });
    this.logger.info('pulumi resource list is prepared.');
    // 部署 fc 资源
    const pulumiComponentIns = await core.load('alibaba/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(stackId, region, pulumiStackDirOfService);
    const pulumiInputs = genComponentInputs(credentials, `${projectName}-pulumi-project`, accessAlias, 'pulumi-alibaba', pulumiComponentProp);
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
      projectName,
      accessAlias,
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
    const fcBaseIns = new FcBase(serviceConfig, region, credentials, functionConfig, triggersConfig, fcConfigJsonFile);

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

    const pulumiComponentIns = await core.load('alibaba/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(stackId, region, pulumiStackDirOfService);
    const pulumiInputs = genComponentInputs(credentials, `${projectName}-pulumi-project`, accessAlias, 'pulumi-alibaba', pulumiComponentProp);

    let pulumiRes;
    if (nonOptionsArg === 'service') {
      this.logger.info(`waiting for service: ${serviceConfig.name} to be removed`);
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
        this.logger.info(`cancel removing service ${serviceConfig.name}`);
        return;
      }
    } else if (nonOptionsArg === 'function') {
      this.logger.info(`waiting for service: ${functionConfig.name} to be removed`);
      const fcTriggers = await fcBaseIns.getTriggerNamesInConfigFile();
      if (assumeYes || !fcTriggers || fcTriggers.length === 0 || await promptForConfirmContinue(`Remove function: ${functionConfig.name} and triggers: [${fcTriggers}] belonging to it?`)) {
        // update
        await fcBaseIns.delFunctionConfigInConfigFile();
        pulumiRes = await pulumiComponentIns.up(pulumiInputs);
      } else {
        this.logger.info(`cancel removing function ${functionConfig.name}`);
        return;
      }
    } else if (nonOptionsArg === 'trigger') {
      // update
      // @ts-ignore
      const triggerName = parsedArgs.data?.n || parsedArgs.data?.name || undefined;
      this.logger.info(`waiting for triggers ${triggerName || ''} to be removed`);
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
