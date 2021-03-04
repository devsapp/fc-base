export interface RdsTriggerConfig {
  InstanceId: string;
  SubscriptionObjects?: string[];
  Retry?: number;
  Concurrency?: 1 | 2 | 3 | 4 | 5;
  EventFormat?: 'json' | 'protobuf';
  InvocationRole?: string;
  Qualifier?: string;
}
