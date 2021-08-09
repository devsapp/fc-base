import { LogConfig } from '../log';
import { VpcConfig } from '../vpc';
import { NasConfig } from '../nas';
import FcBase from './fc-base';
import { ICredentials } from '../profile';
export interface ServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig;
    role?: string;
    vpcConfig?: VpcConfig;
    nasConfig?: NasConfig;
    import?: boolean;
    protect?: boolean;
}
export declare function genStackId(accountId: string, region: string, serviceName: string): string;
export declare class FcService extends FcBase {
    readonly serviceConfig: ServiceConfig;
    pulumiUrn: string;
    static keyInConfigFile: string;
    static keyInResource: string;
    static configFileName: string;
    constructor(serviceConfig: ServiceConfig, credentials: ICredentials, region: string);
    validateConfig(): void;
    init(access: string, appName: string, projectName: string, curPath: any): Promise<void>;
    static genStateID(accountID: string, region: string, serviceName: string): string;
    isImported(): Promise<boolean>;
    importResource(access: string, appName: string, projectName: string, curPath: any): Promise<void>;
    deploy(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any>;
    remove(access: string, appName: string, projectName: string, curPath: any, flags?: any): Promise<any>;
    clean(): Promise<void>;
    createServiceConfFile(): Promise<void>;
    getFunctionNames(): Promise<string[]>;
    getFunctionAndTriggerNamesMap(): Promise<any>;
    updateServiceInConfFile(): Promise<void>;
    addServiceInConfFile(): Promise<void>;
}
