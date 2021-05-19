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
                        this.logger.debug("instantiate serviceConfig with : " + JSON.stringify(serviceConfig, null, '  '));
                        fcService = new service_1.FcService(serviceConfig, credentials, region);
                        fcService.validateConfig();
                        return [4 /*yield*/, fcService.init(this.access, this.appName, this.projectName, this.curPath)];
                    case 2:
                        _c.sent();
                        if (!!lodash_1.default.isEmpty(functionConfig)) return [3 /*break*/, 4];
                        this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConfig, null, '  ') + ", instantiate it.");
                        fcFunction = new function_1.FcFunction(functionConfig, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name);
                        fcFunction.validateConfig();
                        return [4 /*yield*/, fcFunction.init(this.access, this.appName, this.projectName, this.curPath)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!!lodash_1.default.isEmpty(triggersConfig)) return [3 /*break*/, 8];
                        this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggersConfig, null, '  ') + ", instantiate them.");
                        _i = 0, triggersConfig_1 = triggersConfig;
                        _c.label = 5;
                    case 5:
                        if (!(_i < triggersConfig_1.length)) return [3 /*break*/, 8];
                        triggerConf = triggersConfig_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name, functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name);
                        fcTrigger.validateConfig();
                        return [4 /*yield*/, fcTrigger.init(this.access, this.appName, this.projectName, this.curPath)];
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
                    case 11: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fcService, fcFunction, fcTriggers, args, parsedArgs, argsData, nonOptionsArgs, assumeYes, isSilent, isDebug, nonOptionsArg, _b, flags, removeRes, removeRes, i, removeTriggerRes, removeFunctionRes, removeRes, targetTriggerName, i, removeTriggerRes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _a = _c.sent(), fcService = _a.fcService, fcFunction = _a.fcFunction, fcTriggers = _a.fcTriggers, args = _a.args;
                        return [4 /*yield*/, this.report('fc-base', 'remove', fcService.credentials.AccountID)];
                    case 2:
                        _c.sent();
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
                        _b = !(_c.sent());
                        if (_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, file_1.isFile(fcService.pulumiStackDir)];
                    case 4:
                        _b = (_c.sent());
                        _c.label = 5;
                    case 5:
                        if (_b) {
                            this.logger.error('please deploy resource first');
                            return [2 /*return*/];
                        }
                        flags = { isDebug: isDebug, isSilent: isSilent, assumeYes: assumeYes };
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 7];
                        this.logger.info("waiting for service: " + fcService.serviceConfig.name + " to be removed");
                        return [4 /*yield*/, fcService.remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 6:
                        removeRes = _c.sent();
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
                        _c.label = 8;
                    case 8:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fcTriggers[i].isImported()];
                    case 9:
                        if (!_c.sent()) return [3 /*break*/, 11];
                        this.logger.info("waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 10:
                        removeTriggerRes = _c.sent();
                        removeRes.push(removeTriggerRes === null || removeTriggerRes === void 0 ? void 0 : removeTriggerRes.stdout);
                        _c.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 8];
                    case 12:
                        this.logger.info("waiting for function: " + fcFunction.functionConfig.name + " to be removed");
                        return [4 /*yield*/, fcFunction.remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 13:
                        removeFunctionRes = _c.sent();
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
                        _c.label = 15;
                    case 15:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 18];
                        if (!(lodash_1.default.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name)) return [3 /*break*/, 17];
                        this.logger.info("waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].remove(this.access, this.appName, this.projectName, this.curPath, flags)];
                    case 16:
                        removeTriggerRes = _c.sent();
                        removeRes.push(removeTriggerRes === null || removeTriggerRes === void 0 ? void 0 : removeTriggerRes.stdout);
                        _c.label = 17;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsdUNBQXNEO0FBQ3RELDZDQUFxRDtBQUNyRCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELGtEQUF1QjtBQUN2QixtQ0FBb0M7QUFHcEMsc0RBQXVDO0FBQ3ZDLHFDQUFpRDtBQUVqRCxJQUFNLHFCQUFxQixHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVqRTtJQUFBO0lBOE1BLENBQUM7SUF0TU8sZ0NBQU0sR0FBWixVQUFhLGFBQXFCLEVBQUUsT0FBZSxFQUFFLFNBQWtCLEVBQUUsTUFBZTs7Ozs7O3dCQUNsRixHQUFHLEdBQVcsU0FBUyxDQUFDOzZCQUN4QixnQkFBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBcEIsd0JBQW9CO3dCQUNZLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE1RCxXQUFXLEdBQWlCLFNBQWdDO3dCQUNsRSxHQUFHLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQzs7O3dCQUc5QixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTs0QkFDbEMsT0FBTyxTQUFBOzRCQUNQLEdBQUcsS0FBQTt5QkFDSixDQUFDLENBQUM7Ozs7O0tBQ0o7SUFDRCxPQUFPO0lBQ0QsdUNBQWEsR0FBbkIsVUFBb0IsTUFBZTs7Ozs7Ozt3QkFDM0IsVUFBVSxHQUFnQixNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDO3dCQUM5QyxJQUFJLENBQUMsTUFBTSxTQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0s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