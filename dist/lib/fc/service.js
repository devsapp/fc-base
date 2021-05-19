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
var fc_base_1 = __importDefault(require("./fc-base"));
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
    FcService.prototype.init = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initConfigFileAttr(this.serviceConfig.name, FcService.configFileName);
                        return [4 /*yield*/, this.importResource(access, appName, projectName, curPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.genStateID = function (accountID, region, serviceName) {
        return accountID + "-" + region + "-" + serviceName;
    };
    FcService.prototype.isImported = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiImportStateID, pulumiImportState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pulumiImportStateID = FcService.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name);
                        return [4 /*yield*/, core.getState(pulumiImportStateID)];
                    case 1:
                        pulumiImportState = _a.sent();
                        return [2 /*return*/, pulumiImportState === null || pulumiImportState === void 0 ? void 0 : pulumiImportState.isImport];
                }
            });
        });
    };
    FcService.prototype.importResource = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiComponentIns, pulumiComponentProp, pulumiInputs, _a, resourceName, resourceID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.preparePulumiCode()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 2:
                        pulumiComponentIns = _b.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, 'init');
                        return [4 /*yield*/, pulumiComponentIns.stack(pulumiInputs)];
                    case 3:
                        _b.sent();
                        _a = this.isPulumiImport;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.isImported()];
                    case 4:
                        _a = !(_b.sent());
                        _b.label = 5;
                    case 5:
                        if (!_a) return [3 /*break*/, 8];
                        resourceName = this.serviceConfig.name;
                        resourceID = "" + this.serviceConfig.name;
                        return [4 /*yield*/, this.pulumiImport(access, appName, projectName, curPath, 'service', resourceName, resourceID)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.setKVInState(FcService.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name), 'isImport', true)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.remove = function (access, appName, projectName, curPath, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var fcFunctionsArr, promptMsg, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFunctionNames()];
                    case 1:
                        fcFunctionsArr = _a.sent();
                        if (fcFunctionsArr.length === 0) {
                            promptMsg = "Are you sure to remove service: " + this.serviceConfig.name + "?";
                        }
                        else if (fcFunctionsArr.length === 1) {
                            promptMsg = "Are you sure to remove service: " + this.serviceConfig.name + " and function: " + fcFunctionsArr + "?";
                        }
                        else {
                            promptMsg = "Are you sure to remove service: " + this.serviceConfig.name + " and functions: " + fcFunctionsArr + "?";
                        }
                        return [4 /*yield*/, this.destroy(this.serviceConfig.name, access, appName, projectName, curPath, promptMsg, undefined, flags)];
                    case 2:
                        res = _a.sent();
                        if (!_.isEmpty(res === null || res === void 0 ? void 0 : res.stderr)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.clean()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res];
                    case 4: throw new Error(res === null || res === void 0 ? void 0 : res.stderr);
                }
            });
        });
    };
    FcService.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cleanvm, serviceStateID, functionNames, functionAndTriggerNamesMap, _i, functionNames_1, funcName, functionStateID, triggerNames, _a, triggerNames_1, triggerName, triggerStateID, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cleanvm = core.spinner('clearing...');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, , 14]);
                        serviceStateID = this.region + "-" + this.serviceConfig.name;
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(serviceStateID)];
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
                        functionStateID = function_1.FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name, funcName);
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(functionStateID)];
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
                        triggerStateID = trigger_1.FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceConfig.name, funcName, triggerName);
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(triggerStateID)];
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
                        cleanvm.succeed('clear done.');
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _b.sent();
                        cleanvm.fail('clear error.');
                        throw e_1;
                    case 14:
                        this.logger.info("please make import option to be false in trigger: " + this.serviceConfig.name + " and functions/triggers under it.");
                        return [2 /*return*/];
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
                        this.logger.debug("write content: " + JSON.stringify(conf, null, '  ') + " to " + this.configFile);
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
                        return [4 /*yield*/, fc_base_1.default.getResourceUnderParent(this.serviceConfig.name, 'service', function_1.FcFunction.keyInConfigFile, function_1.FcFunction.keyInResource, functionConfigFilePath)];
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
                        return [4 /*yield*/, fc_base_1.default.getResourceUnderParent(funcName, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
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
                        this.logger.debug("Service " + this.serviceConfig.name + " already exists in golbal:\n" + JSON.stringify(serviceInGlobal, null, '  ') + ".");
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
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten, null, '  ') + " to " + this.configFile + ".");
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
}(fc_base_1.default));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHNEQUErQjtBQUMvQixnQ0FBeUM7QUFDekMsNENBQWdDO0FBQ2hDLDBEQUErQjtBQUMvQix5Q0FBMEQ7QUFDMUQsd0NBQTRCO0FBRTVCLHlDQUE2QjtBQUM3Qix1Q0FBd0M7QUFDeEMscUNBQXNDO0FBQ3RDLDBDQUFrRDtBQUNsRCxvQ0FBbUQ7QUFDbkQsMERBQThDO0FBYzlDLFNBQWdCLFVBQVUsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQjtJQUMvRSxPQUFVLFNBQVMsU0FBSSxNQUFNLFNBQUksV0FBYSxDQUFDO0FBQ2pELENBQUM7QUFGRCxnQ0FFQztBQUVEO0lBQStCLDZCQUFNO0lBT25DLG1CQUFZLGFBQTRCLEVBQUUsV0FBeUIsRUFBRSxNQUFjO1FBQW5GLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FJeEU7UUFIQyxLQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ2pDLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7O0lBQ3BDLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBQ0ssd0JBQUksR0FBVixVQUFXLE1BQWMsRUFBRSxPQUFlLEVBQUUsV0FB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