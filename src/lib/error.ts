const RESOURCE_ALREADY_EXIST_ERR_MSG = 'already exists';
const DIAGNOSTICS = 'Diagnostics';
const REQUESTID = 'RequestId';
const DURATION = 'Duration';
const SET_VPC_ID_ERROR = 'has a problem: "vpc_config.0.vpc_id": this field cannot be set';


export function handlerKnownErrors(e: Error) {
  const { message } = e;

  if (message.includes(RESOURCE_ALREADY_EXIST_ERR_MSG)) {
    handlerReourceAlreadyExistErr(message);
  } else if (message.includes(REQUESTID)) {
    handlerUnkonwnErrWithRequestID(message);
  } else if (message.includes(SET_VPC_ID_ERROR)) {
    handlerSetVpcIDError();
  }
}

function handlerSetVpcIDError(): void {
  throw new Error('please delete vpcConfig/vpcId under the service');
}

function handlerUnkonwnErrWithRequestID(errMsg: string): void {
  const startIdx: number = errMsg.indexOf(DIAGNOSTICS);
  const endIdx: number = errMsg.indexOf(DURATION);
  throw new Error(errMsg.substring(startIdx, endIdx));
}

function handlerReourceAlreadyExistErr(errMsg: string): void {
  const re = /"ErrorMessage":.*$/gm;
  const errMsgInDiagnostics: string = errMsg.match(re)[0];
  // 去除 "ErrorMessage": 开头，并删除首位双引号
  const resolvedErrMsg: string = errMsgInDiagnostics.substr(16).replace(/['"]+/g, '');
  const recommendStr = 'please add import and protect options in your yaml';
  throw new Error(`${resolvedErrMsg }, ${ recommendStr}`);
}

