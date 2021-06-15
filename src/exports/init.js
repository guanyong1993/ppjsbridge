const DEFAULT_CONFIG = {
  console: false
}

window['_PPJSBridge_'] = DEFAULT_CONFIG;

/**
 * PPJSBridge初始化
 * @param {object} params
 * @param {boolean=} params.console
 */
const init = function (params = {}) {
  const jsBridge = document.getElementById('PPJSBridge');
  let console = DEFAULT_CONFIG.console;
  if (jsBridge) {
    console = jsBridge.getAttribute('console');
    if (typeof console === 'string') {
      console = console.indexOf('production') !== -1 ? false : Boolean(console);
    }
  }
  console = params.console === undefined ? console : params.console;
  window['_PPJSBridge_'] = {
    ...window['_PPJSBridge_'],
    console,
  }
}
init();

export default init
