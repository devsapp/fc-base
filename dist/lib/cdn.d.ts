export interface CdnTriggerConfig {
    eventName: string;
    eventVersion: string;
    notes: string;
    filter: CdnFilterConfig;
}
export declare function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig;
export interface CdnFilterConfig {
    domain: string[];
}
