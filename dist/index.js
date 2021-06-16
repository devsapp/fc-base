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
var lodash_1 = __importDefault(require("lodash"));
var file_1 = require("./lib/file");
var retry_1 = __importDefault(require("./lib/retry"));
var error_1 = require("./lib/error");
var stdout_formatter_1 = __importDefault(require("./common/stdout-formatter"));
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
                        try {
                            core.reportComponent(componentName, {
                                command: command,
                                uid: uid,
                            });
                        }
                        catch (e) {
                            this.logger.warn("Reminder report: Component " + componentName + " report error(" + e.message + ")");
                        }
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
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _c.sent();
                        serviceConfig = properties === null || properties === void 0 ? void 0 : properties.service;
                        functionConfig = properties === null || properties === void 0 ? void 0 : properties.function;
                        triggersConfig = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        region = properties.region;
                        fcTriggers = [];
                        this.logger.debug("instantiate serviceConfig with : " + JSON.stringify(serviceConfig, null, '  '));
                        fcService = new service_1.FcService(serviceConfig, credentials, region);
                        fcService.validateConfig();
                        return [4 /*yield*/, fcService.init(this.access, this.appName, this.projectName, this.curPath)];
                    case 3:
                        _c.sent();
                        if (!!lodash_1.default.isEmpty(functionConfig)) return [3 /*break*/, 5];
                        this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConfig, null, '  ') + ", instantiate it.");
                        fcFunction = new function_1.FcFunction(functionConfig, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name);
                        fcFunction.validateConfig();
                        return [4 /*yield*/, fcFunction.init(this.access, this.appName, this.projectName, this.curPath)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (!!lodash_1.default.isEmpty(triggersConfig)) return [3 /*break*/, 9];
                        this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggersConfig, null, '  ') + ", instantiate them.");
                        _i = 0, triggersConfig_1 = triggersConfig;
                        _c.label = 6;
                    case 6:
                        if (!(_i < triggersConfig_1.length)) return [3 /*break*/, 9];
                        triggerConf = triggersConfig_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name, functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name);
                        fcTrigger.validateConfig();
                        return [4 /*yield*/, fcTrigger.init(this.access, this.appName, this.projectName, this.curPath)];
                    case 7:
                        _c.sent();
                        fcTriggers.push(fcTrigger);
                        _c.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, {
                            fcService: fcService,
                            fcFunction: fcFunction,
                            fcTriggers: fcTriggers,
                            args: args,
                        }];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, fcService, fcFunction, fcTriggers, args, parsedArgs, argsData, assumeYes, isSilent, isDebug, i, pulumiComponentIns, pulumiComponentProp, pulumiComponentArgs, pulumiInputs;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _c = _d.sent(), fcService = _c.fcService, fcFunction = _c.fcFunction, fcTriggers = _c.fcTriggers, args = _c.args;
                        return [4 /*yield*/, this.report('fc-base', 'deploy', fcService.credentials.AccountID)];
                    case 2:
                        _d.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assume-yes', 's', 'silent'] });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        assumeYes = argsData.y || argsData['assume-yes'];
                        isSilent = argsData.s || argsData.silent;
                        isDebug = argsData.debug || ((_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.temp_params) === null || _b === void 0 ? void 0 : _b.includes('--debug'));
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        return [4 /*yield*/, fcService.addServiceInConfFile(assumeYes)];
                    case 3:
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        _d.sent();
                        if (!!lodash_1.default.isNil(fcFunction)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fcFunction.addFunctionInConfFile(assumeYes)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!!lodash_1.default.isEmpty(fcTriggers)) return [3 /*break*/, 9];
                        i = 0;
                        _d.label = 6;
                    case 6:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, fcTriggers[i].addTriggerInConfFile(assumeYes)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 10:
                        pulumiComponentIns = _d.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
                        pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', this.access, this.appName, this.projectName + "-pulumi-project", pulumiComponentProp, this.curPath, pulumiComponentArgs);
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var pulumiRes, e_1, retryMsg;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                                        case 1:
                                            pulumiRes = _b.sent();
                                            if ((pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) && (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) !== '') {
                                                this.logger.error("deploy error: " + (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr));
                                                return [2 /*return*/];
                                            }
                                            // 返回结果
                                            return [2 /*return*/, pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stdout];
                                        case 2:
                                            e_1 = _b.sent();
                                            this.logger.debug("error when deploy, error is: \n" + e_1);
                                            error_1.handlerKnownErrors(e_1);
                                            retryMsg = ((_a = stdout_formatter_1.default.stdoutFormatter) === null || _a === void 0 ? void 0 : _a.retry('pulumi up', '', '', times)) || "\tretry " + times + " times";
                                            this.logger.log(retryMsg, 'red');
                                            retry(e_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 11: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, fcService, fcFunction, fcTriggers, args, parsedArgs, argsData, nonOptionsArgs, assumeYes, isSilent, isDebug, nonOptionsArg, _f, flags, removeMsg, removeRes, removeRes, i, removeMsg_1, removeTriggerRes, removeMsg, removeFunctionRes, removeRes, targetTriggerName, i, removeMsg, removeTriggerRes;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _g.sent(), fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, args = _e.args;
                        return [4 /*yield*/, this.report('fc-base', 'remove', fcService.credentials.AccountID)];
                    case 2:
                        _g.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assume-yes', 's', 'silent'] });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        nonOptionsArgs = argsData._;
                        assumeYes = argsData.y || argsData['assume-yes'];
                        isSilent = argsData.s || argsData.silent;
                        isDebug = argsData.debug;
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
                        _f = !(_g.sent());
                        if (_f) return [3 /*break*/, 5];
                        return [4 /*yield*/, file_1.isFile(fcService.pulumiStackDir)];
                    case 4:
                        _f = (_g.sent());
                        _g.label = 5;
                    case 5:
                        if (_f) {
                            this.logger.error('please deploy resource first');
                            return [2 /*return*/];
                        }
                        flags = { isDebug: isDebug, isSilent: isSilent, assumeYes: assumeYes };
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 7];
                        removeMsg = ((_a = stdout_formatter_1.default.stdoutFormatter) === null || _a === void 0 ? void 0 : _a.remove('service', fcService.serviceConfig.name)) || "waiting for service: " + fcService.serviceConfig.name + " to be removed";
                        this.logger.info(removeMsg);
                        return [4 /*yield*/, fcService.remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 6:
                        removeRes = _g.sent();
                        if (removeRes === null || removeRes === void 0 ? void 0 : removeRes.stderr) {
                            this.logger.error("remove service error:\n " + (removeRes === null || removeRes === void 0 ? void 0 : removeRes.stderr));
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, removeRes];
                    case 7:
                        if (!(nonOptionsArg === 'function')) return [3 /*break*/, 14];
                        if (lodash_1.default.isEmpty(fcFunction)) {
                            this.logger.error("please add function config in your serverless service: " + this.projectName);
                            return [2 /*return*/];
                        }
                        removeRes = [];
                        i = 0;
                        _g.label = 8;
                    case 8:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fcTriggers[i].isImported()];
                    case 9:
                        if (!_g.sent()) return [3 /*break*/, 11];
                        removeMsg_1 = (_b = stdout_formatter_1.default.stdoutFormatter) === null || _b === void 0 ? void 0 : _b.remove('trigger', fcTriggers[i].triggerConfig.name);
                        this.logger.info(removeMsg_1 || "waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 10:
                        removeTriggerRes = _g.sent();
                        removeRes.push(removeTriggerRes === null || removeTriggerRes === void 0 ? void 0 : removeTriggerRes.stdout);
                        _g.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 8];
                    case 12:
                        removeMsg = (_c = stdout_formatter_1.default.stdoutFormatter) === null || _c === void 0 ? void 0 : _c.remove('trigger', fcFunction.functionConfig.name);
                        this.logger.info(removeMsg || "waiting for function: " + fcFunction.functionConfig.name + " to be removed");
                        return [4 /*yield*/, fcFunction.remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 13:
                        removeFunctionRes = _g.sent();
                        removeRes.push(removeFunctionRes);
                        return [2 /*return*/, removeRes];
                    case 14:
                        if (!(nonOptionsArg === 'trigger')) return [3 /*break*/, 19];
                        if (lodash_1.default.isEmpty(fcTriggers)) {
                            this.logger.error("please add trigger config in your serverless service: " + this.projectName);
                            return [2 /*return*/];
                        }
                        removeRes = [];
                        targetTriggerName = (argsData === null || argsData === void 0 ? void 0 : argsData.n) || (argsData === null || argsData === void 0 ? void 0 : argsData.name);
                        i = 0;
                        _g.label = 15;
                    case 15:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 18];
                        if (!(lodash_1.default.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name)) return [3 /*break*/, 17];
                        removeMsg = (_d = stdout_formatter_1.default.stdoutFormatter) === null || _d === void 0 ? void 0 : _d.remove('trigger', fcTriggers[i].triggerConfig.name);
                        this.logger.info(removeMsg || "waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 16:
                        removeTriggerRes = _g.sent();
                        removeRes.push(removeTriggerRes === null || removeTriggerRes === void 0 ? void 0 : removeTriggerRes.stdout);
                        _g.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 15];
                    case 18: return [2 /*return*/, removeRes];
                    case 19: return [2 /*return*/, "not supported args: " + nonOptionsArg];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsdUNBQXNEO0FBQ3RELDZDQUFxRDtBQUNyRCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELGtEQUF1QjtBQUN2QixtQ0FBb0M7QUFHcEMsc0RBQXVDO0FBQ3ZDLHFDQUFpRDtBQUNqRCwrRUFBd0Q7QUFFeEQsSUFBTSxxQkFBcUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFakU7SUFBQTtJQXlOQSxDQUFDO0lBak5PLGdDQUFNLEdBQVosVUFBYSxhQUFxQixFQUFFLE9BQWUsRUFBRSxTQUFrQixFQUFFLE1BQWU7Ozs7Ozt3QkFDbEYsR0FBRyxHQUFXLFNBQVMsQ0FBQzs2QkFDeEIsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSTs0QkFDRixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTtnQ0FDbEMsT0FBTyxTQUFBO2dDQUNQLEdBQUcsS0FBQTs2QkFDSixDQUFDLENBQUM7eUJBQ0o7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQThCLGFBQWEsc0JBQWlCLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQyxDQUFDO3lCQUM1Rjs7Ozs7S0FDRjtJQUNELE9BQU87SUFD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