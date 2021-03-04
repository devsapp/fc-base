import { LogConfig } from '../log';
import { VpcConfig } from '../vpc';
import { NasConfig } from '../nas';
// import * as fse from 'fs-extra';
// import { isFile, writeStrToFile } from '../file';
// import { HLogger, ILogger } from '@serverless-devs/core';
// import equal from "deep-equal";
// import { promptForConfirmContinue } from '../init/prompt';

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

// export class fcService {
//   @HLogger('S-CORE') logger: ILogger;
//   readonly serviceConfig: ServiceConfig;
//   readonly stackDir: string;

//   constructor(serviceConfig: ServiceConfig, )

//   async createConfigFile(targetFile: string): Promise<void> {
//     /**
//      * format of fcServiceConfigFile(json format):
//      *  {
//      *    "service": {
//      *      [key: string]: any
//      *    }
//      *  }
//      */
//     this.logger.debug(`${targetFile} dose not exist, creating...`);
//     const serviceConfig = {};
//     if (this.serviceConfig) { Object.assign(serviceConfig, { service: this.serviceConfig }); }

//     await writeStrToFile(targetFile, JSON.stringify(serviceConfig), 'w', 0o777);
//     this.logger.debug(`${targetFile} created done!`);
//   }

//   async addConfig(targetFile: string, assumeYes?: boolean): Promise<void> {
//     this.logger.debug(`${targetFile} exists, updating...`);

//     const configInGlobal = JSON.parse(require(targetFile));
//     let serviceConfigToBeWritten = configInGlobal;
//     if (this.serviceConfig) {
//       if (!equal(configInGlobal.service, this.serviceConfig)) {
//         this.logger.warn(`Service ${this.serviceConfig.name} already exists:\n${JSON.stringify(configInGlobal.service)}.`);
//         if (assumeYes || await promptForConfirmContinue(`Replace service in global with the service in current working directory?`)) {
//           // replace service
//           serviceConfigToBeWritten.service = this.serviceConfig;
//         }
//       }
//     }

//     // overwrite file
//     await writeStrToFile(targetFile, JSON.stringify(serviceConfigToBeWritten), 'w', 0o777);
//     this.logger.debug(`${targetFile} update done!`);
//   }

//   async delConfig(targetFile: string): Promise<void> {
//     this.logger.debug(`Deleting in ${targetFile}...`);
//     const configInGlobal = JSON.parse(require(targetFile));

//     if (this.triggersConfig) {
//       for (const triggerConfig of this.triggersConfig) {
//         const triggerIns = new Trigger(triggerConfig);
//         const resolvedTrigger = triggerIns.resolveTriggerIntoPulumiFormat();
//         const triggerIdxInGlobal = triggersInGlobal?.findIndex(t => t.name === resolvedTrigger.name && t.function === resolvedTrigger.function);
//         if (triggerIdxInGlobal !== undefined && triggerIdxInGlobal >= 0) {
//           triggersInGlobal.splice(triggerIdxInGlobal, 1);
//         } else {
//           this.logger.error(`Remove trigger: ${triggerConfig.name} error: the trigger does not exist.`);
//         }
//       }
//     }

//     if (this.functionConfig) {
//       let triggersUnderFunction: string[] = [];
//       if (triggersInGlobal) {
//         for (const triggerConfig of triggersInGlobal) {
//           if (triggerConfig.function === this.functionConfig.name) {
//             triggersUnderFunction.push(triggerConfig.name);
//           }
//         }
//       }
//       if (triggersUnderFunction.length > 0) {
//         this.logger.error(`Remove function: ${this.functionConfig.name} error: you should remove triggers: ${triggersUnderFunction} first.`);
//       } else {
//         const functionIdxInGlobal = functionsInGlobal?.findIndex(f => f.name === this.functionConfig.name );

//         if (functionIdxInGlobal !== undefined && functionIdxInGlobal >= 0) {
//           functionsInGlobal.splice(functionIdxInGlobal, 1);
//         } else {
//           this.logger.error(`Remove function: ${this.functionConfig.name} error: the function does not exist.`);
//         }
//       }
//     }
//     if (this.serviceConfig) {
//       let functionsUnderService: string[] = [];
//       if (functionsInGlobal) {
//         for (const functionInGlobal of functionsInGlobal) {
//           if (functionInGlobal.service === this.serviceConfig.name) {
//             functionsUnderService.push(functionInGlobal.name);
//           }
//         }
//       }
//       if (functionsUnderService.length > 0) {
//         this.logger.error(`Remove service: ${this.serviceConfig.name} error: you should remove functions: ${functionsUnderService} first.`);
//       } else {
//         serviceInGlobal = {};
//       }
//     }
//     const fcConfigToBeWritten = {};
//     if (serviceInGlobal !== {} && serviceInGlobal.name) {
//       Object.assign(fcConfigToBeWritten, {
//         service: serviceInGlobal
//       });
//     }

//     if (functionsInGlobal !== undefined && functionsInGlobal.length > 0) {
//       Object.assign(fcConfigToBeWritten, {
//         functions: functionsInGlobal
//       });
//     }
//     if (triggersInGlobal !== undefined && triggersInGlobal.length > 0) {
//       Object.assign(fcConfigToBeWritten, {
//         triggers: triggersInGlobal
//       });
//     }
//     if (fcConfigToBeWritten === {}) {
//       // remove config file
//       await fse.unlink(targetFile);
//     } else {
//       // overwrite file
//       await writeStrToFile(targetFile, JSON.stringify(fcConfigToBeWritten), 'w', 0o777);
//     }
//   }

//   async addConfigToJsonFile(targetFile: string): Promise<void> {
//     if (await fse.pathExists(targetFile) && await isFile(targetFile)) {
//       // update
//       await this.addConfig(targetFile);
//     } else {
//       // create
//       await this.createConfigFile(targetFile);
//     }
//   }
// }

// export class FcService extends FcBase {
//   readonly serviceProp: ServiceProperty;

//   constructor(serviceProp: ServiceProperty, credentials: CredentialConfig) {
//     super(credentials);
//     this.serviceProp = serviceProp;
//   }

//   generateDeployOptions() {
//     const internetAccess = this.serviceProp.InternetAccess || null;
//     const description = this.serviceProp.Description;

//     const vpcConfig = this.serviceProp.Vpc;
//     const nasConfig = this.serviceProp.Nas;
//     const logConfig = this.serviceProp.Log || {};

//     const roleArn = this.getRoleArn();

//     const resolvedLogConfig = transformLogConfig(logConfig);

//     const options = {
//       description
//     };

//     if (roleArn) {
//       Object.assign(options, {
//         role: roleArn
//       });
//     }

//     if (resolvedLogConfig !== null) {
//       Object.assign(options, {
//         logConfig: resolvedLogConfig
//       });
//     }

//     if (internetAccess !== null) {
//       // vpc feature is not supported in some region
//       Object.assign(options, {
//         internetAccess
//       });
//     }

//     const resolvedVpcConfig = transformVpcConfig(vpcConfig);
//     if (resolvedVpcConfig !== null) {
//       Object.assign(options, {
//         vpcConfig: resolvedVpcConfig
//       });
//     }

//     const resolvedNasConfig = transformNasConfig(nasConfig);

//     if (resolvedNasConfig !== null) {
//       Object.assign(options, {
//         nasConfig: resolvedNasConfig
//       });
//     }

//     return options;
//   }

//   getRoleArn(): string {
//     let roleArn = this.serviceProp.Role;

//     // name to arn
//     if (roleArn && !roleArn.includes('acs:')) {
//       roleArn = `acs:ram::${this.credentials.AccountID}:role/${roleArn}`.toLocaleLowerCase();
//     }
//     return roleArn;
//   }

// }
