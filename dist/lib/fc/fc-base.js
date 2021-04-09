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
var PULUMI_CACHE_DIR = path.join(os.homedir(), '.s', 'cache', 'pulumi', 'fc-base');
var PULUMI_CODE_DIR = path.join(path.resolve(__dirname, '..'), 'utils', 'pulumi');
var PULUMI_CODE_FILE = path.join(PULUMI_CODE_DIR, 'index.js');
var PULUMI_PACKAGE_FILE = path.join(PULUMI_CODE_DIR, 'package.json');
var PULUMI_PACKAGE_LOCK_FILE = path.join(PULUMI_CODE_DIR, 'package-lock.json');
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
    FcBase.prototype.updateReourceInConfFile = function (resource, keyInConfFile, keyInResource, assumeYes) {
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
                        idxInGlobal = resourcesInGlobal === null || resourcesInGlobal === void 0 ? void 0 : resourcesInGlobal.findIndex(function (r) { return r[keyInResource] === resource[keyInResource]; });
                        if (!(!_.isNil(idxInGlobal) && idxInGlobal >= 0)) return [3 /*break*/, 6];
                        this.logger.debug("find resource: " + JSON.stringify(resource) + " in pulumi stack");
                        if (!!deep_equal_1.default(JSON.parse(JSON.stringify(resource)), resourcesInGlobal[idxInGlobal])) return [3 /*break*/, 4];
                        this.logger.warn(keyInConfFile + ": " + resource[keyInResource] + " already exists in golbal:\n" + JSON.stringify(resourcesInGlobal[idxInGlobal]));
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
    FcBase.prototype.addResourceInConfFile = function (resource, keyInConfFile, keyInResource, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configFileExists()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        // update
                        return [4 /*yield*/, this.updateReourceInConfFile(resource, keyInConfFile, keyInResource, assumeYes)];
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const targetDir = path.dirname(this.configFile);
                        this.logger.debug("ensuring dir: " + this.pulumiStackDir);
                        return [4 /*yield*/, fse.ensureDir(this.pulumiStackDir)];
                    case 1:
                        _a.sent();
                        this.logger.debug('FC-BASE', "coping files under " + PULUMI_CODE_DIR + " to " + this.pulumiStackDir);
                        return [4 /*yield*/, fse.copy(PULUMI_CODE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_CODE_FILE)), { overwrite: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fse.copy(PULUMI_PACKAGE_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_FILE)), { overwrite: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fse.copy(PULUMI_PACKAGE_LOCK_FILE, path.join(this.pulumiStackDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)), { overwrite: true })];
                    case 4:
                        _a.sent();
                        this.logger.debug('FC-BASE', "installing dependencies under " + PULUMI_CODE_DIR);
                        // const { stdout, stderr } = await execAsync('npm i', { cwd: targetDir });
                        // if (!_.isNil(stderr)) { throw new Error(`Error occurs when npm i under ${targetDir}: ${stderr}`); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvZmMtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLGdDQUFpRDtBQUNqRCw4Q0FBeUQ7QUFDekQsMERBQStCO0FBQy9CLHlDQUEwRDtBQUUxRCx3Q0FBNEI7QUFDNUIseUNBQTZCO0FBQzdCLHFDQUF5QjtBQUN6QiwrQ0FBeUM7QUFFekMsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM3RixJQUFNLGVBQWUsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM1RixJQUFNLGdCQUFnQixHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hFLElBQU0sbUJBQW1CLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDL0UsSUFBTSx3QkFBd0IsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pGO0lBU0UsZ0JBQVksTUFBYyxFQUFFLFdBQXlCO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsV0FBbUI7UUFDNUIsT0FBVSxJQUFJLENBQUMsV0FB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