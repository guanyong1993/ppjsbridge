export let Token = {};

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
