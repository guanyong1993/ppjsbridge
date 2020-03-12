/**
 *  生成唯 UUID
 *  @link https://www.cnblogs.com/snandy/p/3261754.html
 * @returns {string}
 */
export default function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
