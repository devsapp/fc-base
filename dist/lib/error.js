"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerKnownErrors = void 0;
var RESOURCE_ALREADY_EXIST_ERR_MSG = 'already exists';
function handlerKnownErrors(e) {
    var message = e.message;
    if (message.includes(RESOURCE_ALREADY_EXIST_ERR_MSG)) {
        handlerReourceAlreadyExistErr(message);
    }
}
exports.handlerKnownErrors = handlerKnownErrors;
function handlerReourceAlreadyExistErr(errMsg) {
    var re = /"ErrorMessage":.*$/gm;
    var errMsgInDiagnostics = errMsg.match(re)[0];
    // 去除 "ErrorMessage": 开头，并删除首位双引号
    var resolvedErrMsg = errMsgInDiagnostics.substr(16).replace(/['"]+/g, '');
    var recommendStr = 'please add import and protect options in your yaml';
    throw new Error(resolvedErrMsg + ", " + recommendStr);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sOEJBQThCLEdBQUcsZ0JBQWdCLENBQUM7QUFFeEQsU0FBZ0Isa0JBQWtCLENBQUMsQ0FBUTtJQUNqQyxJQUFBLE9BQU8sR0FBSyxDQUFDLFFBQU4sQ0FBTztJQUV0QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsRUFBRTtRQUNwRCw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUM7QUFORCxnREFNQztBQUVELFNBQVMsNkJBQTZCLENBQUMsTUFBYztJQUNuRCxJQUFNLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQztJQUNsQyxJQUFNLG1CQUFtQixHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsaUNBQWlDO0lBQ2pDLElBQU0sY0FBYyxHQUFXLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLElBQU0sWUFBWSxHQUFHLG9EQUFvRCxDQUFDO0lBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUksY0FBYyxVQUFPLFlBQWMsQ0FBQyxDQUFDO0FBQzFELENBQUMifQ==