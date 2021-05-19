import FcBase from './fc-base';
import * as _ from 'lodash';
import { ICredentials } from '../profile';
import * as path from 'path';
import { FcTrigger } from './trigger';
import * as core from '@serverless-devs/core';

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
  import?: boolean;
  protect?: boolean;
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
    super(region, credentials, functionConfig.import, functionConfig.protect);
    this.functionConfig = functionConfig;
    delete this.functionConfig.import;
    delete this.functionConfig.protect;
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

  async init(access: string, appName: string, projectName: string, curPath: any): Promise<void> {
    this.initConfigFileAttr(this.serviceName, FcFunction.configFileName);
    await this.importResource(access, appName, projectName, curPath);
  }

  async isImported(): Promise<boolean> {
    const pulumiImportStateID: string = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
    const pulumiImportState: any = await core.getState(pulumiImportStateID);
    return pulumiImportState?.isImport;
  }

  async importResource(access: string, appName: string, projectName: string, curPath: any): Promise<void> {
    if (this.isPulumiImport && !await this.isImported()) {
      const resourceName: string = this.functionConfig.name;
      const resourceID = `${this.serviceName}:${this.functionConfig.name}`;
      const parentUrn = `urn:pulumi:${this.stackID}::${this.stackID}::alicloud:fc/service:Service::${this.serviceName}`;
      await this.pulumiImport(access, appName, projectName, curPath, 'function', resourceName, resourceID, parentUrn);
      const pulumiImportStateID: string = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
      await this.setKVInState(pulumiImportStateID, 'isImport', true);
    }
  }

  static genStateID(accountID: string, region: string, serviceName: string, functionName: string): string {
    return `${accountID}-${region}-${serviceName}-${functionName}`;
  }

  async delFunctionInConfFile(): Promise<boolean> {
    return await this.delResourceInConfFile<FunctionConfig>(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource);
  }

  async addFunctionInConfFile(assumeYes?: boolean): Promise<void> {
    await this.addResourceInConfFile<FunctionConfig>(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource, assumeYes);
  }

  async remove(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any> {
    const triggerssArr = await this.getTriggerNames();
    let promptMsg: string;
    if (triggerssArr.length === 0) {
      promptMsg = `Are you sure to remove function: ${this.functionConfig.name}?`;
    } else if (triggerssArr.length === 1) {
      promptMsg = `Are you sure to remove service: ${this.functionConfig.name} and function: ${triggerssArr}?`;
    } else {
      promptMsg = `Are you sure to remove service: ${this.functionConfig.name} and functions: ${triggerssArr}?`;
    }

    const targetUrn = `urn:pulumi:${this.stackID}::${this.stackID}::alicloud:fc/service:Service$alicloud:fc/function:Function::${this.functionConfig.name}`;
    const res: any = await this.destroy(this.functionConfig.name, access, appName, projectName, curPath, promptMsg, targetUrn, flags);
    if (_.isEmpty(res?.stderr)) {
      await this.clean();
      return res;
    } else {
      throw new Error(res?.stderr);
    }
  }

  async clean(): Promise<void> {
    const cleanvm = core.spinner('clearing...');
    try {
      // function
      const functionStateID: string = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
      await FcBase.zeroImportState(functionStateID);
      this.logger.debug('zero function import state done');
      // triggers
      const triggerNames: string[] = await this.getTriggerNames();
      for (const triggerName of triggerNames) {
        const triggerStateID: string = FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name, triggerName);
        await FcBase.zeroImportState(triggerStateID);
        this.logger.debug(`zero trigger: ${triggerName} import state done`);
      }
      await this.delFunctionInConfFile();
      cleanvm.succeed('clear done.');
    } catch (e) {
      cleanvm.fail('clear error.');
      throw e;
    }
    this.logger.info(`please make import option to be false in trigger: ${this.functionConfig.name} and triggers under it.`);
  }
}
