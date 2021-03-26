import { OssTriggerConfig, instanceOfOssTriggerConfig } from '../oss';
import { CdnTriggerConfig, instanceOfCdnTriggerConfig } from '../cdn';
import { MnsTriggerConfig, instanceOfMnsTriggerConfig } from '../mns';
import { LogTriggerConfig, instanceOfLogTriggerConfig } from '../log';
import * as _ from 'lodash';
import { FcBase } from './fc-base';
import { ICredentials } from '../profile';
// TODO: [TableStoreTriggerConfig, RdsTriggerConfig, DomainConfig, apiGateway]

export interface TriggerConfig {
  name: string;
  function?: string;
  service?: string;
  type: 'oss' | 'log' | 'timer' | 'http' | 'mns_topic' | 'cdn_events';
  role: string;
  sourceArn?: string;
  config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig;
}

export interface TimerTriggerConfig {
  cronExpression: string;
  enable: boolean;
  payload?: string;
}
export function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig {
  return 'cronExpression' in data && 'enable' in data;
}

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
}
export function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig {
  return 'authType' in data && 'methods' in data;
}

export class FcTrigger extends FcBase {
  readonly triggerConfig: TriggerConfig;
  resolvedTriggerConfig: {[key: string]: any};
  readonly serviceName: string;
  readonly functionName?: string;

  static keyInConfigFile = 'trigger';
  static keyInResource = 'name';
  static configFileName = 'fc-trigger.json';

  constructor(triggerConfig: TriggerConfig, credentials: ICredentials, region: string, serviceName: string, functionName?: string) {
    super(region, credentials);
    this.triggerConfig = triggerConfig;
    this.resolvedTriggerConfig = this.resolveTriggerIntoPulumiFormat();
    this.serviceName = serviceName;
    if (!_.isNil(functionName)) { this.functionName = functionName; }
  }

  validateConfig(): void {
    const { config } = this.triggerConfig;
    let isTriggerTypeNotMatched = false;
    switch (this.triggerConfig.type) {
      case 'log': {
        if (!instanceOfLogTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      case 'cdn_events': {
        if (!instanceOfCdnTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      case 'mns_topic': {
        if (!instanceOfMnsTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      case 'oss': {
        if (!instanceOfOssTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      case 'timer': {
        if (!instanceOfTimerTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      case 'http': {
        if (!instanceOfHttpTriggerConfig(config)) {
          isTriggerTypeNotMatched = true;
        }
        break;
      }
      default: {
        throw new Error(`Trigger type: ${this.triggerConfig.type} is not supported now`);
      }
    }
    if (isTriggerTypeNotMatched) { throw new Error(`trigger config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`); }

    if (_.isNil(this.serviceName) && _.isNil(this.triggerConfig.service)) {
      throw new Error('Please add serviceConfig in your serverless service or service attribute in your triggerConfig');
    }
    if (_.isNil(this.functionName) && _.isNil(this.triggerConfig.function)) {
      throw new Error('Please add functionConfig in your serverless service or function attribute in your triggerConfig');
    }

    if (!_.isNil(this.serviceName) && _.isNil(this.triggerConfig.service)) {
      this.resolvedTriggerConfig.service = this.serviceName;
    } else if (!_.isNil(this.serviceName) && !_.isNil(this.triggerConfig.service) && this.serviceName !== this.triggerConfig.service) {
      throw new Error(`Please make service attribute of trigger: ${this.triggerConfig.name} consistent with serviceName in serviceConfig`);
    }

    if (!_.isNil(this.functionName) && _.isNil(this.triggerConfig.function)) {
      this.resolvedTriggerConfig.function = this.functionName;
    } else if (!_.isNil(this.functionName) && !_.isNil(this.triggerConfig.function) && this.functionName !== this.triggerConfig.function) {
      throw new Error(`Please make function attribute of trigger: ${this.triggerConfig.name} consistent with functionName in serviceConfig`);
    }
  }

  initTriggerConfigFileAttr(): void {
    this.initConfigFileAttr(this.serviceName, FcTrigger.configFileName);
  }

  resolveTriggerIntoPulumiFormat(): any {
    /**
     * Pulumi format:
     *  {
     *    config?: string;
          configMns?: string;
          function: string;
          name?: string;
          namePrefix?: string;
          role?: string;
          service: string;
          sourceArn?: string;
          type: string;
     *  }
     */
    if (_.isEmpty(this.triggerConfig)) { return {}; }
    const res = Object.assign({}, {
      name: this.triggerConfig.name,
      function: this.triggerConfig.function,
      service: this.triggerConfig.service,
      type: this.triggerConfig.type,
    });

    Object.assign(res, {
      role: this.triggerConfig.role,
    });

    if (!_.isNil(this.triggerConfig.sourceArn)) {
      Object.assign(res, {
        sourceArn: this.triggerConfig.sourceArn,
      });
    } else {
      Object.assign(res, {
        sourceArn: this.getSourceArn(),
      });
    }

    const triggerConfigInPulumiFormat = this.getTriggerConfigInPulumiFormat();
    if (this.triggerConfig.type === 'mns_topic') {
      Object.assign(res, { configMns: triggerConfigInPulumiFormat });
    } else {
      Object.assign(res, { config: triggerConfigInPulumiFormat });
    }
    return res;
  }

  getTriggerConfigInPulumiFormat(): string {
    const { config } = this.triggerConfig;
    let res: {[key: string]: any} = {};
    switch (this.triggerConfig.type) {
      case 'log': {
        if (instanceOfLogTriggerConfig(config)) {
          res = { ...config };
          delete res.enable;
          Object.assign(res, {
            Enable: config.enable,
          });
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'cdn_events': {
        if (instanceOfCdnTriggerConfig(config)) {
          res = config;
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'mns_topic': {
        if (instanceOfMnsTriggerConfig(config)) {
          // notifyContentFormat default 'STREAM'
          // notifyStrategy defalut 'BACKOFF_RETRY'
          const notifyContentFormat = config.notifyContentFormat ? config.notifyContentFormat : 'STREAM';
          const notifyStrategy = config.notifyStrategy ? config.notifyStrategy : 'BACKOFF_RETRY';
          Object.assign(res, {
            NotifyContentFormat: notifyContentFormat,
            NotifyStrategy: notifyStrategy,
          });
          if (config.filterTag) {
            Object.assign(res, {
              FilterTag: config.filterTag,
            });
          }
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'oss': {
        if (instanceOfOssTriggerConfig(config)) {
          Object.assign(res, {
            events: config.events,
            filter: config.filter,
          });
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'timer': {
        if (instanceOfTimerTriggerConfig(config)) {
          res = config;
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'http': {
        if (instanceOfHttpTriggerConfig(config)) {
          res = config;
          break;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      default: {
        throw new Error(`Trigger type: ${this.triggerConfig.type} is not supported now`);
      }
    }
    return JSON.stringify(res);
  }

  getSourceArn(): string | undefined {
    const { config } = this.triggerConfig;
    switch (this.triggerConfig.type) {
      case 'log': {
        if (instanceOfLogTriggerConfig(config)) {
          return `acs:log:${this.region}:${this.credentials.AccountID}:project/${config.logConfig.project}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'cdn_events': {
        if (instanceOfCdnTriggerConfig(config)) {
          return `acs:cdn:*:${this.credentials.AccountID}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'mns_topic': {
        if (instanceOfMnsTriggerConfig(config)) {
          let mnsArnRegion = this.region;
          if (config.region) {
            mnsArnRegion = config.region;
          }
          return `acs:mns:${mnsArnRegion}:${this.credentials.AccountID}:/topics/${config.topicName}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'oss': {
        if (instanceOfOssTriggerConfig(config)) {
          return `acs:oss:${this.region}:${this.credentials.AccountID}:${config.bucketName}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      default: {
        if (this.triggerConfig.type === 'http' || this.triggerConfig.type === 'timer') {
          return;
        }
        throw new Error(`Trigger type: ${this.triggerConfig.type} is not supported now`);
      }
    }
  }

  async delTriggerInConfFile(): Promise<boolean> {
    return await this.delResourceInConfFile<{[key: string]: any}>(this.resolvedTriggerConfig, 'trigger', 'name');
  }


  async addTriggerInConfFile(assumeYes?: boolean) {
    await this.addResourceInConfFile<{[key: string]: any}>(this.resolvedTriggerConfig, 'trigger', 'name', assumeYes);
  }

  // async addConfig(assumeYes?: boolean): Promise<void> {
  //   this.logger.debug(`${this.configFile} exists, updating...`);

  //   const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
  //   let triggersInGlobal = fcConfigInGlobal?.triggers;

  //   if (this.resolvedTriggerConfig) {
  //     const idxInGlobal = triggersInGlobal?.findIndex((t) => t.name === this.resolvedTriggerConfig.name);
  //     if (!_.isNil(idxInGlobal) && idxInGlobal >= 0) {
  //       if (!equal(this.resolvedTriggerConfig, triggersInGlobal[idxInGlobal])) {
  //         this.logger.warn(`Function ${this.functionConfig.name} already exists in golbal:\n${JSON.stringify(triggersInGlobal[idxInGlobal])}`);
  //         if (assumeYes || await promptForConfirmContinue('Replace trigger in pulumi stack with the trigger in current working directory?')) {
  //           // replace function
  //           triggersInGlobal[idxInGlobal] = this.resolvedTriggerConfig;
  //         }
  //       }
  //     } else {
  //       triggersInGlobal.push(this.resolvedTriggerConfig);
  //     }
  //   }
  //   const fcConfigToBeWritten = Object.assign({}, {
  //     triggers: triggersInGlobal
  //   })

  //   // overwrite file
  //   await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten), 'w', 0o777);
  //   this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten)} to ${this.configFile}.`);
  // }


  // async delConfig(): Promise<void> {
  //   // 更新函数配置文件
  //   if (await this.configFileExists()) {
  //     const configInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
  //     if (!_.isEmpty(configInGlobal?.triggers)) {
  //       const triggers = this.delReource<any>(this.resolvedTriggerConfig, configInGlobal?.triggers, 'name');
  //       // 删除完后没有函数了，则删除文件
  //       if (_.isEmpty(triggers)) {
  //         await fse.unlink(this.configFile);
  //         this.logger.debug(`no trigger left after remove function: ${this.functionConfig.name}`);
  //       } else {
  //         const fcConfigToBeWritten = Object.assign({}, {
  //           triggers
  //         });
  //         await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten), 'w', 0o777);
  //         this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten)} to ${this.configFile}.`);
  //       }
  //     } else {
  //       throw new Error(`There is no function under service: ${this.serviceConfig.name}`);
  //     }
  //   } else {
  //     throw new Error('Please deploy resource first.');
  //   }
  // }
}
