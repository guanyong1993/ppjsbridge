import getToken from "./getToken";
import getEnv from "./getEnv";
import getVersion from "./getVersion";
import isLogin from "./isLogin";
import {os} from "../utils/constant";

/**
 * 获取 app 特征信息
 */
let getApp = function () {
  return {
    ...window.FLPPJSBridge,
    token: getToken(),
    env: getEnv(),
    version: getVersion(),
    isLogin: isLogin(),
    os: os
  }
};

export default getApp
