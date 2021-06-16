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
exports.FcFunction = void 0;
var fc_base_1 = __importDefault(require("./fc-base"));
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var trigger_1 = require("./trigger");
var core = __importStar(require("@serverless-devs/core"));
var stdout_formatter_1 = __importDefault(require("../../common/stdout-formatter"));
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConfig, credentials, region, serviceName) {
        var _this = _super.call(this, region, credentials, functionConfig.import, functionConfig.protect) || this;
        _this.functionConfig = functionConfig;
        delete _this.functionConfig.import;
        delete _this.functionConfig.protect;
        _this.serviceName = serviceName;
        return _this;
    }
    FcFunction.prototype.validateConfig = function () {
        if (_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
            throw new Error('Please add serviceConfig in your serverless service or service attribute in your functionConfig');
        }
        if (!_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
            this.functionConfig.service = this.serviceName;
        }
        else if (!_.isNil(this.serviceName) && !_.isNil(this.functionConfig.service) && this.serviceName !== this.functionConfig.service) {
            throw new Error("Please make service attribute of function: " + this.functionConfig.name + " consistent with serviceName in serviceConfig");
        }
        if (!_.isNil(this.functionConfig.filename)) {
            this.functionConfig.filename = path.resolve(this.functionConfig.filename);
        }
    };
    FcFunction.prototype.getTriggerNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pulumiStackDirCheck();
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        return [4 /*yield*/, fc_base_1.default.getResourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.delTriggersUnderFunction = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath, removedTriggersNames, removeMsg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.pulumiStackDirCheck();
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        return [4 /*yield*/, fc_base_1.default.delReourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1:
                        removedTriggersNames = _b.sent();
                        removeMsg = (_a = stdout_formatter_1.default.stdoutFormatter) === null || _a === void 0 ? void 0 : _a.remove('trigger', "remove triggers " + removedTriggersNames + " under function " + this.functionConfig.name);
                        this.logger.info(removeMsg || "remove triggers " + removedTriggersNames + " under function: " + this.functionConfig.name + ".");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.init = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initConfigFileAttr(this.serviceName, FcFunction.configFileName);
                        return [4 /*yield*/, this.importResource(access, appName, projectName, curPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.isImported = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiImportStateID, pulumiImportState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pulumiImportStateID = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
                        return [4 /*yield*/, core.getState(pulumiImportStateID)];
                    case 1:
                        pulumiImportState = _a.sent();
                        return [2 /*return*/, pulumiImportState === null || pulumiImportState === void 0 ? void 0 : pulumiImportState.isImport];
                }
            });
        });
    };
    FcFunction.prototype.importResource = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, resourceName, resourceID, parentUrn, pulumiImportStateID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.isPulumiImport;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isImported()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 5];
                        resourceName = this.functionConfig.name;
                        resourceID = this.serviceName + ":" + this.functionConfig.name;
                        parentUrn = "urn:pulumi:" + this.stackID + "::" + this.stackID + "::alicloud:fc/service:Service::" + this.serviceName;
                        return [4 /*yield*/, this.pulumiImport(access, appName, projectName, curPath, 'function', resourceName, resourceID, parentUrn)];
                    case 3:
                        _b.sent();
                        pulumiImportStateID = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
                        return [4 /*yield*/, this.setKVInState(pulumiImportStateID, 'isImport', true)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.genStateID = function (accountID, region, serviceName, functionName) {
        return accountID + "-" + region + "-" + serviceName + "-" + functionName;
    };
    FcFunction.prototype.delFunctionInConfFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delResourceInConfFile(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.addFunctionInConfFile = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addResourceInConfFile(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource, assumeYes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.remove = function (access, appName, projectName, curPath, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerssArr, promptMsg, targetUrn, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTriggerNames()];
                    case 1:
                        triggerssArr = _a.sent();
                        if (triggerssArr.length === 0) {
                            promptMsg = "Are you sure to remove function: " + this.functionConfig.name + "?";
                        }
                        else if (triggerssArr.length === 1) {
                            promptMsg = "Are you sure to remove service: " + this.functionConfig.name + " and function: " + triggerssArr + "?";
                        }
                        else {
                            promptMsg = "Are you sure to remove service: " + this.functionConfig.name + " and functions: " + triggerssArr + "?";
                        }
                        targetUrn = "urn:pulumi:" + this.stackID + "::" + this.stackID + "::alicloud:fc/service:Service$alicloud:fc/function:Function::" + this.functionConfig.name;
                        return [4 /*yield*/, this.destroy(this.functionConfig.name, access, appName, projectName, curPath, promptMsg, targetUrn, flags)];
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
    FcFunction.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cleanvm, functionStateID, triggerNames, _i, triggerNames_1, triggerName, triggerStateID, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanvm = core.spinner('clearing...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        functionStateID = FcFunction.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name);
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(functionStateID)];
                    case 2:
                        _a.sent();
                        this.logger.debug('zero function import state done');
                        return [4 /*yield*/, this.getTriggerNames()];
                    case 3:
                        triggerNames = _a.sent();
                        _i = 0, triggerNames_1 = triggerNames;
                        _a.label = 4;
                    case 4:
                        if (!(_i < triggerNames_1.length)) return [3 /*break*/, 7];
                        triggerName = triggerNames_1[_i];
                        triggerStateID = trigger_1.FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionConfig.name, triggerName);
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(triggerStateID)];
                    case 5:
                        _a.sent();
                        this.logger.debug("zero trigger: " + triggerName + " import state done");
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, this.delFunctionInConfFile()];
                    case 8:
                        _a.sent();
                        cleanvm.succeed('clear done.');
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        cleanvm.fail('clear error.');
                        throw e_1;
                    case 10:
                        this.logger.info("please make import option to be false in trigger: " + this.functionConfig.name + " and triggers under it.");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.keyInConfigFile = 'function';
    FcFunction.keyInResource = 'name';
    FcFunction.configFileName = 'fc-function.json';
    return FcFunction;
}(fc_base_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStCO0FBQy9CLHdDQUE0QjtBQUU1Qix5Q0FBNkI7QUFDN0IscUNBQXNDO0FBQ3RDLDBEQUE4QztBQUM5QyxtRkFBNEQ7QUFpQzVEO0lBQWdDLDhCQUFNO0lBUXBDLG9CQUFZLGNBQThCLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsV0FBbUI7UUFBMUcsWUFDRSxrQkFBTSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUsxRTtRQUpDLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLE9BQU8sS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDbEMsT0FBTyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7SUFDakMsQ0FBQztJQUVELG1DQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyRSxNQUFNLElBQUksS0FBSyxDQUFDLGlHQUFpRyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxjQUFjLENB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