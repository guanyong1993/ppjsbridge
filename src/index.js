import invoke from './exports/invoke'
import {isCanIUse} from './utils/canIUse'
import {getStitchingUrlParams, getRequestUrlParam} from './utils/url'
import login from './exports/login'
import ready from './exports/ready'
import openWindow from './exports/openWindow'
import getToken from "./exports/getToken";
import getEnv from "./exports/getEnv";
import getVersion from "./exports/getVersion";
import isLogin from "./exports/isLogin";
import getApp from "./exports/getApp";
import {os, isPiPiApp} from "./utils/constant";
import back from "./exports/back";

export default {
  os,
  isPiPiApp,
  invoke,
  isCanIUse,
  login,
  ready,
  openWindow,
  getToken,
  getVersion,
  getEnv,
  getApp,
  isLogin,
  back,
  getStitchingUrlParams,
  getRequestUrlParam
};
