import { Logger } from '@serverless-devs/core';

export function genComponentInputs(component: string, access: any, appName: string, projectName: string, props: any, path?: string, args?: string) {
  const inputs: {[key: string]: any} = {
    project: {
      component,
      access,
      projectName,
    },
    args,
    path,
    props,
    appName,
  };
  // @ts-ignore
  delete inputs.Credentials;
  // @ts-ignore
  delete inputs.credentials;

  Logger.debug('FC-BASE', `inputs of ${component} component generated: ${JSON.stringify(inputs)}`);
  return inputs;
}
