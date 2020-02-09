import InvokeTypes from "../utils/invoke.types";
import invoke from './invoke'
import formatAppData from "../utils/formatAppData";

/**
 * 拉起 app 登录
 * @param {function=} handle - 回调
 */
let login = function (handle) {

  invoke({
    cmd: InvokeTypes.func.login,
    handle: function (res) {
      formatAppData(handle,res)
    },
    version: '1.2.9'
  });
};

export default login
