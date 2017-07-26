/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'doT',
    'text!tpl/categoryList.tpl'

], function (jquery, InfoChannel, UtilTool, doT, listTpl) {
    var listTemp = doT.template(listTpl);//doT编译模版
    var url = configData.dataHost + '/index.php';//设置url
    var param = {
        action: "category_detail"
    }
    $('[data-attach-point=sf]').on('click', function () {
        $('[data-attach-point=sf]').removeClass('current');
        $(this).addClass('current');

        var catId = $(this).attr('id');
        param.cat_id = catId;
        InfoChannel.getDataByAjax(url, param, callback);
    });
    function callback(data){
        $('[data-attach-point=tl]').html(listTemp(data));
    };
    //显示更多
    $("#go-quick-click").click(function(event){
        $("#quick-go-div").slideToggle();
        event.stopPropagation();
    });
    $("body").click(function(){
        if($("#quick-go-div").css("display")=="block"){
            $("#quick-go-div").slideUp();
        }
    });

    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
})