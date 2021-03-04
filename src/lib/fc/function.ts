
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


// export class FcFunction extends FcBase {
//   readonly serviceProp: ServiceProperty;
//   readonly functionProp: FunctionProperty;

//   constructor(serviceProp: ServiceProperty, functionProp: FunctionProperty, credentials: CredentialConfig, serverlessDevsProject: string) {
//     super(credentials, serverlessDevsProject);
//     this.functionProp = functionProp;
//     this.serviceProp = serviceProp;
//   }

//   generateDeployOptions() {
//     const options = {
//       functionName: this.functionProp.Name,
//       description: this.functionProp.Description,
//       runtime: this.functionProp.Runtime,
//       handler: this.functionProp.Handler
//     };
//     if (this.functionProp.MemorySize) {
//       Object.assign(options, {
//         memorySize: this.functionProp.MemorySize
//       });
//     }
//     if (this.functionProp.Timeout) {
//       Object.assign(options, {
//         timeout: this.functionProp.Timeout
//       });
//     }
//     if (this.functionProp.Initializer) {
//       if (this.functionProp.Initializer.Handler) {
//         Object.assign(options, {
//           initializer: this.functionProp.Initializer.Handler
//         });
//       }
//       if (this.functionProp.Initializer.Timeout) {
//         Object.assign(options, {
//           initializationTimeout: this.functionProp.Initializer.Timeout
//         });
//       }
//     }
//     if (this.functionProp.InstanceConcurrency) {
//       Object.assign(options, {
//         instanceConcurrency: this.functionProp.InstanceConcurrency
//       });
//     }
//     if (this.isCustomRuntime() || this.isCustomContainerRuntime()) {
//       Object.assign(options, {
//         CAPort: this.functionProp.CAPort
//       });
//     }
//     let envs = {};
//     if (this.functionProp.Environment) {
//       for (const env of this.functionProp.Environment) {
//         Object.assign(envs, {
//           [env.Key]: env.Value
//         });
//       }
//     }
//     // envs = addEnv(envs, this.serviceProp.Nas);
//     Object.assign(options, {
//       environmentVariables: envs
//     });
//   }

//   async generateDeployCode() {
//     const options = {};
//     if (this.isCustomContainerRuntime()) {
//       if (!this.functionProp.customContainerConfig) {
//         throw new Error('No CustomContainer found for container runtime');
//       }
//       if (!this.functionProp.customContainerConfig.image) {
//         throw new Error(
//           `ERR!: required Properties/${this.functionProp.Name}/CustomContainer: Missing property Image`
//         );
//       }
//       Object.assign(options, {
//         customContainerConfig: this.functionProp.customContainerConfig
//       });
//     } else {


//     }
//   }

//   isCustomRuntime(): boolean {
//     return this.functionProp.Runtime === 'custom';
//   }

//   isCustomContainerRuntime(): boolean {
//     return this.functionProp.Runtime === 'custom-container';
//   }

//   async getFunctionCode() {
//     const codeUri = this.functionProp.codeUri;
//     const codeConfig = {}
//     if (typeof codeUri === 'string') {
//       // non-oss
//       const baseDir = process.cwd();
//       const absCodeDir = path.resolve(baseDir, codeUri);
//       if (await isFile(absCodeDir)) {
//         Object.assign(codeConfig, {
//           filename: path.resolve(baseDir, codeUri)
//         });
//       } else if (await isDir(absCodeDir)) {
//         // zip
//         const cachePath = path.join(baseDir, '.s', 'cache');
//         const zipPathDir = path.join(cachePath, this.serverlessDevsProjectName, uuid.v4());
//         const zipName = 'code.zip';
//       }

//     } else if (codeUri.discriminator === 'ossObjectConfig') {
//       // oss
//       Object.assign(codeConfig, {
//         ossBucket: codeUri.ossBucket,
//         ossKey: codeUri.ossKey
//       });
//     }
//     return codeConfig;
//   }
// }
