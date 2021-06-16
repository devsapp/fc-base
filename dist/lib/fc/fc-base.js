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
var stdout_formatter_1 = __importDefault(require("../../common/stdout-formatter"));
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
    FcBase.prototype.delReource = function (resource, resources, key, isResourceHasSameKeyFunc) {
        if (!resources) {
            return undefined;
        }
        var idx = resources === null || resources === void 0 ? void 0 : resources.findIndex(function (r) {
            if (!_.isNil(isResourceHasSameKeyFunc)) {
                return isResourceHasSameKeyFunc(r, resource);
            }
            return r[key] === resource[key];
        });
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
    FcBase.prototype.delResourceInConfFile = function (resource, keyInConfFile, keyInResource, isResourceHasSameKeyFunc) {
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
                        resources = this.delReource(resource, configInGlobal[keyInConfFile], keyInResource, isResourceHasSameKeyFunc);
                        if (resources === undefined) {
                            // 资源在 pulumi stack 中不存在
                            this.logger.warn(keyInConfFile + ": " + JSON.stringify(resource[keyInResource], null, '  ') + " dose not exist in local pulumi stack, please deploy it first.");
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
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten, null, '  ') + " to " + this.configFile + ".");
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
                        this.logger.debug("write content: " + JSON.stringify(conf, null, '  ') + " to " + this.configFile);
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
    FcBase.prototype.setKVInState = function (stateID, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, core.getState(stateID)];
                    case 1:
                        state = _c.sent();
                        if (!_.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core.setState(stateID, (_a = {}, _a[key] = value, _a))];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        Object.assign(state, (_b = {},
                            _b[key] = value,
                            _b));
                        return [4 /*yield*/, core.setState(stateID, state)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/];
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
                        this.logger.debug("find resource: " + JSON.stringify(resource, null, '  ') + " in pulumi stack");
                        if (!!deep_equal_1.default(JSON.parse(JSON.stringify(resource)), resourcesInGlobal[idxInGlobal])) return [3 /*break*/, 4];
                        this.logger.debug(keyInConfFile + ": " + resource[keyInResource] + " already exists in golbal:\n" + JSON.stringify(resourcesInGlobal[idxInGlobal], null, '  '));
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
                        this.logger.debug("add resource: " + JSON.stringify(resource, null, '  ') + " to pulumi stack");
                        resourcesInGlobal.push(resource);
                        _e.label = 7;
                    case 7:
                        fcConfigToBeWritten = Object.assign({}, (_d = {},
                            _d[keyInConfFile] = resourcesInGlobal,
                            _d));
                        if (!isResourcesInGlobalChanged) return [3 /*break*/, 9];
                        this.logger.debug("update content: " + JSON.stringify(fcConfigToBeWritten, null, '  ') + " to " + this.configFile + ".");
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
                        return [4 /*yield*/, core.load('devsapp/pulumi-alibaba')];
                    case 3:
                        pulumiComponentIns_1 = _b.sent();
                        pulumiComponentProp = pulumi_1.genPulumiComponentProp(this.stackID, this.region, this.pulumiStackDir);
                        pulumiComponentArgs = (isSilent ? '-s' : '') + (isDebug ? '--debug' : '');
                        if (!_.isNil(targetUrn)) {
                            pulumiComponentArgs += " --target " + targetUrn + " --target-dependents";
                        }
                        pulumiInputs_1 = component_1.genComponentInputs('pulumi-alibaba', access, appName, projectName + "-pulumi-project", pulumiComponentProp, curPath, pulumiComponentArgs);
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var destroyRes, e_1, retryMsg;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, pulumiComponentIns_1.destroy(pulumiInputs_1)];
                                        case 1:
                                            destroyRes = _b.sent();
                                            return [2 /*return*/, destroyRes];
                                        case 2:
                                            e_1 = _b.sent();
                                            this.logger.debug("error when remove " + name + ", error is: \n" + e_1);
                                            error_1.handlerKnownErrors(e_1);
                                            retryMsg = (_a = stdout_formatter_1.default.stdoutFormatter) === null || _a === void 0 ? void 0 : _a.retry('pulumi destroy', '', '', times);
                                            this.logger.log(retryMsg || "\tretry " + times + " times", 'red');
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
                        if (!e_2.message.includes('stderr: error: no name for resource')) {
                            throw e_2;
                        }
                        this.logger.debug('can not import alicloud:fc/trigger repeatedly.');
                        return [3 /*break*/, 5];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvZmMtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBZ0M7QUFDaEMsZ0NBQWlEO0FBQ2pELDBEQUE4QztBQUM5QywwREFBK0I7QUFDL0IseUNBQTBEO0FBRTFELHdDQUE0QjtBQUM1Qix5Q0FBNkI7QUFDN0IscUNBQXlCO0FBQ3pCLCtDQUF5QztBQUN6QywwQ0FBa0Q7QUFDbEQsb0NBQXlFO0FBQ3pFLG1EQUFvQztBQUNwQyxrQ0FBOEM7QUFDOUMsbUZBQTREO0FBRTVELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQU0sZ0JBQWdCLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDN0YsSUFBTSxlQUFlLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVFLElBQU0sZ0JBQWdCLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEUsSUFBTSxtQkFBbUIsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUMvRSxJQUFNLHdCQUF3QixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDekYsdUZBQXVGO0FBQ3ZGLElBQU0sdUJBQXVCLEdBQUcsU0FBUyxDQUFDO0FBQzFDLElBQU0sNkJBQTZCLEdBQUcsOEJB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