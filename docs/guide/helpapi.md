---
sidebarDepth: 2
---

# 其他API
:::warning
以下 常量 或 函数 **不依赖 JSBridge**  对象注入完毕，即可以进行使用
:::
## os
获取浏览器的 [系统类型](https://app.apeiwan.com)

:::warning
常量属性，页面加载即可使用，不依赖 JSBridge 是否注入完毕
:::

- **类型**：`string`

- **用法**：[在线测试](/run/#调用接口-invoke)
```js
PPJSBridge.os 
```

## isPiPiApp
获取当前页面运行环境是否在app中

:::warning
常量属性，页面加载即可使用，不依赖 JSBridge 是否注入完毕
:::

- **类型**：`boolean`

- **用法**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.isPiPiApp 
```

## getRequestUrlParam
获取 url 字符串中的参数，

- **类型**：`function`

- **返回**：`object`

- **用法**：[在线测试](/run/#调用接口-invoke)

```js
// 默认获取的值为 window.location.href
// 比如 window.location.href 为 https://www.xx.com/?name=123&age=456
PPJSBridge.getRequestUrlParam();
// => {name:'123',age:'456'}

// 可以传入指定的ur
PPJSBridge.getRequestUrlParam('https://xx.xx.xx/?name=123');
```

## getStitchingUrlParams
将指定对象转换为 get 字符串形式的参数

- **类型**：`function`

- **返回**：`string`

- **用法**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.getStitchingUrlParams({name:'123',age:'456'});
// => name=123&age=4456
```
