---
sidebarDepth: 2
---

# 核心API
## invoke
调用native端开放给运行在webview中页面的接口，全部的[接口列表](/wiki/)数据会不间断更新
::: warning 注意 
- native 端开放给 webview页面的任何接口，都需要调用此方法，才能与原生进行正常的通信
:::

::: tip 调用约定
- 如未特殊约定，options 对象中必须包含一个 string 类型的 cmd 的属性值，该值是app端开发给页面的接口名称。

- options 对象中 可以指定 `success / fail / complete` 来接收接口调用结果；还有一个可选参数是 `function` 类型的 `handle`，作为回调函数等同于 `options.complete`。`不是每个接口都有成功的回调，具体情况根据接口需要而定`

- 每个回调函数都会接收两个参数，两个参数类型为 `object`，返回格式请看[回调约定](../guide/desc.html#回调约定)
:::

- **使用**：[在线测试](/run/#调用接口-invoke)
    ```js
    PPJSBridge.invoke(options)
    ```

- **类型**： `function`

- **返回**：`无`

- **参数**：( options )

    ::::: paramsName {object} options
    
    :::: params {object|string} [options.version]
    - `string` 版本号，当 iOS 和 Android 都一样时，一般这种情况用的比较多
    
    - `object` 为如下格式；当 iOS 和 Android 的接口版本号不一致，比较少见
      ```json5
      {
        "ios": "", // iOS 版本号
        "android":"" // android 版本号
      }
      ```
    ::::
    
    :::: params {string} options.cmd
    - `native` 端给`webview`页面调用的接口名称，目前可用[名称列表](/guide/wiki.html)，数据会不间断更新
    ::::
    
    :::: params {object} [options.data]
    - 调用`native`端接口需要的参数，是否需要传递，根据接口需要，非必传
    ::::
    
    :::: params {function(res,app)} [options.success]
    - 调用`native`接口后，`webview`中的页面接受到来自`native`成功的回调，不是所有接口都有返回此通知，具体情况根据接口当时的需要。
    ::::
    
    :::: params {function(res,app)} [options.fail]
    :::tip
    
    - 执行方法后，以下两种情况会触发此回调。res 对象的 action 值可能为 fail / notApp / notSupport
    
        - 调用`native`接口后，`native`端通知失败，
        
        - js 拦截的回调，如 notApp notSupport
    :::
    ::::
    
    :::: params {function(res,app)} [options.complete]
    - 执行方法后，不管成功或失败都会执行
    ::::
    
    :::: params {function(res,app)} [options.handle]
    - 执行方法后的回调
    :::tip 
    传入了此参数后，fail complete success 参数的回调将都不会执行，等同于 complete
    :::
    ::::
    
    :::::

## ready
`native`端通知`webview` JSBridge 注入完毕，可以开始执行或调用`native`端的接口
:::warning
所有`native`端的提供接口建议都在此方法里面调用执行，或者确定页面加载完毕后执行也可以
:::
- **类型**： `function`

- **返回**：`无`

- **使用**：[在线测试](/run/#调用接口-invoke)
    ```js
    PPJSBridge.ready(function(res,app) {
       // do something
    })
    ```

- **参数**

    ::::: paramsName { function(res,app) } [callback]
    - 在app环境中会执行此回调，会返回两个参数，返回格式请看[回调约定](../guide/desc.html#回调约定)
    :::::

## login
拉起`native`端登录
- **类型**： `function`

- **返回值**：`无`

- **使用**：[在线测试](/run/#调用接口-invoke)
    ```js
    PPJSBridge.login(function(res,app) {
       // do something
    })
    ```

- **参数**：( callback )

    ::::: paramsName { function(res,app) } [callback]
    - 登录成功后执行的回调函数，其中 res.data 对象会包含以下信息
    
       - res.data
         ```json5
         {
           "token": "",
           "isLogin": "",
           "os": "",
           "env": "",
           "version": ""
         }        
         ```
    :::::
    
## back
关闭当前窗口,返回上一个窗口
- **类型**： `function`

- **返回值**：`无`

- **使用**：[在线测试](/run/#调用接口-invoke)
    ```js
    PPJSBridge.back()
    ```

## openWindow
开启一个新窗口，打开指定`(原生/web)`页面
- **类型**：`function`

- **返回**：`无`

- **调用**：[在线测试](/run/#打开新页面-openwindow)
    ```js
    PPJSBridge.openWindow(options)
    ```

- **参数**：

    ::::: paramsName {object} options
    
    :::: params {string|object} options.ios
    
    ```js
     // 可以在地址中直接携带参数
    PPJSBridge.openWindow({
      ios: 'TestController?index=1&title=你好'
    })
  
     // 也可以采用对象形式
    PPJSBridge.openWindow({
      ios: {
        url: 'TestController',
        query: {
          index: 1,
          title:'你好'
        }
      }
    })
    ```
    
    - `string` `ios 原生界面路由地址`，支持携带参数，格式标准同 web 一致
    
    - `object` 为如下格式
      ```json5
      {
        "url":"", // 必传
        "version":"", // 依赖的版本号
        "query":{} // 参数
      }
      ```
    ::::
    
    :::: params {string|object} options.android
    
    ```js
     // 可以在地址中直接携带参数
    PPJSBridge.openWindow({
      android: 'TestActivity?index=1&title=你好'
    })
  
     // 也可以采用对象形式
    PPJSBridge.openWindow({
      android: {
        url: 'TestActivity',
        query: {
          index: 1,
          title:'你好'
        }
      }
    })
    ```
    
    - `string` `android 原生界面路由地址`，支持携带参数，格式标准同 web 一致
    
    - `object` 为如下格式
      ```json5
      {
        "url":"", // 必传
        "version":"", // 依赖的版本号
        "query":{} // 参数
      }
      ```
    ::::
    
    :::: params {object} [options.query]
    路由地址共同的参数，跳转的时候都会携带在url后面
    :::warning
     - **仅适用于跳转到 `iOS 和 Android`原生路由界面会有效**
    :::
    ::: tip
    - 由于 iOS & Android 原生页面接收参数的 key 名称可能会不一致，但都需要接收相同意思的属性值。或者在不同系统下，同一个页面，有些系统需要传递这个参数，有些系统不需要
    
    - 考虑以下情况，以跳转到用户详情页为例，iOS & Android 都需要 `用户id` 参数
    ```js
      // 假设 data 是服务端接口返回的对象，里面有我们需要用到 `userId` 属性
      // ios 系统页面接受的参数名称为 uid，android 系统页面接受的参数名称为 userId
      // 发现相同属性的值需要写2次，而且一旦 data 的key 变更，我们还需要改两次
      PPJSBridge.openWindow({
          ios:`KHCardViewController?uid=${data.userId}`,
          android:`/khpw/UserDetailActivity?userId=${data.userId}`,
      })
  
      // 可以采用以下的写法
      PPJSBridge.openWindow({
          ios:`KHCardViewController`,
          android:`UserDetailActivity`,
          query:{
  
            // 常规拼接 iOS & Android 含有相同的参数名称
            userId:data.userId,
  
            // 这种写法在路由跳转的时候，会将对应系统类型的参数拼接到路由地址中去
            // ios:uid 代表会在 ios 路由中拼接一个参数名称为 uid
            // android:userId 代表会在 android 路由中拼接一个参数名称为 userId
            '[ios:uid,android:userId]':data.userId,
  
            // 仅会在 android 的路由地址中去拼接一个参数名称为 uid
            '[android:userId]':data.userId,
  
            // 仅会在 ios 的路由地址中去拼接一个参数名称为 uid
            '[ios:userId]':data.userId,
          }
      })
    ```
    :::
    ::::
    
    :::: params {string} [options.version]
    - 路由地址依赖的版本号，如果路由为`object`，且存在 `version`话，此属性无效
    ::::
    
    :::: params {string} [url]
    :::warning
    - 此参数为标准的 `http/https` 协议标准的 `web网址`格式
    
    - 如果传递了此参数，将会识别为在原生新打开一个`webview`窗口加载网址
    
    - `ios & android` 参数将失效
    
    - **url 中含有以下参数的话具有特殊效果**
    
        - hideNavi 新打开的窗口是否为全屏 1: 全屏 0: 非全屏
        - hideBottomSafeArea 新打开的窗口是否保留安全区域，主要是iPhone 1: 不保留，默认留白 0: 保留
    ```js
          // 打开一个新窗口的 webview 
          PPJSBridge.openWindow({
              url:`https://app.apeiwan.com`,
          })
          
          // 打开一个全屏的webview
          PPJSBridge.openWindow({
              url:`https://app.apeiwan.com?hideNavi=1&hideBottomSafeArea=1`,
          })
    ```
    :::
    ::::
    
    :::: params {string} [options.href]
    - 非app环境时，跳转的url地址
    ::::
    
    :::: params {function} [options.success]
    - 调用`native`接口后，`webview`中的页面接受到来自`native`成功的回调
    ::::
    
    :::: params {function} [options.fail]
    - 调用`native`接口后，`webview`中的页面接受到来自`native`失败的回调
    ::::
    
    :::: params {function} [options.complete]
    - 调用`native`接口后，不管成功或失败都会执行
    ::::

## share
调用原生分享
:::tip 为什么分离出来

- 在`分享`面板中，选择`皮皮陪玩`分享，如果想区分`内部分享`和`外部分享`不同`url`,原生直接取的是`url`参数,没有属性可以单独为`内部分享`设置`url`。
  
- 此处单独的方法做了一层`hack`处理，通过在`url`后面附加参数识别的形式

:::
- **类型**：`function`

- **返回**：`无`

- **调用**：[在线测试](/run/#打开新页面-share)
    ```js
    PPJSBridge.share(options,settingOptions)
    ```

- **参数**：

  ::::: paramsName {object} options
  - [参照分享方法](/wiki/#分享),
    :::warning
    
    - **此方法已内置`cmd`属性，所以不需要传递cmd参数**
    
    :::
  :::::

  ::::: paramsName {object} settingOptions
  :::: params {string} settingOptions.appOpenUrl
  - 分享的内容，建议文字个数在`15`个以内
  ::::

      

## isCanIUse
判定当前环境是否支持指定版本，也可以分开判断`ios`和`android`
- **类型**：`function`

- **返回**：`boolean`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.isCanIUse(version)
```
- **参数**：

    ::::: paramsName {object|string} version
    
    - `string` 版本号
    
    - `object` 为如下格式
      ```json5
      {
        "ios": "", // iOS 版本号
        "android":"" // android 版本号
      }
      ```
    
    :::::

## isLogin
判断`native`端是否已登录
- **类型**：`function`

- **返回**：`boolean`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.isLogin()
```
- **参数**：`无`

## getToken
获取`native`端的 [token](https://app.apeiwan.com)
- **类型**：`function`

- **返回**：`string`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.getToken()
```
- **参数**：`无`

## getVersion
获取`native`端的版本号
- **类型**：`function`

- **返回**：`string`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.getVersion()
```
- **参数**：`无`

## getEnv
获取`native`端的运行 [环境](https://app.apeiwan.com)
:::warning 注意
 ios 和 android 在测试环境返回的版本字符串会不一致，因此判断是否非正式环境，请使用 `!=='R'`
:::
- **类型**：`function`

- **返回**：`string`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.getEnv()
```
- **参数**：`无`

## getApp
获取`native`端 [app](https://app.apeiwan.com) 的一些信息
- **类型**：`function`

- **返回**：`object`

- **调用**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.getApp()
```
- **参数**：`无`
