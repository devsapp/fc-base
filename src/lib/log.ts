
export interface LogConfig {
  project: string;
  logstore: string;
}

export interface LogTriggerConfig {
  jobConfig: LogTriggerJobConfig;
  logConfig: LogConfig;
  sourceConfig: LogTriggerSourceConfig;
  functionParameter?: {
    [key: string]: any;
  };
  enable: boolean;
}

export function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig {
  return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}

export interface LogTriggerJobConfig {
  maxRetryTime?: string;
  triggerInterval?: string;
}

export interface LogTriggerSourceConfig {
  logstore: string;
}

// export function transformLogConfig(logConfig: LogConfig) {
//   if (logConfig) {
//     return {
//       project: logConfig.Project || '',
//       logstore: logConfig.LogStore || ''
//     }
//   }
//   return null;
// }
