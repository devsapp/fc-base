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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcTrigger = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = void 0;
var oss_1 = require("../oss");
var cdn_1 = require("../cdn");
var mns_1 = require("../mns");
var log_1 = require("../log");
var _ = __importStar(require("lodash"));
var fc_base_1 = require("./fc-base");
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
        var _this = _super.call(this, region, credentials) || this;
        _this.triggerConfig = triggerConfig;
        _this.resolvedTriggerConfig = _this.resolveTriggerIntoPulumiFormat();
        _this.serviceName = serviceName;
        if (!_.isNil(functionName)) {
            _this.functionName = functionName;
        }
        return _this;
    }
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
    FcTrigger.prototype.initTriggerConfigFileAttr = function () {
        this.initConfigFileAttr(this.serviceName, FcTrigger.configFileName);
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
                    case 0: return [4 /*yield*/, this.addResourceInConfFile(this.resolvedTriggerConfig, 'trigger', 'name', assumeYes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.keyInConfigFile = 'trigger';
    FcTrigger.keyInResource = 'name';
    FcTrigger.configFileName = 'fc-trigger.json';
    return FcTrigger;
}(fc_base_1.FcBase));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQXNFO0FBQ3RFLDhCQUFzRTtBQUN0RSw4QkFBc0U7QUFDdEUsOEJBQXNFO0FBQ3RFLHdDQUE0QjtBQUM1QixxQ0FBbUM7QUFtQm5DLFNBQWdCLDRCQUE0QixDQUFDLElBQVM7SUFDcEQsT0FBTyxnQkFBZ0IsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUN0RCxDQUFDO0FBRkQsb0VBRUM7QUFNRCxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVEO0lBQStCLDZCQUFNO0lBVW5DLG1CQUFZLGFBQTRCLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxZQUFxQjtRQUEvSCxZQUNFLGtCQUFNLE1BQU0sRUFBRSxXQUFXLENBQUMsU0FLM0I7UUFKQyxLQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDbkUsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUFFOztJQUNuRSxDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUNVLElBQUEsTUFBTSxHQUFLLElBQUksQ0FBQyxhQUFhLE9BQXZCLENBQXdCO1FBQ3RD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