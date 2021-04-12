import { ServiceConfig } from './lib/fc/service';
import { FunctionConfig } from './lib/fc/function';
import { TriggerConfig } from './lib/fc/trigger';
export interface IInputs {
    props: IProperties;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    appName: string;
    args: string;
    path: any;
}
export interface IProperties {
    region: string;
    service: ServiceConfig;
    function: FunctionConfig;
    triggers: TriggerConfig[];
}
