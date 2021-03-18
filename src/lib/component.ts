import * as _ from 'lodash';
import { Logger } from '@serverless-devs/core';

export function genComponentInputs(credentials: any, projectName: string, accessAlias: string, component: string, prop: any, args?: string) {
  const inputs: {[key: string]: any} = {
    Credentials: credentials,
    Project: {
      ProjectName: projectName,
      AccessAlias: accessAlias,
      Component: component,
      Provider: 'alibaba',
    },
    Properties: prop,
  };
  if (!_.isNil(args)) {
    Object.assign(inputs, { Args: args });
  }
  Logger.debug('FC-DEPLOY', `inputs of fc base component generated: ${JSON.stringify(inputs)}`);
  return inputs;
}
