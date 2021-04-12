import { FcBase } from './fc-base';
import { ICredentials } from '../profile';
export interface FunctionConfig {
    name: string;
    service?: string;
    description?: string;
    filename?: string;
    caPort?: number;
    customContainerConfig?: CustomContainerConfig;
    handler: string;
    memorySize?: number;
    runtime: string;
    timeout?: number;
    environmentVariables?: {
        [key: string]: any;
    };
    initializationTimeout?: number;
    initializer?: string;
    instanceConcurrency?: number;
    instanceType?: string;
    ossBucket?: string;
    ossKey?: string;
}
export interface CustomContainerConfig {
    image: string;
    command?: string;
    args?: string;
}
export declare class FcFunction extends FcBase {
    functionConfig: FunctionConfig;
    readonly serviceName: string;
    static keyInConfigFile: string;
    static keyInResource: string;
    static configFileName: string;
    constructor(functionConfig: FunctionConfig, credentials: ICredentials, region: string, serviceName: string);
    validateConfig(): void;
    getTriggerNames(): Promise<string[]>;
    delTriggersUnderFunction(): Promise<void>;
    initFunctionConfigFileAttr(): void;
    delFunctionInConfFile(): Promise<boolean>;
    addFunctionInConfFile(assumeYes?: boolean): Promise<void>;
}
