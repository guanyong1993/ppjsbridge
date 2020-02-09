/**
 * 将JSON对象拼接成GET URL形式参数
 * @param {object} params
 * @param {string=} symbol - 链接符号 默认'&'
 * @returns {string}
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
 * 获取url的hash和search值
 * @param {string} [url=window.location.href] url
 * @returns {{hash_str:string,search_str:string}}
 * */
export const getUrlHashSearchStr = function (url) {
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
export const getRequestUrlParam = function (url) {
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
