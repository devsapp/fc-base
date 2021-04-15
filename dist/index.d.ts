import * as core from '@serverless-devs/core';
import { FcService } from './lib/fc/service';
import { FcFunction } from './lib/fc/function';
import { FcTrigger } from './lib/fc/trigger';
import { IInputs } from './interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    handlerInputs(inputs: IInputs): Promise<{
        appName: string;
        projectName: string;
        fcService: FcService;
        fcFunction: FcFunction;
        fcTriggers: FcTrigger[];
        args: string;
        curPath: string;
        access: string;
    }>;
    deploy(inputs: IInputs): Promise<any>;
    remove(inputs: IInputs): Promise<any>;
}
