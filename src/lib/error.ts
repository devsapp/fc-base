const RESOURCE_ALREADY_EXIST_ERR_MSG = 'already exists';

export function handlerKnownErrors(e: Error) {
  const { message } = e;

  if (message.includes(RESOURCE_ALREADY_EXIST_ERR_MSG)) {
    handlerReourceAlreadyExistErr(message);
  }
}

function handlerReourceAlreadyExistErr(errMsg: string) {
  const re = /"ErrorMessage":.*$/gm;
  const errMsgInDiagnostics: string = errMsg.match(re)[0];
  // 去除 "ErrorMessage": 开头，并删除首位双引号
  const resolvedErrMsg: string = errMsgInDiagnostics.substr(16).replace(/['"]+/g, '');
  const recommendStr = 'please add import and protect options in your yaml';
  throw new Error(`${resolvedErrMsg }, ${ recommendStr}`);
}

