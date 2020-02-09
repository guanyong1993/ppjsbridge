import {isPiPiApp, os, rootVersion} from './constant'
import {versionCompare} from "./versionCompare";


/**
 * 查看是否支持指定的版本功能
 * @param {string|object=} version 版本号
 * @returns {boolean}
 */
export let isCanIUse = function (version) {
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
