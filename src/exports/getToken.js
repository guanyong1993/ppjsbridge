import {isPiPiApp} from '../utils/constant'

let getToken = function () {
  return isPiPiApp ? window.PPJSBridgeReady ? sessionStorage.getItem('token') : localStorage.getItem('token') : '';
};

export default getToken
