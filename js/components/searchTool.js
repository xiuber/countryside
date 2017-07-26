/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'cookie',
    'doT',
    'text!tpl/hint.tpl'

], function (jquery, InfoChannel, UtilTool, cookie, doT, hintTpl) {

    var url = configData.dataHost + '/index.php';//设置url
    var hinTemp = doT.template(hintTpl);//doT编译模版

    //链接到搜索页
    $('[data-attach-point=searchLink]').on('click', function () {
        $('[data-attach-point=master]').hide();
        $('[data-attach-point=footer]').hide();
        $('[data-attach-point=searchPage]').show();
        //渲染我的搜索记录
        renderSearchRecord();
    });

    //关键字匹配列表
    var hintParam = {
        action: 'search_checkout'
    };
    $('[data-attach-point=searchCase]').on('input propertychange', function () {
        var key = $(this).val();
        if (key) {
            hintParam.keywords = key;
            InfoChannel.getDataByAjax(url, hintParam, hintData);
        } else {
            $('[data-attach-point=hintDiv]').hide();
            $('[data-attach-point=searchDiv]').show();
        }
        function hintData(data) {
            if (data.search_info.length != 0) {
                $('[data-attach-point=hintDiv]').show();
                $('[data-attach-point=searchDiv]').hide();
                $('[data-attach-point=hintList]').html(hinTemp(data.search_info));
                initHit();
            }
        }
    });
    //搜索框叉号处理
    $('[data-attach-point=icon]').on('click', function () {
        $('[data-attach-point=hintDiv]').hide();
        $('[data-attach-point=searchDiv]').show();
    });
    //tab切换-我的搜索
    $('[data-attach-point=mySearch]').on('click', function () {
        $(this).addClass('active');
        $('[data-attach-point=allSearch]').removeClass('active');
        $('[data-attach-point=mDiv]').show();
        $('[data-attach-point=aDiv]').hide();
        renderSearchRecord();
    });
    //tab切换-大家的搜索
    $('[data-attach-point=allSearch]').on('click', function () {
        $(this).addClass('active');
        $('[data-attach-point=mySearch]').removeClass('active');
        $('[data-attach-point=aDiv]').show();
        $('[data-attach-point=mDiv]').hide();
        var param = {
            action: 'search_logall'
        };
        InfoChannel.getDataByAjax(url, param, callback);
        function callback(data) {
            $('[data-attach-point=alList]').html(hinTemp(data.info));
            initHit();
        };
    });
    //关键字存入cookie
    function addCookie(key) {
        if (key) {
            var temp = $.cookie("keys");
            var keyArry = jQuery.parseJSON(temp);
            if (keyArry.length === 6) {
                keyArry.unshift({name: key});
                keyArry.pop();
                $.cookie("keys", $.toJSON(keyArry), {path: '/' });//--写入cookie
            } else {
                keyArry.unshift({name: key});
                $.cookie("keys", $.toJSON(keyArry), {path: '/' });//--写入cookie
            }
            //--跳转到结果页面
            window.location.href = encodeURI('/search/'+key);
        }
    };


    //点击搜索
    $('[data-attach-point=fd]').on('click', function () {
        var key = $('[data-attach-point=searchCase]').val();
        addCookie(key);
    });

    //渲染我的搜索记录
    function renderSearchRecord() {
        var temp = $.cookie("keys");
        var keyArry = jQuery.parseJSON(temp);
        $('[data-attach-point=ownList]').html(hinTemp(keyArry));
        initHit();
    };


    //弹出清除历史记录对话框
    $('[data-attach-point=clear]').on('click', function () {
        $('[data-attach-point=top]').show();
        $('[data-attach-point=below]').show();

    });
    //--取消
    $('[data-attach-point=cancel]').on('click', function () {
        $('[data-attach-point=top]').hide();
        $('[data-attach-point=below]').hide();
    });
    //--ok
    $('[data-attach-point=ok]').on('click', function () {
        $.cookie("keys", $.toJSON([]), {path: '/' });//--写入cookie
        $('[data-attach-point=ownList]').empty();
        $('[data-attach-point=top]').hide();
        $('[data-attach-point=below]').hide();
    });

    //链接到搜索结果页面
    function initHit() {
        $('[data-attach-point=hit]').on('click', function () {
            var kwd = $(this).text();
            addCookie(kwd);
        });
    };

    //搜索框键盘回车事件
    $('[data-attach-point=searchCase]').keypress(function (e) {
        if (e.keyCode == "13") {
            var key = $('[data-attach-point=searchCase]').val();
            addCookie(key);
        }
    });



});