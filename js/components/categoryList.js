/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'searchTool',
    'doT',
    'text!tpl/searchList.tpl'
], function (jquery, InfoChannel, UtilTool, searchTool,doT, slTpl) {
//doT编译模版
    var slTemp = doT.template(slTpl);

//前端分页参数
    var start = 0;//数据开始位置
    var size = 5;//步长
    var end = size;//数据截至位置
    var dataList = [];

//初始化数据
    var url = configData.dataHost + '/index.php';//设置url
    var cateId=$('[data-attach-point=goTo]').attr("id");//取cateId

    var param = {
        action: 'search_result_ajax',
        cateid: cateId,
        tag:1
    };
    InfoChannel.getDataByAjax(url, param, initCallback);
    function initCallback(data) {
        dataList = data.info;
    };

//滚动加载
    $(document).bind('scroll', onScroll);
    function onScroll(event) {
        //是否到底部（这里是判断离底部还有100px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
        if (closeToBottom) {
            if (dataList.length !== end) {
                start = end;
                end = end + size;
                var arr = dataList.slice(start, end);
                if (arr.length !== 0) {
                    $('[data-attach-point=sr]').append(slTemp(arr));
                    $('[data-attach-point=addCar]').off('click');
                    addShopCar();
                } else {
                    $('[data-attach-point=none]').show();
                }
            }
        }
    };

//返回到主页
    $('[data-attach-point=goTo]').on('click', function () {
        window.location.href = '/category';
    });

//返回到结果页
    $('[data-attach-point=gom]').on('click', function () {
        $('[data-attach-point=master]').show();
        $('[data-attach-point=searchPage]').hide();
    });

//设置回到顶部动效
    UtilTool.goTop();

//input叉号处理
    var input = $('[data-attach-point=searchCase]');
    var icon = $('[data-attach-point=icon]');
    UtilTool.inputFork(input, icon);

//加入购物车动效
    addShopCar();
    function addShopCar() {
        $('[data-attach-point=addCar]').on('click', function (e) {
            var sid = $.cookie("sid");
            var uid = $.cookie("uid");
            var gid=$(this).attr("gid");
            var urlCart = configData.dataHost + '/cart.php';//设置url
            param={
                action:"insert_cart",
                sid:sid,
                user_id:uid,
                goods_id:gid,
                goods_number:"1"
            }
            InfoChannel.getDataByAjax(urlCart, param, function (data){
                $("[data-attach-point=snm]").text(data.cartnum);
                $.cookie("cartnum",data.cartnum,{path: '/' });//将购物车数量加入cookie

                $('.diaInfo').text('加入购物车成功');
                $(".dialog").show().fadeOut(2000);
                e.stopPropagation();
            });
        });
    };

//tab-渲染
    function tabCallback(data) {
        dataList = data.info;
        var ds = data.info.slice(0, 5);
        $('[data-attach-point=sr]').html(slTemp(ds));
        addShopCar();
        start = 0;
        end = size;
        $('[data-attach-point=none]').hide();
    };

//tab-综合
    $('[data-attach-point=t1]').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#priceId').removeClass('default up down').addClass('default');
        var param = {
            action: 'search_result_ajax',
            cateid: cateId,
            tag:1
        };
        InfoChannel.getDataByAjax(url, param, tabCallback);
    });
//tab-销量
    $('[data-attach-point=t2]').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#priceId').removeClass('default up down').addClass('default');
        var param = {
            action: 'search_result_ajax',
            type: 'sales',
            cateid: cateId,
            tag:1
        };
        InfoChannel.getDataByAjax(url, param, tabCallback);
    });
//tab-价格
    $('[data-attach-point=t3]').on('click',function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var param = {
            action: 'search_result_ajax',
            type: 'price',
            sort: null,
            cateid: cateId,
            tag:1
        };
        if($("#priceId").is('.up')){//包含
            $('#priceId').removeClass('default up').addClass('down');
            param.sort=-1;
        }else{//不包含
            $('#priceId').removeClass('default down').addClass('up');
            param.sort=1;
        };
        InfoChannel.getDataByAjax(url, param, tabCallback);
    });




})