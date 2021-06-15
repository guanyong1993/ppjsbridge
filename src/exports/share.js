import invoke from "./invoke";
import InvokeTypes from "../utils/invoke.types";
import {addUrlParams, getRequestUrlParam, getStitchingUrlParams} from "../utils/url";
import {isPiPiApp} from "../utils/constant";

/**
 * 站外分享url设定的 key
 * @type {string}
 */
const APP_SHARE_URL_KEY = '_ppjsbridge_shareurl_';

/**
 * 初始化时，需要判断是否在app环境内打开了站外分享的链接，
 */
(function () {
  const params = getRequestUrlParam();
  if (params[APP_SHARE_URL_KEY] && !isPiPiApp) {
    window.location.replace(params[APP_SHARE_URL_KEY])
  }
})();

/**
 * 分享
 * @param {object} params
 * @param {object} params.data
 * @param {string} params.data.url  -- 分享出去用户打开的url链接
 * @param {string=} params.data.copy  -- 分享浮层中，点击 `复制链接` 的url,如果不传默认用的 `url`参数
 * @param {string} params.data.content  -- 分享的标题
 * @param {string} params.data.title  -- 分享的内容
 * @param {string} params.data.image  -- 分享的图片,300*300 jpg格式，不要圆角
 * @param {object} setting
 * @param {string=} setting.appOpenUrl -- app内打开的url，有一些是把分享的url给内部分享，会导致打开的是站外的页面，需要处理一下
 */
export const share = function (params, setting) {
  let {data} = params;
  let options = {...data, copy: data.copy || data.url};
  if (setting.appOpenUrl) {
    options['copy'] = addUrlParams(setting.appOpenUrl, getStitchingUrlParams({[APP_SHARE_URL_KEY]: options['copy']}))
    options['url'] = addUrlParams(setting.appOpenUrl, getStitchingUrlParams({[APP_SHARE_URL_KEY]: options['url']}))
  }
  params['data'] = options;
  invoke({
    cmd: InvokeTypes.func.share,
    ...params
  });
}

/**
 * 格式化分享的url,针对有一些需要格式化处理
 * @param shareUrl {string} -- 分享的URl
 * @param appOpenUrl {string} -- 在app内打开的url
 */
export const getFormatShareUrl = function (shareUrl, appOpenUrl) {
  return addUrlParams(appOpenUrl, getStitchingUrlParams({[APP_SHARE_URL_KEY]: shareUrl}))
}
