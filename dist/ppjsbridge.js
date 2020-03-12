/*!@apeiwan/ppjsbridge released@0.1.4*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PPJSBridge = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * 常量控制
   */
  var ua = window.navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var isPiPiApp = /pipipeiwan/i.test(window.navigator.userAgent);
  var rootVersion = '1.1.7';
  var os = android ? 'android' : ipad || ipod || iphone ? 'ios' : 'pc';

  function n(n){return n=n||Object.create(null),{on:function(c,e){(n[c]||(n[c]=[])).push(e);},off:function(c,e){n[c]&&n[c].splice(n[c].indexOf(e)>>>0,1);},emit:function(c,e){(n[c]||[]).slice().map(function(n){n(e);}),(n["*"]||[]).slice().map(function(n){n(c,e);});}}}var mitt=n;

  /**
   * emitter
   */
  var emitter = mitt();

  /**
   * 对比字符串版本号的大小，返回1则v1大于v2，返回-1则v1小于v2，返回0则v1等于v2
   * @author xxcanghai@博客园
   * @param {string} v1 要进行比较的版本号1
   * @param {string} v2 要进行比较的版本号2
   * @link https://www.cnblogs.com/xxcanghai/p/6007136.html
   * @returns
   */
  var versionCompare = function versionCompare(v1, v2) {
    var GTR = 1; //大于

    var LSS = -1; //小于

    var EQU = 0; //等于

    var v1arr = String(v1).split(".").map(function (a) {
      return parseInt(a);
    });
    var v2arr = String(v2).split(".").map(function (a) {
      return parseInt(a);
    });
    var arrLen = Math.max(v1arr.length, v2arr.length);
    var result; //排除错误调用

    if (v1 == undefined || v2 == undefined) {
      throw new Error();
    } //检查空字符串，任何非空字符串都大于空字符串


    if (v1.length == 0 && v2.length == 0) {
      return EQU;
    } else if (v1.length == 0) {
      return LSS;
    } else if (v2.length == 0) {
      return GTR;
    } //循环比较版本号


    for (var i = 0; i < arrLen; i++) {
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

  var isCanIUse = function isCanIUse(version) {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    var appVer = FLPPJSBridge.version;
    if (!appVer) return false;

    if (isPiPiApp) {
      if (os === 'ios') {
        var pointIOSVer = (_typeof(version) === 'object' ? version.ios : version) || rootVersion;
        return versionCompare(appVer, pointIOSVer) > -1;
      } else {
        var pointAndroidVer = (_typeof(version) === 'object' ? version.android : version) || rootVersion;
        return versionCompare(appVer, pointAndroidVer) > -1;
      }
    } else {
      return false;
    }
  };

  var getToken = function getToken() {
    return isPiPiApp ? sessionStorage.getItem('token') || '' : '';
  };

  /**
   * 获取 app 版本
   * @returns {string}
   */

  var getEnv = function getEnv() {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    return isPiPiApp ? _typeof(window.FLPPJSBridge) === 'object' ? (FLPPJSBridge.env + '').toUpperCase() || undefined : '' : '';
  };

  var getVersion = function getVersion() {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    return isPiPiApp ? _typeof(window.FLPPJSBridge) === 'object' ? FLPPJSBridge.version : '' : '';
  };

  /**
   * 判读 app 是否登录
   * @returns {string}
   */

  var isLogin = function isLogin() {
    return isPiPiApp ? !!sessionStorage.getItem('token') : '';
  };

  /**
   * 获取 app 特征信息
   */

  var getApp = function getApp() {
    return _objectSpread2({}, window.FLPPJSBridge, {
      token: getToken(),
      env: getEnv(),
      version: getVersion(),
      isLogin: isLogin(),
      os: os
    });
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var rngBrowser = createCommonjsModule(function (module) {
  // Unique ID creation requires a high quality random # generator.  In the
  // browser this is a little complicated due to unknown quality of Math.random()
  // and inconsistent support for the `crypto` API.  We do the best we can via
  // feature-detection

  // getRandomValues needs to be invoked in a context where "this" is a Crypto
  // implementation. Also, find the complete implementation of crypto on IE11.
  var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                        (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

  if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    module.exports = function whatwgRNG() {
      getRandomValues(rnds8);
      return rnds8;
    };
  } else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    module.exports = function mathRNG() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    };
  }
  });

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]]
    ]).join('');
  }

  var bytesToUuid_1 = bytesToUuid;

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || rngBrowser)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

  /**
   * 返回指定调用的回调参数
   * @param res
   * @param params
   */

  var handleOptions = function handleOptions(res) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var action = res.action;

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


  var postMessageValidate = function postMessageValidate(params) {
    var handleErrorResult = {};

    if (!isPiPiApp) {
      handleErrorResult = {
        message: 'not pipiapp environment',
        action: 'notApp'
      };
    } else if (params.version && !isCanIUse(params.version)) {
      handleErrorResult = {
        message: 'not use api,because app notSupport',
        action: 'notSupport'
      };
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


  var postMessage = function postMessage(params) {
    /**
     * postMessage 调用拦截
     * @returns {boolean}
     */
    var options = _objectSpread2({}, params);

    var cmd = options.cmd;

    if (cmd.indexOf('.') !== -1) {
      cmd = cmd.split('.');
      options['api'] = cmd[1];
      cmd = cmd[0];
    }

    if (os === 'ios') {
      return window.webkit.messageHandlers[cmd].postMessage(options);
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


  var postMessageEmitEvent = function postMessageEmitEvent(handle, params) {
    if (!handle) return; // 是否保持回调，为了释放uuid的方法的内容，在方法得到响应后释放内存
    // 如果需要为了保持类似native需要保持回调的话，就 handle 给一个对象，里面加上 keep:true

    var keep = false;
    var callBack = handle;

    if (_typeof(handle) === 'object') {
      callBack = handle.callBack;
      keep = !!handle.keep;
    }

    var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var first_random_letter = letter[Math.round(Math.random() * 25)];

    var _event_uuid_name = first_random_letter + v4_1().replace(/-/g, '');

    emitter.on(_event_uuid_name, function (res) {
      var cmd = params.cmd; // todo 如果 ready 方式调用，此时第一次是没有app信息，所以ready方式的话，就先将全部对象赋值一次,这样 getApp() 才有数据返回

      if ((cmd === 'func.ready' || cmd === 'func.login') && !window.FLPPJSBridge) {
        window.FLPPJSBridge = res.data;
      }

      handleOptions(res, params); // callBack(res, getApp())
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

    return _event_uuid_name;
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


  var invoke = function invoke(params) {
    if (!postMessageValidate(params)) return;
    var handle = params.handle;
    var nativeParams = {
      cmd: params.cmd
    };

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
  var getStitchingUrlParams = function getStitchingUrlParams(params) {
    var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';
    var strParams = '';

    for (var keyItem in params) {
      var value = params[keyItem];

      if (value !== '') {
        strParams += keyItem + '=' + encodeURIComponent(_typeof(value) === 'object' ? JSON.stringify(value) : value) + symbol;
      }
    }

    return strParams ? strParams.substr(0, strParams.length - 1) : "";
  };
  /**
   * 获取url的hash和search值
   * @param {string} [url=window.location.href] url
   * @returns {{hash_str:string,search_str:string}}
   * */

  var getUrlHashSearchStr = function getUrlHashSearchStr(url) {
    var hash_str = window.location.hash;
    var search_str = window.location.search;

    if (url) {
      var url_hash_index = url.indexOf('#');
      var url_search_index = url.indexOf('?');
      hash_str = url_hash_index !== -1 ? url.substr(url_hash_index) : '';

      if (url_search_index < url_hash_index || url_search_index !== -1 && url_hash_index === -1) {
        var length = url_search_index < url_hash_index ? url_hash_index - url_search_index : url.length;
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

  var getRequestUrlParam = function getRequestUrlParam(url) {
    var urlHashSearchStr = getUrlHashSearchStr(url);
    var hash_str = urlHashSearchStr.hash_str;
    var search_str = urlHashSearchStr.search_str;
    var hash_str_params_index = hash_str.indexOf('?');
    hash_str = hash_str_params_index !== -1 ? hash_str.substr(hash_str_params_index + 1) + '&' : '';
    var search_str_params_index = search_str.indexOf('?');

    if (search_str_params_index !== -1) {
      search_str = search_str.substr(search_str_params_index + 1);
    }

    var getRequestUrlParams = {};

    if (hash_str_params_index !== -1 || search_str_params_index !== -1) {
      var params_format_url = (hash_str + search_str).split("&");

      for (var i = 0; i < params_format_url.length; i++) {
        var param = params_format_url[i].split("=");

        if (param[0]) {
          var _value = '';

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
  var InvokeTypes = {
    func: {
      login: 'func.login',
      back: 'func.goBack',
      ready: 'func.ready',
      openAppPage: 'func.openAppPage'
    }
  };

  var Token = {};
  /**
   * token 格式化
   * @param {string=} token
   * @returns {string}
   */

  Token.format = function (token) {
    return token === '' || token === 'null' ? '' : token;
  };
  /**
   * 设置 token 值
   * @param {string=} token
   */


  Token.set = function (token) {
    var tokenFormat = Token.format(token);

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
    var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data;

    if (data.token) {
      Token.set(data.token);
    }

    handle && handle({
      data: getApp(),
      action: res.action,
      message: res.message
    }, getApp());
  }

  /**
   * 拉起 app 登录
   * @param {function=} handle - 回调
   */

  var login = function login(_handle) {
    invoke({
      cmd: InvokeTypes.func.login,
      handle: function handle(res) {
        formatAppData(_handle, res);
      },
      version: '1.2.9'
    });
  };

  /**
   * 监听页面 jsBridge 是否已注入完毕
   * @param {function} handle -
   */

  var ready = function ready(_handle) {
    function jsBridgeReady() {
      if (window.FLPPJSBridge) {
        formatAppData(_handle, {
          data: window.FLPPJSBridge,
          action: 'success',
          message: ''
        });
      } else {
        invoke({
          cmd: InvokeTypes.func.ready,
          handle: function handle(res) {
            formatAppData(_handle, res);
          }
        });
      }
    }

    if (window.FLPPJSBridge) {
      formatAppData(_handle, {
        data: window.FLPPJSBridge,
        action: 'success',
        message: ''
      });
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

  var openWindow = function openWindow(params) {
    if (isPiPiApp) {
      var version = params.version || '';
      var versionSystem = {};
      var androidQuery = {};
      var iOSQuery = {};
      var iOSUrl = params.ios;
      var androidUrl = params.android;

      if (_typeof(params.android) === 'object') {
        versionSystem['android'] = params.android.version || '';
        androidQuery = params.android.query || {};
        androidUrl = params.android.url;
      }

      if (_typeof(params.ios) === 'object') {
        versionSystem['ios'] = params.ios.version || '';
        iOSQuery = params.ios.query || {};
        iOSUrl = params.ios.url;
      }

      version = version || versionSystem;

      var addUrlParams = function addUrlParams(url, stitchingUrlParams) {
        var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';
        var params_prefix = url.indexOf('?') !== -1 ? symbol : '?';
        return url + (stitchingUrlParams ? params_prefix : '') + stitchingUrlParams;
      };

      if (params.url) {
        var webUrl = params.url;
        iOSQuery = {};
        androidUrl = {}; // eslint-disable-next-line no-undef
        // ios 的一些参数特别处理

        var urlParams = getRequestUrlParam(webUrl);
        var iOSParam = {};

        if (urlParams.hideNavi !== undefined) {
          iOSParam['hideNavi'] = urlParams.hideNavi;
        }

        if (urlParams.title !== undefined) {
          iOSParam['title'] = urlParams.title;
        }

        var iOSParamStr = getStitchingUrlParams(iOSParam);
        iOSParamStr = iOSParamStr ? '&' + iOSParamStr : '';
        iOSUrl = 'FLWebPageViewController?urlString=' + encodeURIComponent(params.url) + iOSParamStr;
        androidUrl = 'WebViewActivity?url=' + encodeURIComponent(params.url);
      }

      var formatNativeQuery = function formatNativeQuery() {
        var query = params.query;
        var formatQuery = {};
        var routeOSQuery = {
          ios: {},
          android: {}
        };

        for (var key in query) {
          var _key = key + '';

          if (_key.indexOf('[') !== -1) {
            var paramsAry = _key.substr(1, _key.length - 2).split(',');

            for (var i = 0; i < paramsAry.length; i++) {
              var _paramsAry$i$split = paramsAry[i].split(':'),
                  _paramsAry$i$split2 = _slicedToArray(_paramsAry$i$split, 2),
                  _os = _paramsAry$i$split2[0],
                  name = _paramsAry$i$split2[1];

              routeOSQuery[_os][name] = query[key];
            }
          } else {
            formatQuery[key] = query[key];
          }
        }

        return _objectSpread2({}, formatQuery, {}, routeOSQuery[os]);
      };

      return invoke({
        version: version,
        data: {
          para: JSON.stringify({
            ios: {
              ios_route: addUrlParams(iOSUrl, getStitchingUrlParams(_objectSpread2({}, iOSQuery, {}, formatNativeQuery())))
            },
            android: {
              androidRoute: addUrlParams(androidUrl, getStitchingUrlParams(_objectSpread2({}, androidQuery, {}, formatNativeQuery())))
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

  var back = function back() {
    invoke({
      cmd: InvokeTypes.func.back
    });
  };

  var index = {
    os: os,
    isPiPiApp: isPiPiApp,
    invoke: invoke,
    isCanIUse: isCanIUse,
    login: login,
    ready: ready,
    openWindow: openWindow,
    getToken: getToken,
    getVersion: getVersion,
    getEnv: getEnv,
    getApp: getApp,
    isLogin: isLogin,
    back: back,
    getStitchingUrlParams: getStitchingUrlParams,
    getRequestUrlParam: getRequestUrlParam
  };

  return index;

})));
