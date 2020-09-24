# 路由

:::warning 注意

- **只能通过 [openWindow](/guide/api.html#openwindow) 方法进行调用**

- **有多个 url 的话，代表有多个跳转到不同功能页面路由的地址**

:::

## 首页指定tab

- **ios**：
    - **url**:
    `KHChatRoomHallController` - `聊天室tab`

    - **url**:
    `KHDiscoveryController` - `动态tab`
    
- **android**：

    - **url**:
    `MainActivity`
    
    - **query**：
    ::::: params index
    - 仅有以下可选项
    
        ```shell script
         1 =>聊天室tab
         2 =>动态tab
        ```
    :::::
    
## 名片页
用户详情展示页

- **android**：

    - **url**：
    `UserDetailActivity`
    
    - **query**：
        ::::: params uid
        - 用户id
        :::::
    
    
- **ios**：

    - **url**：
    `KHCardViewController`
    
    - **query**：
        ::::: params userId
        - 用户id
        :::::

## 游戏分类列表

- **android**：

    - **url**：
    `ProductListActivity`
    
    - **query**：
        ::: params categoryId
        - 技能分类ID
        :::
        
        ::: params categoryName
        - 技能分类名称
        :::
    
- **ios**：

    - **url**：
    `KHGameMainController`
    
    - **query**：
        ::: params categoryId
        - 技能分类ID
        ::::
         
        ::: params title
        - 技能分类名称
        :::

## 接单设置页面

- **android**：

    - **url**：
    `JieDanSheZhiActivity_New`

- **android**：

    - **url**：
    `KHSettingOrderController`
    
## 单个品类接单设置页面

- **android**：

    - **url**：
    `JiNengSheZhiActivity`
    
    - **query**：
        ::: params techAuthId
        - 个人技能ID
        ::::
    
- **ios**：

    - **url**：
    `KHCategorySettingController`

    - **query**：
        ::: params recId
        - 个人技能ID
        ::::
        ::: params categoryId
        - 技能分类ID
        ::::

## 编辑品类资料页面

- **android**：

    - **url**：
    `JiNengShezhiEditActivity`
    
    - **query**：
        ::: params techAuthId
        - 个人技能ID
        ::::
    
- **ios**：

    - **url**：
    `KHEditCategoryInfoController`
    
    - **query**：
        ::: params recId
        - 个人技能ID
        ::::
        ::: params categoryId
        - 技能分类ID
        ::::

## 创建订单

- **android**：

    - **url**：
    `FillOrderActivity_New`
    
    - **query**：
        ::: params productId
        - 个人技能的ID
        ::::
    
- **ios**：

    - **url**：
    `KHPlaceOrderController`
    
    - **query**：
        ::: params productId
        - 个人技能的ID
        ::::

## 接单列表

- **android**：

    - **url**：
    `DaShou_OrderListActivity`
    
- **ios**：

    - **url**：
    `KHTeacherOrderListController`

## 下单列表

- **android**：

    - **url**：
    `MyOrderListActivity`
    
- **ios**：

    - **url**：
    `KHUserOrderListController`

## 皮皮币充值

- **android**：

    - **url**：
    `ChongZhi_MoneyActivity`
    
- **ios**：

    - **url**：
    `KHChargeCoinsController`

## 钻石充值

- **android**：

    - **url**：
    `ChongZhi_ZuanShiActivity`
    
- **ios**：

    - **url**：
    `KHMyVirtualWalletController`

## 我的优惠券

- **android**：

    - **url**：
    `YouHuiJuanListActivity`
    
- **ios**：

    - **url**：
    `KHMyCouponController`

## 进入聊天室

- **android**：

    - **url**：
    `RoomDetailActivity_PaiDan`
    
    - **query**：
        ::: params roomNo
        - 房间号
        :::
        :::warning
          android版本由于做了更改处理，在`1.7.3`版本以下时采用 `RoomDetailActivity_PaiDan?房间号`。
          `1.7.3`版本以上(含)时使用参数格式`RoomDetailActivity_PaiDan?roomNo=房间号`。
        :::
    
- **ios**：

    - **url**：
    `KHChatRoomViewController`
    
    - **query**：
        ::: params roomNo
        - 房间号
        :::

## 进入派单厅

- **android**：

    - **url**：
    `activity.DispatchRoomListActivity`
    
- **ios**：

    - **url**：
    `KHSendOrderRoomListVC`

## 图文动态详情

- **android**：

    - **url**：
    `DongTai2_DongTaiListActivity`
    
    - **query**：
        :::params dynamicId
        - 动态ID
        :::
    
- **ios**：

    - **url**：
    `KHMyVirtualWalletController`
    - **query**：
        :::params dynamicId
        - 动态ID
        :::
