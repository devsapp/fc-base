import { Logger } from '@serverless-devs/core';

export function genComponentInputs(credentials: any, appName: string, props: any, path?: string, args?: string) {
  const inputs: {[key: string]: any} = {
    credentials,
    appName,
    args,
    path,
    props,
  };

  Logger.debug('FC-BASE', `inputs of fc base component generated: ${JSON.stringify(inputs)}`);
  return inputs;
}
