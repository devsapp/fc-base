import path from 'path';
import * as fse from 'fs-extra';
import { Logger } from '@serverless-devs/core';

const PULUMI_CODE_DIR: string = path.join(__dirname, 'utils', 'pulumi');
const PULUMI_CODE_FILE: string = path.join(PULUMI_CODE_DIR, 'index.js');
const PULUMI_PACKAGE_FILE: string = path.join(PULUMI_CODE_DIR, 'package.json');
const PULUMI_PACKAGE_LOCK_FILE: string = path.join(PULUMI_CODE_DIR, 'package-lock.json');

export async function cpPulumiCodeFiles(targetDir) {
  Logger.debug('FC-BASE', `Coping files under ${PULUMI_CODE_DIR} to ${targetDir}`);
  await fse.copy(PULUMI_CODE_FILE, path.join(targetDir, path.basename(PULUMI_CODE_FILE)), { overwrite: true });
  await fse.copy(PULUMI_PACKAGE_FILE, path.join(targetDir, path.basename(PULUMI_PACKAGE_FILE)), { overwrite: true });
  await fse.copy(PULUMI_PACKAGE_LOCK_FILE, path.join(targetDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)), { overwrite: true });
  Logger.debug('FC-BASE', `Copy files under ${PULUMI_CODE_DIR} to ${targetDir} done.`);
}

export function genPulumiComponentProp(stackId: string, region: string, pulumiStackDirOfService: string): {[key: string]: any} {
  const prop = Object.assign({}, {
    region,
    projectName: stackId,
    stackName: stackId,
    workDir: pulumiStackDirOfService,
    runtime: 'nodejs',
    cloudPlatform: 'alicloud',
  });
  return prop;
}
