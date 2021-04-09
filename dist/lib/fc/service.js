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
function genStackId(accountId, region, serviceName) {
    return accountId + "_" + region + "_" + serviceName;
}
exports.genStackId = genStackId;
var FcService = /** @class */ (function (_super) {
    __extends(FcService, _super);
    function FcService(serviceConfig, credentials, region) {
        var _this = _super.call(this, region, credentials) || this;
        _this.serviceConfig = serviceConfig;
        return _this;
    }
    FcService.prototype.validateConfig = function () {
        if (_.isEmpty(this.serviceConfig)) {
            throw new Error('Please add serviceConfig in your s.yml/yaml');
        }
    };
    FcService.prototype.initServiceConfigFileAttr = function () {
        this.initConfigFileAttr(this.serviceConfig.name, FcService.configFileName);
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
                        this.logger.warn("Service " + this.serviceConfig.name + " already exists in golbal:\n" + JSON.stringify(serviceInGlobal) + ".");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHFDQUFtQztBQUNuQyxnQ0FBeUM7QUFDekMsNENBQWdDO0FBQ2hDLDBEQUErQjtBQUMvQix5Q0FBMEQ7QUFDMUQsd0NBQTRCO0FBRTVCLHlDQUE2QjtBQUM3Qix1Q0FBd0M7QUFZeEMsU0FBZ0IsVUFBVSxDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CO0lBQy9FLE9BQVUsU0FBUyxTQUFJLE1BQU0sU0FBSSxXQUFhLENBQUM7QUFDakQsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFBK0IsNkJBQU07SUFPbkMsbUJBQVksYUFBNEIsRUFBRSxXQUF5QixFQUFFLE1BQWM7UUFBbkYsWUFDRSxrQkFBTSxNQUFNLEVBQUUsV0FBVyxDQUFDLFNBRTNCO1FBREMsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7O0lBQ3JDLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRUQsNkNBQXlCLEdBQXpCO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUsseUNBQXFCLEdBQTNCOzs7Ozs7d0JBQ0U7Ozs7Ozs7MEJBT0U7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUksSUFBSSxDQUFDLFVBQVUsNEJBQXlCLENBQUMsQ0FB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