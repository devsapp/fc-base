import * as fse from 'fs-extra';
import { isFile, writeStrToFile } from '../file';
import * as core from '@serverless-devs/core';
import equal from 'deep-equal';
import { ICredentials } from '../profile';
import * as _ from 'lodash';
import * as path from 'path';
import * as os from 'os';
import { execSync } from 'child_process';
import { genComponentInputs } from '../component';
import { genPulumiComponentProp, genPulumiImportFlags } from '../pulumi';
import promiseRetry from '../retry';
import { handlerKnownErrors } from '../error';
import StdoutFormatter from '../../common/stdout-formatter';
import { genTargetArgs } from '../utils/pulumi';

const CODE_LIB_PATH = path.resolve(__dirname, '..');
const PULUMI_CACHE_DIR: string = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'fc-base');
const PULUMI_CODE_DIR: string = path.join(CODE_LIB_PATH, 'utils', 'pulumi');
const PULUMI_CODE_FILE: string = path.join(PULUMI_CODE_DIR, 'index.js');
const PULUMI_PACKAGE_FILE: string = path.join(PULUMI_CODE_DIR, 'package.json');
const PULUMI_PACKAGE_LOCK_FILE: string = path.join(PULUMI_CODE_DIR, 'package-lock.json');
// const PULUMI_LOCAL_PLUGIN_PATH = path.join(CODE_LIB_PATH, 'utils', 'pulumi-plugin');
const ALICLOUD_PLUGIN_VERSION = 'v2.38.0';
const ALICLOUD_PLUGIN_ZIP_FILE_NAME = `pulumi-resource-alicloud-${ALICLOUD_PLUGIN_VERSION}.tgz`;
const OSS_BUCKET_NAME = 'serverless-pulumi';
const OSS_OBJECT_KEY = `alicloud-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME}`;
const OSS_ACCELERATE_DOMAIN = `${OSS_BUCKET_NAME}.oss-accelerate.aliyuncs.com`;
const ALICLOUD_PLUGIN_DOWNLOAD_URL = `${OSS_ACCELERATE_DOMAIN}/${OSS_OBJECT_KEY}`;
export default abstract class FcBase {
  @core.HLogger('FC-BASE') logger: core.ILogger;

  stackID?: string;
  pulumiStackDir: string;
  configFile?: string;
  readonly credentials: ICredentials;
  readonly region: string;
  readonly isPulumiImport?: boolean;
  readonly isPulumiImportProtect?: boolean;

  constructor(region: string, credentials: ICredentials, isPulumiImport: boolean, isPulumiImportProtect: boolean) {
    this.region = region;
    this.credentials = credentials;
    this.isPulumiImport = isPulumiImport;
    this.isPulumiImportProtect = isPulumiImportProtect;
  }

  genStackID(serviceName: string): string {
    return `${this.credentials.AccountID}_${this.region}_${serviceName}`;
  }

  initConfigFileAttr(serviceName: string, filename: string): void {
    this.stackID = this.genStackID(serviceName);
    this.pulumiStackDir = path.join(PULUMI_CACHE_DIR, this.stackID);
    this.configFile = path.join(this.pulumiStackDir, filename);
  }

  delReource<T>(resource: T, resources: T[], key: string, isResourceHasSameKeyFunc?: Function): T[] {
    if (!resources) { return undefined; }
    const idx: number = resources?.findIndex((r) => {
      if (!_.isNil(isResourceHasSameKeyFunc)) {
        return isResourceHasSameKeyFunc(r, resource);
      }
      return r[key] === resource[key];
    });

    if (idx !== undefined && idx >= 0) {
      this.logger.debug(`deleting ${resource[key]} with idx: ${idx}`);
      resources.splice(idx, 1);
      return resources;
    }

    // throw new Error(`${resource[key]} dose not exist in local pulumi stack.`);

    return undefined;
  }

  pulumiStackDirCheck() {
    if (_.isNil(this.pulumiStackDir)) {
      throw new Error('empty pulumiStackDir atttibute');
    }
  }

  async delResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, isResourceHasSameKeyFunc?: Function): Promise<boolean> {
    // 更新资源配置文件
    if (await this.configFileExists()) {
      const configInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
      if (!_.isEmpty(configInGlobal[keyInConfFile])) {
        const resources = this.delReource<T>(resource, configInGlobal[keyInConfFile], keyInResource, isResourceHasSameKeyFunc);
        if (resources === undefined) {
          // 资源在 pulumi stack 中不存在
          this.logger.warn(`${keyInConfFile}: ${JSON.stringify(resource[keyInResource], null, '  ')} dose not exist in local pulumi stack, please deploy it first.`);
          return false;
        }
        // 删除完后没有资源了，则删除文件
        if (_.isEmpty(resources)) {
          await fse.unlink(this.configFile);
          this.logger.debug(`no resource left after remove ${keyInConfFile}`);
        } else {
          const fcConfigToBeWritten = Object.assign({}, {
            [keyInConfFile]: resources,
          });
          await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 0o777);
          this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten, null, '  ')} to ${this.configFile}.`);
        }
        return true;
      } else {
        this.logger.warn(`empty resource ${keyInConfFile} in local pulumi stack, removing the file.`);
        await fse.unlink(this.configFile);
        return false;
        // throw new Error(`There is no ${keyInConfFile} in local pulumi stack`);
      }
    } else {
      this.logger.warn('there is no resource in pulumi stack, please execute deploy command first!');
      return false;
    }
  }

  async createConfFile<T>(resource: T, keyInConfFile: string): Promise<void> {
    /**
     * format of File(json format):
     *  {
     *    [keyInConfFile]: [
     *      {
     *        [key: string]: any
     *      },
     *      {
     *        [key: string]: any
     *      }
     *    ]
     *  }
    */
    this.logger.debug(`${this.configFile} not exist, creating...`);

    const conf = {};
    if (_.isEmpty(resource)) {
      this.logger.error('empty trigger Config in FcTrigger instance');
      return;
    }
    const resources: T[] = [];
    resources.push(resource);
    Object.assign(conf, {
      [keyInConfFile]: resources,
    });
    await writeStrToFile(this.configFile, JSON.stringify(conf, null, '  '), 'w', 0o777);
    this.logger.debug(`write content: ${JSON.stringify(conf, null, '  ')} to ${this.configFile}`);
  }

  static async zeroImportState(stateID: string): Promise<void> {
    const state: any = await core.getState(stateID);
    if (!_.isEmpty(state)) {
      state.isImport = false;
      await core.setState(stateID, state);
    }
  }

  async setKVInState(stateID: string, key: string, value: any): Promise<void> {
    const state: any = await core.getState(stateID);
    if (_.isEmpty(state)) {
      await core.setState(stateID, { [key]: value });
    } else {
      Object.assign(state, {
        [key]: value,
      });
      await core.setState(stateID, state);
    }
  }

  async updateReourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, isResourceHasSameKeyFunc?: Function): Promise<void> {
    if (_.isEmpty(resource)) {
      this.logger.warn(`empty ${keyInConfFile} resource`);
      return;
    }
    this.logger.debug(`${this.configFile} exists, updating...`);

    const fcConfigInGlobal = JSON.parse(await fse.readFile(this.configFile, 'utf-8'));
    const resourcesInGlobal = fcConfigInGlobal[keyInConfFile];
    let isResourcesInGlobalChanged = true;
    const idxInGlobal = resourcesInGlobal?.findIndex((r) => {
      if (!_.isNil(isResourceHasSameKeyFunc)) {
        return isResourceHasSameKeyFunc(r, resource);
      }
      return r[keyInResource] === resource[keyInResource];
    });
    if (!_.isNil(idxInGlobal) && idxInGlobal >= 0) {
      this.logger.debug(`find resource: ${JSON.stringify(resource, null, '  ')} in pulumi stack`);

      if (!equal(JSON.parse(JSON.stringify(resource)), resourcesInGlobal[idxInGlobal])) {
        this.logger.debug(`${keyInConfFile}: ${resource[keyInResource]} already exists in golbal:\n${JSON.stringify(resourcesInGlobal[idxInGlobal], null, '  ')}`);
        // replace resource
        resourcesInGlobal[idxInGlobal] = resource;
      } else {
        isResourcesInGlobalChanged = false;
      }
    } else {
      this.logger.debug(`add resource: ${JSON.stringify(resource, null, '  ')} to pulumi stack`);
      resourcesInGlobal.push(resource);
    }
    const fcConfigToBeWritten = Object.assign({}, {
      [keyInConfFile]: resourcesInGlobal,
    });

    // overwrite file
    if (isResourcesInGlobalChanged) {
      this.logger.debug(`update content: ${JSON.stringify(fcConfigToBeWritten, null, '  ')} to ${this.configFile}.`);
      await writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 0o777);
    } else {
      this.logger.debug(`resource ${keyInConfFile} dose not change.`);
    }
  }

  static async getResourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]> {
    const resourcesName: string[] = [];
    if (!await fse.pathExists(configFilePath) || !await isFile(configFilePath)) { return resourcesName; }
    const fcConfigInGlobal = JSON.parse(await fse.readFile(configFilePath, 'utf-8'));
    const childResource = fcConfigInGlobal[childKeyInConfFile];

    if (_.isEmpty(childResource)) {
      return resourcesName;
    }
    for (const f of childResource) {
      const parentAttrInChild: string | string[] = f[parentKeyInChildResource];
      if (_.isNil(parentAttrInChild)) {
        throw new Error(`${parentKeyInChildResource} in ${childKeyInConfFile} is ${parentAttrInChild}`);
      }
      if (((typeof parentAttrInChild === 'string') && parentAttrInChild === parentName) ||
          (_.isArray(parentAttrInChild) && parentAttrInChild.includes(parentName))) {
        resourcesName.push(f[childKeyInResource]);
      }
    }
    return resourcesName;
  }

  async up(name: string | string[], access: string, appName: string, projectName: string, curPath: any, targetUrn?: string | string[], flags?: any): Promise<any> {
    const { isDebug, isSilent } = flags;
    const pulumiComponentIns: any = await core.load('devsapp/pulumi-alibaba');
    const pulumiComponentProp: any = genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
    const pulumiComponentArgs: string = genTargetArgs(targetUrn, isSilent, isDebug);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, pulumiComponentArgs);
    const pulumiRes = await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const upRes: any = await pulumiComponentIns.up(pulumiInputs);
        return upRes;
      } catch (e) {
        this.logger.debug(`error when deploy ${name}, error is: \n${e}`);
        handlerKnownErrors(e);
        this.logger.log(`\tretry ${times} times`, 'red');
        retry(e);
      }
    });
    return pulumiRes;
  }

  async destroy(name: string | string[], access: string, appName: string, projectName: string, curPath: any, targetUrn?: string | string[], flags?: any): Promise<any> {
    const { isDebug, isSilent } = flags;
    const pulumiComponentIns: any = await core.load('devsapp/pulumi-alibaba');

    const pulumiComponentProp: any = genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
    const pulumiComponentArgs: string = genTargetArgs(targetUrn, isSilent, isDebug);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, pulumiComponentArgs);
    const pulumiRes: any = await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const destroyRes: any = await pulumiComponentIns.destroy(pulumiInputs);
        return destroyRes;
      } catch (e) {
        this.logger.debug(`error when remove ${name}, error is: \n${e}`);
        handlerKnownErrors(e);
        const retryMsg = StdoutFormatter.stdoutFormatter?.retry('pulumi destroy', '', '', times);
        this.logger.log(retryMsg || `\tretry ${times} times`, 'red');
        retry(e);
      }
    });
    return pulumiRes;
  }

  static async delReourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]> {
    const reomvedResources: string[] = [];
    if (await fse.pathExists(configFilePath) && await isFile(configFilePath)) {
      const fcConfigInGlobal = JSON.parse(await fse.readFile(configFilePath, 'utf-8'));
      const reservedResources = [];

      if (!_.isEmpty(fcConfigInGlobal[childKeyInConfFile])) {
        for (const f of fcConfigInGlobal[childKeyInConfFile]) {
          if (f[parentKeyInChildResource] !== parentName) {
            reservedResources.push(f);
          } else {
            reomvedResources.push(f[childKeyInResource]);
          }
        }
      }
      if (_.isEmpty(reservedResources)) {
        await fse.unlink(configFilePath);
      } else {
        const fcConfigToBeWritten = Object.assign({}, {
          [childKeyInConfFile]: reservedResources,
        });
        await writeStrToFile(configFilePath, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 0o777);
      }
    }
    return reomvedResources;
  }

  async addResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, isResourceHasSameKeyFunc?: Function): Promise<void> {
    if (await this.configFileExists()) {
      // update
      await this.updateReourceInConfFile<T>(resource, keyInConfFile, keyInResource, isResourceHasSameKeyFunc);
    } else {
      // create
      await this.createConfFile<T>(resource, keyInConfFile);
    }
  }

  async preparePulumiCode() {
    this.logger.debug(`ensuring dir: ${this.pulumiStackDir}`);
    await fse.ensureDir(this.pulumiStackDir);
    this.logger.debug(`coping files under ${PULUMI_CODE_DIR} to ${this.pulumiStackDir}`);
    await fse.copy(PULUMI_CODE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_CODE_FILE)), { overwrite: true });
    await fse.copy(PULUMI_PACKAGE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_FILE)), { overwrite: true });
    await fse.copy(PULUMI_PACKAGE_LOCK_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)), { overwrite: true });

    this.logger.debug('installing pulumi plugin from local.');
    const pulumiComponentIns = await core.load('devsapp/pulumi-alibaba');
    await pulumiComponentIns.installPluginFromUrl({ props: {
      url: ALICLOUD_PLUGIN_DOWNLOAD_URL,
      version: ALICLOUD_PLUGIN_VERSION,
    } });

    this.logger.debug(`installing dependencies under ${PULUMI_CODE_DIR}`);
    execSync('npm install', { cwd: this.pulumiStackDir, stdio: 'ignore' });
    // this.logger.debug(`stdout of npm i under ${targetDir}: ${stdout.toString('utf8')}`);
  }

  async configFileExists(): Promise<boolean> {
    if (await fse.pathExists(this.configFile) && await isFile(this.configFile)) {
      return true;
    }
    return false;
  }

  async pulumiImport(access: string, appName: string, projectName: string, curPath: any, type: string, resourceName: string, resourceID: string, parentUrn?: string): Promise<void> {
    this.logger.debug(`importing ${type} ${resourceID} from remote to local stack.`);
    const importFlag = genPulumiImportFlags(this.isPulumiImportProtect, this.stackID, parentUrn);

    let resourceType: string;
    switch (type) {
      case 'service': {
        resourceType = 'alicloud:fc/service:Service';
        break;
      }
      case 'function': {
        resourceType = 'alicloud:fc/function:Function';
        break;
      }
      case 'trigger': {
        resourceType = 'alicloud:fc/trigger:Trigger';
        break;
      }
      default: {
        throw new Error(`Unsupported pulumi resource type: ${type}`);
      }
    }
    const args = `${resourceType } ${ resourceName } ${ resourceID } ${ importFlag }`;
    const pulumiComponentIns = await core.load('devsapp/pulumi-alibaba');
    const pulumiComponentProp = genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
    const pulumiInputs = genComponentInputs('pulumi-alibaba', access, appName, `${projectName}-pulumi-project`, pulumiComponentProp, curPath, args);

    // TODO: add retry
    try {
      await pulumiComponentIns.import(pulumiInputs);
    } catch (e) {
      if (e.message.includes('does not exist')) {
        throw new Error(`Resouce ${resourceType}: ${resourceID} dose not exist online, please create it without 'import' and 'protect' option!\n`);
      }
      if (!e.message.includes('stderr: error: no name for resource')) {
        throw e;
      }
      this.logger.debug('can not import alicloud:fc/trigger repeatedly.');
    }
    this.logger.debug(`${type} ${resourceID} is imported.`);
  }

  abstract validateConfig(): void;
}
