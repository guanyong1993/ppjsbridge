# 使用

### es6

```js
import PPJSBridge from '@apeiwan/ppjsbridge'

// example api
PPJSBridge.ready(function (res, app) {
  //do something
})
```

### browser

```html

<script src="https://github-npm.apeiwan.com/ppjsbridge/ppjsbridge.min.js"></script>
<script>
    // example api
    PPJSBridge.ready(function (res, app) {
        //do something
    })
</script>
```

### 初始化

`初始化应在调用任何 PPJSBridge 方法之前进行`

```html
<!--初始化形式1-->
<script>
    PPJSBridge.init({
        console: false // 是否调用时打印日志。建议在 Vue 项目初始化时可以设置值为 process.env.VUE_APP_ENVIRONMENT，当为 production 时不会打印日志
    })
</script>

<!--初始化形式2：必须有属性 id="PPJSBridge" 才能识别 设置的属性值-->
<script id="PPJSBridge" console="true" src="https://github-npm.apeiwan.com/ppjsbridge/ppjsbridge.min.js"></script>
<!--在vue的项目，当用模版文件时，可以这样写,在识别为 当为 production 时也不会打印日志-->
<script id="PPJSBridge" console="<%= VUE_APP_ENVIRONMENT%>" src="https://github-npm.apeiwan.com/ppjsbridge/ppjsbridge.min.js"></script>
```
