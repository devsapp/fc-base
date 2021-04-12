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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcFunction = void 0;
var fc_base_1 = require("./fc-base");
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var trigger_1 = require("./trigger");
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConfig, credentials, region, serviceName) {
        var _this = _super.call(this, region, credentials) || this;
        _this.functionConfig = functionConfig;
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
                        return [4 /*yield*/, fc_base_1.FcBase.getResourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.delTriggersUnderFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath, removedTriggersNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pulumiStackDirCheck();
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        return [4 /*yield*/, fc_base_1.FcBase.delReourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1:
                        removedTriggersNames = _a.sent();
                        this.logger.info("remove triggers " + removedTriggersNames + " under function: " + this.functionConfig.name + ".");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.initFunctionConfigFileAttr = function () {
        this.initConfigFileAttr(this.serviceName, FcFunction.configFileName);
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
    FcFunction.keyInConfigFile = 'function';
    FcFunction.keyInResource = 'name';
    FcFunction.configFileName = 'fc-function.json';
    return FcFunction;
}(fc_base_1.FcBase));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1DO0FBQ25DLHdDQUE0QjtBQUU1Qix5Q0FBNkI7QUFDN0IscUNBQXNDO0FBZ0N0QztJQUFnQyw4QkFBTTtJQVFwQyxvQkFBWSxjQUE4QixFQUFFLFdBQXlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CO1FBQTFHLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFdBQVcsQ0FBQyxTQUczQjtRQUZDLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztJQUNqQyxDQUFDO0lBRUQsbUNBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUdBQWlHLENBQUMsQ0FBQztTQUNwSDtRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNoRDthQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENB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