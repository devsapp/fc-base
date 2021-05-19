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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.FcTrigger = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = void 0;
var oss_1 = require("../oss");
var cdn_1 = require("../cdn");
var mns_1 = require("../mns");
var log_1 = require("../log");
var _ = __importStar(require("lodash"));
var fc_base_1 = __importDefault(require("./fc-base"));
var core = __importStar(require("@serverless-devs/core"));
function instanceOfTimerTriggerConfig(data) {
    return 'cronExpression' in data && 'enable' in data;
}
exports.instanceOfTimerTriggerConfig = instanceOfTimerTriggerConfig;
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
var FcTrigger = /** @class */ (function (_super) {
    __extends(FcTrigger, _super);
    function FcTrigger(triggerConfig, credentials, region, serviceName, functionName) {
        var _this = _super.call(this, region, credentials, triggerConfig.import, triggerConfig.protect) || this;
        _this.triggerConfig = triggerConfig;
        delete _this.triggerConfig.import;
        delete _this.triggerConfig.protect;
        _this.resolvedTriggerConfig = _this.resolveTriggerIntoPulumiFormat();
        _this.serviceName = serviceName;
        if (!_.isNil(functionName)) {
            _this.functionName = functionName;
        }
        return _this;
    }
    FcTrigger.compareTriggerKeys = function (triggerConfOne, triggerConfTwo) {
        return (triggerConfOne.name === triggerConfTwo.name) && (triggerConfOne.service === triggerConfTwo.service) && (triggerConfOne.function === triggerConfTwo.function);
    };
    FcTrigger.prototype.validateConfig = function () {
        var config = this.triggerConfig.config;
        var isTriggerTypeNotMatched = false;
        switch (this.triggerConfig.type) {
            case 'log': {
                if (!log_1.instanceOfLogTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            case 'cdn_events': {
                if (!cdn_1.instanceOfCdnTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            case 'mns_topic': {
                if (!mns_1.instanceOfMnsTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            case 'oss': {
                if (!oss_1.instanceOfOssTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            case 'timer': {
                if (!instanceOfTimerTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            case 'http': {
                if (!instanceOfHttpTriggerConfig(config)) {
                    isTriggerTypeNotMatched = true;
                }
                break;
            }
            default: {
                throw new Error("Trigger type: " + this.triggerConfig.type + " is not supported now");
            }
        }
        if (isTriggerTypeNotMatched) {
            throw new Error("trigger config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
        }
        if (_.isNil(this.serviceName) && _.isNil(this.triggerConfig.service)) {
            throw new Error('Please add serviceConfig in your serverless service or service attribute in your triggerConfig');
        }
        if (_.isNil(this.functionName) && _.isNil(this.triggerConfig.function)) {
            throw new Error('Please add functionConfig in your serverless service or function attribute in your triggerConfig');
        }
        if (!_.isNil(this.serviceName) && _.isNil(this.triggerConfig.service)) {
            this.resolvedTriggerConfig.service = this.serviceName;
        }
        else if (!_.isNil(this.serviceName) && !_.isNil(this.triggerConfig.service) && this.serviceName !== this.triggerConfig.service) {
            throw new Error("Please make service attribute of trigger: " + this.triggerConfig.name + " consistent with serviceName in serviceConfig");
        }
        if (!_.isNil(this.functionName) && _.isNil(this.triggerConfig.function)) {
            this.resolvedTriggerConfig.function = this.functionName;
        }
        else if (!_.isNil(this.functionName) && !_.isNil(this.triggerConfig.function) && this.functionName !== this.triggerConfig.function) {
            throw new Error("Please make function attribute of trigger: " + this.triggerConfig.name + " consistent with functionName in serviceConfig");
        }
    };
    FcTrigger.prototype.init = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initConfigFileAttr(this.serviceName, FcTrigger.configFileName);
                        return [4 /*yield*/, this.importResource(access, appName, projectName, curPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.isImported = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiImportStateID, pulumiImportState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pulumiImportStateID = FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionName, this.triggerConfig.name);
                        return [4 /*yield*/, core.getState(pulumiImportStateID)];
                    case 1:
                        pulumiImportState = _a.sent();
                        return [2 /*return*/, pulumiImportState === null || pulumiImportState === void 0 ? void 0 : pulumiImportState.isImport];
                }
            });
        });
    };
    FcTrigger.prototype.genResourceName = function () {
        return this.functionName + "-" + this.triggerConfig.name;
    };
    FcTrigger.prototype.importResource = function (access, appName, projectName, curPath) {
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
                        resourceName = this.genResourceName();
                        resourceID = this.serviceName + ":" + this.functionName + ":" + this.triggerConfig.name;
                        parentUrn = "urn:pulumi:" + this.stackID + "::" + this.stackID + "::alicloud:fc/service:Service$alicloud:fc/function:Function::" + this.functionName;
                        return [4 /*yield*/, this.pulumiImport(access, appName, projectName, curPath, 'trigger', resourceName, resourceID, parentUrn)];
                    case 3:
                        _b.sent();
                        pulumiImportStateID = FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionName, this.triggerConfig.name);
                        return [4 /*yield*/, this.setKVInState(pulumiImportStateID, 'isImport', true)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.remove = function (access, appName, projectName, curPath, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var promptMsg, resourceName, targetUrn, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promptMsg = "Are you sure to remove trigger: " + this.triggerConfig.name + "?";
                        resourceName = this.genResourceName();
                        targetUrn = "urn:pulumi:" + this.stackID + "::" + this.stackID + "::alicloud:fc/service:Service$alicloud:fc/function:Function$alicloud:fc/trigger:Trigger::" + resourceName;
                        return [4 /*yield*/, this.destroy(this.triggerConfig.name, access, appName, projectName, curPath, promptMsg, targetUrn, flags)];
                    case 1:
                        res = _a.sent();
                        if (!_.isEmpty(res === null || res === void 0 ? void 0 : res.stderr)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.clean()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res];
                    case 3: throw new Error(res === null || res === void 0 ? void 0 : res.stderr);
                }
            });
        });
    };
    FcTrigger.genStateID = function (accountID, region, serviceName, functionName, triggerName) {
        return accountID + "-" + region + "-" + serviceName + "-" + functionName + "-" + triggerName;
    };
    FcTrigger.prototype.resolveTriggerIntoPulumiFormat = function () {
        /**
         * Pulumi format:
         *  {
         *    config?: string;
              configMns?: string;
              function: string;
              name?: string;
              namePrefix?: string;
              role?: string;
              service: string;
              sourceArn?: string;
              type: string;
         *  }
         */
        if (_.isEmpty(this.triggerConfig)) {
            return {};
        }
        var res = Object.assign({}, {
            name: this.triggerConfig.name,
            function: this.triggerConfig.function,
            service: this.triggerConfig.service,
            type: this.triggerConfig.type,
        });
        Object.assign(res, {
            role: this.triggerConfig.role,
        });
        if (!_.isNil(this.triggerConfig.sourceArn)) {
            Object.assign(res, {
                sourceArn: this.triggerConfig.sourceArn,
            });
        }
        else {
            Object.assign(res, {
                sourceArn: this.getSourceArn(),
            });
        }
        var triggerConfigInPulumiFormat = this.getTriggerConfigInPulumiFormat();
        if (this.triggerConfig.type === 'mns_topic') {
            Object.assign(res, { configMns: triggerConfigInPulumiFormat });
        }
        else {
            Object.assign(res, { config: triggerConfigInPulumiFormat });
        }
        return res;
    };
    FcTrigger.prototype.getTriggerConfigInPulumiFormat = function () {
        var config = this.triggerConfig.config;
        var res = {};
        switch (this.triggerConfig.type) {
            case 'log': {
                if (log_1.instanceOfLogTriggerConfig(config)) {
                    res = __assign({}, config);
                    delete res.enable;
                    Object.assign(res, {
                        Enable: config.enable,
                    });
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'cdn_events': {
                if (cdn_1.instanceOfCdnTriggerConfig(config)) {
                    res = config;
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'mns_topic': {
                if (mns_1.instanceOfMnsTriggerConfig(config)) {
                    // notifyContentFormat default 'STREAM'
                    // notifyStrategy defalut 'BACKOFF_RETRY'
                    var notifyContentFormat = config.notifyContentFormat ? config.notifyContentFormat : 'STREAM';
                    var notifyStrategy = config.notifyStrategy ? config.notifyStrategy : 'BACKOFF_RETRY';
                    Object.assign(res, {
                        NotifyContentFormat: notifyContentFormat,
                        NotifyStrategy: notifyStrategy,
                    });
                    if (config.filterTag) {
                        Object.assign(res, {
                            FilterTag: config.filterTag,
                        });
                    }
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'oss': {
                if (oss_1.instanceOfOssTriggerConfig(config)) {
                    Object.assign(res, {
                        events: config.events,
                        filter: config.filter,
                    });
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'timer': {
                if (instanceOfTimerTriggerConfig(config)) {
                    res = config;
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'http': {
                if (instanceOfHttpTriggerConfig(config)) {
                    res = config;
                    break;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            default: {
                throw new Error("Trigger type: " + this.triggerConfig.type + " is not supported now");
            }
        }
        return JSON.stringify(res);
    };
    FcTrigger.prototype.getSourceArn = function () {
        var config = this.triggerConfig.config;
        switch (this.triggerConfig.type) {
            case 'log': {
                if (log_1.instanceOfLogTriggerConfig(config)) {
                    return "acs:log:" + this.region + ":" + this.credentials.AccountID + ":project/" + config.logConfig.project;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'cdn_events': {
                if (cdn_1.instanceOfCdnTriggerConfig(config)) {
                    return "acs:cdn:*:" + this.credentials.AccountID;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'mns_topic': {
                if (mns_1.instanceOfMnsTriggerConfig(config)) {
                    var mnsArnRegion = this.region;
                    if (config.region) {
                        mnsArnRegion = config.region;
                    }
                    return "acs:mns:" + mnsArnRegion + ":" + this.credentials.AccountID + ":/topics/" + config.topicName;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            case 'oss': {
                if (oss_1.instanceOfOssTriggerConfig(config)) {
                    return "acs:oss:" + this.region + ":" + this.credentials.AccountID + ":" + config.bucketName;
                }
                else {
                    throw new Error("config: " + JSON.stringify(config) + " is not for " + this.triggerConfig.type + " trigger");
                }
            }
            default: {
                if (this.triggerConfig.type === 'http' || this.triggerConfig.type === 'timer') {
                    return;
                }
                throw new Error("Trigger type: " + this.triggerConfig.type + " is not supported now");
            }
        }
    };
    FcTrigger.prototype.delTriggerInConfFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delResourceInConfFile(this.resolvedTriggerConfig, 'trigger', 'name')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcTrigger.prototype.addTriggerInConfFile = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addResourceInConfFile(this.resolvedTriggerConfig, 'trigger', 'name', assumeYes, FcTrigger.compareTriggerKeys)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cleanvm, triggerStateID, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanvm = core.spinner('clearing...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        triggerStateID = FcTrigger.genStateID(this.credentials.AccountID, this.region, this.serviceName, this.functionName, this.triggerConfig.name);
                        return [4 /*yield*/, fc_base_1.default.zeroImportState(triggerStateID)];
                    case 2:
                        _a.sent();
                        this.logger.debug('zero trigger import state done');
                        cleanvm.succeed('clear done.');
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        cleanvm.fail('clear error.');
                        throw e_1;
                    case 4:
                        this.logger.info("please make import option to be false in trigger: " + this.triggerConfig.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.keyInConfigFile = 'trigger';
    FcTrigger.keyInResource = 'name';
    FcTrigger.configFileName = 'fc-trigger.json';
    return FcTrigger;
}(fc_base_1.default));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQXNFO0FBQ3RFLDhCQUFzRTtBQUN0RSw4QkFBc0U7QUFDdEUsOEJBQXNFO0FBQ3RFLHdDQUE0QjtBQUM1QixzREFBK0I7QUFFL0IsMERBQThDO0FBb0I5QyxTQUFnQiw0QkFBNEIsQ0FBQyxJQUFTO0lBQ3BELE9BQU8sZ0JBQWdCLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDdEQsQ0FBQztBQUZELG9FQUVDO0FBTUQsU0FBZ0IsMkJBQTJCLENBQUMsSUFBUztJQUNuRCxPQUFPLFVBQVUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUNqRCxDQUFDO0FBRkQsa0VBRUM7QUFFRDtJQUErQiw2QkFBTTtJQWNuQyxtQkFBWSxhQUE0QixFQUFFLFdBQXlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsWUFBcUI7UUFBL0gsWUFDRSxrQkFBTSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQU94RTtRQU5DLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDbkUsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENB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