import InvokeTypes from "../utils/invoke.types";
import invoke from './invoke'
import {isPiPiApp, os} from '../utils/constant'
import {getRequestUrlParam, getStitchingUrlParams} from "../utils/url";


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
        iOSParam['hideNavi'] = urlParams.hideNavi
      }
      if (urlParams.title !== undefined) {
        iOSParam['title'] = urlParams.title
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

export default openWindow
