
export interface CdnTriggerConfig {
  eventName: string;
  eventVersion: string;
  notes: string;
  filter: CdnFilterConfig;
}

export function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig {
  return 'eventName' in data && 'eventVersion' in data && 'notes' in data && 'filter' in data;
}

export interface CdnFilterConfig {
  domain: string[];
}
