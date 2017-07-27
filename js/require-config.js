/**
 * Created by zhouxiangbo on 2017/7/26 0016.
 */
//********用于访问前端*******************
window.origin="http://"+window.location['host'];
window.pathname=window.location['pathname'];

//********用于访问服务端*******************
window.configData={
    //数据源
    dataHost:"http://cbs.youde.com"
    //dataHost:"https://easy-mock.com/"
};
//*************配置require加载js路径*********************
require.config({
    baseUrl: window.origin,
    waitSeconds: 0,
    paths: {
        ready:"ext/domReady",
        jquery:'ext/jquery-3.0.0',
        jqueryJSON:'ext/jquery-json-2.4',
        infoChannel:'ext/infoChannel',
        utilTool: 'ext/utils',
        text: 'ext/text',
        doT:'ext/doT',
        eventListen:'ext/on',
        cookie:"ext/jquery.cookie",
        base64:"ext/jquery.base64",
        swiper:"ext/swiper",
        libConfig:'ext/libConfig',
        dropload:'ext/dropload',
        jqueryForm:'ext/jquery.form',
        mobiscroll01:'ext/mobiscroll-1',
        mobiscroll02:'ext/mobiscroll-2',
        mobiscroll03:'ext/mobiscroll-3',
        searchTool:'components/searchTool'
    },
    shim: {
        "jquery":{
            exports: "jquery"
        },
        "jqueryJSON":{
            deps: ['jquery'],
            exports: "jqueryJSON"
        },
        "doT":{
            exports: "doT"
        },
        "focusSlider":{
            deps: ['jquery'],
            exports: "focusSlider"
        },
        "cookie":{
            deps: ['jquery'],
            exports: "cookie"
        },
        "base64":{
            deps: ['jquery'],
            exports: "base64"
        },
        "swiper":{
            deps: ['jquery'],
            exports: "swiper"
        },
        'dropload':{
            deps:['jquery'],
            exports:"dropload"
        },
        'jqueryForm':{
            deps:['jquery'],
            exports:"jqueryForm"
        },
        'mobiscroll01':{
            deps:['jquery'],
            exports:"mobiscroll01"
        },
        'mobiscroll02':{
            deps:['jquery','mobiscroll01'],
            exports:"mobiscroll02"
        },
        'mobiscroll03':{
            deps:['jquery','mobiscroll02'],
            exports:"mobiscroll03"
        }
    }
});

