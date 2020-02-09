import InvokeTypes from "../utils/invoke.types";
import invoke from './invoke'

/**
 * 返回上一个窗口
 */
let back = function () {

  invoke({
    cmd: InvokeTypes.func.back,
  });
};

export default back
