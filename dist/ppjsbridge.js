/*!@apeiwan/ppjsbridge released@0.1.1*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PPJSBridge = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * 常量控制
   */
  var ua = window.navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var isPiPiApp = /pipipeiwan/i.test(window.navigator.userAgent);
  var rootVersion = '1.1.7';
  var os = android ? 'android' : ipad || ipod || iphone ? 'ios' : 'pc';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var EventEmitter = createCommonjsModule(function (module) {
  (function (exports) {

      /**
       * Class for managing events.
       * Can be extended to provide event functionality in other classes.
       *
       * @class EventEmitter Manages event registering and emitting.
       */
      function EventEmitter() {}

      // Shortcuts to improve speed and size
      var proto = EventEmitter.prototype;
      var originalGlobalValue = exports.EventEmitter;

      /**
       * Finds the index of the listener for the event in its storage array.
       *
       * @param {Function[]} listeners Array of listeners to search through.
       * @param {Function} listener Method to look for.
       * @return {Number} Index of the specified listener, -1 if not found
       * @api private
       */
      function indexOfListener(listeners, listener) {
          var i = listeners.length;
          while (i--) {
              if (listeners[i].listener === listener) {
                  return i;
              }
          }

          return -1;
      }

      /**
       * Alias a method while keeping the context correct, to allow for overwriting of target method.
       *
       * @param {String} name The name of the target method.
       * @return {Function} The aliased method
       * @api private
       */
      function alias(name) {
          return function aliasClosure() {
              return this[name].apply(this, arguments);
          };
      }

      /**
       * Returns the listener array for the specified event.
       * Will initialise the event object and listener arrays if required.
       * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
       * Each property in the object response is an array of listener functions.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Function[]|Object} All listener functions for the event.
       */
      proto.getListeners = function getListeners(evt) {
          var events = this._getEvents();
          var response;
          var key;

          // Return a concatenated array of all matching events if
          // the selector is a regular expression.
          if (evt instanceof RegExp) {
              response = {};
              for (key in events) {
                  if (events.hasOwnProperty(key) && evt.test(key)) {
                      response[key] = events[key];
                  }
              }
          }
          else {
              response = events[evt] || (events[evt] = []);
          }

          return response;
      };

      /**
       * Takes a list of listener objects and flattens it into a list of listener functions.
       *
       * @param {Object[]} listeners Raw listener objects.
       * @return {Function[]} Just the listener functions.
       */
      proto.flattenListeners = function flattenListeners(listeners) {
          var flatListeners = [];
          var i;

          for (i = 0; i < listeners.length; i += 1) {
              flatListeners.push(listeners[i].listener);
          }

          return flatListeners;
      };

      /**
       * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Object} All listener functions for an event in an object.
       */
      proto.getListenersAsObject = function getListenersAsObject(evt) {
          var listeners = this.getListeners(evt);
          var response;

          if (listeners instanceof Array) {
              response = {};
              response[evt] = listeners;
          }

          return response || listeners;
      };

      function isValidListener (listener) {
          if (typeof listener === 'function' || listener instanceof RegExp) {
              return true
          } else if (listener && typeof listener === 'object') {
              return isValidListener(listener.listener)
          } else {
              return false
          }
      }

      /**
       * Adds a listener function to the specified event.
       * The listener will not be added if it is a duplicate.
       * If the listener returns true then it will be removed after it is called.
       * If you pass a regular expression as the event name then the listener will be added to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addListener = function addListener(evt, listener) {
          if (!isValidListener(listener)) {
              throw new TypeError('listener must be a function');
          }

          var listeners = this.getListenersAsObject(evt);
          var listenerIsWrapped = typeof listener === 'object';
          var key;

          for (key in listeners) {
              if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                  listeners[key].push(listenerIsWrapped ? listener : {
                      listener: listener,
                      once: false
                  });
              }
          }

          return this;
      };

      /**
       * Alias of addListener
       */
      proto.on = alias('addListener');

      /**
       * Semi-alias of addListener. It will add a listener that will be
       * automatically removed after its first execution.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addOnceListener = function addOnceListener(evt, listener) {
          return this.addListener(evt, {
              listener: listener,
              once: true
          });
      };

      /**
       * Alias of addOnceListener.
       */
      proto.once = alias('addOnceListener');

      /**
       * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
       * You need to tell it what event names should be matched by a regex.
       *
       * @param {String} evt Name of the event to create.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.defineEvent = function defineEvent(evt) {
          this.getListeners(evt);
          return this;
      };

      /**
       * Uses defineEvent to define multiple events.
       *
       * @param {String[]} evts An array of event names to define.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.defineEvents = function defineEvents(evts) {
          for (var i = 0; i < evts.length; i += 1) {
              this.defineEvent(evts[i]);
          }
          return this;
      };

      /**
       * Removes a listener function from the specified event.
       * When passed a regular expression as the event name, it will remove the listener from all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to remove the listener from.
       * @param {Function} listener Method to remove from the event.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeListener = function removeListener(evt, listener) {
          var listeners = this.getListenersAsObject(evt);
          var index;
          var key;

          for (key in listeners) {
              if (listeners.hasOwnProperty(key)) {
                  index = indexOfListener(listeners[key], listener);

                  if (index !== -1) {
                      listeners[key].splice(index, 1);
                  }
              }
          }

          return this;
      };

      /**
       * Alias of removeListener
       */
      proto.off = alias('removeListener');

      /**
       * Adds listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
       * You can also pass it a regular expression to add the array of listeners to all events that match it.
       * Yeah, this function does quite a bit. That's probably a bad thing.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addListeners = function addListeners(evt, listeners) {
          // Pass through to manipulateListeners
          return this.manipulateListeners(false, evt, listeners);
      };

      /**
       * Removes listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be removed.
       * You can also pass it a regular expression to remove the listeners from all events that match it.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeListeners = function removeListeners(evt, listeners) {
          // Pass through to manipulateListeners
          return this.manipulateListeners(true, evt, listeners);
      };

      /**
       * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
       * The first argument will determine if the listeners are removed (true) or added (false).
       * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be added/removed.
       * You can also pass it a regular expression to manipulate the listeners of all events that match it.
       *
       * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
          var i;
          var value;
          var single = remove ? this.removeListener : this.addListener;
          var multiple = remove ? this.removeListeners : this.addListeners;

          // If evt is an object then pass each of its properties to this method
          if (typeof evt === 'object' && !(evt instanceof RegExp)) {
              for (i in evt) {
                  if (evt.hasOwnProperty(i) && (value = evt[i])) {
                      // Pass the single listener straight through to the singular method
                      if (typeof value === 'function') {
                          single.call(this, i, value);
                      }
                      else {
                          // Otherwise pass back to the multiple function
                          multiple.call(this, i, value);
                      }
                  }
              }
          }
          else {
              // So evt must be a string
              // And listeners must be an array of listeners
              // Loop over it and pass each one to the multiple method
              i = listeners.length;
              while (i--) {
                  single.call(this, evt, listeners[i]);
              }
          }

          return this;
      };

      /**
       * Removes all listeners from a specified event.
       * If you do not specify an event then all listeners will be removed.
       * That means every event will be emptied.
       * You can also pass a regex to remove all events that match it.
       *
       * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeEvent = function removeEvent(evt) {
          var type = typeof evt;
          var events = this._getEvents();
          var key;

          // Remove different things depending on the state of evt
          if (type === 'string') {
              // Remove all listeners for the specified event
              delete events[evt];
          }
          else if (evt instanceof RegExp) {
              // Remove all events matching the regex.
              for (key in events) {
                  if (events.hasOwnProperty(key) && evt.test(key)) {
                      delete events[key];
                  }
              }
          }
          else {
              // Remove all listeners in all events
              delete this._events;
          }

          return this;
      };

      /**
       * Alias of removeEvent.
       *
       * Added to mirror the node API.
       */
      proto.removeAllListeners = alias('removeEvent');

      /**
       * Emits an event of your choice.
       * When emitted, every listener attached to that event will be executed.
       * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
       * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
       * So they will not arrive within the array on the other side, they will be separate.
       * You can also pass a regular expression to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {Array} [args] Optional array of arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.emitEvent = function emitEvent(evt, args) {
          var listenersMap = this.getListenersAsObject(evt);
          var listeners;
          var listener;
          var i;
          var key;
          var response;

          for (key in listenersMap) {
              if (listenersMap.hasOwnProperty(key)) {
                  listeners = listenersMap[key].slice(0);

                  for (i = 0; i < listeners.length; i++) {
                      // If the listener returns true then it shall be removed from the event
                      // The function is executed either with a basic call or an apply if there is an args array
                      listener = listeners[i];

                      if (listener.once === true) {
                          this.removeListener(evt, listener.listener);
                      }

                      response = listener.listener.apply(this, args || []);

                      if (response === this._getOnceReturnValue()) {
                          this.removeListener(evt, listener.listener);
                      }
                  }
              }
          }

          return this;
      };

      /**
       * Alias of emitEvent
       */
      proto.trigger = alias('emitEvent');

      /**
       * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
       * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {...*} Optional additional arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.emit = function emit(evt) {
          var args = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(evt, args);
      };

      /**
       * Sets the current value to check against when executing listeners. If a
       * listeners return value matches the one set here then it will be removed
       * after execution. This value defaults to true.
       *
       * @param {*} value The new value to check for when executing listeners.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.setOnceReturnValue = function setOnceReturnValue(value) {
          this._onceReturnValue = value;
          return this;
      };

      /**
       * Fetches the current value to check against when executing listeners. If
       * the listeners return value matches this one then it should be removed
       * automatically. It will return true by default.
       *
       * @return {*|Boolean} The current value to check for or the default, true.
       * @api private
       */
      proto._getOnceReturnValue = function _getOnceReturnValue() {
          if (this.hasOwnProperty('_onceReturnValue')) {
              return this._onceReturnValue;
          }
          else {
              return true;
          }
      };

      /**
       * Fetches the events object and creates one if required.
       *
       * @return {Object} The events storage object.
       * @api private
       */
      proto._getEvents = function _getEvents() {
          return this._events || (this._events = {});
      };

      /**
       * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
       *
       * @return {Function} Non conflicting EventEmitter class.
       */
      EventEmitter.noConflict = function noConflict() {
          exports.EventEmitter = originalGlobalValue;
          return EventEmitter;
      };

      // Expose the class either via AMD, CommonJS or the global object
      if ( module.exports){
          module.exports = EventEmitter;
      }
      else {
          exports.EventEmitter = EventEmitter;
      }
  }(typeof window !== 'undefined' ? window : commonjsGlobal || {}));
  });

  /**
   * emitter
   */
  var Emitter = new EventEmitter();

  /**
   * 对比字符串版本号的大小，返回1则v1大于v2，返回-1则v1小于v2，返回0则v1等于v2
   * @author xxcanghai@博客园
   * @param {string} v1 要进行比较的版本号1
   * @param {string} v2 要进行比较的版本号2
   * @link https://www.cnblogs.com/xxcanghai/p/6007136.html
   * @returns
   */
  var versionCompare = function versionCompare(v1, v2) {
    var GTR = 1; //大于

    var LSS = -1; //小于

    var EQU = 0; //等于

    var v1arr = String(v1).split(".").map(function (a) {
      return parseInt(a);
    });
    var v2arr = String(v2).split(".").map(function (a) {
      return parseInt(a);
    });
    var arrLen = Math.max(v1arr.length, v2arr.length);
    var result; //排除错误调用

    if (v1 == undefined || v2 == undefined) {
      throw new Error();
    } //检查空字符串，任何非空字符串都大于空字符串


    if (v1.length == 0 && v2.length == 0) {
      return EQU;
    } else if (v1.length == 0) {
      return LSS;
    } else if (v2.length == 0) {
      return GTR;
    } //循环比较版本号


    for (var i = 0; i < arrLen; i++) {
      result = Comp(v1arr[i], v2arr[i]);

      if (result == EQU) {
        continue;
      } else {
        break;
      }
    }

    return result;
    /**
     * @return {number}
     */

    function Comp(n1, n2) {
      if (typeof n1 != "number") {
        n1 = 0;
      }

      if (typeof n2 != "number") {
        n2 = 0;
      }

      if (n1 > n2) {
        return GTR;
      } else if (n1 < n2) {
        return LSS;
      } else {
        return EQU;
      }
    }
  };

  /**
   * 查看是否支持指定的版本功能
   * @param {string|object=} version 版本号
   * @returns {boolean}
   */

  var isCanIUse = function isCanIUse(version) {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    var appVer = FLPPJSBridge.version;
    if (!appVer) return false;

    if (isPiPiApp) {
      if (os === 'ios') {
        var pointIOSVer = (_typeof(version) === 'object' ? version.ios : version) || rootVersion;
        return versionCompare(appVer, pointIOSVer) > -1;
      } else {
        var pointAndroidVer = (_typeof(version) === 'object' ? version.android : version) || rootVersion;
        return versionCompare(appVer, pointAndroidVer) > -1;
      }
    } else {
      return false;
    }
  };

  var getToken = function getToken() {
    return isPiPiApp ? sessionStorage.getItem('token') || '' : '';
  };

  /**
   * 获取 app 版本
   * @returns {string}
   */

  var getEnv = function getEnv() {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    return isPiPiApp ? _typeof(window.FLPPJSBridge) === 'object' ? (FLPPJSBridge.env + '').toUpperCase() || undefined : '' : '';
  };

  var getVersion = function getVersion() {
    var FLPPJSBridge = window.FLPPJSBridge || {};
    return isPiPiApp ? _typeof(window.FLPPJSBridge) === 'object' ? FLPPJSBridge.version : '' : '';
  };

  /**
   * 判读 app 是否登录
   * @returns {string}
   */

  var isLogin = function isLogin() {
    return isPiPiApp ? !!sessionStorage.getItem('token') : '';
  };

  /**
   * 获取 app 特征信息
   */

  var getApp = function getApp() {
    return _objectSpread2({}, window.FLPPJSBridge, {
      token: getToken(),
      env: getEnv(),
      version: getVersion(),
      isLogin: isLogin(),
      os: os
    });
  };

  /**
   *  生成唯 UUID
   *  @link https://www.cnblogs.com/snandy/p/3261754.html
   * @returns {string}
   */
  function uuid () {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  /**
   * 返回指定调用的回调参数
   * @param res
   * @param params
   */

  var handleOptions = function handleOptions(res) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var action = res.action;

    if (params.handle) {
      params.handle(res, getApp());
      return;
    }

    if (action === 'success') {
      params.success && params.success(res, getApp());
    } else {
      params.fail && params.fail(res, getApp());
    }

    params.complete && params.complete(res, getApp());
  };
  /**
   * 验证命令参数是否正确
   * @param {object} params
   * @param {object=} params.version
   * @param {string} params.cmd
   * @returns {boolean}
   */


  var postMessageValidate = function postMessageValidate(params) {
    var handleErrorResult = {};

    if (!isPiPiApp) {
      handleErrorResult = {
        message: 'not pipiapp environment',
        action: 'notApp'
      };
    } else if (params.version && !isCanIUse(params.version)) {
      handleErrorResult = {
        message: 'not use api,because app notSupport',
        action: 'notSupport'
      };
    }

    if (handleErrorResult.action) {
      handleOptions(handleErrorResult, params);
      return false;
    }

    return true;
  };
  /**
   * h5 调用 oc/java 的入口
   * @param {object} params
   * @param {string=} params.handle - oc/java 回调的名称,在window中全局的字符串方法
   * @param {object=} params.data - 传递的参数对象
   * @param {string} params.cmd - 调用的原生的方法的名称 (须与原生协商好是否存在)
   */


  var postMessage = function postMessage(params) {
    /**
     * postMessage 调用拦截
     * @returns {boolean}
     */
    var options = _objectSpread2({}, params);

    var cmd = options.cmd;

    if (cmd.indexOf('.') !== -1) {
      cmd = cmd.split('.');
      options['api'] = cmd[1];
      cmd = cmd[0];
    }

    if (os === 'ios') {
      return window.webkit.messageHandlers[cmd].postMessage(options);
    } else if (os === 'android') {
      return window['flppAndroid' + cmd].postMessage(JSON.stringify(options));
    }
  };
  /**
   * 事件监听
   * @param {object} params
   * @param {string} params.cmd
   * @param {function=} params.success
   * @param {function=} params.fail
   * @param {function=} params.complete
   * @returns {string | undefined}
   */


  var postMessageEmitEvent = function postMessageEmitEvent(params) {
    var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var first_random_letter = letter[Math.round(Math.random() * 25)];

    var _event_uuid_name = first_random_letter + uuid();

    Emitter.addOnceListener(_event_uuid_name, function (res) {
      var cmd = params.cmd; // todo 如果 ready 方式调用，此时第一次是没有app信息，所以ready方式的话，就先将全部对象赋值一次,这样 getApp() 才有数据返回

      if ((cmd === 'func.ready' || cmd === 'func.login') && !window.FLPPJSBridge) {
        window.FLPPJSBridge = res.data;
      }

      handleOptions(res, params); //  为了释放uuid 的方法的内容，在方法得到响应后释放内存
    });

    window[_event_uuid_name] = function (res) {
      Emitter.emitEvent(_event_uuid_name, [res]);
    };

    return _event_uuid_name;
  };
  /**
   * 调用原生 api
   * @param {object} params
   * @param {string} params.cmd
   * @param {function=} params.success
   * @param {function=} params.handle
   * @param {function=} params.fail
   * @param {function=} params.success
   * @param {function=} params.complete
   * @param {object=} params.data - 传递的参数对象
   * @param {string=|object=} params.version - 依赖的app版本号
   */


  var invoke = function invoke(params) {
    if (!postMessageValidate(params)) return;
    var handle = params.handle,
        success = params.success,
        fail = params.fail,
        complete = params.complete;
    var nativeParams = {
      cmd: params.cmd
    };

    if (handle || success || fail || complete) {
      nativeParams['handle'] = postMessageEmitEvent(params);
    }

    if (params.data) {
      nativeParams['data'] = params.data;
    }

    postMessage(nativeParams);
  };

  /**
   * 将JSON对象拼接成GET URL形式参数
   * @param {object} params
   * @param {string=} symbol - 链接符号 默认'&'
   * @returns {string}
   */
  var getStitchingUrlParams = function getStitchingUrlParams(params) {
    var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';
    var strParams = '';

    for (var keyItem in params) {
      var value = params[keyItem];

      if (value !== '') {
        strParams += keyItem + '=' + encodeURIComponent(_typeof(value) === 'object' ? JSON.stringify(value) : value) + symbol;
      }
    }

    return strParams ? strParams.substr(0, strParams.length - 1) : "";
  };
  /**
   * 获取url的hash和search值
   * @param {string} [url=window.location.href] url
   * @returns {{hash_str:string,search_str:string}}
   * */

  var getUrlHashSearchStr = function getUrlHashSearchStr(url) {
    var hash_str = window.location.hash;
    var search_str = window.location.search;

    if (url) {
      var url_hash_index = url.indexOf('#');
      var url_search_index = url.indexOf('?');
      hash_str = url_hash_index !== -1 ? url.substr(url_hash_index) : '';

      if (url_search_index < url_hash_index || url_search_index !== -1 && url_hash_index === -1) {
        var length = url_search_index < url_hash_index ? url_hash_index - url_search_index : url.length;
        search_str = url.substr(url_search_index, length);
      } else {
        search_str = '';
      }
    }

    return {
      hash_str: hash_str,
      search_str: search_str
    };
  };
  /**
   * 获取请求的url所有参数(包含search，和 hash)
   * @param url {string=} [window.location.href]
   * @param splitStr {string=} 分割的符号识别
   * @returns {{}}
   */

  var getRequestUrlParam = function getRequestUrlParam(url) {
    var splitStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';

    if (splitStr !== '?' && url.indexOf('&') !== -1) {
      var splitStrIndex = url.indexOf('&');
      url = url.substr(0, splitStrIndex) + '?' + url.substr(splitStrIndex);
    }

    var urlHashSearchStr = getUrlHashSearchStr(url);
    var hash_str = urlHashSearchStr.hash_str;
    var search_str = urlHashSearchStr.search_str;
    var hash_str_params_index = hash_str.indexOf('?');
    hash_str = hash_str_params_index !== -1 ? hash_str.substr(hash_str_params_index + 1) + '&' : '';
    var search_str_params_index = search_str.indexOf('?');

    if (search_str_params_index !== -1) {
      search_str = search_str.substr(search_str_params_index + 1);
    }

    var getRequestUrlParams = {};

    if (hash_str_params_index !== -1 || search_str_params_index !== -1) {
      var params_format_url = (hash_str + search_str).split("&");

      for (var i = 0; i < params_format_url.length; i++) {
        var param = params_format_url[i].split("=");

        if (param[0]) {
          var _value = '';

          try {
            _value = decodeURIComponent(param[1]);
          } catch (e) {
            _value = param[1];
          }

          getRequestUrlParams[param[0]] = _value;
        }
      }
    }

    return getRequestUrlParams;
  };

  /**
   * 原生接口
   */
  var InvokeTypes = {
    func: {
      login: 'func.login',
      back: 'func.goBack',
      ready: 'func.ready',
      openAppPage: 'func.openAppPage'
    }
  };

  var Token = {};
  /**
   * token 格式化
   * @param {string=} token
   * @returns {string}
   */

  Token.format = function (token) {
    return token === '' || token === 'null' ? '' : token;
  };
  /**
   * 设置 token 值
   * @param {string=} token
   */


  Token.set = function (token) {
    var tokenFormat = Token.format(token);

    if (tokenFormat) {
      sessionStorage.setItem('token', tokenFormat);
    }
  };

  /**
   * 格式化特殊方法返回的 res.data 格式参数
   * @param {function=} handle
   * @param {object} res
   */

  function formatAppData(handle, res) {
    var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data;

    if (data.token) {
      Token.set(data.token);
    }

    handle && handle({
      data: getApp(),
      action: res.action,
      message: res.message
    }, getApp());
  }

  /**
   * 拉起 app 登录
   * @param {function=} handle - 回调
   */

  var login = function login(_handle) {
    invoke({
      cmd: InvokeTypes.func.login,
      handle: function handle(res) {
        formatAppData(_handle, res);
      },
      version: '1.2.9'
    });
  };

  /**
   * 监听页面 jsBridge 是否已注入完毕
   * @param {function} handle -
   */

  var ready = function ready(_handle) {
    // 兼容新老版本的处理, 原来的版本是 FLPP.JSBridge
    window['PPJSBridgeReady'] = true;

    function jsBridgeReady() {
      if (window.FLPPJSBridge) {
        formatAppData(_handle, {
          data: window.FLPPJSBridge,
          action: 'success',
          message: ''
        });
      } else {
        invoke({
          cmd: InvokeTypes.func.ready,
          handle: function handle(res) {
            formatAppData(_handle, res);
          }
        });
      }
    }

    if (window.FLPPJSBridge) {
      formatAppData(_handle, {
        data: window.FLPPJSBridge,
        action: 'success',
        message: ''
      });
    } else if (document.readyState === "complete") {
      jsBridgeReady();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        jsBridgeReady();
      }, true);
    }
  };

  /**
   * 编码url的参数
   * @param url - url地址
   * @param platform - 平台
   * @returns {string}
   */

  var formatWebviewRouterUrl = function formatWebviewRouterUrl(url, platform) {
    // ios使用&传参
    // android使用?传参
    var urlParams = getRequestUrlParam(url);
    url = url.split('?')[0]; // 去掉所有传参

    var urlString = getStitchingUrlParams(urlParams);
    return url + (urlString ? (platform === 'ios' ? '&' : '?') + urlString : '');
  };
  /**
   * 打开一个新窗口，加载 (原生/web) 网址
   * @param {object} params
   * @param {string=} params.version  -- 版本号
   * @param {string|object} params.ios  -- 皮皮pipi ios 链接
   * @param {string} params.query  -- android & ios 原生路由地址的共同参数
   * @param {string=} params.url  -- 如果传递了此参数，代表在 app 的环境中打开新的窗口是加载这个链接，ios & android 参数将失效
   * @param {string |object} params.android  -- 皮皮pipi  android 链接
   * @param {string} params.href -- 非app环境下，如果传递了链接，会进行打开
   * @param {handle} params.handle -- 回调
   */


  var openWindow = function openWindow(params) {
    if (isPiPiApp) {
      var version = params.version || '';
      var versionSystem = {};
      var androidQuery = {};
      var iOSQuery = {};
      var iOSUrl = params.ios;
      var androidUrl = params.android;

      if (_typeof(params.android) === 'object') {
        versionSystem['android'] = params.android.version || '';
        androidQuery = params.android.query || {};
        androidUrl = params.android.url;
      }

      if (_typeof(params.ios) === 'object') {
        versionSystem['ios'] = params.ios.version || '';
        iOSQuery = params.ios.query || {};
        iOSUrl = params.ios.url;
      }

      version = version || versionSystem;

      var addUrlParams = function addUrlParams(url, stitchingUrlParams) {
        var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';
        var params_prefix = url.indexOf('?') !== -1 ? symbol : '?';
        return url + (stitchingUrlParams ? params_prefix : '') + stitchingUrlParams;
      };

      if (params.url) {
        var webUrl = params.url;
        iOSUrl = 'FLWebPageViewController?urlString=' + formatWebviewRouterUrl(webUrl, 'ios');
        androidUrl = 'WebViewActivity?url=' + formatWebviewRouterUrl(webUrl, 'android');
      }

      var formatNativeQuery = function formatNativeQuery() {
        var query = params.query;
        var formatQuery = {};
        var routeOSQuery = {
          ios: {},
          android: {}
        };

        for (var key in query) {
          var _key = key + '';

          if (_key.indexOf('[') !== -1) {
            var paramsAry = _key.substr(1, _key.length - 2).split(',');

            for (var i = 0; i < paramsAry.length; i++) {
              var _paramsAry$i$split = paramsAry[i].split(':'),
                  _paramsAry$i$split2 = _slicedToArray(_paramsAry$i$split, 2),
                  _os = _paramsAry$i$split2[0],
                  name = _paramsAry$i$split2[1];

              routeOSQuery[_os][name] = query[key];
            }
          } else {
            formatQuery[key] = query[key];
          }
        }

        return _objectSpread2({}, formatQuery, {}, routeOSQuery[os]);
      };

      return invoke({
        version: version,
        data: {
          para: JSON.stringify({
            ios: {
              ios_route: addUrlParams(iOSUrl, getStitchingUrlParams(_objectSpread2({}, iOSQuery, {}, formatNativeQuery())))
            },
            android: {
              androidRoute: addUrlParams(androidUrl, getStitchingUrlParams(_objectSpread2({}, androidQuery, {}, formatNativeQuery())))
            }
          }[os])
        },
        cmd: InvokeTypes.func.openAppPage,
        handle: params.handle
      });
    } else if (params.href) {
      window.location.href = params.href;
    }
  };

  /**
   * 返回上一个窗口
   */

  var back = function back() {
    invoke({
      cmd: InvokeTypes.func.back
    });
  };

  var index = {
    os: os,
    isPiPiApp: isPiPiApp,
    invoke: invoke,
    isCanIUse: isCanIUse,
    login: login,
    ready: ready,
    openWindow: openWindow,
    getToken: getToken,
    getVersion: getVersion,
    getEnv: getEnv,
    getApp: getApp,
    isLogin: isLogin,
    back: back,
    getStitchingUrlParams: getStitchingUrlParams,
    getRequestUrlParam: getRequestUrlParam
  };

  return index;

})));
