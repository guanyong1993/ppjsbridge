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
 - 数据格式示例,将接口 成功状态 的数据完整的 `res` 对象传入即可
```json5
{
  "status": 200,
  "data": {
    "requestParameter": {
      "sign": "2583A2B2CE835F7266690F70AF6450D9",
      "pepayld": "wxl31011307928055d3d7131471061591800",
      "partneId": "1514946151",
      "appld": "wxOSieBleSleaOAbaO",
      "packageValue": "Sign=WXPay",
      "timestamp": "1576203672",
      "nonceStr": "1576203672994"
    },
    "directPay": false
  },
  "msg": ""
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
 - 数据格式示例,将接口 成功状态 的数据完整的 `res` 对象传入即可

```json5
{
  "status": 200,
  "data": {
    "requestParameter": "alipay_sdk=alipay-sdk-java-3.3.49.ALL&app_id=2018091361378432&biz_content=%7B%22body%22%3A%22%E7%9A%AE%E7%9A%AE%E5%B8%81%E5%85%85%E5%80%BC%3A0.01%E5%B8%81%22%2C%22out_trade_no%22%3A%22C_TEST200212592880%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E7%9A%AE%E7%9A%AE%E5%B8%81%E5%85%85%E5%80%BC%3A0.01%E5%B8%81%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Ft-callback.apeiwan.com%2Fapi%2Fv1%2Fpay&sign=SMC8MnkhiyXdL6LtZSNwVmzD%2FRLrgQXv3gJDdTiiEaXM0UyFiwsyfdZem1nYA2qSn8OMTSBP%2FCuKMvxABAoL5JewhXkE%2FmsaTQ23HfFiI105Oc%2BZavktJMaKq3POD%2Fp12ALEkO2ZR6VP2BXsww4%2Fg%2F19SmSYKAsJpzHDB9pqD7XBKhSX3B8HZ9e8zIONYrDu7bTJTUOWbQ3Pc27VXwG83vYdjdBCSz162BfLYeeBj0iHABaAeYiQAHgBJbOXvqvsoBZa7bjSXn0TJG%2FStlqcqv1OCGXiok6UI6xNc3ju8sU8DheIYR5oIXDiT%2Bm%2B6GrtpaRDBFfoaF9Y9WaDItuNpQ%3D%3D&sign_type=RSA2&timestamp=2020-02-12+11%3A59%3A11&version=1.0",
    "directPay": false
  },
  "msg": ""
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
`func.openBrowser`

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
`func.share`

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


## FM开通守护
::: tip 支持系统
**Android**
**iOS**
:::

- **cmd**：
`func.openGuard`

- **data**:  
    ::::    paramsName {string} data.userId
    - 用户id
    :::::

    ::::    paramsName {string} data.nickname
    - 用户昵称
    :::::

    ::::    paramsName {string} data.roomNo
    - 房间id
    :::::

    ::::    paramsName {int} data.guardType
    - 守护类型 `1:普通；2:黄金；3:钻石；`
    :::::


  
## 巡管操作
::: tip 支持系统
**Android**
**iOS**
:::

- **cmd**：  
  :::: 用户操作 `func.userOperate` ::::  
  :::: 房间操作 `func.roomOperate` :::: 

- **data**:  
    ::::    paramsName {string} data.userId
    - 用户id
    :::::

    ::::    paramsName {string} data.nickname
    - 用户昵称
    :::::

    ::::    paramsName {string} data.roomNo
    - 房间id
    :::::

    ::::    paramsName {Object} 巡管操作后接口返回的数据
    - 接口发挥数据
    :::::