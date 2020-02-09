#!/usr/bin/env node
require('shelljs/global');
const ossUpload = require('../oss/oss.upload');
const pkg = require('../package');
const path = require('path');
const minimist = require('minimist');

let options = minimist(process.argv.slice(2));

const prefix = pkg.aliasOSS + '/docs';
const dist = path.resolve(process.cwd(), 'docs/.vuepress/dist');

ossUpload({
  prefix,
  dist
});
