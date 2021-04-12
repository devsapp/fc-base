import { LogConfig } from '../log';
import { VpcConfig } from '../vpc';
import { NasConfig } from '../nas';
import { FcBase } from './fc-base';
import { ICredentials } from '../profile';
export interface ServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig;
    role?: string;
    vpcConfig?: VpcConfig;
    nasConfig?: NasConfig;
}
export declare function genStackId(accountId: string, region: string, serviceName: string): string;
export declare class FcService extends FcBase {
    readonly serviceConfig: ServiceConfig;
    static keyInConfigFile: string;
    static keyInResource: string;
    static configFileName: string;
    constructor(serviceConfig: ServiceConfig, credentials: ICredentials, region: string);
    validateConfig(): void;
    initServiceConfigFileAttr(): void;
    createServiceConfFile(): Promise<void>;
    getFunctionNames(): Promise<string[]>;
    updateServiceInConfFile(assumeYes?: boolean): Promise<void>;
    addServiceInConfFile(assumeYes?: boolean): Promise<void>;
}
