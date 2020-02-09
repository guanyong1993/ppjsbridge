/**
 * 对比字符串版本号的大小，返回1则v1大于v2，返回-1则v1小于v2，返回0则v1等于v2
 * @author xxcanghai@博客园
 * @param {string} v1 要进行比较的版本号1
 * @param {string} v2 要进行比较的版本号2
 * @link https://www.cnblogs.com/xxcanghai/p/6007136.html
 * @returns
 */
export const versionCompare = function (v1, v2) {
  let GTR = 1; //大于
  let LSS = -1; //小于
  let EQU = 0; //等于
  let v1arr = String(v1).split(".").map(function (a) {
    return parseInt(a);
  });
  let v2arr = String(v2).split(".").map(function (a) {
    return parseInt(a);
  });
  let arrLen = Math.max(v1arr.length, v2arr.length);
  let result;

  //排除错误调用
  if (v1 == undefined || v2 == undefined) {
    throw new Error();
  }

  //检查空字符串，任何非空字符串都大于空字符串
  if (v1.length == 0 && v2.length == 0) {
    return EQU;
  } else if (v1.length == 0) {
    return LSS;
  } else if (v2.length == 0) {
    return GTR;
  }

  //循环比较版本号
  for (let i = 0; i < arrLen; i++) {
    result = Comp(v1arr[i], v2arr[i]);
    if (result == EQU) {
      continue;
    } else {
      break;
    }
  }
  return result;

  /**
   * @return {number}
   */
  function Comp(n1, n2) {
    if (typeof n1 != "number") {
      n1 = 0;
    }
    if (typeof n2 != "number") {
      n2 = 0;
    }
    if (n1 > n2) {
      return GTR;
    } else if (n1 < n2) {
      return LSS;
    } else {
      return EQU;
    }
  }
}

