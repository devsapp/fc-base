"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fse = __importStar(require("fs-extra"));
var core = __importStar(require("@serverless-devs/core"));
var service_1 = require("./lib/fc/service");
var pulumi_1 = require("./lib/pulumi");
var component_1 = require("./lib/component");
var function_1 = require("./lib/fc/function");
var trigger_1 = require("./lib/fc/trigger");
var prompt_1 = require("./lib/init/prompt");
var lodash_1 = __importDefault(require("lodash"));
var file_1 = require("./lib/file");
var retry_1 = __importDefault(require("./lib/retry"));
var error_1 = require("./lib/error");
var SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];
var FcBaseComponent = /** @class */ (function () {
    function FcBaseComponent() {
    }
    FcBaseComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!lodash_1.default.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 解析入参
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var properties, credentials, args, serviceConfig, functionConfig, triggersConfig, region, fcFunction, fcTriggers, fcService, _i, triggersConfig_1, triggerConf, fcTrigger;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        this.access = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access;
                        return [4 /*yield*/, core.getCredential(this.access)];
                    case 1:
                        credentials = _c.sent();
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        this.projectName = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.projectName;
                        this.appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        this.curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        serviceConfig = properties === null || properties === void 0 ? void 0 : properties.service;
                        functionConfig = properties === null || properties === void 0 ? void 0 : properties.function;
                        triggersConfig = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        region = properties.region;
                        fcTriggers = [];
                        this.logger.debug("instantiate serviceConfig with : " + JSON.stringify(serviceConfig));
                        fcService = new service_1.FcService(serviceConfig, credentials, region);
                        fcService.validateConfig();
                        return [4 /*yield*/, fcService.init()];
                    case 2:
                        _c.sent();
                        if (!!lodash_1.default.isEmpty(functionConfig)) return [3 /*break*/, 4];
                        this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConfig) + ", instantiate it.");
                        fcFunction = new function_1.FcFunction(functionConfig, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name);
                        fcFunction.validateConfig();
                        return [4 /*yield*/, fcFunction.init()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!!lodash_1.default.isEmpty(triggersConfig)) return [3 /*break*/, 8];
                        this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggersConfig) + ", instantiate them.");
                        _i = 0, triggersConfig_1 = triggersConfig;
                        _c.label = 5;
                    case 5:
                        if (!(_i < triggersConfig_1.length)) return [3 /*break*/, 8];
                        triggerConf = triggersConfig_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name, functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name);
                        fcTrigger.validateConfig();
                        return [4 /*yield*/, fcTrigger.init()];
                    case 6:
                        _c.sent();
                        fcTriggers.push(fcTrigger);
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, {
                            fcService: fcService,
                            fcFunction: fcFunction,
                            fcTriggers: fcTriggers,
                            args: args,
                        }];
                }
            });
        });
    };
    FcBaseComponent.prototype.importResource = function (fcService, fcFunction, fcTriggers) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, fcTriggers_1, fcTrigger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fcService.importResource(this.access, this.appName, this.projectName, this.curPath)];
                    case 1:
                        _a.sent();
                        if (!!lodash_1.default.isEmpty(fcFunction)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fcFunction.importResource(this.access, this.appName, this.projectName, this.curPath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!!lodash_1.default.isEmpty(fcTriggers)) return [3 /*break*/, 7];
                        _i = 0, fcTriggers_1 = fcTriggers;
                        _a.label = 4;
                    case 4:
                        if (!(_i < fcTriggers_1.length)) return [3 /*break*/, 7];
                        fcTrigger = fcTriggers_1[_i];
                        return [4 /*yield*/, fcTrigger.importResource(this.access, this.appName, this.projectName, this.curPath)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, fcService, fcFunction, fcTriggers, args, parsedArgs, assumeYes, isSilent, isDebug, i, pulumiComponentIns, pulumiComponentProp, pulumiComponentArgs, pulumiInputs;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _h = _j.sent(), fcService = _h.fcService, fcFunction = _h.fcFunction, fcTriggers = _h.fcTriggers, args = _h.args;
                        return [4 /*yield*/, this.report('fc-base', 'deploy', fcService.credentials.AccountID)];
                    case 2:
                        _j.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
                        assumeYes = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.y) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.assumeYes);
                        isSilent = ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.s) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.silent);
                        isDebug = ((_e = parsedArgs.data) === null || _e === void 0 ? void 0 : _e.debug) || ((_g = (_f = process.env) === null || _f === void 0 ? void 0 : _f.temp_params) === null || _g === void 0 ? void 0 : _g.includes('--debug'));
                        return [4 /*yield*/, this.importResource(fcService, fcFunction, fcTriggers)];
                    case 3:
                        _j.sent();
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        return [4 /*yield*/, fcService.addServiceInConfFile(assumeYes)];
                    case 4:
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        _j.sent();
                        if (!!lodash_1.default.isNil(fcFunction)) return [3 /*break*/, 6];
                        return [4 /*yield*/, fcFunction.addFunctionInConfFile(assumeYes)];
                    case 5:
                        _j.sent();
                        _j.label = 6;
                    case 6:
                        if (!!lodash_1.default.isEmpty(fcTriggers)) return [3 /*break*/, 10];
                        i = 0;
                        _j.label = 7;
                    case 7:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, fcTriggers[i].addTriggerInConfFile(assumeYes)];
                    case 8:
                        _j.sent();
                        _j.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10: return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 11:
                        pulumiComponentIns = _j.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
                        pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', this.access, this.appName, this.projectName + "-pulumi-project", pulumiComponentProp, this.curPath, pulumiComponentArgs);
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var pulumiRes, e_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                                        case 1:
                                            pulumiRes = _a.sent();
                                            if ((pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) && (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) !== '') {
                                                this.logger.error("deploy error: " + (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr));
                                                return [2 /*return*/];
                                            }
                                            // 返回结果
                                            return [2 /*return*/, pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stdout];
                                        case 2:
                                            e_1 = _a.sent();
                                            this.logger.debug("error when deploy, error is: \n" + e_1);
                                            error_1.handlerKnownErrors(e_1);
                                            this.logger.log("\tretry " + times + " times", 'red');
                                            retry(e_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 12: return [2 /*return*/, _j.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var _j, fcService, fcFunction, fcTriggers, args, parsedArgs, nonOptionsArgs, assumeYes, isSilent, isDebug, nonOptionsArg, _k, pulumiComponentIns, pulumiComponentProp, pulumiComponentArgs, pulumiInputs, pulumiRes, fcFunctionsArr, _l, fcTriggersArr, _m, isFunctionBeRemoved, targetTriggerName, isTriggersBeRemoved, removedFcTriggers, i, isTriggerBeRemoved, _i, removedFcTriggers_1, removedFcTrigger;
            var _this = this;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _j = _o.sent(), fcService = _j.fcService, fcFunction = _j.fcFunction, fcTriggers = _j.fcTriggers, args = _j.args;
                        return [4 /*yield*/, this.report('fc-base', 'remove', fcService.credentials.AccountID)];
                    case 2:
                        _o.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        assumeYes = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.y) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.assumeYes);
                        isSilent = ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.s) || ((_e = parsedArgs.data) === null || _e === void 0 ? void 0 : _e.silent);
                        isDebug = (_f = parsedArgs.data) === null || _f === void 0 ? void 0 : _f.debug;
                        if (lodash_1.default.isEmpty(nonOptionsArgs)) {
                            this.logger.error(' error: expects argument.');
                            // help info
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(" error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            return [2 /*return*/];
                        }
                        nonOptionsArg = nonOptionsArgs[0];
                        if (!SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
                            this.logger.error(" remove " + nonOptionsArg + " is not supported now.");
                            // help info
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fse.pathExists(fcService.pulumiStackDir)];
                    case 3:
                        _k = !(_o.sent());
                        if (_k) return [3 /*break*/, 5];
                        return [4 /*yield*/, file_1.isFile(fcService.pulumiStackDir)];
                    case 4:
                        _k = (_o.sent());
                        _o.label = 5;
                    case 5:
                        if (_k) {
                            this.logger.error('please deploy resource first');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 6:
                        pulumiComponentIns = _o.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
                        pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', this.access, this.appName, this.projectName + "-pulumi-project", pulumiComponentProp, this.curPath, pulumiComponentArgs);
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 15];
                        this.logger.info("waiting for service: " + fcService.serviceConfig.name + " to be removed");
                        return [4 /*yield*/, fcService.configFileExists()];
                    case 7:
                        if (!(_o.sent())) {
                            this.logger.warn('there is no resource in pulumi stack, please execute deploy command first!');
                            return [2 /*return*/, 'nothing changes'];
                        }
                        return [4 /*yield*/, fcService.getFunctionNames()];
                    case 8:
                        fcFunctionsArr = _o.sent();
                        _l = assumeYes || lodash_1.default.isEmpty(fcFunctionsArr);
                        if (_l) return [3 /*break*/, 10];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Are you sure to remove service: " + fcService.serviceConfig.name + " and functions: [ " + fcFunctionsArr + " ] under it?")];
                    case 9:
                        _l = (_o.sent());
                        _o.label = 10;
                    case 10:
                        if (!_l) return [3 /*break*/, 13];
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var e_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            e_2 = _a.sent();
                                            this.logger.debug("error when remove service, error is: \n" + e_2);
                                            this.logger.log("\tretry " + times + " times", 'red');
                                            retry(e_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 11:
                        // destroy
                        pulumiRes = _o.sent();
                        return [4 /*yield*/, fcService.clear()];
                    case 12:
                        _o.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        this.logger.info("cancel removing service " + fcService.serviceConfig.name);
                        return [2 /*return*/];
                    case 14: return [3 /*break*/, 32];
                    case 15:
                        if (!(nonOptionsArg === 'function')) return [3 /*break*/, 26];
                        if (lodash_1.default.isEmpty(fcFunction)) {
                            this.logger.error("please add function config in your serverless service: " + this.projectName);
                            return [2 /*return*/];
                        }
                        this.logger.info("waiting for function: " + fcFunction.functionConfig.name + " to be removed");
                        return [4 /*yield*/, fcFunction.getTriggerNames()];
                    case 16:
                        fcTriggersArr = _o.sent();
                        _m = assumeYes || lodash_1.default.isEmpty(fcTriggersArr);
                        if (_m) return [3 /*break*/, 18];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Remove function: " + fcFunction.functionConfig.name + " and triggers: [ " + fcTriggersArr + " ] belonging to it?")];
                    case 17:
                        _m = (_o.sent());
                        _o.label = 18;
                    case 18:
                        if (!_m) return [3 /*break*/, 24];
                        return [4 /*yield*/, fcFunction.delFunctionInConfFile()];
                    case 19:
                        isFunctionBeRemoved = _o.sent();
                        if (!isFunctionBeRemoved) return [3 /*break*/, 23];
                        if (!!lodash_1.default.isEmpty(fcTriggersArr)) return [3 /*break*/, 21];
                        return [4 /*yield*/, fcFunction.delTriggersUnderFunction()];
                    case 20:
                        _o.sent();
                        _o.label = 21;
                    case 21: return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                            var e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        e_3 = _a.sent();
                                        this.logger.debug("error when remove function, error is: \n" + e_3);
                                        this.logger.log("\tretry " + times + " times", 'red');
                                        retry(e_3);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 22:
                        pulumiRes = _o.sent();
                        fcFunction.clear();
                        _o.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        this.logger.info("cancel removing function " + fcFunction.functionConfig.name);
                        return [2 /*return*/];
                    case 25: return [3 /*break*/, 32];
                    case 26:
                        if (!(nonOptionsArg === 'trigger')) return [3 /*break*/, 32];
                        targetTriggerName = ((_g = parsedArgs.data) === null || _g === void 0 ? void 0 : _g.n) || ((_h = parsedArgs.data) === null || _h === void 0 ? void 0 : _h.name) || undefined;
                        isTriggersBeRemoved = false;
                        removedFcTriggers = [];
                        i = 0;
                        _o.label = 27;
                    case 27:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 30];
                        if (!(lodash_1.default.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name)) return [3 /*break*/, 29];
                        this.logger.info("waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].delTriggerInConfFile()];
                    case 28:
                        isTriggerBeRemoved = _o.sent();
                        if (isTriggerBeRemoved) {
                            removedFcTriggers.push(fcTriggers[i]);
                        }
                        isTriggersBeRemoved = isTriggersBeRemoved || isTriggerBeRemoved;
                        _o.label = 29;
                    case 29:
                        i++;
                        return [3 /*break*/, 27];
                    case 30:
                        if (!isTriggersBeRemoved) return [3 /*break*/, 32];
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var e_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            e_4 = _a.sent();
                                            this.logger.debug("error when remove trigger, error is: \n" + e_4);
                                            this.logger.log("\tretry " + times + " times", 'red');
                                            retry(e_4);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 31:
                        pulumiRes = _o.sent();
                        for (_i = 0, removedFcTriggers_1 = removedFcTriggers; _i < removedFcTriggers_1.length; _i++) {
                            removedFcTrigger = removedFcTriggers_1[_i];
                            removedFcTrigger.clear();
                        }
                        _o.label = 32;
                    case 32:
                        if (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) {
                            this.logger.error("remove error:\n " + (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr));
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stdout) || 'nothing changes'];
                }
            });
        });
    };
    __decorate([
        core.HLogger('FC-BASE'),
        __metadata("design:type", Object)
    ], FcBaseComponent.prototype, "logger", void 0);
    return FcBaseComponent;
}());
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsdUNBQXNEO0FBQ3RELDZDQUFxRDtBQUNyRCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELDRDQUE2RDtBQUM3RCxrREFBdUI7QUFDdkIsbUNBQW9DO0FBR3BDLHNEQUF1QztBQUN2QyxxQ0FBaUQ7QUFFakQsSUFBTSxxQkFBcUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFakU7SUFBQTtJQTJRQSxDQUFDO0lBblFPLGdDQUFNLEdBQVosVUFBYSxhQUFxQixFQUFFLE9BQWUsRUFBRSxTQUFrQixFQUFFLE1BQWU7Ozs7Ozt3QkFDbEYsR0FBRyxHQUFXLFNBQVMsQ0FBQzs2QkFDeEIsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQ2xDLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEtBQUE7eUJBQ0osQ0FBQyxDQUFDOzs7OztLQUNKO0lBQ0QsT0FBTztJQUNELHVDQUFhLEdBQW5CLFVBQW9CLE1BQWU7Ozs7Ozs7d0JBQzNCLFVBQVUsR0FBZ0IsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLE1BQU0sU0FBRyxNQUFNLGFBQU4sTUFB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