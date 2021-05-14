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
var retry_1 = __importDefault(require("../retry"));
var error_1 = require("../error");
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
    FcBase.prototype.destroy = function (name, access, appName, projectName, curPath, promptMsg, targetUrn, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var assumeYes, isDebug, isSilent, pulumiRes, _a, pulumiComponentIns_1, pulumiComponentProp, pulumiComponentArgs, pulumiInputs_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assumeYes = flags.assumeYes, isDebug = flags.isDebug, isSilent = flags.isSilent;
                        _a = assumeYes;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue(promptMsg)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, core.load('/Users/zqf/Documents/git_proj/devsapp/component/pulumi-alibaba/')];
                    case 3:
                        pulumiComponentIns_1 = _b.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
                        pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
                        if (!_.isNil(targetUrn)) {
                            pulumiComponentArgs += " --target " + targetUrn + " --target-dependents";
                        }
                        pulumiInputs_1 = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, pulumiComponentArgs);
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var destroyRes, e_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns_1.destroy(pulumiInputs_1)];
                                        case 1:
                                            destroyRes = _a.sent();
                                            return [2 /*return*/, destroyRes];
                                        case 2:
                                            e_1 = _a.sent();
                                            this.logger.debug("error when remove " + name + ", error is: \n" + e_1);
                                            error_1.handlerKnownErrors(e_1);
                                            this.logger.log("\tretry " + times + " times", 'red');
                                            retry(e_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        pulumiRes = _b.sent();
                        return [2 /*return*/, pulumiRes];
                    case 5:
                        this.logger.info("cancel removing " + name);
                        return [2 /*return*/];
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
            var importFlag, resourceType, args, pulumiComponentIns, pulumiComponentProp, pulumiInputs, e_2;
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
                        e_2 = _a.sent();
                        if (e_2.message.includes('does not exist')) {
                            throw new Error("Resouce " + resourceType + ": " + resourceID + " dose not exist online, please create it without 'import' and 'protect' option!\n");
                        }
                        throw e_2;
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
exports.default = FcBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvZmMtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBZ0M7QUFDaEMsZ0NBQWlEO0FBQ2pELDBEQUE4QztBQUM5QywwREFBK0I7QUFDL0IseUNBQTBEO0FBRTFELHdDQUE0QjtBQUM1Qix5Q0FBNkI7QUFDN0IscUNBQXlCO0FBQ3pCLCtDQUF5QztBQUN6QywwQ0FBa0Q7QUFDbEQsb0NBQXlFO0FBQ3pFLG1EQUFvQztBQUNwQyxrQ0FBOEM7QUFFOUMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM3RixJQUFNLGVBQWUsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUUsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RSxJQUFNLG1CQUFtQixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQy9FLElBQU0sd0JBQXdCLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN6Rix1RkFBdUY7QUFDdkYsSUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUM7QUFDMUMsSUFBTSw2QkFBNkIsR0FBRyw4QkFBNEIsdUJBQXVCLFNB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