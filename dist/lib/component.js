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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentInputs = void 0;
var _ = __importStar(require("lodash"));
var core_1 = require("@serverless-devs/core");
function genComponentInputs(credentials, projectName, accessAlias, component, prop, args) {
    var inputs = {
        Credentials: credentials,
        Project: {
            ProjectName: projectName,
            AccessAlias: accessAlias,
            Component: component,
            Provider: 'alibaba',
        },
        Properties: prop,
    };
    if (!_.isNil(args)) {
        Object.assign(inputs, { Args: args });
    }
    core_1.Logger.debug('FC-DEPLOY', "inputs of fc base component generated: " + JSON.stringify(inputs));
    return inputs;
}
exports.genComponentInputs = genComponentInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUE0QjtBQUM1Qiw4Q0FBK0M7QUFFL0MsU0FBZ0Isa0JBQWtCLENBQUMsV0FBZ0IsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxJQUFTLEVBQUUsSUFBYTtJQUN4SSxJQUFNLE1BQU0sR0FBeUI7UUFDbkMsV0FBVyxFQUFFLFdBQVc7UUFDeEIsT0FBTyxFQUFFO1lBQ1AsV0FBVyxFQUFFLFdBQVc7WUFDeEIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFNBQVM7U0FDcEI7UUFDRCxVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDO0lBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN2QztJQUNELGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLDRDQUEwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7SUFDOUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWhCRCxnREFnQkMifQ==