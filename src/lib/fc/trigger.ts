import { OssTriggerConfig, instanceOfOssTriggerConfig } from '../oss';
import { CdnTriggerConfig, instanceOfCdnTriggerConfig } from '../cdn';
import { MnsTriggerConfig, instanceOfMnsTriggerConfig } from '../mns';
import { LogTriggerConfig, instanceOfLogTriggerConfig } from '../log';
import * as _ from 'lodash';
import { FcBase } from './fc-base';
import { ICredentials } from '../profile';
import * as core from '@serverless-devs/core';
// TODO: [TableStoreTriggerConfig, RdsTriggerConfig, DomainConfig, apiGateway]

export interface TriggerConfig {
  name: string;
  import?: boolean;
  protect?: boolean;
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

  static compareTriggerKeys(triggerConfOne: {[key: string]: any}, triggerConfTwo: {[key: string]: any}): boolean {
    return (triggerConfOne.name === triggerConfTwo.name) && (triggerConfOne.service === triggerConfTwo.service) && (triggerConfOne.function === triggerConfTwo.function);
  }

  constructor(triggerConfig: TriggerConfig, credentials: ICredentials, region: string, serviceName: string, functionName?: string) {
    super(region, credentials, triggerConfig.import, triggerConfig.protect);
    this.triggerConfig = triggerConfig;
    delete this.triggerConfig.import;
    delete this.triggerConfig.protect;
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
  async init(): Promise<void> {
    this.initConfigFileAttr(this.serviceName, FcTrigger.configFileName);
  }
  async importResource(access: string, appName: string, projectName: string, curPath: any): Promise<void> {
    const pulumiImportStateID: string = FcTrigger.genStateID(this.region, this.serviceName, this.functionName, this.triggerConfig.name);
    const pulumiImportState: any = await core.getState(pulumiImportStateID);
    if (this.isPulumiImport && !pulumiImportState?.isImport) {
      const resourceName = `${this.triggerConfig.name}-${this.functionName}`;
      const resourceID = `${this.serviceName}:${this.functionName}:${this.triggerConfig.name}`;
      const parentUrn = `urn:pulumi:${this.stackID}::${this.stackID}::alicloud:fc/service:Service$alicloud:fc/function:Function::${this.functionName}`;
      await this.pulumiImport(access, appName, projectName, curPath, 'trigger', resourceName, resourceID, parentUrn);
      await core.setState(pulumiImportStateID, { isImport: true });
    }
  }

  static genStateID(region: string, serviceName: string, functionName: string, triggerName: string): string {
    return `${region}-${serviceName}-${functionName}-${triggerName}`;
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
    await this.addResourceInConfFile<{[key: string]: any}>(this.resolvedTriggerConfig, 'trigger', 'name', assumeYes, FcTrigger.compareTriggerKeys);
  }

  async clear(): Promise<void> {
    const clearVm = core.spinner('clearing...');
    try {
      // trigger
      const triggerStateID: string = FcTrigger.genStateID(this.region, this.serviceName, this.functionName, this.triggerConfig.name);
      await FcBase.zeroImportState(triggerStateID);
      this.logger.debug('zero trigger import state done');

      clearVm.succeed('clear done.');
    } catch (e) {
      clearVm.fail('clear error.');
      throw e;
    }
  }
}
