
export interface FunctionConfig {
  name: string;
  service: string;
  description?: string;
  filename?: string;
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  handler: string;
  memorySize?: number;
  runtime: string;
  timeout?: number;
  environmentVariables?: {
    [key: string]: any;
  };
  initializationTimeout?: number;
  initializer?: string;
  // Triggers?: TriggerConfig[];
  instanceConcurrency?: number;
  instanceType?: string;
  ossBucket?: string;
  ossKey?: string;
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
}

