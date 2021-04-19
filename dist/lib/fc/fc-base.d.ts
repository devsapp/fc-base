import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../profile';
export declare abstract class FcBase {
    logger: ILogger;
    stackID?: string;
    pulumiStackDir: string;
    configFile?: string;
    readonly credentials: ICredentials;
    readonly region: string;
    constructor(region: string, credentials: ICredentials);
    genStackID(serviceName: string): string;
    initConfigFileAttr(serviceName: string, filename: string): void;
    delReource<T>(resource: T, resources: T[], key: string): T[];
    pulumiStackDirCheck(): void;
    delResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string): Promise<boolean>;
    createConfFile<T>(resource: T, keyInConfFile: string): Promise<void>;
    updateReourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, assumeYes?: boolean, isResourceHasSameKeyFunc?: Function): Promise<void>;
    static getResourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]>;
    static delReourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]>;
    addResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, assumeYes?: boolean, isResourceHasSameKeyFunc?: Function): Promise<void>;
    preparePulumiCode(): Promise<void>;
    configFileExists(): Promise<boolean>;
    abstract validateConfig(): void;
}
