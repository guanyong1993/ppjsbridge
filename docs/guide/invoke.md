---
sidebarDepth: 2
---

# invoke 方法

## openAppPage

打开 app 原生页面，详见[app 原生页面](/guide/appRouter)

## openIm

打开 im

- **类型**： `function`

- **参数**：`[Obejct] imId, nickname`

- **返回值**：`无`

- **使用**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.invoke({
  cmd: 'func.openIm',
  data: { imId, nickname },
  handle: function(res) {},
});
```

## openRecord

录音功能

- **类型**： `function`

- **参数**：`[Obejct] maxTime, minTime, tip`

- **返回值**：`object`

- **使用**：[在线测试](/run/#调用接口-invoke)

:::warning 注意
这 3 个参数必须调接口获取/api/v2/user/voice-time，在控制台-平台配置管理-语音时间配置中修改
:::

```js
PPJSBridge.invoke({
  cmd: 'func.openRecord',
  data: {
    maxTime: 30,
    minTime: 5,
    tip: '语音最短5s最长不超过30s',
  },
  handle: (res) => {
    if (res.action === 'success') {
      // const data = res.data || {};
      // data.duration 录音文件时长
      // data.url 录音文件地址
    } else {
    }
  },
});
```

## bindMobile

绑定手机号

- **类型**： `function`

- **参数**：`无`

- **返回值**：`[String] mobile`

- **使用**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.invoke({
  cmd: 'func.bindMobile',
  handle: (res) => {
    if (res.action === 'success') {
    } else {
    }
  },
});
```

## openUploadVideo

上传图片（裁剪）

- **类型**： `function`

- **参数**：`无`

- **返回值**：`[Object] message`

- **使用**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.invoke({
  cmd: 'func.openImgCrop',
  handle: (res) => {
    const data = res.data || {};
    if (res.action === 'success' && data.message) {
      // data.message 图片文件地址
    } else {
    }
  },
});
```

## openUploadVideo

上传视频

- **类型**： `function`

- **参数**：`无`

- **返回值**：`[Object] url, duration`

- **使用**：[在线测试](/run/#调用接口-invoke)

```js
PPJSBridge.invoke({
  cmd: 'func.openUploadVideo',
  handle: (res) => {
    const data = res.data || {};
    if (res.action === 'success' && data.url) {
      // data.duration 视频文件时长
      // data.url 视频文件地址
    } else {
    }
  },
});
```

## openAuthentication

支付宝实名认证

- **类型**： `function`

- **参数**：`[String] url`

- **返回值**：`object`

- **使用**：[在线测试](/run/#调用接口-invoke)

:::warning 注意
url 参数调用接口获取/api/v2/user/get-ali-url，在支付宝完成实名认证之后需要在调用一次接口/api/v2/user/check-body-auth，已完成整个实名认证流程
:::

```js
PPJSBridge.invoke({
  cmd: 'func.openAuthentication',
  data: { url: '' },
  handle: () => {},
});
```
