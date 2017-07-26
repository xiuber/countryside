/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'utilTool',
    'infoChannel',
    'cookie',
    'doT',
    'text!tpl/userIndex.tpl'
], function (jquery, UtilTool,InfoChannel,cookie,doT,userTpl) {
    var url_index = configData.dataHost + '/my.php';//设置url
    var userIndex = doT.template(userTpl);//doT编译模版
//初始化页面
    var paramDate={
        action:"index",
        uid:$.cookie("uid")
    }
    InfoChannel.getDataByAjax(url_index, paramDate, callback);
    function callback(data) {
        $("[data-attach-point=nav]").html(userIndex(data));
        if(data.seo) {
            UtilTool.renderKeyWords(data.seo);
        }
        //设置用户名
        var uname = $.cookie("uname");
        $('[data-attach-point=mn]').text(uname);

    };
//下载app
    $("[data-attach-point=downApp]").on("click",function(){
        window.location=UtilTool.app_download();
    })
    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
})