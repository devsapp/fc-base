const path = require('path');
const fse = require('fs-extra');
const alicloud = require('@pulumi/alicloud');

const serviceConfigFileName = 'fc-service.json';
const functionConfigFileName = 'fc-function.json';
const triggerConfigFileName = 'fc-trigger.json';


const defaultTimeout = '3m';
const defaultCustomTimeouts = {
  create: defaultTimeout,
  update: defaultTimeout,
  delete: defaultTimeout,
};


const fcServiceConfigFile = path.join(__dirname, serviceConfigFileName);
const fcFunctionConfigFile = path.join(__dirname, functionConfigFileName);
const fcTriggerConfigFile = path.join(__dirname, triggerConfigFileName);


const fcServiceObj = JSON.parse(fse.readFileSync(fcServiceConfigFile, { encoding: 'utf-8' }));
const serviceConf = fcServiceObj.service;
const fcService = new alicloud.fc.Service(serviceConf.name, serviceConf, {
  customTimeouts: defaultCustomTimeouts,
});


if (fse.pathExistsSync(fcFunctionConfigFile)) {
  const fcFunctionObj = JSON.parse(fse.readFileSync(fcFunctionConfigFile, { encoding: 'utf-8' }));
  const functionConfs = fcFunctionObj.function;
  for (const functionConf of functionConfs) {
    Object.assign(functionConf, {
      service: fcService.name,
    });
    const fcFunction = new alicloud.fc.Function(functionConf.name, functionConf, {
      dependsOn: fcService,
      // parent: fcService,
      customTimeouts: defaultCustomTimeouts,
    });
    if (fse.pathExistsSync(fcTriggerConfigFile)) {
      const fcTriggerObj = JSON.parse(fse.readFileSync(fcTriggerConfigFile, { encoding: 'utf-8' }));
      const triggerConfs = fcTriggerObj.trigger;

      for (const triggerConf of triggerConfs) {
        if (triggerConf.function !== functionConf.name) { continue; }
        Object.assign(triggerConf, {
          service: fcService.name,
          function: fcFunction.name,
        });
        const fcTrigger = new alicloud.fc.Trigger(`${functionConf.name}-${triggerConf.name}`, triggerConf, {
          dependsOn: fcFunction,
          // parent: fcFunction,
          customTimeouts: defaultCustomTimeouts,
        });
      }
    }
  }
}

