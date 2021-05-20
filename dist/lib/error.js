"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerKnownErrors = void 0;
var RESOURCE_ALREADY_EXIST_ERR_MSG = 'already exists';
var DIAGNOSTICS = 'Diagnostics';
var REQUESTID = 'RequestId';
var DURATION = 'Duration';
var SET_VPC_ID_ERROR = 'has a problem: "vpc_config.0.vpc_id": this field cannot be set';
function handlerKnownErrors(e) {
    var message = e.message;
    if (message.includes(RESOURCE_ALREADY_EXIST_ERR_MSG)) {
        handlerReourceAlreadyExistErr(message);
    }
    else if (message.includes(REQUESTID)) {
        handlerUnkonwnErrWithRequestID(message);
    }
    else if (message.includes(SET_VPC_ID_ERROR)) {
        handlerSetVpcIDError();
    }
}
exports.handlerKnownErrors = handlerKnownErrors;
function handlerSetVpcIDError() {
    throw new Error('please delete vpcConfig/vpcId under the service');
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sOEJBQThCLEdBQUcsZ0JBQWdCLENBQUM7QUFDeEQsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQ2xDLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBTSxnQkFBZ0IsR0FBRyxnRUFBZ0UsQ0FBQztBQUcxRixTQUFnQixrQkFBa0IsQ0FBQyxDQUFRO0lBQ2pDLElBQUEsT0FBTyxHQUFLLENBQUMsUUFBTixDQUFPO0lBRXRCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1FBQ3BELDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3RDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDO1NBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDN0Msb0JBQW9CLEVBQUUsQ0FBQztLQUN4QjtBQUNILENBQUM7QUFWRCxnREFVQztBQUVELFNBQVMsb0JBQW9CO0lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyw4QkFBOEIsQ0FBQyxNQUFjO0lBQ3BELElBQU0sUUFBUSxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsSUFBTSxNQUFNLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELFNBQVMsNkJBQTZCLENBQUMsTUFBYztJQUNuRCxJQUFNLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQztJQUNsQyxJQUFNLG1CQUFtQixHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsaUNBQWlDO0lBQ2pDLElBQU0sY0FBYyxHQUFXLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLElBQU0sWUFBWSxHQUFHLG9EQUFvRCxDQUFDO0lBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUksY0FBYyxVQUFPLFlBQWMsQ0FBQyxDQUFDO0FBQzFELENBQUMifQ==