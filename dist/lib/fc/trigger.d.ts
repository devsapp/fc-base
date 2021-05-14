import { OssTriggerConfig } from '../oss';
import { CdnTriggerConfig } from '../cdn';
import { MnsTriggerConfig } from '../mns';
import { LogTriggerConfig } from '../log';
import FcBase from './fc-base';
import { ICredentials } from '../profile';
export interface TriggerConfig {
    name: string;
    import?: boolean;
    protect?: boolean;
    function?: string;
    service?: string;
    type: 'oss' | 'log' | 'timer' | 'http' | 'mns_topic' | 'cdn_events';
    role: string;
    sourceArn?: string;
    config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig;
}
export interface TimerTriggerConfig {
    cronExpression: string;
    enable: boolean;
    payload?: string;
}
export declare function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig;
export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
}
export declare function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig;
export declare class FcTrigger extends FcBase {
    readonly triggerConfig: TriggerConfig;
    resolvedTriggerConfig: {
        [key: string]: any;
    };
    readonly serviceName: string;
    readonly functionName?: string;
    static keyInConfigFile: string;
    static keyInResource: string;
    static configFileName: string;
    static compareTriggerKeys(triggerConfOne: {
        [key: string]: any;
    }, triggerConfTwo: {
        [key: string]: any;
    }): boolean;
    constructor(triggerConfig: TriggerConfig, credentials: ICredentials, region: string, serviceName: string, functionName?: string);
    validateConfig(): void;
    init(access: string, appName: string, projectName: string, curPath: any): Promise<void>;
    isImported(): Promise<boolean>;
    importResource(access: string, appName: string, projectName: string, curPath: any): Promise<void>;
    remove(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any>;
    static genStateID(region: string, serviceName: string, functionName: string, triggerName: string): string;
    resolveTriggerIntoPulumiFormat(): any;
    getTriggerConfigInPulumiFormat(): string;
    getSourceArn(): string | undefined;
    delTriggerInConfFile(): Promise<boolean>;
    addTriggerInConfFile(assumeYes?: boolean): Promise<void>;
    clear(): Promise<void>;
}
