import { LogConfig } from '../log';
import { VpcConfig } from '../vpc';
import { NasConfig } from '../nas';
import { FcBase } from './fc-base';
import { writeStrToFile } from '../file';
import * as fse from 'fs-extra';
import equal from 'deep-equal';
import { promptForConfirmContinue } from '../init/prompt';
import * as _ from 'lodash';
import { ICredentials } from '../profile';
import * as path from 'path';
import { FcFunction } from './function';

export interface ServiceConfig {
  name: string;
  description?: string;
  internetAccess?: boolean;
  logConfig?: LogConfig;
  role?: string;
  vpcConfig?: VpcConfig;
  nasConfig?: NasConfig;
}

export function genStackId(accountId: string, region: string, serviceName: string): string {
  return `${accountId}_${region}_${serviceName}`;
}

export class FcService extends FcBase {
  readonly serviceConfig: ServiceConfig;

  static keyInConfigFile = 'service';
  static keyInResource = 'name';
  static configFileName = 'fc-service.json';

  constructor(serviceConfig: ServiceConfig, credentials: ICredentials, region: string) {
    super(region, credentials);
    this.serviceConfig = serviceConfig;
  }

  validateConfig(): void {
    if (_.isEmpty(this.serviceConfig)) {
      throw new Error('Please add serviceConfig in your s.yml/yaml');
    }
  }

  initServiceConfigFileAttr(): void {
    this.initConfigFileAttr(this.serviceConfig.name, FcService.configFileName);
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
      this.logger.debug(`write content: ${JSON.stringify(conf)} to ${this.configFile}`);
    } else {
      this.logger.error('empty function Config in FcFunction instance');
    }
  }

  async getFunctionNames(): Promise<string[]> {
    const functionConfigFilePath = path.join(this.pulumiStackDir, FcFunction.configFileName);
    return await FcBase.getResourceUnderParent(this.serviceConfig.name, 'service', FcFunction.keyInConfigFile, FcFunction.keyInResource, functionConfigFilePath);
  }


  async updateServiceInConfFile(assumeYes?: boolean): Promise<void> {
    this.logger.debug(`${this.configFile} exists, updating...`);

    const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
    const serviceInGlobal = fcConfigInGlobal?.service;

    const fcConfigToBeWritten = fcConfigInGlobal;
    if (this.serviceConfig) {
      if (!equal(serviceInGlobal, this.serviceConfig)) {
        this.logger.debug(`Service ${this.serviceConfig.name} already exists in golbal:\n${JSON.stringify(serviceInGlobal)}.`);
        if (assumeYes || await promptForConfirmContinue('Replace service in pulumi stack with the service in current working directory?')) {
          // replace service
          fcConfigToBeWritten.service = this.serviceConfig;
        }
      }
    }

    // overwrite file
    await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 0o777);
    this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten)} to ${this.configFile}.`);
  }

  async addServiceInConfFile(assumeYes?: boolean): Promise<void> {
    if (await this.configFileExists()) {
      // update
      await this.updateServiceInConfFile(assumeYes);
    } else {
      // create
      await this.createServiceConfFile();
    }
  }
}
