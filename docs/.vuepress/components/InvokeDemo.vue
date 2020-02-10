<template>
    <div style="border: 1px solid #f5f5f5">
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">接口：cmd <span style="font-size: 14px;color:#999;">(例如:func.login)</span></p>
            <van-cell-group>
                <van-field placeholder="请输入接口名称" v-model="cmd"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">版本号：version <span style="font-size: 14px;color:#999;">(例如:1.3.9)</span></p>
            <van-cell-group>
                <van-field placeholder="请输入版本号,没有可以不填" v-model="version"/>
            </van-cell-group>
        </div>
        <div style="padding: 4px;padding-bottom: 0;border-bottom: 0;margin-bottom: 10px;">
            <p style="padding-left: 5px">参数：data <span style="font-size: 14px;color:#999;">(json格式,选择手动就只读取手动)</span></p>
            <van-cell-group>
                <van-field :disabled="jsonCustom" type="textarea" placeholder="请输入接口需要参数，格式 json 对象" v-model="data"/>
            </van-cell-group>
            <div style="padding-top: 10px;font-size: 12px;color:#666;padding-left: 5px">
                <van-checkbox shape="square" v-model="jsonCustom" checked-color="#07c160">手动添加json对象,按照key/value的形式组合
                </van-checkbox>
            </div>
            <div v-show="jsonCustom">
                <div :key="index" v-for="(item,index) in jsonCustomList">
                    <div style="padding-left: 10px;display: flex;align-items: center;">
                        <p style="padding-right: 10px;">key:value</p>
                        <van-button
                                @click="jsonCustomList.push({key:'',value:''})" type="primary" size="mini">添加
                        </van-button>
                        <van-button v-if="index!==0" @click="jsonCustomList.splice(index,1)" type="danger" size="mini">
                            删除
                        </van-button>
                    </div>
                    <div style="display: flex;align-items: center;font-size: 12px;">
                        <div style="width: 40%">
                            <van-cell-group>
                                <van-field placeholder="请输入key" v-model="item.key"/>
                            </van-cell-group>
                        </div>
                        <div style="width: 60%">
                            <van-cell-group>
                                <van-field label-width="40px" placeholder="请输入value" v-model="item.value"/>
                            </van-cell-group>
                        </div>
                    </div>
                </div>
            </div>
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
        cmd: '',
        data: '',
        version: '',
        jsonCustom: false,
        key: '',
        value: '',
        jsonCustomList: [
          {key: '', value: ''}
        ],
      };
    },
    mounted() {
      const vConsole = new VConsole();
    },
    methods: {
      submit() {
        console.warn('invoke::参数:::', JSON.stringify({
          cmd: this.cmd,
          version: this.version,
          data: this.dataJson()
        }))
        this.$dialog.alert({
          message: '请点击 vConsole 绿色箭头查看控制台执行结果'
        });
        PPJSBridge.invoke({
          cmd: this.cmd,
          version: this.version,
          data: this.dataJson(),
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
