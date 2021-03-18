import { OssTriggerConfig, instanceOfOssTriggerConfig } from '../oss';
import { CdnTriggerConfig, instanceOfCdnTriggerConfig } from '../cdn';
import { MnsTriggerConfig, instanceOfMnsTriggerConfig } from '../mns';
import { LogTriggerConfig, instanceOfLogTriggerConfig } from '../log';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
// TODO: [TableStoreTriggerConfig, RdsTriggerConfig, DomainConfig]

export interface TriggerConfig {
  name: string;
  function: string;
  service: string;
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

export class Trigger {
  @core.HLogger('FC_BASE') logger: core.ILogger;

  readonly triggerConfig: TriggerConfig;
  readonly region: string;
  readonly accountId: string;
  constructor(triggerConfig: TriggerConfig, region: string, accountId: string) {
    this.triggerConfig = triggerConfig;

    this.region = region;
    this.accountId = accountId;
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
          return `acs:log:${this.region}:${this.accountId}:project/${config.logConfig.project}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'cdn_events': {
        if (instanceOfCdnTriggerConfig(config)) {
          return `acs:cdn:*:${this.accountId}`;
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
          return `acs:mns:${mnsArnRegion}:${this.accountId}:/topics/${config.topicName}`;
        } else {
          throw new Error(`config: ${JSON.stringify(config)} is not for ${this.triggerConfig.type} trigger`);
        }
      }
      case 'oss': {
        if (instanceOfOssTriggerConfig(config)) {
          return `acs:oss:${this.region}:${this.accountId}:${config.bucketName}`;
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
}
