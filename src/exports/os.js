/**
 * 系统标识
 * @type {string}
 */
const ua = window.navigator.userAgent;
const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
let os = 'pc';
if (android) {
  os = 'android'
} else if (ipad || ipod || iphone) {
  os = 'ios'
}

export default os;