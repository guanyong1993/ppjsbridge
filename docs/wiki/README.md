# 原生接口

:::warning 注意

- **只通过 [invoke](/guide/api.html#invoke) 方法进行调用**

    - **cmd**：对应 invoke 方法中 options 参数的 cmd 属性
    
    - **version**：属性存在值时，请在调用的时候带上。对应 invoke 方法中 options 参数的 version 属性
    
    - **data** 接口依赖参数，所有接口参数类型为 object。对应 invoke 方法中 options 参数的 version 属性

:::

## 拉起原生微信支付
::: tip 支持系统
**Android**
:::
:::warning
由于 iOS App 规则，虚拟充值必须走内购，不允许拉起原生支付
:::

**cmd**：
`func.pullWechat`

**version**：
`1.3.3`

**data**：
 - 数据格式示例
```json5
{
  "sign": "2583A2B2CE835F7266690F70AF6450D9",
  "pepayld": "wxl31011307928055d3d7131471061591800",
  "partneId": "1514946151",
  "appld": "wxOSieBleSleaOAbaO",
  "packageValue": "Sign=WXPay",
  "timestamp": "1576203672",
  "nonceStr": "1576203672994"
}
```

## 拉起原生支付宝支付
::: tip 支持系统
**Android**
:::
:::warning
由于 iOS App 规则，虚拟充值必须走内购，不允许拉起原生支付
:::

**cmd**：
`func.pullAlipay`

**version**：
`1.3.3`

**data**：
 - 数据格式示例
```json5
{
  "sign": "2583A2B2CE835F7266690F70AF6450D9",
  "pepayld": "wxl31011307928055d3d7131471061591800",
  "partneId": "1514946151",
  "appld": "wxOSieBleSleaOAbaO",
  "packageValue": "Sign=WXPay",
  "timestamp": "1576203672",
  "nonceStr": "1576203672994"
}
```

## 更新APP
::: tip 支持系统
**Android**
:::

**cmd**：
`func.updateApp`

**version**：
`1.3.3`

## 关闭当前窗口

::: tip 支持系统
**Android**
**iOS**
:::

**cmd**：`func.goBack`

## 通过浏览器中打开页面

:::tip 支持系统
**Android**     
**iOS**
:::

- **cmd**：
`function.openBrowser`

- **version**：
`1.3.31`

- **data**:

    ::::: paramsName {string} data.url
    
     - url 网址
    
    :::::
    
## 分享

::: tip 支持系统
**Android**     
**iOS**
:::

- **cmd**：
`function.share`

- **data**:

    ::::: paramsName {string} data.title
    - 分享的标题
    :::::
    
    ::::: paramsName {string} data.content
    - 分享的内容，建议文字个数在`15`个以内
    :::::
    
    ::::: paramsName {string} data.image
    - 分享图标，大小为：`300px*300px`
    :::::
    
    ::::: paramsName {string} data.url
    - 分享的url
    :::::

    ::::: paramsName {string} data.copy
    - 原生分享弹窗中，点击`复制`按钮所获取的网址
    :::::
    
## 保存图片到相册

::: tip 支持系统
**Android**     
**iOS**
:::

- **cmd**：
`gallery.save`

- **data**:

    ::::: paramsName {string} data.url
    - 图片的url地址
    :::::
