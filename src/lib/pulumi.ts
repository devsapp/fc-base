
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

export function genPulumiImportFlags(isProtect: boolean, stackID: string, parentUrn: string) {
  const isProtectFlag: string = isProtect ? '--protect=true' : '--protect=false';
  const stackFlag = `--stack ${stackID}`;
  const parentFlag: string = parentUrn ? `--parent p=${parentUrn}` : '';
  return `${isProtectFlag} ${stackFlag} ${parentFlag}`;
}
