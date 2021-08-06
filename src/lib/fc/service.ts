import { LogConfig } from '../log';
import { VpcConfig } from '../vpc';
import { NasConfig } from '../nas';
import FcBase from './fc-base';
import { writeStrToFile } from '../file';
import * as fse from 'fs-extra';
import equal from 'deep-equal';
import * as _ from 'lodash';
import { ICredentials } from '../profile';
import * as path from 'path';
import { FcFunction } from './function';
import { FcTrigger } from './trigger';
import { genComponentInputs } from '../component';
import { genPulumiComponentProp } from '../pulumi';
import * as core from '@serverless-devs/core';

export interface ServiceConfig {
  name: string;
  description?: string;
  internetAccess?: boolean;
  logConfig?: LogConfig;
  role?: string;
  vpcConfig?: VpcConfig;
  nasConfig?: NasConfig;
  import?: boolean;
  protect?: boolean;
}

export function genStackId(accountId: string, region: string, serviceName: string): string {
  return `${accountId}_${region}_${serviceName}`;
}

export class FcService extends FcBase {
  readonly serviceConfig: ServiceConfig;
  pulumiUrn: string;

  static keyInConfigFile = 'service';
  static keyInResource = 'name';
  static configFileName = 'fc-service.json';

  constructor(serviceConfig: ServiceConfig, credentials: ICredentials, region: string) {
    super(region, credentials, serviceConfig.import, serviceConfig.protect);
    this.serviceConfig = serviceConfig;
    delete this.serviceConfig.import;
    delete this.serviceConfig.protect;
  }

  validateConfig(): void {
    if (_.isEmpty(this.serviceConfig)) {
      throw new Error('Please add serviceConfig in your s.yml/yaml');
    }
  }
  async init(access: string, appName: string, projectName: string, curPath: any): Promise<void> {
    this.initConfigFileAttr(this.serviceConfig.name, FcService.configFileName);
    await this.importResource(access, appName, projectName, curPath);
    this.pulumiUrn = `urn:pulumi:${this.stackID}::${this.stackID}::alicloud:fc/service:Service::${this.serviceConfig?.name}`;
  }

  static genStateID(accountID: string, region: string, serviceName: string): string {
    return `${accountID}-${region}-${serviceName}`;
  }

  async isImported(): Promise<boolean> {
    const pulumiImportStateID: string = FcService.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name);
    const pulumiImportState: any = await core.getState(pulumiImportStateID);
    return pulumiImportState?.isImport;
  }

  async importResource(access: string, appName: string, projectName: string, curPath: any): Promise<void> {
    await this.preparePulumiCode();
    // pulumi stack init
    const pulumiComponentIns = await core.load('devsapp/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, 'init');
    await pulumiComponentIns.stack(pulumiInputs);

    if (this.isPulumiImport && !await this.isImported()) {
      const resourceName = this.serviceConfig.name;
      const resourceID = `${this.serviceConfig.name}`;
      if (await this.pulumiImport(access, appName, projectName, curPath, 'service', resourceName, resourceID)) {
        await this.setKVInState(FcService.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name), 'isImport', true);
      }
    }
  }

  async deploy(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any> {
    // Only deploy service
    const res: any = await this.up(this.serviceConfig.name, access, appName, projectName, curPath, this.pulumiUrn, flags);
    if (!_.isEmpty(res?.stderr)) {
      throw new Error(res?.stderr);
    }
    return res;
  }

  async remove(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any> {
    const res: any = await this.destroy(this.serviceConfig.name, access, appName, projectName, curPath, undefined, flags);
    if (_.isEmpty(res?.stderr)) {
      await this.clean();
      return res;
    } else {
      throw new Error(res?.stderr);
    }
  }

  async clean(): Promise<void> {
    const cleanvm = core.spinner('cleaning...');
    try {
      // service
      const serviceStateID = `${this.region}-${this.serviceConfig.name}`;
      await FcBase.zeroImportState(serviceStateID);
      this.logger.debug('zero service import state done');
      // function & trigger
      const functionNames: string[] = await this.getFunctionNames();
      const functionAndTriggerNamesMap: any = await this.getFunctionAndTriggerNamesMap();
      for (const funcName of functionNames) {
        const functionStateID: string = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name, funcName);
        await FcBase.zeroImportState(functionStateID);
        this.logger.debug(`zero function: ${funcName} import state done`);
        const triggerNames: string[] = functionAndTriggerNamesMap[funcName];
        if (!_.isEmpty(triggerNames)) {
          for (const triggerName of triggerNames) {
            const triggerStateID: string = FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name, funcName, triggerName);
            await FcBase.zeroImportState(triggerStateID);
            this.logger.debug(`zero trigger: ${triggerName} import state done`);
          }
        }
      }

      // remove stack directory
      await fse.remove(this.pulumiStackDir);
      this.logger.debug(`remove stack directory: ${this.pulumiStackDir} done.`);
      cleanvm.succeed('clear done.');
    } catch (e) {
      cleanvm.fail('clear error.');
      throw e;
    }
    this.logger.info(`please make import option to be false in trigger: ${this.serviceConfig.name} and functions/triggers under it.`);
  }

  async createServiceConfFile(): Promise<void> {
    /**
     * format of File(json format):
     *  {
     *    "service": {
     *      [key: string]: any
     *    }
     *  }
    */
    this.logger.debug(`${this.configFile} not exist, creating...`);

    const conf = {};
    if (this.serviceConfig) {
      Object.assign(conf, { service: this.serviceConfig });
      await writeStrToFile(this.configFile, JSON.stringify(conf, null, '  '), 'w', 0o777);
      this.logger.debug(`write content: ${JSON.stringify(conf, null, '  ')} to ${this.configFile}`);
    } else {
      this.logger.error('empty function Config in FcFunction instance');
    }
  }

  async getFunctionNames(): Promise<string[]> {
    const functionConfigFilePath = path.join(this.pulumiStackDir, FcFunction.configFileName);
    return await FcBase.getResourceUnderParent(this.serviceConfig.name, 'service', FcFunction.keyInConfigFile, FcFunction.keyInResource, functionConfigFilePath);
  }

  async getFunctionAndTriggerNamesMap(): Promise<any> {
    const triggerConfigFilePath = path.join(this.pulumiStackDir, FcTrigger.configFileName);
    const res: any = {};
    const functonNames: string[] = await this.getFunctionNames();
    for (const funcName of functonNames) {
      const triggerNamesUnderFunction: string[] = await FcBase.getResourceUnderParent(funcName, 'function', FcTrigger.keyInConfigFile, FcTrigger.keyInResource, triggerConfigFilePath);
      if (!_.isEmpty(triggerNamesUnderFunction)) { Object.assign(res, { [funcName]: triggerNamesUnderFunction }); }
    }
    return res;
  }


  async updateServiceInConfFile(): Promise<void> {
    this.logger.debug(`${this.configFile} exists, updating...`);

    const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
    const serviceInGlobal = fcConfigInGlobal?.service;

    const fcConfigToBeWritten = fcConfigInGlobal;
    if (this.serviceConfig) {
      if (!equal(serviceInGlobal, this.serviceConfig)) {
        this.logger.debug(`Service ${this.serviceConfig.name} already exists in golbal:\n${JSON.stringify(serviceInGlobal, null, '  ')}.`);
        fcConfigToBeWritten.service = this.serviceConfig;
      }
    }

    // overwrite file
    await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 0o777);
    this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten, null, '  ')} to ${this.configFile}.`);
  }

  async addServiceInConfFile(): Promise<void> {
    if (await this.configFileExists()) {
      // update
      await this.updateServiceInConfFile();
    } else {
      // create
      await this.createServiceConfFile();
    }
  }

}
