#!/usr/bin/env node
require('shelljs/global');
const ossUpload = require('../oss/oss.upload');
const pkg = require('../package');
const path = require('path');
const minimist = require('minimist');

let options = minimist(process.argv.slice(2));

let tag = options.tag;
tag = tag ? '/' + tag + '/' + pkg.version : '';
const prefix = pkg.aliasOSS + tag;
const dist = path.resolve(process.cwd(), 'dist');

ossUpload({
  prefix,
  dist
});
