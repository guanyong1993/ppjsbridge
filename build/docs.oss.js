#!/usr/bin/env node
require('shelljs/global');
const pkg = require('../package');
const path = require('path');
const config = require('../oss/config')

const dist = path.resolve(process.cwd(), 'docs/.vuepress/dist');

if (exec(`scp -r  ${dist}/** ${config.server.docs}`).code === 0) {
  console.log('文档上传完毕')
}
