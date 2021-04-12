import { ServiceConfig } from './lib/fc/service';
import { FunctionConfig } from './lib/fc/function';
import { TriggerConfig } from './lib/fc/trigger';
import { ICredentials } from './lib/profile';
export interface IInputs {
    props: IProperties;
    credentials: ICredentials;
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
