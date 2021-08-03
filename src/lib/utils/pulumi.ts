import * as _ from 'lodash';

export function genTargetArgs(targetUrn: string | string[], isSilent: boolean, isDebug: boolean): string {
  let pulumiComponentArgs: string = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
  if (!_.isNil(targetUrn)) {
    if (typeof targetUrn === 'string') {
      pulumiComponentArgs += ` --target ${targetUrn}`;
    } else if (_.isArray(targetUrn) && !_.isEmpty(targetUrn) && typeof targetUrn[0] === 'string') {
      for (const urn of targetUrn) {
        pulumiComponentArgs += ` --target ${urn}`;
      }
    }
  }
  return pulumiComponentArgs;
}
