/**
 * 常量控制
 */
const ua = window.navigator.userAgent;

const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
export const isPiPiApp = /pipipeiwan/i.test(window.navigator.userAgent);
export const rootVersion = '1.1.7';
export const os = android ? 'android' : (ipad || ipod || iphone) ? 'ios' : 'pc';

