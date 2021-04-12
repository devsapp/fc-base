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
exports.isDir = exports.isFile = exports.writeStrToFile = void 0;
var fse = __importStar(require("fs-extra"));
var proper_lockfile_1 = require("proper-lockfile");
function writeStrToFile(targetFile, content, flags, mode) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fse.ensureFileSync(targetFile);
                    proper_lockfile_1.lock(targetFile)
                        .then(function () {
                        var ws = fse.createWriteStream(targetFile, { flags: flags, mode: mode });
                        ws.write(content);
                        ws.end();
                        ws.on('finish', function () {
                            proper_lockfile_1.unlockSync(targetFile);
                            resolve();
                        });
                        ws.on('error', function (error) {
                            proper_lockfile_1.unlockSync(targetFile);
                            reject(error);
                        });
                    })
                        .catch(function (e) {
                        reject(e);
                    });
                })];
        });
    });
}
exports.writeStrToFile = writeStrToFile;
function isFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fse.lstat(inputPath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isFile()];
            }
        });
    });
}
exports.isFile = isFile;
function isDir(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fse.lstat(inputPath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isDirectory()];
            }
        });
    });
}
exports.isDir = isDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQWdDO0FBQ2hDLG1EQUFtRDtBQUVuRCxTQUFzQixjQUFjLENBQUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsS0FBYyxFQUFFLElBQWE7OztZQUNyRyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO29CQUNqQyxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixzQkFBSSxDQUFDLFVBQVUsQ0FBQzt5QkFDYixJQUFJLENBQUM7d0JBQ0osSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQzt3QkFDOUQsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNULEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFOzRCQUNkLDRCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ3ZCLE9BQU8sRUFBRSxDQUFDO3dCQUNaLENBQUMsQ0FBQyxDQUFDO3dCQUNILEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSzs0QkFDbkIsNEJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQzt3QkFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLEVBQUM7OztDQUNKO0FBckJELHdDQXFCQztBQUVELFNBQXNCLE1BQU0sQ0FBQyxTQUFpQjs7Ozs7d0JBQzlCLHFCQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFsQyxLQUFLLEdBQUcsU0FBMEI7b0JBQ3hDLHNCQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQzs7OztDQUN2QjtBQUhELHdCQUdDO0FBRUQsU0FBc0IsS0FBSyxDQUFDLFNBQVM7Ozs7O3dCQUNyQixxQkFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBbEMsS0FBSyxHQUFHLFNBQTBCO29CQUN4QyxzQkFBTyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUM7Ozs7Q0FDNUI7QUFIRCxzQkFHQyJ9