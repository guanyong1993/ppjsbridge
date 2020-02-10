<template>
    <div v-if="isPiPiApp" style="border: 1px solid #f5f5f5;margin-top: 40px;">
        <h2 style="text-align: center;padding-bottom: 20px;">**皮皮PiPi App**</h2>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
            <p style="padding-left: 5px">token：</p>
            <p style="font-weight: bold">{{token}}</p>
            <van-button v-clipboard:copy="token"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        type="primary" size="small">
                复制
            </van-button>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
            <p style="padding-left: 5px">version：</p>
            <p style="font-weight: bold">{{version}}</p>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
            <p style="padding-left: 5px">env：</p>
            <p style="font-weight: bold">{{env}}</p>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
            <p style="padding-left: 5px">isLogin：</p>
            <p style="font-weight: bold">{{isLogin}}</p>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
            <p style="padding-left: 5px">os：</p>
            <p style="font-weight: bold">{{os}}</p>
        </div>
    </div>
</template>
<script>
  import VConsole from 'vconsole'
  import PPJSBridge from '@apeiwan/ppjsbridge';
  import {Toast} from 'vant'

  export default {
    data() {
      return {
        token: '123',
        env: '',
        isLogin: '',
        version: '',
        os: '',
        isPiPiApp: PPJSBridge.isPiPiApp
      };
    },
    mounted() {
      PPJSBridge.ready((res, app) => {
        const {
          token,
          env,
          isLogin,
          version,
          os
        } = app;
        this.token = token;
        this.env = env;
        this.isLogin = isLogin;
        this.version = version;
        this.os = os;
      });
    },
    methods:{
      onError(){
        Toast.success('复制失败，请手动复制');
      },
      onCopy(){
        Toast.success('复制成功');
      }
    }
  }
</script>
