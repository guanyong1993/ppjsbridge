import {isPiPiApp} from '../utils/constant'

let getToken = function () {
  return isPiPiApp ? sessionStorage.getItem('token') || '' : '';
};

export default getToken
