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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var properties, accessAlias, credentials, args, projectName, curPath, serviceConfig, functionConfig, triggersConfig, region, fcFunction, fcTriggers, fcService, _i, triggersConfig_1, triggerConf, fcTrigger;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        accessAlias = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.credentials) === null || _a === void 0 ? void 0 : _a.Alias;
                        return [4 /*yield*/, core.getCredential(accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        this.logger.debug("credentials: " + JSON.stringify(credentials));
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        projectName = inputs.appName;
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
                                projectName: projectName,
                                fcService: fcService,
                                fcFunction: fcFunction,
                                fcTriggers: fcTriggers,
                                args: args,
                                curPath: curPath,
                            }];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, projectName, fcService, fcFunction, fcTriggers, args, curPath, parsedArgs, assumeYes, isSilent, i, pulumiComponentIns, pulumiComponentProp, pulumiInputs, pulumiRes;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _f.sent(), projectName = _e.projectName, fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, args = _e.args, curPath = _e.curPath;
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
                        pulumiInputs = component_1.genComponentInputs(fcService.credentials, projectName + "-pulumi-project", pulumiComponentProp, curPath, isSilent ? '-s' : undefined);
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
            var _h, projectName, fcService, fcFunction, fcTriggers, args, curPath, parsedArgs, nonOptionsArgs, assumeYes, isSilent, nonOptionsArg, _j, pulumiComponentIns, pulumiComponentProp, pulumiInputs, pulumiRes, fcFunctionsArr, _k, fcTriggersArr, _l, isFunctionBeRemoved, targetTriggerName, isTriggersBeRemoved, i, isTriggerBeRemoved;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _h = _m.sent(), projectName = _h.projectName, fcService = _h.fcService, fcFunction = _h.fcFunction, fcTriggers = _h.fcTriggers, args = _h.args, curPath = _h.curPath;
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
                        pulumiInputs = component_1.genComponentInputs(fcService.credentials, projectName + "-pulumi-project", pulumiComponentProp, curPath, isSilent ? '-s' : undefined);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsdUNBQXNEO0FBQ3RELDZDQUFxRDtBQUNyRCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELDRDQUE2RDtBQUM3RCxrREFBdUI7QUFDdkIsbUNBQW9DO0FBSXBDLElBQU0scUJBQXFCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRWpFO0lBQUE7SUFrTUEsQ0FBQztJQS9MQyxPQUFPO0lBQ0QsdUNBQWEsR0FBbkIsVUFBb0IsTUFBZTs7Ozs7Ozt3QkFFM0IsVUFBVSxHQUFnQixNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDO3dCQUN4QyxXQUFXLFNBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsMENBQUUsS0FBSyxDQUFDO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUFqRSxXQUFXLEdBQWlCLFNBQXFDO3dCQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQzt3QkFDcEIsV0FBVyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7d0JBQ3JDLE9BQU8sR0FBVyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDO3dCQUUvQixhQUFhLEdBQWtCLFVBQVUsYUFBVixVQUFVLHVC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