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
export declare function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig;
export interface LogTriggerJobConfig {
    maxRetryTime?: string;
    triggerInterval?: string;
}
export interface LogTriggerSourceConfig {
    logstore: string;
}
