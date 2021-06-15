declare namespace PPJSBridge {

    /**
     * 调用原生方法回调的res对象
     */
    interface res {
        data?: any;
        action: actionValue;
        message?: string
    }

    /**
     * 调用原生方法回调的app对象
     */
    interface app {
        token?: string,
        env: envValue,
        os: osValue,
        version: version,
        isLogin: boolean
    }

    /**
     * 保持回调选项
     */
    interface invokeBridgeCallBackKeep {
        callBack?: invokeBridgeCallBack,
        keep: true,
    }

    /**
     * 版本号判断
     */
    interface versionOptions {
        ios?: string,
        android?: string
    }


    /**
     * 调用新方法时的使用参数
     */
    interface invokeOptions {
        cmd: string,
        data?: object,
        version?: version,
        handle?: invokeBridgeCallBack,
        success?: invokeBridgeCallBackOnce,
        fail?: invokeBridgeCallBackOnce,
        complete?: invokeBridgeCallBackOnce,
    }

    /**
     * 打开页面的选项
     */
    interface openWindowOptions {
        /**
         * ios url
         */
        ios: openWindowOptionsUrl,
        /**
         * android url
         */
        android: openWindowOptionsUrl,
        /**
         * 版本号
         */
        version?: string,
        /**
         * 非app环境跳转的url
         */
        href?: string,
        /**回调*/
        handle: invokeBridgeCallBack
    }

    /**
     * 初始化时的选项
     */
    interface initOptions {
        /**
         * 是否开启日志打印选项
         */
        console?: boolean
    }

    /**
     * 分享的data选项
     */
    interface shareOptionsData {
        /**
         * 分享的url
         */
        url: string,
        /**
         * 点击分享面板-复制-按钮的的url，如果此项无值，默认取 url 值
         */
        copy?: string,
        /**
         * 分享的内容
         */
        content: string,
        /**
         * 分享时的标题
         */
        title: string,
        /**
         * 分享时的图片地址
         */
        image: string
    }

    /**
     * 分享的选项
     */
    interface shareOptions {
        data: shareOptionsData,
        handle?: invokeBridgeCallBack,
        success?: invokeBridgeCallBackOnce,
        fail?: invokeBridgeCallBackOnce,
        complete?: invokeBridgeCallBackOnce,
    }

    /**
     * 分享时单独设立的app内打开的url
     */
    interface shareSetting {
        appOpenUrl?: string,
    }

    /**
     * 打开页面的url选项
     */
    interface openWindowOptionsUrlOptions {
        url: string,
        version?: string,
        query?: object
    }

    /**
     * PPBridge Core
     */
    interface methods {

        /**
         *  监听页面准备事件
         * @param {function} callBack
         */
        ready(callBack: invokeBridgeCallBackOnce): void,

        /**
         * 页面登录
         */
        login(callback: invokeBridgeCallBackOnce): void,

        /**
         * 打开页面 url
         */
        openWindow(options: openWindowOptions): void,

        /**
         * 返回 JSBridge 的 token
         */
        getToken(): string,

        /**
         * 返回 JSBridge 的 版本号
         */
        getVersion(): string,

        /**
         * 返回 JSBridge 的环境
         */
        getEnv(): envValue,

        /**
         * app 对象
         */
        getApp(): app,

        /**
         * 调用新方法时的 invoke
         */
        invoke(options: invokeOptions): void,

        /**
         * 调用新方法时的 invoke
         */
        os: osValue,

        /**
         * 是否登录
         */
        isLogin(): boolean,

        /**
         * 是否在 pipi app 的环境内
         */
        isPiPiApp: boolean,

        /**
         * 判断是否支持版本号
         */
        isCanIUse(version: version): boolean,

        /**
         * 初始化PPJSBridge
         */
        init(options: initOptions): void

        /**
         * 分享功能
         */
        share(options: shareOptions, settingOptions?: shareSetting): void

        /**
         * 获取url参数
         */
        getStitchingUrlParams(params: object, symbol?: string): object

        /**
         * 给指定的url网址添加参数
         */
        addUrlParams(url: string, stitchingUrlParams?: string): string

        /**
         * 获取 url 参数
         * @param url
         */
        getRequestUrlParam(url: string): string
    }

    /**
     * 打开页面选项
     */
    type openWindowOptionsUrl = string | openWindowOptionsUrlOptions

    /**
     * * 版本支持选项参数
     */
    type version = string | versionOptions;

    /**
     * 只相应一次回调
     */
    type invokeBridgeCallBackOnce = (res: res, app: app) => void;

    /**
     * 调用原生 bridge 事件回调
     */
    type invokeBridgeCallBack = invokeBridgeCallBackOnce | invokeBridgeCallBackKeep


    /**
     * 环境变量的值
     */
    type envValue = 'R' | 'B' | 'A'

    /**
     * 系统类型的值
     */
    type osValue = 'android' | 'ios' | 'pc'

    /**
     * action 可能的值
     */
    type actionValue = 'success' | 'fail' | 'notSupport' | 'notApp';

}

declare const PPJSBridge: PPJSBridge.methods;
