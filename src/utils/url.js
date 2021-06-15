/**
 * 将JSON对象拼接成GET URL形式参数
 * @param {object} params
 * @param {string=} symbol - 链接符号 默认'&'
 * @returns {string} -参数链接的字符地址
 */
export const getStitchingUrlParams = function (params, symbol = '&') {
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
 * 给 url 添加参数
 * @param {string} url
 * @param {string=} stitchingUrlParams
 * @return {string} - 格式化后的url
 */
export const addUrlParams = function (url, stitchingUrlParams) {
  let paramsPrefix = url.indexOf('?') !== -1 ? '&' : '?';
  return url + (stitchingUrlParams ? paramsPrefix : '') + stitchingUrlParams;
}

/**
 * 获取url的hash和search值
 * @param {string} [url=window.location.href] url
 * @returns {{hashStr:string,searchStr:string}}
 * */
export const getUrlHashSearchStr = function (url) {
  let hashStr = window.location.hash;
  let searchStr = window.location.search;
  if (url) {
    let urlHashIndex = url.indexOf('#');
    let urlSearchIndex = url.indexOf('?');
    hashStr = urlHashIndex !== -1 ? url.substr(urlHashIndex) : '';
    if (urlSearchIndex < urlHashIndex || (urlSearchIndex !== -1 && urlHashIndex === -1)) {
      let length = urlSearchIndex < urlHashIndex ? urlHashIndex - urlSearchIndex : url.length;
      searchStr = url.substr(urlSearchIndex, length);
    } else {
      searchStr = '';
    }
  }
  return {
    hashStr: hashStr,
    searchStr: searchStr
  };
};

/**
 * 获取请求的url所有参数(包含search，和 hash)
 * @param url {string=} [window.location.href]
 * @param splitStr {string=} 分割的符号识别
 * @returns {{}}
 */
export const getRequestUrlParam = function (url, splitStr = '?') {
  if (splitStr !== '?' && url.indexOf('&') !== -1) {
    let splitStrIndex = url.indexOf('&');
    url = url.substr(0, splitStrIndex) + '?' + url.substr(splitStrIndex);
  }
  let urlHashSearchStr = getUrlHashSearchStr(url);
  let hashStr = urlHashSearchStr.hashStr;
  let searchStr = urlHashSearchStr.searchStr;
  let hashStrParamsIndex = hashStr.indexOf('?');
  hashStr = hashStrParamsIndex !== -1 ? hashStr.substr(hashStrParamsIndex + 1) + '&' : '';
  let searchStrParamsIndex = searchStr.indexOf('?');
  if (searchStrParamsIndex !== -1) {
    searchStr = searchStr.substr(searchStrParamsIndex + 1);
  }
  let getRequestUrlParams = {};
  if (hashStrParamsIndex !== -1 || searchStrParamsIndex !== -1) {
    let paramsFormatUrl = (hashStr + searchStr).split("&");
    for (let i = 0; i < paramsFormatUrl.length; i++) {
      let param = paramsFormatUrl[i].split("=");
      if (param[0]) {
        let value = '';
        try {
          value = decodeURIComponent(param[1]);
        } catch (e) {
          value = param[1];
        }
        getRequestUrlParams[param[0]] = value;
      }
    }
  }
  return getRequestUrlParams;
};
