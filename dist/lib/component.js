"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentInputs = void 0;
var core_1 = require("@serverless-devs/core");
function genComponentInputs(component, access, appName, projectName, props, path, args) {
    var inputs = {
        project: {
            component: component,
            access: access,
            projectName: projectName,
        },
        args: args,
        path: path,
        props: props,
        appName: appName,
    };
    // @ts-ignore
    delete inputs.Credentials;
    // @ts-ignore
    delete inputs.credentials;
    core_1.Logger.debug('FC-BASE', "inputs of " + component + " component generated: " + JSON.stringify(inputs));
    return inputs;
}
exports.genComponentInputs = genComponentInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQStDO0FBRS9DLFNBQWdCLGtCQUFrQixDQUFDLFNBQWlCLEVBQUUsTUFBVyxFQUFFLE9BQWUsRUFBRSxXQUFtQixFQUFFLEtBQVUsRUFBRSxJQUFhLEVBQUUsSUFBYTtJQUMvSSxJQUFNLE1BQU0sR0FBeUI7UUFDbkMsT0FBTyxFQUFFO1lBQ1AsU0FBUyxXQUFBO1lBQ1QsTUFBTSxRQUFBO1lBQ04sV0FBVyxhQUFBO1NBQ1o7UUFDRCxJQUFJLE1BQUE7UUFDSixJQUFJLE1BQUE7UUFDSixLQUFLLE9BQUE7UUFDTCxPQUFPLFNBQUE7S0FDUixDQUFDO0lBQ0YsYUFBYTtJQUNiLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMxQixhQUFhO0lBQ2IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBRTFCLGFBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLGVBQWEsU0FBUyw4QkFBeUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDO0lBQ2pHLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsZ0RBbUJDIn0=