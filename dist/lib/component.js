"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentInputs = void 0;
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
function genComponentInputs(component, access, appName, projectName, props, path, args) {
    var inputs = {
        project: {
            component: component,
            access: access,
            projectName: projectName,
        },
        path: path,
        props: props,
        appName: appName,
    };
    if (!lodash_1.default.isEmpty(args)) {
        Object.assign(inputs, {
            // 删除前置空格
            args: args.replace(/(^\s*)/g, ''),
        });
    }
    // @ts-ignore
    delete inputs.Credentials;
    // @ts-ignore
    delete inputs.credentials;
    core_1.Logger.debug('FC-BASE', "inputs of " + component + " component generated: " + JSON.stringify(inputs, null, '  '));
    return inputs;
}
exports.genComponentInputs = genComponentInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQStDO0FBQy9DLGtEQUF1QjtBQUV2QixTQUFnQixrQkFBa0IsQ0FBQyxTQUFpQixFQUFFLE1BQVcsRUFBRSxPQUFlLEVBQUUsV0FBbUIsRUFBRSxLQUFVLEVBQUUsSUFBVSxFQUFFLElBQWE7SUFDNUksSUFBTSxNQUFNLEdBQXlCO1FBQ25DLE9BQU8sRUFBRTtZQUNQLFNBQVMsV0FBQTtZQUNULE1BQU0sUUFBQTtZQUNOLFdBQVcsYUFBQTtTQUNaO1FBQ0QsSUFBSSxNQUFBO1FBQ0osS0FBSyxPQUFBO1FBQ0wsT0FBTyxTQUFBO0tBQ1IsQ0FBQztJQUNGLElBQUksQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNwQixTQUFTO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztTQUNsQyxDQUFDLENBQUM7S0FDSjtJQUNELGFBQWE7SUFDYixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDMUIsYUFBYTtJQUNiLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUUxQixhQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxlQUFhLFNBQVMsOEJBQXlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO0lBQzdHLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUF4QkQsZ0RBd0JDIn0=