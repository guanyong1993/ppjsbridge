#!/usr/bin/env node
require('shelljs/global');
const ossUpload = require('../oss/oss.upload');
const pkg = require('../package');
const path = require('path');
const minimist = require('minimist');
const config = require('./config')

const prefix = pkg.aliasOSS + '/docs';
const dist = path.resolve(process.cwd(), 'docs/.vuepress/dist');

if (exec(`scp -r  ${dist}/** ${config.server.docs}`).code === 0) {
  console.log('文档上传完毕')
}
