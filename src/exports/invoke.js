import {os} from "../utils/constant";
import emitter from "../utils/emitter";
import {isPiPiApp} from "../utils/constant"
import {isCanIUse} from "../utils/canIUse"
import getApp from "./getApp";
import uuidv4 from 'uuid/v4'

/**
 * 返回指定调用的回调参数
 * @param res
 * @param params
 */
const handleOptions = function (res, params = {}) {
  const action = res.action;
  if (params.handle) {
    params.handle(res, getApp());
    return;
  }
  if (action === 'success') {
    params.success && params.success(res, getApp());
  }
  if (action === 'fail') {
    params.fail && params.fail(res, getApp());
  }
  params.complete && params.complete(res, getApp());
};

/**
 * 验证命令参数是否正确
 * @param {object} params
 * @param {object=} params.version
 * @param {string} params.cmd
 * @returns {boolean}
 */
let postMessageValidate = function (params) {
  let handleErrorResult = {};
  if (!isPiPiApp) {
    handleErrorResult = {message: 'not pipiapp environment', action: 'notApp'};
  } else if (params.version && !isCanIUse(params.version)) {
    handleErrorResult = {message: 'not use api,because app notSupport', action: 'notSupport'};
  }
  if (handleErrorResult.action) {
    handleOptions(handleErrorResult, params);
    return false;
  }
  return true;
};


/**
 * h5 调用 oc/java 的入口
 * @param {object} params
 * @param {string=} params.handle - oc/java 回调的名称,在window中全局的字符串方法
 * @param {object=} params.data - 传递的参数对象
 * @param {string} params.cmd - 调用的原生的方法的名称 (须与原生协商好是否存在)
 */
let postMessage = function (params) {
  /**
   * postMessage 调用拦截
   * @returns {boolean}
   */

  let options ={... params};
  let cmd = options.cmd;
  if (cmd.indexOf('.') !== -1) {
    cmd = cmd.split('.');
    options['api'] = cmd[1];
    cmd = cmd[0];
  }
  if (os === 'ios') {
    return window.webkit.messageHandlers[cmd].postMessage(options)
  } else if (os === 'android') {
    return window['flppAndroid' + cmd].postMessage(JSON.stringify(options));
  }
};

/**
 * 事件监听
 * @param {object | function} handle
 * @param {object} params
 * @param {string} params.cmd
 * @param {function=} params.success
 * @param {function=} params.fail
 * @param {function=} params.complete
 * @returns {string | undefined}
 */
let postMessageEmitEvent = function (handle, params) {

  if (!handle) return;
  // 是否保持回调，为了释放uuid的方法的内容，在方法得到响应后释放内存
  // 如果需要为了保持类似native需要保持回调的话，就 handle 给一个对象，里面加上 keep:true
  let keep = false;
  let callBack = handle;
  if (typeof handle === 'object') {
    callBack = handle.callBack;
    keep = !!handle.keep;
  }

  let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let first_random_letter = letter[Math.round(Math.random() * 25)];

  let _event_uuid_name = first_random_letter + uuidv4().replace(/-/g, '');

  emitter.on(_event_uuid_name, res => {
    const cmd = params.cmd;
    // todo 如果 ready 方式调用，此时第一次是没有app信息，所以ready方式的话，就先将全部对象赋值一次,这样 getApp() 才有数据返回
    if ((cmd === 'func.ready' || cmd === 'func.login') && !window.FLPPJSBridge) {
      window.FLPPJSBridge = res.data;
    }
    handleOptions(res, params);
    // callBack(res, getApp())
    // returnHandle(res, params);
    // 是否保持回调，为了释放uuid 的方法的内容，在方法得到响应后释放内存
    // 如果需要为了保持类似native需要保持回调的话，就 handle 给一个对象，里面加上 keep:true
    if (!keep) {
      emitter.off(_event_uuid_name, callBack);
      delete window[_event_uuid_name];
    }
  });

  window[_event_uuid_name] = function (res) {
    emitter.emit(_event_uuid_name, res)
  };

  return _event_uuid_name
};

/**
 * 调用原生 api
 * @param {object} params
 * @param {string} params.cmd
 * @param {function=} params.success
 * @param {function=} params.handle
 * @param {function=} params.fail
 * @param {function=} params.success
 * @param {function=} params.complete
 * @param {object=} params.data - 传递的参数对象
 * @param {string=|object=} params.version - 依赖的app版本号
 */
let invoke = function (params) {
  if (!postMessageValidate(params)) return;
  let {handle} = params;
  const nativeParams = {cmd: params.cmd};
  if (handle) {
    nativeParams['handle'] = postMessageEmitEvent(handle, params);
  }
  if (params.data) {
    nativeParams['data'] = params.data;
  }
  postMessage(nativeParams);
};

export default invoke
