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
exports.FcBase = void 0;
var fse = __importStar(require("fs-extra"));
var file_1 = require("../file");
var core_1 = require("@serverless-devs/core");
var deep_equal_1 = __importDefault(require("deep-equal"));
var prompt_1 = require("../init/prompt");
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var child_process_1 = require("child_process");
var CODE_LIB_PATH = path.resolve(__dirname, '..');
var PULUMI_CACHE_DIR = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'fc-base');
var PULUMI_CODE_DIR = path.join(CODE_LIB_PATH, 'utils', 'pulumi');
var PULUMI_CODE_FILE = path.join(PULUMI_CODE_DIR, 'index.js');
var PULUMI_PACKAGE_FILE = path.join(PULUMI_CODE_DIR, 'package.json');
var PULUMI_PACKAGE_LOCK_FILE = path.join(PULUMI_CODE_DIR, 'package-lock.json');
// const PULUMI_LOCAL_PLUGIN_PATH = path.join(CODE_LIB_PATH, 'utils', 'pulumi-plugin');
var ALICLOUD_PLUGIN_VERSION = 'v2.38.0';
var ALICLOUD_PLUGIN_ZIP_FILE_NAME = "pulumi-resource-alicloud-" + ALICLOUD_PLUGIN_VERSION + ".tgz";
var OSS_BUCKET_NAME = 'serverless-pulumi';
var OSS_OBJECT_KEY = "alicloud-plugin/" + ALICLOUD_PLUGIN_ZIP_FILE_NAME;
var OSS_ACCELERATE_DOMAIN = OSS_BUCKET_NAME + ".oss-accelerate.aliyuncs.com";
var ALICLOUD_PLUGIN_DOWNLOAD_URL = OSS_ACCELERATE_DOMAIN + "/" + OSS_OBJECT_KEY;
var FcBase = /** @class */ (function () {
    function FcBase(region, credentials) {
        this.region = region;
        this.credentials = credentials;
    }
    FcBase.prototype.genStackID = function (serviceName) {
        return this.credentials.AccountID + "_" + this.region + "_" + serviceName;
    };
    FcBase.prototype.initConfigFileAttr = function (serviceName, filename) {
        this.stackID = this.genStackID(serviceName);
        this.pulumiStackDir = path.join(PULUMI_CACHE_DIR, this.stackID);
        this.configFile = path.join(this.pulumiStackDir, filename);
    };
    FcBase.prototype.delReource = function (resource, resources, key) {
        if (!resources) {
            return undefined;
        }
        var idx = resources === null || resources === void 0 ? void 0 : resources.findIndex(function (r) { return r[key] === resource[key]; });
        if (idx !== undefined && idx >= 0) {
            this.logger.debug("deleting " + resource[key] + " with idx: " + idx);
            resources.splice(idx, 1);
            return resources;
        }
        // throw new Error(`${resource[key]} dose not exist in local pulumi stack.`);
        return undefined;
    };
    FcBase.prototype.pulumiStackDirCheck = function () {
        if (_.isNil(this.pulumiStackDir)) {
            throw new Error('empty pulumiStackDir atttibute');
        }
    };
    FcBase.prototype.delResourceInConfFile = function (resource, keyInConfFile, keyInResource) {
        return __awaiter(this, void 0, void 0, function () {
            var configInGlobal, _a, _b, resources, fcConfigToBeWritten;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.configFileExists()];
                    case 1:
                        if (!_d.sent()) return [3 /*break*/, 10];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fse.readFile(this.configFile, 'utf-8')];
                    case 2:
                        configInGlobal = _b.apply(_a, [_d.sent()]);
                        if (!!_.isEmpty(configInGlobal[keyInConfFile])) return [3 /*break*/, 7];
                        resources = this.delReource(resource, configInGlobal[keyInConfFile], keyInResource);
                        if (resources === undefined) {
                            // 资源在 pulumi stack 中不存在
                            this.logger.warn(JSON.stringify(resource) + " dose not exist in local pulumi stack.");
                            return [2 /*return*/, false];
                        }
                        if (!_.isEmpty(resources)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fse.unlink(this.configFile)];
                    case 3:
                        _d.sent();
                        this.logger.debug("no resource left after remove " + keyInConfFile);
                        return [3 /*break*/, 6];
                    case 4:
                        fcConfigToBeWritten = Object.assign({}, (_c = {},
                            _c[keyInConfFile] = resources,
                            _c));
                        return [4 /*yield*/, file_1.writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 511)];
                    case 5:
                        _d.sent();
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten) + " to " + this.configFile + ".");
                        _d.label = 6;
                    case 6: return [2 /*return*/, true];
                    case 7:
                        this.logger.warn("empty resource " + keyInConfFile + " in local pulumi stack, removing the file.");
                        return [4 /*yield*/, fse.unlink(this.configFile)];
                    case 8:
                        _d.sent();
                        return [2 /*return*/, false];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.logger.warn('there is no resource in pulumi stack');
                        return [2 /*return*/, false];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    FcBase.prototype.createConfFile = function (resource, keyInConfFile) {
        return __awaiter(this, void 0, void 0, function () {
            var conf, resources;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /**
                         * format of File(json format):
                         *  {
                         *    [keyInConfFile]: [
                         *      {
                         *        [key: string]: any
                         *      },
                         *      {
                         *        [key: string]: any
                         *      }
                         *    ]
                         *  }
                        */
                        this.logger.debug(this.configFile + " not exist, creating...");
                        conf = {};
                        if (_.isEmpty(resource)) {
                            this.logger.error('empty trigger Config in FcTrigger instance');
                            return [2 /*return*/];
                        }
                        resources = [];
                        resources.push(resource);
                        Object.assign(conf, (_a = {},
                            _a[keyInConfFile] = resources,
                            _a));
                        return [4 /*yield*/, file_1.writeStrToFile(this.configFile, JSON.stringify(conf, null, '  '), 'w', 511)];
                    case 1:
                        _b.sent();
                        this.logger.debug("write content: " + JSON.stringify(conf) + " to " + this.configFile);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBase.prototype.updateReourceInConfFile = function (resource, keyInConfFile, keyInResource, assumeYes, isResourceHasSameKeyFunc) {
        return __awaiter(this, void 0, void 0, function () {
            var fcConfigInGlobal, _a, _b, resourcesInGlobal, isResourcesInGlobalChanged, idxInGlobal, _c, fcConfigToBeWritten;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (_.isEmpty(resource)) {
                            this.logger.warn("empty " + keyInConfFile + " resource");
                            return [2 /*return*/];
                        }
                        this.logger.debug(this.configFile + " exists, updating...");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fse.readFile(this.configFile, 'utf-8')];
                    case 1:
                        fcConfigInGlobal = _b.apply(_a, [_e.sent()]);
                        resourcesInGlobal = fcConfigInGlobal[keyInConfFile];
                        isResourcesInGlobalChanged = true;
                        idxInGlobal = resourcesInGlobal === null || resourcesInGlobal === void 0 ? void 0 : resourcesInGlobal.findIndex(function (r) {
                            if (!_.isNil(isResourceHasSameKeyFunc)) {
                                return isResourceHasSameKeyFunc(r, resource);
                            }
                            return r[keyInResource] === resource[keyInResource];
                        });
                        if (!(!_.isNil(idxInGlobal) && idxInGlobal >= 0)) return [3 /*break*/, 6];
                        this.logger.debug("find resource: " + JSON.stringify(resource) + " in pulumi stack");
                        if (!!deep_equal_1.default(JSON.parse(JSON.stringify(resource)), resourcesInGlobal[idxInGlobal])) return [3 /*break*/, 4];
                        this.logger.debug(keyInConfFile + ": " + resource[keyInResource] + " already exists in golbal:\n" + JSON.stringify(resourcesInGlobal[idxInGlobal]));
                        _c = assumeYes;
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Replace " + keyInConfFile + " in pulumi stack with the " + keyInConfFile + " in current working directory?")];
                    case 2:
                        _c = (_e.sent());
                        _e.label = 3;
                    case 3:
                        if (_c) {
                            // replace function
                            resourcesInGlobal[idxInGlobal] = resource;
                        }
                        else {
                            isResourcesInGlobalChanged = false;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        isResourcesInGlobalChanged = false;
                        _e.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.logger.debug("add resource: " + JSON.stringify(resource) + " to pulumi stack");
                        resourcesInGlobal.push(resource);
                        _e.label = 7;
                    case 7:
                        fcConfigToBeWritten = Object.assign({}, (_d = {},
                            _d[keyInConfFile] = resourcesInGlobal,
                            _d));
                        if (!isResourcesInGlobalChanged) return [3 /*break*/, 9];
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten) + " to " + this.configFile + ".");
                        return [4 /*yield*/, file_1.writeStrToFile(this.configFile, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 511)];
                    case 8:
                        _e.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        this.logger.debug("resource " + keyInConfFile + " dose not change.");
                        _e.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    FcBase.getResourceUnderParent = function (parentName, parentKeyInChildResource, childKeyInConfFile, childKeyInResource, configFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var resourcesName, _a, fcConfigInGlobal, _b, _c, childResource, _i, childResource_1, f, parentAttrInChild;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resourcesName = [];
                        return [4 /*yield*/, fse.pathExists(configFilePath)];
                    case 1:
                        _a = !(_d.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.isFile(configFilePath)];
                    case 2:
                        _a = !(_d.sent());
                        _d.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/, resourcesName];
                        }
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fse.readFile(configFilePath, 'utf-8')];
                    case 4:
                        fcConfigInGlobal = _c.apply(_b, [_d.sent()]);
                        childResource = fcConfigInGlobal[childKeyInConfFile];
                        if (_.isEmpty(childResource)) {
                            return [2 /*return*/, resourcesName];
                        }
                        for (_i = 0, childResource_1 = childResource; _i < childResource_1.length; _i++) {
                            f = childResource_1[_i];
                            parentAttrInChild = f[parentKeyInChildResource];
                            if (_.isNil(parentAttrInChild)) {
                                throw new Error(parentKeyInChildResource + " in " + childKeyInConfFile + " is " + parentAttrInChild);
                            }
                            if ((_.isString(parentAttrInChild) && parentAttrInChild === parentName) ||
                                (_.isArray(parentAttrInChild) && parentAttrInChild.includes(parentName))) {
                                resourcesName.push(f[childKeyInResource]);
                            }
                        }
                        return [2 /*return*/, resourcesName];
                }
            });
        });
    };
    FcBase.delReourceUnderParent = function (parentName, parentKeyInChildResource, childKeyInConfFile, childKeyInResource, configFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var reomvedResources, _a, fcConfigInGlobal, _b, _c, reservedResources, _i, _d, f, fcConfigToBeWritten;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        reomvedResources = [];
                        return [4 /*yield*/, fse.pathExists(configFilePath)];
                    case 1:
                        _a = (_f.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.isFile(configFilePath)];
                    case 2:
                        _a = (_f.sent());
                        _f.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 8];
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fse.readFile(configFilePath, 'utf-8')];
                    case 4:
                        fcConfigInGlobal = _c.apply(_b, [_f.sent()]);
                        reservedResources = [];
                        if (!_.isEmpty(fcConfigInGlobal[childKeyInConfFile])) {
                            for (_i = 0, _d = fcConfigInGlobal[childKeyInConfFile]; _i < _d.length; _i++) {
                                f = _d[_i];
                                if (f[parentKeyInChildResource] !== parentName) {
                                    reservedResources.push(f);
                                }
                                else {
                                    reomvedResources.push(f[childKeyInResource]);
                                }
                            }
                        }
                        if (!_.isEmpty(reservedResources)) return [3 /*break*/, 6];
                        return [4 /*yield*/, fse.unlink(configFilePath)];
                    case 5:
                        _f.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        fcConfigToBeWritten = Object.assign({}, (_e = {},
                            _e[childKeyInConfFile] = reservedResources,
                            _e));
                        return [4 /*yield*/, file_1.writeStrToFile(configFilePath, JSON.stringify(fcConfigToBeWritten, null, '  '), 'w', 511)];
                    case 7:
                        _f.sent();
                        _f.label = 8;
                    case 8: return [2 /*return*/, reomvedResources];
                }
            });
        });
    };
    FcBase.prototype.addResourceInConfFile = function (resource, keyInConfFile, keyInResource, assumeYes, isResourceHasSameKeyFunc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configFileExists()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        // update
                        return [4 /*yield*/, this.updateReourceInConfFile(resource, keyInConfFile, keyInResource, assumeYes, isResourceHasSameKeyFunc)];
                    case 2:
                        // update
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: 
                    // create
                    return [4 /*yield*/, this.createConfFile(resource, keyInConfFile)];
                    case 4:
                        // create
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FcBase.prototype.preparePulumiCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiComponentIns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("ensuring dir: " + this.pulumiStackDir);
                        return [4 /*yield*/, fse.ensureDir(this.pulumiStackDir)];
                    case 1:
                        _a.sent();
                        this.logger.debug("coping files under " + PULUMI_CODE_DIR + " to " + this.pulumiStackDir);
                        return [4 /*yield*/, fse.copy(PULUMI_CODE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_CODE_FILE)), { overwrite: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fse.copy(PULUMI_PACKAGE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_FILE)), { overwrite: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fse.copy(PULUMI_PACKAGE_LOCK_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)), { overwrite: true })];
                    case 4:
                        _a.sent();
                        this.logger.debug('installing pulumi plugin from local.');
                        return [4 /*yield*/, core_1.load('devsapp/pulumi-alibaba')];
                    case 5:
                        pulumiComponentIns = _a.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({ props: {
                                    url: ALICLOUD_PLUGIN_DOWNLOAD_URL,
                                    version: ALICLOUD_PLUGIN_VERSION,
                                } })];
                    case 6:
                        _a.sent();
                        this.logger.debug("installing dependencies under " + PULUMI_CODE_DIR);
                        child_process_1.execSync('npm i', { cwd: this.pulumiStackDir, stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBase.prototype.configFileExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fse.pathExists(this.configFile)];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.isFile(this.configFile)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger('FC-BASE'),
        __metadata("design:type", Object)
    ], FcBase.prototype, "logger", void 0);
    return FcBase;
}());
exports.FcBase = FcBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvZmMtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLGdDQUFpRDtBQUNqRCw4Q0FBK0Q7QUFDL0QsMERBQStCO0FBQy9CLHlDQUEwRDtBQUUxRCx3Q0FBNEI7QUFDNUIseUNBQTZCO0FBQzdCLHFDQUF5QjtBQUN6QiwrQ0FBeUM7QUFFekMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM3RixJQUFNLGVBQWUsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUUsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RSxJQUFNLG1CQUFtQixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQy9FLElBQU0sd0JBQXdCLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN6Rix1RkFBdUY7QUFDdkYsSUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUM7QUFDMUMsSUFBTSw2QkFBNkIsR0FBRyw4QkFBNEIsdUJBQXVCLFNBQU0sQ0FBQztBQUNoRyxJQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUM1QyxJQUFN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