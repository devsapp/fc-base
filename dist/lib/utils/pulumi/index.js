const path = require('path');
const fse = require('fs-extra');
const alicloud = require('@pulumi/alicloud');

const serviceConfigFileName = 'fc-service.json';
const functionConfigFileName = 'fc-function.json';
const triggerConfigFileName = 'fc-trigger.json';

const keyInFunctionConfigFile = 'function';
const keyInTriggerConfigFile = 'trigger';

const defaultTimeout = '3m';
const defaultCustomTimeouts = {
  create: defaultTimeout,
  update: defaultTimeout,
  delete: defaultTimeout,
};
function deployNonServiceResource(filePath, type, PulumiFn, fcService, fcFunction) {
  if (!fse.pathExistsSync(filePath)) { return undefined; }
  const fcReourceObj = JSON.parse(fse.readFileSync(filePath, { encoding: 'utf-8' }));
  const fcReourceConf = fcReourceObj[type];
  const res = {};
  if (Array.isArray(fcReourceConf) && fcReourceConf.length > 0) {
    for (const conf of fcReourceConf) {
      const dependsOn = [];
      let parent;
      if (fcService) {
        dependsOn.push(fcService);
        parent = fcService;
      }
      if (fcFunction) {
        dependsOn.push(fcFunction[conf.function]);
        parent = fcFunction[conf.function];
      }
      let pulumiResourceName = conf.name;
      if (type === 'trigger') {
        // trigger 由 ${name}-${functionName}-${serviceName} 作为唯一标识符
        pulumiResourceName = `${pulumiResourceName }-${ conf.function }`;
      }
      const fcReource = new PulumiFn(pulumiResourceName, conf, { dependsOn, parent, customTimeouts: defaultCustomTimeouts });
      Object.assign(res, {
        [conf.name]: fcReource,
      });
    }
  }
  return res;
}

const fcServiceConfigFile = path.join(__dirname, serviceConfigFileName);
const fcFunctionConfigFile = path.join(__dirname, functionConfigFileName);
const fcTriggerConfigFile = path.join(__dirname, triggerConfigFileName);


const fcServiceObj = JSON.parse(fse.readFileSync(fcServiceConfigFile, { encoding: 'utf-8' }));
const serviceConf = fcServiceObj.service;
const fcService = new alicloud.fc.Service(serviceConf.name, serviceConf);
if (fse.pathExistsSync(fcFunctionConfigFile)) {
  const fcFunction = deployNonServiceResource(fcFunctionConfigFile, keyInFunctionConfigFile, alicloud.fc.Function, fcService);
  deployNonServiceResource(fcTriggerConfigFile, keyInTriggerConfigFile, alicloud.fc.Trigger, fcService, fcFunction);
}
