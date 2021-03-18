import { FunctionConfig } from './function';
import { ServiceConfig } from './service';
import * as fse from 'fs-extra';
import { isFile, writeStrToFile } from '../file';
import { HLogger, ILogger } from '@serverless-devs/core';
import equal from 'deep-equal';
import { promptForConfirmContinue } from '../init/prompt';
import { TriggerConfig, Trigger } from './trigger';
import * as _ from 'lodash';
import * as path from 'path';

export class FcBase {
  @HLogger('FC-BASE') logger: ILogger;

  readonly functionConfig?: FunctionConfig;
  readonly serviceConfig: ServiceConfig;
  readonly triggersConfig?: TriggerConfig[];
  readonly configFile?: string;
  readonly credentials: {[key: string]: any};
  readonly region: string;

  constructor(serviceConfig: ServiceConfig, region: string, credentials: {[key: string]: any}, functionConfig?: FunctionConfig, triggersConfig?: TriggerConfig[], configFile?: string) {
    this.functionConfig = functionConfig;
    // resolve filename
    if (!_.isNil(this.functionConfig?.filename)) {
      Object.assign(this.functionConfig, {
        filename: path.resolve(this.functionConfig?.filename),
      });
    }
    this.serviceConfig = serviceConfig;
    this.triggersConfig = triggersConfig;
    this.configFile = configFile;
    this.region = region;
    this.credentials = credentials;
  }

  async createConfigFile(): Promise<void> {
    /**
     * format of fcConfigFile(json format):
     *  {
     *    "service": {
     *      [key: string]: any
     *    },
     *     "functions": [
     *       {
     *         [key: string]: any
     *       },
     *       {
     *         [key: string]: any
     *       },
     *       ......
     *     ],
     *     "triggers": [
     *       {
     *         [key: string]: any
     *       },
     *       {
     *         [key: string]: any
     *       },
     *       ......
     *     ]
     *  }
     */
    this.logger.debug(`${this.configFile} not exist, creating...`);

    const fcConfig = {};
    if (this.serviceConfig) { Object.assign(fcConfig, { service: this.serviceConfig }); }
    if (this.functionConfig) {
      const functions: FunctionConfig[] = [];
      functions.push(this.functionConfig);
      Object.assign(fcConfig, { functions });
    }
    const resolvedTriggers = [];
    if (this.triggersConfig) {
      for (const triggerConfig of this.triggersConfig) {
        const triggerIns = new Trigger(triggerConfig, this.region, this.credentials.AccountID);
        const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
        resolvedTriggers.push(resolvedTrigger);
      }
    }
    if (!_.isEmpty(resolvedTriggers)) { Object.assign(fcConfig, { triggers: resolvedTriggers }); }


    await writeStrToFile(this.configFile, JSON.stringify(fcConfig), 'w', 0o777);
    this.logger.debug(`write content: ${JSON.stringify(fcConfig)} to ${this.configFile}`);
  }

  async addConfig(assumeYes?: boolean): Promise<void> {
    this.logger.debug(`${this.configFile} exists, updating...`, 'yellow');

    const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
    const serviceInGlobal = fcConfigInGlobal?.service;
    const functionsInGlobal = fcConfigInGlobal?.functions || [];
    const triggersInGlobal = fcConfigInGlobal?.triggers || [];

    const fcConfigToBeWritten = fcConfigInGlobal;
    if (this.serviceConfig) {
      if (!equal(serviceInGlobal, this.serviceConfig)) {
        this.logger.warn(`Service ${this.serviceConfig.name} already exists in golbal:\n${JSON.stringify(serviceInGlobal)}.`);
        if (assumeYes || await promptForConfirmContinue('Replace service in pulumi stack with the service in current working directory?')) {
          // replace service
          fcConfigToBeWritten.service = this.serviceConfig;
        }
      }
    }
    if (this.functionConfig) {
      const functionIdxInGlobal = functionsInGlobal?.findIndex((f) => f.name === this.functionConfig.name);
      if (!_.isNil(functionIdxInGlobal) && functionIdxInGlobal >= 0) {
        if (!equal(this.functionConfig, functionsInGlobal[functionIdxInGlobal])) {
          this.logger.warn(`Function ${this.functionConfig.name} already exists in golbal:\n${JSON.stringify(functionsInGlobal[functionIdxInGlobal])}`);
          if (assumeYes || await promptForConfirmContinue('Replace function in pulumi stack with the function in current working directory?')) {
            // replace function
            functionsInGlobal[functionIdxInGlobal] = this.functionConfig;
          }
        }
      } else {
        functionsInGlobal.push(this.functionConfig);
      }
    }
    fcConfigToBeWritten.functions = functionsInGlobal;


    if (this.triggersConfig) {
      for (const triggerConfig of this.triggersConfig) {
        // The key of fc config file is ${account_id}_${region}_${service}
        this.logger.debug(`current trigger is : ${JSON.stringify(triggerConfig)}`);
        const triggerIns = new Trigger(triggerConfig, this.region, this.credentials.AccountID);
        const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
        this.logger.debug(`resolved trigger in pulumi format: ${JSON.stringify(resolvedTrigger)}`);
        const triggerIdxInGlobal = triggersInGlobal?.findIndex((t) => t.name === resolvedTrigger.name && t.function === resolvedTrigger.function && t.service === resolvedTrigger.service);
        if (triggerIdxInGlobal !== undefined && triggerIdxInGlobal >= 0) {
          if (!equal(resolvedTrigger, triggersInGlobal[triggerIdxInGlobal])) {
            this.logger.warn(`Trigger ${triggerConfig.name} already exists in golbal:\n${JSON.stringify(triggersInGlobal[triggerIdxInGlobal])}`);
            if (assumeYes || await promptForConfirmContinue('Replace trigger in pulumi stack with the trigger in current working directory?')) {
              // replace trigger
              triggersInGlobal[triggerIdxInGlobal] = resolvedTrigger;
            }
          }
        } else {
          triggersInGlobal.push(resolvedTrigger);
        }
      }
    }
    fcConfigToBeWritten.triggers = triggersInGlobal;

    // overwrite file
    if (_.isEmpty(fcConfigToBeWritten.functions)) { delete fcConfigToBeWritten.functions; }
    if (_.isEmpty(fcConfigToBeWritten.triggers)) { delete fcConfigToBeWritten.triggers; }
    await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten), 'w', 0o777);
    this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten)} to ${this.configFile}.`);
  }

  async getFunctionNamesInConfigFile(): Promise<string[]> {
    if (await fse.pathExists(this.configFile) && await isFile(this.configFile)) {
      const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
      const functionsUnderService = [];
      if (fcConfigInGlobal?.functions) {
        for (const f of fcConfigInGlobal?.functions) {
          if (f.service === this.serviceConfig.name) { functionsUnderService.push(f.name); }
        }
      }
      return functionsUnderService;
    } else {
      throw new Error('Please deploy resource first.');
    }
  }

  async getTriggerNamesInConfigFile(): Promise<string[]> {
    if (await fse.pathExists(this.configFile) && await isFile(this.configFile)) {
      const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
      const triggersUnderFunction = [];
      if (fcConfigInGlobal?.triggers) {
        for (const t of fcConfigInGlobal?.triggers) {
          if (t.service === this.functionConfig.service && t.function === this.functionConfig.name) { triggersUnderFunction.push(t.name); }
        }
      }
      return triggersUnderFunction;
    } else {
      throw new Error('Please deploy resource first.');
    }
  }


  async delConfig(): Promise<void> {
    this.logger.debug(`Deleting in ${this.configFile}...`, 'yellow');
    const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
    let serviceInGlobal = fcConfigInGlobal?.service;
    const functionsInGlobal: FunctionConfig[] = fcConfigInGlobal?.functions;
    const triggersInGlobal: TriggerConfig[] = fcConfigInGlobal?.triggers;


    if (this.triggersConfig) {
      for (const triggerConfig of this.triggersConfig) {
        const triggerIns = new Trigger(triggerConfig, this.region, this.credentials.AccountID);
        const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
        const triggerIdxInGlobal = triggersInGlobal?.findIndex((t) => t.name === resolvedTrigger.name && t.function === resolvedTrigger.function);
        if (triggerIdxInGlobal !== undefined && triggerIdxInGlobal >= 0) {
          triggersInGlobal.splice(triggerIdxInGlobal, 1);
        } else {
          this.logger.error(`Remove trigger: ${triggerConfig.name} error: the trigger does not exist.`);
        }
      }
    }

    if (this.functionConfig) {
      const triggersUnderFunction: string[] = [];
      if (triggersInGlobal) {
        for (const triggerConfig of triggersInGlobal) {
          if (triggerConfig.function === this.functionConfig.name) {
            triggersUnderFunction.push(triggerConfig.name);
          }
        }
      }
      if (triggersUnderFunction.length > 0) {
        this.logger.error(`Remove function: ${this.functionConfig.name} error: you should remove triggers: ${triggersUnderFunction} first.`);
      } else {
        const functionIdxInGlobal = functionsInGlobal?.findIndex((f) => f.name === this.functionConfig.name);

        if (functionIdxInGlobal !== undefined && functionIdxInGlobal >= 0) {
          functionsInGlobal.splice(functionIdxInGlobal, 1);
        } else {
          this.logger.error(`Remove function: ${this.functionConfig.name} error: the function does not exist.`);
        }
      }
    }
    if (this.serviceConfig) {
      const functionsUnderService: string[] = [];
      if (functionsInGlobal) {
        for (const functionInGlobal of functionsInGlobal) {
          if (functionInGlobal.service === this.serviceConfig.name) {
            functionsUnderService.push(functionInGlobal.name);
          }
        }
      }
      if (functionsUnderService.length > 0) {
        this.logger.error(`Remove service: ${this.serviceConfig.name} error: you should remove functions: ${functionsUnderService} first.`);
      } else {
        serviceInGlobal = {};
      }
    }
    const fcConfigToBeWritten = {};
    if (serviceInGlobal !== undefined && JSON.stringify(serviceInGlobal) !== '{}') {
      Object.assign(fcConfigToBeWritten, {
        service: serviceInGlobal,
      });
    }

    if (functionsInGlobal !== undefined && functionsInGlobal.length > 0) {
      Object.assign(fcConfigToBeWritten, {
        functions: functionsInGlobal,
      });
    }
    if (triggersInGlobal !== undefined && triggersInGlobal.length > 0) {
      Object.assign(fcConfigToBeWritten, {
        triggers: triggersInGlobal,
      });
    }
    if (JSON.stringify(fcConfigToBeWritten) === '{}') {
      // remove config file
      await fse.unlink(this.configFile);
    } else {
      // overwrite file
      await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten), 'w', 0o777);
    }
  }

  async addConfigToJsonFile(assumeYes?: boolean): Promise<void> {
    if (await this.configFileExists()) {
      // update
      await this.addConfig(assumeYes);
    } else {
      // create
      await this.createConfigFile();
    }
  }

  delFunction(functions: FunctionConfig[]): FunctionConfig[] {
    if (!functions) { return undefined; }
    const functionIdx = functions?.findIndex((f) => f.name === this.functionConfig.name);
    if (functionIdx !== undefined && functionIdx >= 0) {
      functions.splice(functionIdx, 1);
    } else {
      throw new Error(`function: ${this.functionConfig.name} dose not exist in local pulumi stack.`);
    }

    return functions;
  }

  delTriggers(triggers: TriggerConfig[], triggerName?: string, functionName?: string): TriggerConfig[] {
    if (!triggers || triggers.length === 0) { return undefined; }
    if (!triggerName && !functionName) {
      // 删除 yaml 中所有的 trigger
      if (this.triggersConfig) {
        for (const triggerConfig of this.triggersConfig) {
          const triggerIns = new Trigger(triggerConfig, this.region, this.credentials.AccountID);
          const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
          const triggerIdx = triggers?.findIndex((t) => t.name === resolvedTrigger.name && t.function === resolvedTrigger.function && t.service === resolvedTrigger.service);
          if (triggerIdx !== undefined && triggerIdx >= 0) {
            triggers.splice(triggerIdx, 1);
          } else {
            throw new Error(`Remove trigger error: the trigger: ${triggerConfig.name} does not exist in local pulumi stack.`);
          }
        }
      } else {
        throw new Error('There is no trigger in your yaml file.');
      }
    } else if (triggerName) {
      // 删除指定名称的 trigger
      const triggerIdxInYaml = this.triggersConfig?.findIndex((t) => t.name === triggerName);
      if (triggerIdxInYaml !== undefined && triggerIdxInYaml >= 0) {
        const triggerToBeDeleted = this.triggersConfig[triggerIdxInYaml];
        const triggerIns = new Trigger(triggerToBeDeleted, this.region, this.credentials.AccountID);
        const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
        const triggerIdx = triggers?.findIndex((t) => t.name === resolvedTrigger.name && t.function === resolvedTrigger.function);
        if (triggerIdx !== undefined && triggerIdx >= 0) {
          triggers.splice(triggerIdx, 1);
        } else {
          throw new Error(`Remove trigger error: the trigger: ${triggerName} does not exist in local pulumi stack, please deploy it first.`);
        }
      } else {
        throw new Error(`Trigger: ${triggerName} dose not exist in your yaml file.`);
      }
    } else if (functionName) {
      // 删除某个函数下的所有 trigger
      let i = triggers.length;
      while (i--) {
        if (triggers[i].function === functionName) {
          triggers.splice(i, 1);
        }
      }
    }
    return triggers;
  }
  async configFileExists(): Promise<boolean> {
    if (await fse.pathExists(this.configFile) && await isFile(this.configFile)) {
      return true;
    }
    return false;
  }

  async delFunctionConfigInConfigFile(): Promise<void> {
    if (await this.configFileExists()) {
      const configInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));

      if (configInGlobal?.functions) {
        const functions = this.delFunction(configInGlobal.functions);
        if (functions) {
          if (functions.length === 0) {
            // no function left
            delete configInGlobal.functions;
          } else {
            configInGlobal.functions = functions;
          }
        }

        if (configInGlobal?.triggers) {
          const triggers = this.delTriggers(configInGlobal.triggers, undefined, this.functionConfig.name);
          if (triggers) {
            if (triggers.length === 0) {
              // no trigger left
              delete configInGlobal.triggers;
            } else {
              configInGlobal.triggers = triggers;
            }
          }
        }
        await writeStrToFile(this.configFile, JSON.stringify(configInGlobal), 'w', 0o777);
        this.logger.debug(`Delete function: ${this.functionConfig.name} in ${this.configFile} done!`);
      } else {
        throw new Error(`There is no function under service: ${this.serviceConfig.name}`);
      }
    } else {
      throw new Error('Please deploy resource first.');
    }
  }

  async delTriggerConfigInConfigFile(triggerName?: string): Promise<void> {
    if (await this.configFileExists()) {
      const configInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
      if (configInGlobal?.triggers) {
        const triggers = this.delTriggers(configInGlobal.triggers, triggerName);
        if (triggers) {
          if (triggers.length === 0) {
            // no trigger left
            delete configInGlobal.triggers;
          } else {
            configInGlobal.triggers = triggers;
          }
        }

        await writeStrToFile(this.configFile, JSON.stringify(configInGlobal), 'w', 0o777);
        this.logger.debug(`Delete ${triggerName || 'triggers'} ${this.configFile} done!`);
      } else {
        throw new Error(`There is no trigger ${triggerName || ''} under function: ${this.functionConfig.name}`);
      }
    } else {
      throw new Error('Please deploy resource first.');
    }
  }

  async delConfigInJsonFile(): Promise<void> {
    if (await fse.pathExists(this.configFile) && await isFile(this.configFile)) {
      // update
      await this.delConfig();
    } else {
      this.logger.warn('There is no resource.');
    }
  }
}
