export interface OssTriggerConfig {
    bucketName: string;
    events: string[];
    filter: FilterConfig;
}
export declare function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig;
export interface FilterConfig {
    Key: {
        Prefix: string;
        Suffix: string;
    };
}
export interface ossObjectConfig {
    discriminator?: 'ossObjectConfig';
    ossBucket?: string;
    ossKey?: string;
}
