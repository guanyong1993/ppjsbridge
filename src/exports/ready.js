import InvokeTypes from "../utils/invoke.types";
import invoke from './invoke'
import formatAppData from "../utils/formatAppData";


/**
 * 监听页面 jsBridge 是否已注入完毕
 * @param {function} handle -
 */
let ready = function (handle) {
  function jsBridgeReady() {
    if (window.FLPPJSBridge) {
      formatAppData(handle, {data: window.FLPPJSBridge, action: 'success', message: ''})
    } else {
      invoke({
        cmd: InvokeTypes.func.ready,
        handle: function (res) {
          formatAppData(handle, res)
        }
      });
    }
  }

  if (window.FLPPJSBridge) {
    formatAppData(handle, {data: window.FLPPJSBridge, action: 'success', message: ''})
  } else if (document.readyState === "complete") {
    jsBridgeReady()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      jsBridgeReady();
    }, true)
  }
};

export default ready
