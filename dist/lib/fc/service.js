"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.FcService = exports.genStackId = void 0;
var fc_base_1 = require("./fc-base");
var file_1 = require("../file");
var fse = __importStar(require("fs-extra"));
var deep_equal_1 = __importDefault(require("deep-equal"));
var prompt_1 = require("../init/prompt");
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var function_1 = require("./function");
var trigger_1 = require("./trigger");
var component_1 = require("../component");
var pulumi_1 = require("../pulumi");
var core = __importStar(require("@serverless-devs/core"));
var core_1 = require("@serverless-devs/core");
function genStackId(accountId, region, serviceName) {
    return accountId + "_" + region + "_" + serviceName;
}
exports.genStackId = genStackId;
var FcService = /** @class */ (function (_super) {
    __extends(FcService, _super);
    function FcService(serviceConfig, credentials, region) {
        var _this = _super.call(this, region, credentials, serviceConfig.import, serviceConfig.protect) || this;
        _this.serviceConfig = serviceConfig;
        delete _this.serviceConfig.import;
        delete _this.serviceConfig.protect;
        return _this;
    }
    FcService.prototype.validateConfig = function () {
        if (_.isEmpty(this.serviceConfig)) {
            throw new Error('Please add serviceConfig in your s.yml/yaml');
        }
    };
    FcService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.initConfigFileAttr(this.serviceConfig.name, FcService.configFileName);
                return [2 /*return*/];
            });
        });
    };
    FcService.prototype.importResource = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiComponentIns, pulumiComponentProp, pulumiInputs, pulumiImportStateID, pulumiImportState, resourceName, resourceID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preparePulumiCode()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 2:
                        pulumiComponentIns = _a.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, 'init');
                        return [4 /*yield*/, pulumiComponentIns.stack(pulumiInputs)];
                    case 3:
                        _a.sent();
                        pulumiImportStateID = this.region + "-" + this.serviceConfig.name;
                        return [4 /*yield*/, core_1.getState(pulumiImportStateID)];
                    case 4:
                        pulumiImportState = _a.sent();
                        if (!(this.isPulumiImport && !(pulumiImportState === null || pulumiImportState === void 0 ? void 0 : pulumiImportState.isImport))) return [3 /*break*/, 7];
                        resourceName = this.serviceConfig.name;
                        resourceID = "" + this.serviceConfig.name;
                        return [4 /*yield*/, this.pulumiImport(access, appName, projectName, curPath, 'service', resourceName, resourceID)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, core_1.setState(pulumiImportStateID, { isImport: true })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clearVm, serviceStateID, functionNames, functionAndTriggerNamesMap, _i, functionNames_1, funcName, functionStateID, triggerNames, _a, triggerNames_1, triggerName, triggerStateID, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        clearVm = core.spinner('clearing...');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, , 14]);
                        serviceStateID = this.region + "-" + this.serviceConfig.name;
                        return [4 /*yield*/, fc_base_1.FcBase.zeroImportState(serviceStateID)];
                    case 2:
                        _b.sent();
                        this.logger.debug('zero service import state done');
                        return [4 /*yield*/, this.getFunctionNames()];
                    case 3:
                        functionNames = _b.sent();
                        return [4 /*yield*/, this.getFunctionAndTriggerNamesMap()];
                    case 4:
                        functionAndTriggerNamesMap = _b.sent();
                        _i = 0, functionNames_1 = functionNames;
                        _b.label = 5;
                    case 5:
                        if (!(_i < functionNames_1.length)) return [3 /*break*/, 11];
                        funcName = functionNames_1[_i];
                        functionStateID = function_1.FcFunction.genStateID(this.region, this.serviceConfig.name, funcName);
                        return [4 /*yield*/, fc_base_1.FcBase.zeroImportState(functionStateID)];
                    case 6:
                        _b.sent();
                        this.logger.debug("zero function: " + funcName + " import state done");
                        triggerNames = functionAndTriggerNamesMap[funcName];
                        if (!!_.isEmpty(triggerNames)) return [3 /*break*/, 10];
                        _a = 0, triggerNames_1 = triggerNames;
                        _b.label = 7;
                    case 7:
                        if (!(_a < triggerNames_1.length)) return [3 /*break*/, 10];
                        triggerName = triggerNames_1[_a];
                        triggerStateID = trigger_1.FcTrigger.genStateID(this.region, this.serviceConfig.name, funcName, triggerName);
                        return [4 /*yield*/, fc_base_1.FcBase.zeroImportState(triggerStateID)];
                    case 8:
                        _b.sent();
                        this.logger.debug("zero trigger: " + triggerName + " import state done");
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10:
                        _i++;
                        return [3 /*break*/, 5];
                    case 11: 
                    // remove stack directory
                    return [4 /*yield*/, fse.remove(this.pulumiStackDir)];
                    case 12:
                        // remove stack directory
                        _b.sent();
                        this.logger.debug("remove stack directory: " + this.pulumiStackDir + " done.");
                        clearVm.succeed('clear done.');
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _b.sent();
                        clearVm.fail('clear error.');
                        throw e_1;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.createServiceConfFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * format of File(json format):
                         *  {
                         *    "service": {
                         *      [key: string]: any
                         *    }
                         *  }
                        */
                        this.logger.debug(this.configFile + " not exist, creating...");
                        conf = {};
                        if (!this.serviceConfig) return [3 /*break*/, 2];
                        Object.assign(conf, { service: this.serviceConfig });
                        return [4 /*yield*/, file_1.writeStrToFile(this.configFile, JSON.stringify(conf, null, '  '), 'w', 511)];
                    case 1:
                        _a.sent();
                        this.logger.debug("write content: " + JSON.stringify(conf) + " to " + this.configFile);
                        return [3 /*break*/, 3];
                    case 2:
                        this.logger.error('empty function Config in FcFunction instance');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.getFunctionNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var functionConfigFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functionConfigFilePath = path.join(this.pulumiStackDir, function_1.FcFunction.configFileName);
                        return [4 /*yield*/, fc_base_1.FcBase.getResourceUnderParent(this.serviceConfig.name, 'service', function_1.FcFunction.keyInConfigFile, function_1.FcFunction.keyInResource, functionConfigFilePath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcService.prototype.getFunctionAndTriggerNamesMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath, res, functonNames, _i, functonNames_1, funcName, triggerNamesUnderFunction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        res = {};
                        return [4 /*yield*/, this.getFunctionNames()];
                    case 1:
                        functonNames = _b.sent();
                        _i = 0, functonNames_1 = functonNames;
                        _b.label = 2;
                    case 2:
                        if (!(_i < functonNames_1.length)) return [3 /*break*/, 5];
                        funcName = functonNames_1[_i];
                        return [4 /*yield*/, fc_base_1.FcBase.getResourceUnderParent(funcName, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 3:
                        triggerNamesUnderFunction = _b.sent();
                        if (!_.isEmpty(triggerNamesUnderFunction)) {
                            Object.assign(res, (_a = {}, _a[funcName] = triggerNamesUnderFunction, _a));
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res];
                }
            });
        });
    };
    FcService.prototype.updateServiceInConfFile = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var fcConfigInGlobal, _a, _b, serviceInGlobal, fcConfigToBeWritten, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug(this.configFile + " exists, updating...");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fse.readFile(this.configFile, 'utf-8')];
                    case 1:
                        fcConfigInGlobal = _b.apply(_a, [_d.sent()]);
                        serviceInGlobal = fcConfigInGlobal === null || fcConfigInGlobal === void 0 ? void 0 : fcConfigInGlobal.service;
                        fcConfigToBeWritten = fcConfigInGlobal;
                        if (!this.serviceConfig) return [3 /*break*/, 4];
                        if (!!deep_equal_1.default(serviceInGlobal, this.serviceConfig)) return [3 /*break*/, 4];
                        this.logger.debug("Service " + this.serviceConfig.name + " already exists in golbal:\n" + JSON.stringify(serviceInGlobal) + ".");
                        _c = assumeYes;
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue('Replace service in pulumi stack with the service in current working directory?')];
                    case 2:
                        _c = (_d.sent());
                        _d.label = 3;
                    case 3:
                        if (_c) {
                            // replace service
                            fcConfigToBeWritten.service = this.serviceConfig;
                        }
                        _d.label = 4;
                    case 4: 
                    // overwrite file
                    return [4 /*yield*/, file_1.writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 511)];
                    case 5:
                        // overwrite file
                        _d.sent();
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten) + " to " + this.configFile + ".");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.addServiceInConfFile = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configFileExists()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        // update
                        return [4 /*yield*/, this.updateServiceInConfFile(assumeYes)];
                    case 2:
                        // update
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: 
                    // create
                    return [4 /*yield*/, this.createServiceConfFile()];
                    case 4:
                        // create
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FcService.keyInConfigFile = 'service';
    FcService.keyInResource = 'name';
    FcService.configFileName = 'fc-service.json';
    return FcService;
}(fc_base_1.FcBase));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHFDQUFtQztBQUNuQyxnQ0FBeUM7QUFDekMsNENBQWdDO0FBQ2hDLDBEQUErQjtBQUMvQix5Q0FBMEQ7QUFDMUQsd0NBQTRCO0FBRTVCLHlDQUE2QjtBQUM3Qix1Q0FBd0M7QUFDeEMscUNBQXNDO0FBQ3RDLDBDQUFrRDtBQUNsRCxvQ0FBbUQ7QUFDbkQsMERBQThDO0FBQzlDLDhDQUEyRDtBQWMzRCxTQUFnQixVQUFVLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUI7SUFDL0UsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQWEsQ0FBQztBQUNqRCxDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUErQiw2QkFBTTtJQU9uQyxtQkFBWSxhQUE0QixFQUFFLFdBQXlCLEVBQUUsTUFBYztRQUFuRixZQUNFLGtCQUFNLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLFNBSXhFO1FBSEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNqQyxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDOztJQUNwQyxDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUNLLHdCQUFJLEdBQVY7OztnQkFDRSxJQUFJLENB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