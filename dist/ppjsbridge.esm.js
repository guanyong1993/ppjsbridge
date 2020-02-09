/*!@apeiwan/ppjsbridge released@1.0.0*/
import mitt from 'mitt';
import uuidv4 from 'uuid/v4';

/**
 * 常量控制
 */
const ua = window.navigator.userAgent;

const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
const isPiPiApp = /pipipeiwan/i.test(window.navigator.userAgent);
const rootVersion = '1.1.7';
const os = android ? 'android' : (ipad || ipod || iphone) ? 'ios' : 'pc';

/**
 * emitter
 */

const emitter = mitt();

/**
 * 对比字符串版本号的大小，返回1则v1大于v2，返回-1则v1小于v2，返回0则v1等于v2
 * @author xxcanghai@博客园
 * @param {string} v1 要进行比较的版本号1
 * @param {string} v2 要进行比较的版本号2
 * @link https://www.cnblogs.com/xxcanghai/p/6007136.html
 * @returns
 */
const versionCompare = function (v1, v2) {
  let GTR = 1; //大于
  let LSS = -1; //小于
  let EQU = 0; //等于
  let v1arr = String(v1).split(".").map(function (a) {
    return parseInt(a);
  });
  let v2arr = String(v2).split(".").map(function (a) {
    return parseInt(a);
  });
  let arrLen = Math.max(v1arr.length, v2arr.length);
  let result;

  //排除错误调用
  if (v1 == undefined || v2 == undefined) {
    throw new Error();
  }

  //检查空字符串，任何非空字符串都大于空字符串
  if (v1.length == 0 && v2.length == 0) {
    return EQU;
  } else if (v1.length == 0) {
    return LSS;
  } else if (v2.length == 0) {
    return GTR;
  }

  //循环比较版本号
  for (let i = 0; i < arrLen; i++) {
    result = Comp(v1arr[i], v2arr[i]);
    if (result == EQU) {
      continue;
    } else {
      break;
    }
  }
  return result;

  /**
   * @return {number}
   */
  function Comp(n1, n2) {
    if (typeof n1 != "number") {
      n1 = 0;
    }
    if (typeof n2 != "number") {
      n2 = 0;
    }
    if (n1 > n2) {
      return GTR;
    } else if (n1 < n2) {
      return LSS;
    } else {
      return EQU;
    }
  }
};

/**
 * 查看是否支持指定的版本功能
 * @param {string|object=} version 版本号
 * @returns {boolean}
 */
let isCanIUse = function (version) {
  const FLPPJSBridge = window.FLPPJSBridge || {};
  let appVer = FLPPJSBridge.version;
  if (!appVer) return false;
  if (isPiPiApp) {
    if (os === 'ios') {
      let pointIOSVer = (typeof version === 'object' ? version.ios : version) || rootVersion;
      return versionCompare(appVer, pointIOSVer) > -1
    } else {
      let pointAndroidVer = (typeof version === 'object' ? version.android : version) || rootVersion;
      return versionCompare(appVer, pointAndroidVer) > -1
    }
  } else {
    return false;
  }
};

let getToken = function () {
  return isPiPiApp ? sessionStorage.getItem('token') || '' : '';
};

/**
 * 获取 app 版本
 * @returns {string}
 */
let getEnv = function () {
  const FLPPJSBridge = window.FLPPJSBridge || {};
  return isPiPiApp ? (typeof window.FLPPJSBridge === 'object' ? (FLPPJSBridge.env + '').toUpperCase() || undefined : '') : '';
};

let getVersion = function () {
  const FLPPJSBridge = window.FLPPJSBridge || {};
  return isPiPiApp ? (typeof window.FLPPJSBridge === 'object' ? FLPPJSBridge.version : '') : '';
};

/**
 * 判读 app 是否登录
 * @returns {string}
 */
let isLogin = function () {
  return isPiPiApp ? !!sessionStorage.getItem('token') : '';
};

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
    emitter.emit(_event_uuid_name, res);
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

/**
 * 将JSON对象拼接成GET URL形式参数
 * @param {object} params
 * @param {string=} symbol - 链接符号 默认'&'
 * @returns {string}
 */
const getStitchingUrlParams = function (params, symbol = '&') {
  let strParams = '';
  for (let keyItem in params) {
    let value = params[keyItem];
    if (value !== '') {
      strParams += keyItem + '=' + encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value) + symbol;
    }
  }
  return strParams ? strParams.substr(0, strParams.length - 1) : ""
};

/**
 * 获取url的hash和search值
 * @param {string} [url=window.location.href] url
 * @returns {{hash_str:string,search_str:string}}
 * */
const getUrlHashSearchStr = function (url) {
  let hash_str = window.location.hash;
  let search_str = window.location.search;
  if (url) {
    let url_hash_index = url.indexOf('#');
    let url_search_index = url.indexOf('?');
    hash_str = url_hash_index !== -1 ? url.substr(url_hash_index) : '';
    if (url_search_index < url_hash_index || (url_search_index !== -1 && url_hash_index === -1)) {
      let length = url_search_index < url_hash_index ? url_hash_index - url_search_index : url.length;
      search_str = url.substr(url_search_index, length);
    } else {
      search_str = '';
    }
  }
  return {
    hash_str: hash_str,
    search_str: search_str
  };
};

/**
 * 获取请求的url所有参数(包含search，和 hash)
 * @param url {string=} [window.location.href]
 * @returns {{}}
 */
const getRequestUrlParam = function (url) {
  let urlHashSearchStr = getUrlHashSearchStr(url);
  let hash_str = urlHashSearchStr.hash_str;
  let search_str = urlHashSearchStr.search_str;
  let hash_str_params_index = hash_str.indexOf('?');
  hash_str = hash_str_params_index !== -1 ? hash_str.substr(hash_str_params_index + 1) + '&' : '';
  let search_str_params_index = search_str.indexOf('?');
  if (search_str_params_index !== -1) {
    search_str = search_str.substr(search_str_params_index + 1);
  }
  let getRequestUrlParams = {};
  if (hash_str_params_index !== -1 || search_str_params_index !== -1) {
    let params_format_url = (hash_str + search_str).split("&");
    for (let i = 0; i < params_format_url.length; i++) {
      let param = params_format_url[i].split("=");
      if (param[0]) {
        let _value = '';
        try {
          _value = decodeURIComponent(param[1]);
        } catch (e) {
          _value = param[1];
        }
        getRequestUrlParams[param[0]] = _value;
      }
    }
  }
  return getRequestUrlParams;
};

/**
 * 原生接口
 */

let InvokeTypes = {
  func: {
    login: 'func.login',
    back: 'func.goBack',
    ready: 'func.ready',
    openAppPage: 'func.openAppPage',
  }
};

let Token = {};

/**
 * token 格式化
 * @param {string=} token
 * @returns {string}
 */
Token.format = function (token) {
  return token === '' || token === 'null' ? '' : token
};

/**
 * 设置 token 值
 * @param {string=} token
 */
Token.set = function (token) {
  let tokenFormat = Token.format(token);
  if (tokenFormat) {
    sessionStorage.setItem('token', tokenFormat);
  }
};

/**
 * 格式化特殊方法返回的 res.data 格式参数
 * @param {function=} handle
 * @param {object} res
 */
function formatAppData(handle, res) {
  const {data = {}} = res;
  if (data.token) {
    Token.set(data.token);
  }
  handle && handle({data: getApp(), action: res.action, message: res.message}, getApp());
}

/**
 * 拉起 app 登录
 * @param {function=} handle - 回调
 */
let login = function (handle) {

  invoke({
    cmd: InvokeTypes.func.login,
    handle: function (res) {
      formatAppData(handle,res);
    },
    version: '1.2.9'
  });
};

/**
 * 监听页面 jsBridge 是否已注入完毕
 * @param {function} handle -
 */
let ready = function (handle) {
  function jsBridgeReady() {
    if (window.FLPPJSBridge) {
      formatAppData(handle, {data: window.FLPPJSBridge, action: 'success', message: ''});
    } else {
      invoke({
        cmd: InvokeTypes.func.ready,
        handle: function (res) {
          formatAppData(handle, res);
        }
      });
    }
  }

  if (window.FLPPJSBridge) {
    formatAppData(handle, {data: window.FLPPJSBridge, action: 'success', message: ''});
  } else if (document.readyState === "complete") {
    jsBridgeReady();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      jsBridgeReady();
    }, true);
  }
};

/**
 * 打开一个新窗口，加载 (原生/web) 网址
 * @param {object} params
 * @param {string=} params.version  -- 版本号
 * @param {string|object} params.ios  -- 皮皮pipi ios 链接
 * @param {string} params.query  -- android & ios 原生路由地址的共同参数
 * @param {string=} params.url  -- 如果传递了此参数，代表在 app 的环境中打开新的窗口是加载这个链接，ios & android 参数将失效
 * @param {string |object} params.android  -- 皮皮pipi  android 链接
 * @param {string} params.href -- 非app环境下，如果传递了链接，会进行打开
 * @param {handle} params.handle -- 回调
 */
let openWindow = function (params) {
  if (isPiPiApp) {
    let version = params.version || '';
    let versionSystem = {};
    let androidQuery = {};
    let iOSQuery = {};
    let iOSUrl = params.ios;
    let androidUrl = params.android;
    if (typeof params.android === 'object') {
      versionSystem['android'] = params.android.version || '';
      androidQuery = params.android.query || {};
      androidUrl = params.android.url;
    }
    if (typeof params.ios === 'object') {
      versionSystem['ios'] = params.ios.version || '';
      iOSQuery = params.ios.query || {};
      iOSUrl = params.ios.url;
    }
    version = version || versionSystem;

    let addUrlParams = function (url, stitchingUrlParams, symbol = '&') {
      let params_prefix = url.indexOf('?') !== -1 ? symbol : '?';
      return url + (stitchingUrlParams ? params_prefix : '') + stitchingUrlParams;
    };
    if (params.url) {
      const webUrl = params.url;
      iOSQuery = {};
      androidUrl = {};
      // eslint-disable-next-line no-undef
      // ios 的一些参数特别处理
      const urlParams = getRequestUrlParam(webUrl);
      let iOSParam = {};
      if (urlParams.hideNavi !== undefined) {
        iOSParam['hideNavi'] = urlParams.hideNavi;
      }
      if (urlParams.title !== undefined) {
        iOSParam['title'] = urlParams.title;
      }
      let iOSParamStr = getStitchingUrlParams(iOSParam);
      iOSParamStr = iOSParamStr ? '&' + iOSParamStr : '';
      iOSUrl = 'FLWebPageViewController?urlString=' + encodeURIComponent(params.url) + iOSParamStr;
      androidUrl = 'WebViewActivity?url=' + encodeURIComponent(params.url);
    }
    const formatNativeQuery = function () {
      const query = params.query;
      let formatQuery = {};
      let routeOSQuery = {
        ios: {},
        android: {}
      };
      for (let key in query) {
        const _key = key + '';
        if (_key.indexOf('[') !== -1) {
          const paramsAry = _key.substr(1, _key.length - 2).split(',');
          for (let i = 0; i < paramsAry.length; i++) {
            const [os, name] = paramsAry[i].split(':');
            routeOSQuery[os][name] = query[key];
          }
        } else {
          formatQuery[key] = query[key];
        }
      }
      return {...formatQuery, ...routeOSQuery[os]}
    };
    return invoke({
      version,
      data: {
        para: JSON.stringify({
          ios: {
            ios_route: addUrlParams(iOSUrl, getStitchingUrlParams({...iOSQuery, ...formatNativeQuery()})),
          },
          android: {
            androidRoute: addUrlParams(androidUrl, getStitchingUrlParams({...androidQuery, ...formatNativeQuery()})),
          }
        }[os])
      },
      cmd: InvokeTypes.func.openAppPage,
      handle: params.handle
    });
  } else if (params.href) {
    window.location.href = params.href;
  }
};

/**
 * 返回上一个窗口
 */
let back = function () {

  invoke({
    cmd: InvokeTypes.func.back,
  });
};

var index = {
  os,
  isPiPiApp,
  invoke,
  isCanIUse,
  login,
  ready,
  openWindow,
  getToken,
  getVersion,
  getEnv,
  getApp,
  isLogin,
  back,
  getStitchingUrlParams,
  getRequestUrlParam
};

export default index;
