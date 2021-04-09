import * as core from '@serverless-devs/core';
import { FcService } from './lib/fc/service';
import { FcFunction } from './lib/fc/function';
import { FcTrigger } from './lib/fc/trigger';
export default class FcBaseComponent {
    logger: core.ILogger;
    handlerInputs(inputs: any): Promise<{
        projectName: string;
        accessAlias: string;
        fcService: FcService;
        fcFunction: FcFunction;
        fcTriggers: FcTrigger[];
        args: any;
    }>;
    deploy(inputs: any): Promise<any>;
    remove(inputs: any): Promise<any>;
}
