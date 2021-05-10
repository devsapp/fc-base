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
var core = __importStar(require("@serverless-devs/core"));
var deep_equal_1 = __importDefault(require("deep-equal"));
var prompt_1 = require("../init/prompt");
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var child_process_1 = require("child_process");
var component_1 = require("../component");
var pulumi_1 = require("../pulumi");
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
    function FcBase(region, credentials, isPulumiImport, isPulumiImportProtect) {
        this.region = region;
        this.credentials = credentials;
        this.isPulumiImport = isPulumiImport;
        this.isPulumiImportProtect = isPulumiImportProtect;
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
                            this.logger.warn(keyInConfFile + ": " + JSON.stringify(resource[keyInResource]) + " dose not exist in local pulumi stack, please deploy it first.");
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
                        this.logger.warn('there is no resource in pulumi stack, please execute deploy command first!');
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
    FcBase.zeroImportState = function (stateID) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.getState(stateID)];
                    case 1:
                        state = _a.sent();
                        if (!!_.isEmpty(state)) return [3 /*break*/, 3];
                        state.isImport = false;
                        return [4 /*yield*/, core.setState(stateID, state)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 5:
                        pulumiComponentIns = _a.sent();
                        return [4 /*yield*/, pulumiComponentIns.installPluginFromUrl({ props: {
                                    url: ALICLOUD_PLUGIN_DOWNLOAD_URL,
                                    version: ALICLOUD_PLUGIN_VERSION,
                                } })];
                    case 6:
                        _a.sent();
                        this.logger.debug("installing dependencies under " + PULUMI_CODE_DIR);
                        child_process_1.execSync('npm install', { cwd: this.pulumiStackDir, stdio: 'ignore' });
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
    FcBase.prototype.pulumiImport = function (access, appName, projectName, curPath, type, resourceName, resourceID, parentUrn) {
        return __awaiter(this, void 0, void 0, function () {
            var importFlag, resourceType, args, pulumiComponentIns, pulumiComponentProp, pulumiInputs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("importing " + type + " " + resourceID + " from remote to local stack.");
                        importFlag = pulumi_1.genPulumiImportFlags(this.isPulumiImportProtect, this.stackID, parentUrn);
                        switch (type) {
                            case 'service': {
                                resourceType = 'alicloud:fc/service:Service';
                                break;
                            }
                            case 'function': {
                                resourceType = 'alicloud:fc/function:Function';
                                break;
                            }
                            case 'trigger': {
                                resourceType = 'alicloud:fc/trigger:Trigger';
                                break;
                            }
                            default: {
                                throw new Error("Unsupported pulumi resource type: " + type);
                            }
                        }
                        args = resourceType + " " + resourceName + " " + resourceID + " " + importFlag;
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 1:
                        pulumiComponentIns = _a.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
                        pulumiInputs = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, args);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, pulumiComponentIns.import(pulumiInputs)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1.message.includes('does not exist')) {
                            throw new Error("Resouce " + resourceType + ": " + resourceID + " dose not exist online, please delete 'import' and 'protect' option and retry!\n");
                        }
                        throw e_1;
                    case 5:
                        this.logger.debug(type + " " + resourceID + " is imported.");
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core.HLogger('FC-BASE'),
        __metadata("design:type", Object)
    ], FcBase.prototype, "logger", void 0);
    return FcBase;
}());
exports.FcBase = FcBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvZmMtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLGdDQUFpRDtBQUNqRCwwREFBOEM7QUFDOUMsMERBQStCO0FBQy9CLHlDQUEwRDtBQUUxRCx3Q0FBNEI7QUFDNUIseUNBQTZCO0FBQzdCLHFDQUF5QjtBQUN6QiwrQ0FBeUM7QUFDekMsMENBQWtEO0FBQ2xELG9DQUF5RTtBQUV6RSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRCxJQUFNLGdCQUFnQixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzdGLElBQU0sZUFBZSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM1RSxJQUFNLGdCQUFnQixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hFLElBQU0sbUJBQW1CLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDL0UsSUFBTSx3QkFBd0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pGLHVGQUF1RjtBQUN2RixJQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQztBQUMxQyxJQUFNLDZCQUE2QixHQUFHLDhCQUE0Qix1QkFBdUIsU0FBTSxDQUFDO0FBQ2hHLElBQU0sZUFBZSxH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