"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentInputs = void 0;
var core_1 = require("@serverless-devs/core");
function genComponentInputs(credentials, appName, props, path, args) {
    var inputs = {
        credentials: credentials,
        appName: appName,
        args: args,
        path: path,
        props: props,
    };
    core_1.Logger.debug('FC-BASE', "inputs of fc base component generated: " + JSON.stringify(inputs));
    return inputs;
}
exports.genComponentInputs = genComponentInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQStDO0FBRS9DLFNBQWdCLGtCQUFrQixDQUFDLFdBQWdCLEVBQUUsT0FBZSxFQUFFLEtBQVUsRUFBRSxJQUFhLEVBQUUsSUFBYTtJQUM1RyxJQUFNLE1BQU0sR0FBeUI7UUFDbkMsV0FBVyxhQUFBO1FBQ1gsT0FBTyxTQUFBO1FBQ1AsSUFBSSxNQUFBO1FBQ0osSUFBSSxNQUFBO1FBQ0osS0FBSyxPQUFBO0tBQ04sQ0FBQztJQUVGLGFBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLDRDQUEwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7SUFDNUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVhELGdEQVdDIn0=