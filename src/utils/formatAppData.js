import {Token} from "./Token";
import getApp from "../exports/getApp";

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

export default formatAppData
