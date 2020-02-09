import {isPiPiApp} from '../utils/constant'

/**
 * 获取 app 版本
 * @returns {string}
 */
let getEnv = function () {
  const FLPPJSBridge = window.FLPPJSBridge || {};
  return isPiPiApp ? (typeof window.FLPPJSBridge === 'object' ? (FLPPJSBridge.env + '').toUpperCase() || undefined : '') : '';
};

export default getEnv
