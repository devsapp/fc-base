import * as core from '@serverless-devs/core';
import { ICredentials } from '../profile';
export default abstract class FcBase {
    logger: core.ILogger;
    stackID?: string;
    pulumiStackDir: string;
    configFile?: string;
    readonly credentials: ICredentials;
    readonly region: string;
    readonly isPulumiImport?: boolean;
    readonly isPulumiImportProtect?: boolean;
    constructor(region: string, credentials: ICredentials, isPulumiImport: boolean, isPulumiImportProtect: boolean);
    genStackID(serviceName: string): string;
    initConfigFileAttr(serviceName: string, filename: string): void;
    delReource<T>(resource: T, resources: T[], key: string): T[];
    pulumiStackDirCheck(): void;
    delResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string): Promise<boolean>;
    createConfFile<T>(resource: T, keyInConfFile: string): Promise<void>;
    static zeroImportState(stateID: string): Promise<void>;
    updateReourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, assumeYes?: boolean, isResourceHasSameKeyFunc?: Function): Promise<void>;
    static getResourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]>;
    destroy(name: string, access: string, appName: string, projectName: string, curPath: any, promptMsg: string, targetUrn?: string, flags?: any): Promise<any>;
    static delReourceUnderParent(parentName: string, parentKeyInChildResource: string, childKeyInConfFile: string, childKeyInResource: string, configFilePath: string): Promise<string[]>;
    addResourceInConfFile<T>(resource: T, keyInConfFile: string, keyInResource: string, assumeYes?: boolean, isResourceHasSameKeyFunc?: Function): Promise<void>;
    preparePulumiCode(): Promise<void>;
    configFileExists(): Promise<boolean>;
    pulumiImport(access: string, appName: string, projectName: string, curPath: any, type: string, resourceName: string, resourceID: string, parentUrn?: string): Promise<void>;
    abstract validateConfig(): void;
}
