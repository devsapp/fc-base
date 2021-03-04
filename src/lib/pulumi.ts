import path from 'path';
import * as fse from 'fs-extra';
import { Logger, IV1Inputs } from '@serverless-devs/core';

const PULUMI_CODE_DIR: string = path.join(__dirname, 'utils', 'pulumi');
const PULUMI_CODE_FILE: string = path.join(PULUMI_CODE_DIR, 'index.js');
const PULUMI_PACKAGE_FILE: string = path.join(PULUMI_CODE_DIR, 'package.json');
const PULUMI_PACKAGE_LOCK_FILE: string = path.join(PULUMI_CODE_DIR, 'package-lock.json');

export async function cpPulumiCodeFiles(targetDir) {
  Logger.log(`Coping files under ${PULUMI_CODE_DIR} to ${targetDir}`, 'yellow');
  await fse.copy(PULUMI_CODE_FILE, path.join(targetDir, path.basename(PULUMI_CODE_FILE)), { overwrite: false });
  await fse.copy(PULUMI_PACKAGE_FILE, path.join(targetDir, path.basename(PULUMI_PACKAGE_FILE)), { overwrite: false });
  await fse.copy(PULUMI_PACKAGE_LOCK_FILE, path.join(targetDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)), { overwrite: false });
  Logger.log(`Copy files under ${PULUMI_CODE_DIR} to ${targetDir} done.`, 'green');
}

export function genPulumiInputs(credentials: any, project: any, stackId: string, region: string, pulumiStackDirOfService: string): IV1Inputs {
  const inputs = Object.assign({}, {
    Credentials: credentials,
    Project: project,
    Properties: {
      region,
      projectName: stackId,
      stackName: stackId,
      workDir: pulumiStackDirOfService,
      runtime: 'nodejs',
      cloudPlatform: 'alicloud',
    },
  });

  return inputs;
}
