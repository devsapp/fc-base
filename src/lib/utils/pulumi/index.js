const path = require('path');
const fse = require('fs-extra');
const alicloud = require('@pulumi/alicloud');

const fcConfigFile = path.join(__dirname, 'fc-config.json');

if (fse.pathExistsSync(fcConfigFile)) {
  const fcConfig = JSON.parse(fse.readFileSync(fcConfigFile, { encoding: 'utf-8' }));
  const serviceConfig = fcConfig.service;

  const fcService = new alicloud.fc.Service(serviceConfig.name, serviceConfig);

  const functionsConfig = fcConfig.functions;
  const triggersConfig = fcConfig.triggers;
  const fcFunctions = [];
  const fcTriggers = [];
  if (Array.isArray(functionsConfig) && functionsConfig.length > 0) {
    for (const functionConfig of functionsConfig) {
      const fcFunction = new alicloud.fc.Function(functionConfig.name, functionConfig, { dependsOn: [fcService], parent: fcService });
      fcFunctions.push(fcFunction);
      if (Array.isArray(triggersConfig) && triggersConfig.length > 0) {
        for (const triggerConfig of triggersConfig) {
          if (triggerConfig.function === functionConfig.name) {
            const fcTrigger = new alicloud.fc.Trigger(triggerConfig.name, triggerConfig, { dependsOn: [fcService, fcFunction], parent: fcFunction });
            fcTriggers.push(fcTrigger);
          }
        }
      }
    }
  }
}
