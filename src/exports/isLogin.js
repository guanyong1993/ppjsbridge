import {isPiPiApp} from '../utils/constant'

/**
 * 判读 app 是否登录
 * @returns {string}
 */
let isLogin = function () {
  return isPiPiApp ? !!sessionStorage.getItem('token') : '';
};

export default isLogin
