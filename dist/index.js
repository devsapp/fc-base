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
var SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger'];
var FcBaseComponent = /** @class */ (function () {
    function FcBaseComponent() {
    }
    // 解析入参
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var properties, access, credentials, args, projectName, appName, curPath, serviceConfig, functionConfig, triggersConfig, region, fcFunction, fcTriggers, fcService, _i, triggersConfig_1, triggerConf, fcTrigger;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _c.sent();
                        this.logger.debug("credentials: " + JSON.stringify(credentials));
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        projectName = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.projectName;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        serviceConfig = properties === null || properties === void 0 ? void 0 : properties.service;
                        functionConfig = properties === null || properties === void 0 ? void 0 : properties.function;
                        triggersConfig = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        region = properties.region;
                        fcTriggers = [];
                        this.logger.debug("instantiate serviceConfig with : " + JSON.stringify(serviceConfig));
                        fcService = new service_1.FcService(serviceConfig, credentials, region);
                        fcService.validateConfig();
                        fcService.initServiceConfigFileAttr();
                        if (!lodash_1.default.isEmpty(functionConfig)) {
                            this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConfig) + ", instantiate it.");
                            fcFunction = new function_1.FcFunction(functionConfig, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name);
                            fcFunction.validateConfig();
                            fcFunction.initFunctionConfigFileAttr();
                        }
                        if (!lodash_1.default.isEmpty(triggersConfig)) {
                            this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggersConfig) + ", instantiate them.");
                            for (_i = 0, triggersConfig_1 = triggersConfig; _i < triggersConfig_1.length; _i++) {
                                triggerConf = triggersConfig_1[_i];
                                fcTrigger = new trigger_1.FcTrigger(triggerConf, credentials, region, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name, functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name);
                                fcTrigger.validateConfig();
                                fcTrigger.initTriggerConfigFileAttr();
                                fcTriggers.push(fcTrigger);
                            }
                        }
                        return [2 /*return*/, {
                                appName: appName,
                                projectName: projectName,
                                fcService: fcService,
                                fcFunction: fcFunction,
                                fcTriggers: fcTriggers,
                                args: args,
                                curPath: curPath,
                                access: access,
                            }];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, appName, projectName, fcService, fcFunction, fcTriggers, args, curPath, access, parsedArgs, assumeYes, isSilent, i, pulumiComponentIns, pulumiComponentProp, pulumiInputs, pulumiRes;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _f.sent(), appName = _e.appName, projectName = _e.projectName, fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, args = _e.args, curPath = _e.curPath, access = _e.access;
                        return [4 /*yield*/, fcService.preparePulumiCode()];
                    case 2:
                        _f.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
                        assumeYes = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.y) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.assumeYes);
                        isSilent = ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.s) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.silent);
                        // TODO: import online service/function/trigger
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        return [4 /*yield*/, fcService.addServiceInConfFile(assumeYes)];
                    case 3:
                        // TODO: import online service/function/trigger
                        /**
                         * 初始化中间文件:
                         *   1. 创建缓存文件夹
                         *   2. 在缓存文件夹中生成 fc-config.json, 若存在则更新
                         *   3. 将已有的 package.json 以及 index.ts 复制至缓存文件夹中
                         *   4. 安装依赖
                         */
                        _f.sent();
                        if (!!lodash_1.default.isNil(fcFunction)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fcFunction.addFunctionInConfFile(assumeYes)];
                    case 4:
                        _f.sent();
                        _f.label = 5;
                    case 5:
                        if (!!lodash_1.default.isEmpty(fcTriggers)) return [3 /*break*/, 9];
                        i = 0;
                        _f.label = 6;
                    case 6:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, fcTriggers[i].addTriggerInConfFile(assumeYes)];
                    case 7:
                        _f.sent();
                        _f.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, core.load('pulumi-alibaba')];
                    case 10:
                        pulumiComponentIns = _f.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, isSilent ? '-s' : undefined);
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 11:
                        pulumiRes = _f.sent();
                        if ((pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) && (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) !== '') {
                            this.logger.error("deploy error: " + (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr));
                            return [2 /*return*/];
                        }
                        // 返回结果
                        return [2 /*return*/, pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stdout];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, appName, projectName, fcService, fcFunction, fcTriggers, args, curPath, access, parsedArgs, nonOptionsArgs, assumeYes, isSilent, nonOptionsArg, _j, pulumiComponentIns, pulumiComponentProp, pulumiInputs, pulumiRes, fcFunctionsArr, _k, fcTriggersArr, _l, isFunctionBeRemoved, targetTriggerName, isTriggersBeRemoved, i, isTriggerBeRemoved;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _h = _m.sent(), appName = _h.appName, projectName = _h.projectName, fcService = _h.fcService, fcFunction = _h.fcFunction, fcTriggers = _h.fcTriggers, args = _h.args, curPath = _h.curPath, access = _h.access;
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes', 's', 'silent'] });
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        assumeYes = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.y) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.assumeYes);
                        isSilent = ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.s) || ((_e = parsedArgs.data) === null || _e === void 0 ? void 0 : _e.silent);
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
                    case 2:
                        _j = !(_m.sent());
                        if (_j) return [3 /*break*/, 4];
                        return [4 /*yield*/, file_1.isFile(fcService.pulumiStackDir)];
                    case 3:
                        _j = (_m.sent());
                        _m.label = 4;
                    case 4:
                        if (_j) {
                            this.logger.error('please deploy resource first');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.load('pulumi-alibaba')];
                    case 5:
                        pulumiComponentIns = _m.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(fcService.stackID, fcService.region, fcService.pulumiStackDir);
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, isSilent ? '-s' : undefined);
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 12];
                        this.logger.info("waiting for service: " + fcService.serviceConfig.name + " to be removed");
                        return [4 /*yield*/, fcService.getFunctionNames()];
                    case 6:
                        fcFunctionsArr = _m.sent();
                        _k = assumeYes || lodash_1.default.isEmpty(fcFunctionsArr);
                        if (_k) return [3 /*break*/, 8];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Are you sure to remove service: " + fcService.serviceConfig.name + " and functions: [ " + fcFunctionsArr + " ] under it?")];
                    case 7:
                        _k = (_m.sent());
                        _m.label = 8;
                    case 8:
                        if (!_k) return [3 /*break*/, 10];
                        return [4 /*yield*/, pulumiComponentIns.destroy(pulumiInputs)];
                    case 9:
                        // destroy
                        pulumiRes = _m.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        this.logger.info("cancel removing service " + fcService.serviceConfig.name);
                        return [2 /*return*/];
                    case 11: return [3 /*break*/, 28];
                    case 12:
                        if (!(nonOptionsArg === 'function')) return [3 /*break*/, 22];
                        if (lodash_1.default.isEmpty(fcFunction)) {
                            this.logger.error("please add function config in your serverless service: " + projectName);
                            return [2 /*return*/];
                        }
                        this.logger.info("waiting for function: " + fcFunction.functionConfig.name + " to be removed");
                        return [4 /*yield*/, fcFunction.getTriggerNames()];
                    case 13:
                        fcTriggersArr = _m.sent();
                        _l = assumeYes || lodash_1.default.isEmpty(fcTriggersArr);
                        if (_l) return [3 /*break*/, 15];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Remove function: " + fcFunction.functionConfig.name + " and triggers: [ " + fcTriggersArr + " ] belonging to it?")];
                    case 14:
                        _l = (_m.sent());
                        _m.label = 15;
                    case 15:
                        if (!_l) return [3 /*break*/, 20];
                        return [4 /*yield*/, fcFunction.delFunctionInConfFile()];
                    case 16:
                        isFunctionBeRemoved = _m.sent();
                        if (!isFunctionBeRemoved) return [3 /*break*/, 19];
                        return [4 /*yield*/, fcFunction.delTriggersUnderFunction()];
                    case 17:
                        _m.sent();
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 18:
                        pulumiRes = _m.sent();
                        _m.label = 19;
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        this.logger.info("cancel removing function " + fcFunction.functionConfig.name);
                        return [2 /*return*/];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        if (!(nonOptionsArg === 'trigger')) return [3 /*break*/, 28];
                        targetTriggerName = ((_f = parsedArgs.data) === null || _f === void 0 ? void 0 : _f.n) || ((_g = parsedArgs.data) === null || _g === void 0 ? void 0 : _g.name) || undefined;
                        isTriggersBeRemoved = false;
                        i = 0;
                        _m.label = 23;
                    case 23:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 26];
                        if (!(lodash_1.default.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].triggerConfig.name)) return [3 /*break*/, 25];
                        this.logger.info("waiting for trigger " + fcTriggers[i].triggerConfig.name + " to be removed");
                        return [4 /*yield*/, fcTriggers[i].delTriggerInConfFile()];
                    case 24:
                        isTriggerBeRemoved = _m.sent();
                        isTriggersBeRemoved = isTriggersBeRemoved || isTriggerBeRemoved;
                        _m.label = 25;
                    case 25:
                        i++;
                        return [3 /*break*/, 23];
                    case 26:
                        if (!isTriggersBeRemoved) return [3 /*break*/, 28];
                        return [4 /*yield*/, pulumiComponentIns.up(pulumiInputs)];
                    case 27:
                        pulumiRes = _m.sent();
                        _m.label = 28;
                    case 28:
                        if (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr) {
                            this.logger.error("remove error:\n " + (pulumiRes === null || pulumiRes === void 0 ? void 0 : pulumiRes.stderr));
                            return [2 /*return*/];
                        }
                        if (nonOptionsArg === 'service') {
                            fse.removeSync(fcService.pulumiStackDir);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsdUNBQXNEO0FBQ3RELDZDQUFxRDtBQUNyRCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELDRDQUE2RDtBQUM3RCxrREFBdUI7QUFDdkIsbUNBQW9DO0FBSXBDLElBQU0scUJBQXFCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRWpFO0lBQUE7SUF3TUEsQ0FBQztJQXJNQyxPQUFPO0lBQ0QsdUNBQWEsR0FBbkIsVUFBb0IsTUFBZTs7Ozs7Ozt3QkFDM0IsVUFBVSxHQUFnQixNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDO3dCQUN4QyxNQUFNLFNBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sMENBQUUsTUFBTSxDQUFDO3dCQUNMLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE1RCxXQUFXLEdBQWlCLFNBQWdDO3dCQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQzt3QkFDcEIsV0FBVyxTQUFXLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLDBDQUFFLFdBQVcsQ0FBQzt3QkFDbkQsT0FBTyxHQUFXLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUM7d0JB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