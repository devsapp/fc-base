
export interface MnsTriggerConfig {
  topicName: string;
  region?: string;
  notifyContentFormat?: 'STREAM' | 'JSON';
  notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
  filterTag?: string;
}

export function instanceOfMnsTriggerConfig(data: any): data is MnsTriggerConfig {
  return 'topicName' in data && 'region' in data && 'notifyContentFormat' in data && 'notifyStrategy' in data && 'filterTag' in data;
}
