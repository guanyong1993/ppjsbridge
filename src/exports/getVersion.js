import {isPiPiApp} from '../utils/constant'

let getVersion = function () {
  const FLPPJSBridge = window.FLPPJSBridge || {};
  return isPiPiApp ? (typeof window.FLPPJSBridge === 'object' ? FLPPJSBridge.version : '') : '';
};

export default getVersion
