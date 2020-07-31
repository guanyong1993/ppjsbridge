# 原生页面路由

## 我的优惠券

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/YouHuiJuanListActivity","ios_route":"KHMyCouponController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/YouHuiJuanListActivity',
  ios: 'KHMyCouponController',
});
```

## 我的接单设置页面

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/JieDanSheZhiActivity_New","ios_route":"KHSettingOrderController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/JieDanSheZhiActivity_New',
  ios: 'KHSettingOrderController',
});
```

## 我的接单列表（陪练师订单）

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/DaShou_OrderListActivity","ios_route":"KHTeacherOrderListController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/DaShou_OrderListActivity',
  ios: 'KHTeacherOrderListController',
});
```

## 我的下单记录（用户订单）

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/MyOrderListActivity","ios_route":"KHUserOrderListController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/MyOrderListActivity',
  ios: 'KHUserOrderListController',
});
```

## 皮皮币充值

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/ChongZhi_MoneyActivity","ios_route":"KHChargeCoinsController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/ChongZhi_MoneyActivity',
  ios: 'KHChargeCoinsController',
});
```

## 钻石充值

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/ChongZhi_ZuanShiActivity","ios_route":"KHMyVirtualWalletController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/ChongZhi_ZuanShiActivity',
  ios: 'KHMyVirtualWalletController',
});
```

## 聊天室 Tab(v1.3.3 及以上)

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"MainActivity?index=1","ios_route":"KHChatRoomHallController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/MainActivity?index=1',
  ios: 'KHChatRoomHallController',
});
```

## 动态 Tab(v1.3.3 及以上)

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"MainActivity?index=2","ios_route":"KHDiscoveryController"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/MainActivity?index=2',
  ios: 'KHDiscoveryController',
});
```

## 进入房间(v1.3.3 及以上)

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"/khpw/RoomDetailActivity_PaiDan?roomNo=TEST327000","ios_route":"KHChatRoomViewController?roomNo=TEST327000"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/RoomDetailActivity_PaiDan',
  ios: 'KHChatRoomViewController',
  query: {
    roomNo: 'TEST327000',
  },
});
```

## 进入派单厅

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"activity.DispatchRoomListActivity","ios_route":"KHSendOrderRoomListVC"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/RoomDetailActivity_PaiDan',
  ios: 'KHChatRoomViewController',
  query: {
    roomNo: 'TEST327000',
  },
});
```

## 用户主页(v1.3.3 及以上)

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"UserDetailActivity?uid=147034","ios_route":"KHCardViewController?userId=147034"}',
  },
});

PPJSBridge.openWindow({
  android: '/khpw/UserDetailActivity',
  ios: 'KHCardViewController',
  query: {
    '[ios:uid,android:userId]': 147034,
  },
});
```

## 进入类目页面(v1.5.5 及以上)

```js
PPJSBridge.invoke({
  cmd: 'func.openAppPage',
  data: {
    para:
      '{"androidRoute":"category.CategoryListActivity?categoryName=荒野乱斗&categoryId=66&icon=https://game-play.oss-cn-hangzhou.aliyuncs.com/2020/6/15/c0687d9d9c264a668fb708107dc6255f.png","ios_route":"KHGameCenterController?categoryName=荒野乱斗&categoryId=66&icon=https://game-play.oss-cn-hangzhou.aliyuncs.com/2020/6/15/c0687d9d9c264a668fb708107dc6255f.png"}',
  },
});

PPJSBridge.openWindow({
  android: 'category.CategoryListActivity',
  ios: 'KHGameCenterController',
  query: {
    categoryId: 66,
    categoryName: '荒野乱斗',
    icon:
      'https://game-play.oss-cn-hangzhou.aliyuncs.com/2020/6/15/c0687d9d9c264a668fb708107dc6255f.png',
  },
});
```
