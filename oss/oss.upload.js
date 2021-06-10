/**
 * 返回所有上传的promise列表
 * @type {Client}
 *
 */

let OSS = require('ali-oss');
let fs = require('fs');
let config = require('config');
let ossConfig = config.oss;

module.exports = function (params) {
  let prefix = params.prefix;
  let dist = params.dist;

  let client = new OSS({
    region: ossConfig.REGION, // bucket所在的区域， 默认oss-cn-hangzhou。
    accessKeyId: ossConfig.ACCESSKEYID,
    accessKeySecret: ossConfig.ACCESSKEYSECRET,
    bucket: ossConfig.BUCKET,
  });

  let putOSSAry = [];

  function addFileToOSSSync(src, dist) {
    var docs = fs.readdirSync(src);
    docs.forEach(function (doc) {
      var _src = src + '/' + doc,
          _dist = dist + '/' + doc;
      var st = fs.statSync(_src);
      if (st.isFile() && doc !== '.DS_Store') {
        putOSSAry.push(client.put(_dist, _src))
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {
        addFileToOSSSync(_src, _dist);
      }
    })
  }

  addFileToOSSSync(dist, prefix);


  return putOSSAry;
}
