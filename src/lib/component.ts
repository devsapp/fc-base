import { Logger } from '@serverless-devs/core';
import _ from 'lodash';

export function genComponentInputs(component: string, access: any, appName: string, projectName: string, props: any, path?: any, args?: string) {
  const inputs: {[key: string]: any} = {
    project: {
      component,
      access,
      projectName,
    },
    path,
    props,
    appName,
  };
  if (!_.isEmpty(args)) {
    Object.assign(inputs, {
      // 删除前置空格
      args: args.replace(/(^\s*)/g, ''),
    });
  }
  // @ts-ignore
  delete inputs.Credentials;
  // @ts-ignore
  delete inputs.credentials;

  Logger.debug('FC-BASE', `inputs of ${component} component generated: ${JSON.stringify(inputs, null, '  ')}`);
  return inputs;
}
