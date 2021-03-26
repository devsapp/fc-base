import { FcBase } from './fc-base';
import * as _ from 'lodash';
import { ICredentials } from '../profile';
import * as path from 'path';
import { FcTrigger } from './trigger';


export interface FunctionConfig {
  name: string;
  service?: string;
  description?: string;
  filename?: string;
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  handler: string;
  memorySize?: number;
  runtime: string;
  timeout?: number;
  environmentVariables?: {
    [key: string]: any;
  };
  initializationTimeout?: number;
  initializer?: string;
  // Triggers?: TriggerConfig[];
  instanceConcurrency?: number;
  instanceType?: string;
  ossBucket?: string;
  ossKey?: string;
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
}

export class FcFunction extends FcBase {
  functionConfig: FunctionConfig;
  readonly serviceName: string;

  static keyInConfigFile = 'function';
  static keyInResource = 'name';
  static configFileName = 'fc-function.json';

  constructor(functionConfig: FunctionConfig, credentials: ICredentials, region: string, serviceName: string) {
    super(region, credentials);
    this.functionConfig = functionConfig;
    this.serviceName = serviceName;
  }

  validateConfig(): void {
    if (_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
      throw new Error('Please add serviceConfig in your serverless service or service attribute in your functionConfig');
    }
    if (!_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
      this.functionConfig.service = this.serviceName;
    } else if (!_.isNil(this.serviceName) && !_.isNil(this.functionConfig.service) && this.serviceName !== this.functionConfig.service) {
      throw new Error(`Please make service attribute of function: ${this.functionConfig.name} consistent with serviceName in serviceConfig`);
    }
    if (!_.isNil(this.functionConfig.filename)) { this.functionConfig.filename = path.resolve(this.functionConfig.filename); }
  }


  async getTriggerNames(): Promise<string[]> {
    this.pulumiStackDirCheck();
    const triggerConfigFilePath = path.join(this.pulumiStackDir, FcTrigger.configFileName);
    return await FcBase.getResourceUnderParent(this.functionConfig.name, 'function', FcTrigger.keyInConfigFile, FcTrigger.keyInResource, triggerConfigFilePath);
  }

  async delTriggersUnderFunction(): Promise<void> {
    this.pulumiStackDirCheck();
    const triggerConfigFilePath = path.join(this.pulumiStackDir, FcTrigger.configFileName);
    const removedTriggersNames = await FcBase.delReourceUnderParent(this.functionConfig.name, 'function', FcTrigger.keyInConfigFile, FcTrigger.keyInResource, triggerConfigFilePath);
    this.logger.info(`remove triggers ${removedTriggersNames} under function: ${this.functionConfig.name}.`);
  }


  initFunctionConfigFileAttr(): void {
    this.initConfigFileAttr(this.serviceName, FcFunction.configFileName);
  }

  async delFunctionInConfFile(): Promise<boolean> {
    return await this.delResourceInConfFile<FunctionConfig>(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource);
  }

  async addFunctionInConfFile(assumeYes?: boolean): Promise<void> {
    await this.addResourceInConfFile<FunctionConfig>(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource, assumeYes);
  }
}
