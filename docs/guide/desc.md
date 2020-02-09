
# 其他说明

## 回调约定

- ***第一个参数 `res` 会返回如下 `object`,为接口调用的反馈***
```json5
{
   // 有些接口需要在调用之后接收来自 app 端的数据
   data: {}, 
   // success / fail / notApp / notSupport
   // success：有些接口会通知页面调用成功，不是每个接口都有回调成功的通知
   // fail：有些接口会通知页面调用失败，不是每个接口都有回调失败的通知
   // notApp：当非 app 环境调用时，会触发
   // notSupport：当调用的时候指定了 version 属性值，如果app系统版本不符合，会触发，
   action: "" ,
   // app端给的错误提示信息
   message: "" 
}
```

- ***第二个参数 `app` 会返回如下 `object`，为当前app环境的特征信息。***
```json5
{
   isLogin: false, // false / true
   os: "" ,
   env: "", 
   token: "", 
   version: "", 
}
```

## os
 `string` 系统类型

可能的值
```shell script
=> pc：非移动端端
=> ios：ios客户端
=> android：android客户端
```

## env
`string`app 版本

:::warning 注意
 ios 和 android 在测试环境返回的版本字符串会不一致，因此判断是否非正式环境，请使用 `!=='R'`
:::
```shell script
=> R：正式版
=> B：ios测试版，会返回 `B`
=> A：android测试版，会返回 `A`
```

## token
`string`app 登录用户的token

 app未登录时，值为`''`

## version 
`string`app版本号 
```html
// 格式示例
1.2.3
```
