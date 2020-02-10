<template>
    <div style="border: 1px solid #f5f5f5">
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">iOS路由地址 <span style="font-size: 14px;color:#999;">(跳转原生iOS界面)</span></p>
            <p style="padding-left: 5px;font-size: 14px;color:#999;">例如：KHPlaceOrderController?productId=1</p>
            <van-cell-group>
                <van-field placeholder="请输入iOS原生路由地址" v-model="ios"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">Android路由地址 <span style="font-size: 14px;color:#999;">(跳转原生Android界面)</span>
            </p>
            <p style="padding-left: 5px;font-size: 14px;color:#999;">例如：FillOrderActivity_New?productId=1</p>
            <van-cell-group>
                <van-field placeholder="请输入Android原生路由地址" v-model="android"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">url地址 <span style="font-size: 14px;color:#999;">(webview加载web网址)</span></p>
            <p style="padding-left: 5px;font-size: 14px;color:#999;">例如：https://www.baidu.com</p>
            <van-cell-group>
                <van-field placeholder="输入此值, iOS & Android 参数失效" v-model="url"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">版本号：version <span style="font-size: 14px;color:#999;">(例如:1.3.9)</span></p>
            <van-cell-group>
                <van-field placeholder="请输入版本号,没有可以不填" v-model="version"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <van-button style="margin-top:20px" @click="submit" type="info" block>运行</van-button>
        </div>
    </div>
</template>
<script>
  import VConsole from 'vconsole'
  import PPJSBridge from '@apeiwan/ppjsbridge';

  export default {
    data() {
      return {
        ios: '',
        android: '',
        url: '',
        version: ''
      };
    },
    mounted() {
      const vConsole = new VConsole();
    },
    methods: {
      submit() {
        console.warn('openWindow::参数:::', JSON.stringify({
          ios: this.ios,
          android: this.android,
          url: this.url,
        }));
        this.$dialog.alert({
          message: '请点击 vConsole 绿色箭头查看控制台执行结果'
        });
        PPJSBridge.openWindow({
          ios: this.ios,
          android: this.android,
          url: this.url,
          handle: (res, app) => {
            console.log(JSON.stringify({res, app}))
          }
        })
      },
      dataJson() {
        let json = {};
        if (!this.jsonCustom) {
          try {
            return JSON.parse(this.data || '{}');
          } catch (e) {
          }
        } else {
          const jsonCustomList = this.jsonCustomList;
          for (let i = 0; i < jsonCustomList.length; i++) {
            const {key, value} = jsonCustomList[i];
            json[key] = value
          }
        }
      }
    }
  }
</script>
