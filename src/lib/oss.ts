
export interface OssTriggerConfig {
  bucketName: string;
  events: string[];
  filter: filterConfig;
}
export function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig {
  return 'bucketName' in data && 'events' in data && 'filter' in data;
}
export interface filterConfig {
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
