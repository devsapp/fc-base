"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerKnownErrors = void 0;
var RESOURCE_ALREADY_EXIST_ERR_MSG = 'already exists';
var DIAGNOSTICS = 'Diagnostics';
var REQUESTID = 'RequestId';
var DURATION = 'Duration';
function handlerKnownErrors(e) {
    var message = e.message;
    if (message.includes(RESOURCE_ALREADY_EXIST_ERR_MSG)) {
        handlerReourceAlreadyExistErr(message);
    }
    else if (message.includes(REQUESTID)) {
        handlerUnkonwnErrWithRequestID(message);
    }
}
exports.handlerKnownErrors = handlerKnownErrors;
function handlerUnkonwnErrWithRequestID(errMsg) {
    var startIdx = errMsg.indexOf(DIAGNOSTICS);
    var endIdx = errMsg.indexOf(DURATION);
    throw new Error(errMsg.substring(startIdx, endIdx));
}
function handlerReourceAlreadyExistErr(errMsg) {
    var re = /"ErrorMessage":.*$/gm;
    var errMsgInDiagnostics = errMsg.match(re)[0];
    // 去除 "ErrorMessage": 开头，并删除首位双引号
    var resolvedErrMsg = errMsgInDiagnostics.substr(16).replace(/['"]+/g, '');
    var recommendStr = 'please add import and protect options in your yaml';
    throw new Error(resolvedErrMsg + ", " + recommendStr);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sOEJBQThCLEdBQUcsZ0JBQWdCLENBQUM7QUFDeEQsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQ2xDLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFFNUIsU0FBZ0Isa0JBQWtCLENBQUMsQ0FBUTtJQUNqQyxJQUFBLE9BQU8sR0FBSyxDQUFDLFFBQU4sQ0FBTztJQUV0QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsRUFBRTtRQUNwRCw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QztTQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN0Qyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7QUFSRCxnREFRQztBQUVELFNBQVMsOEJBQThCLENBQUMsTUFBYztJQUNwRCxJQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JELElBQU0sTUFBTSxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxTQUFTLDZCQUE2QixDQUFDLE1BQWM7SUFDbkQsSUFBTSxFQUFFLEdBQUcsc0JBQXNCLENBQUM7SUFDbEMsSUFBTSxtQkFBbUIsR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELGlDQUFpQztJQUNqQyxJQUFNLGNBQWMsR0FBVyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRixJQUFNLFlBQVksR0FBRyxvREFBb0QsQ0FBQztJQUMxRSxNQUFNLElBQUksS0FBSyxDQUFJLGNBQWMsVUFBTyxZQUFjLENBQUMsQ0FBQztBQUMxRCxDQUFDIn0=