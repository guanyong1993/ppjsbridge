/*
 * rollup 配置文件
*/
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import {uglify} from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';


const minimist = require('minimist');
const options = minimist(process.argv.slice(2));
const format = options.format;
const env = process.env.NODE_ENV;
const isUglify = options.uglify;
const isEnableBabel = format !== 'esm';
const tag = options.tag;
const banner = `/*!${pkg.name} ${tag}@${pkg.version}*/`;


let output ={
  file: 'dist/ppjsbridge' + (isUglify ? '.min' : '') + '.js',
  name: 'PPJSBridge',
  format: "umd",
};


export default {
  input: "src/index.js",
  output: {
    ...output,
    banner
  },
  plugins: [
    isEnableBabel ? babel({
      exclude: ["node_modules/**"]
    }) : null,
    commonjs({
      include: ["node_modules/**"]
    }),
    isEnableBabel ? resolve({
      preferBuiltins: true,
      mainFields: ['main', 'module', 'browser'],
    }) : null,
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    isUglify && uglify(),
    isUglify && terser({
      output: {
        preamble: banner,
        /* 让unicode不被再转义成中文 */
        ascii_only: true,
      }
    }),
  ]
};
