/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'dropload',
    'utilTool',
    'searchTool',
    'doT',
    'text!tpl/searchList.tpl'
], function (jquery, InfoChannel,dropload, UtilTool, searchTool, doT, slTpl) {
//doT编译模版
    var slTemp = doT.template(slTpl);
//初始化数据
    var url = configData.dataHost + '/index.php';//设置url
    var cateId=UtilTool.GetUrlPara();//取cateId
    var flag = {
        together: false,
        sale: false,
        up: false,
        down: false
    };
    var param={
        type:"",
        p: 1,
        cid:cateId,
        action: 'cateInfoIndex'
    };
    var togetherList=$("[data-attach-point=togetherList]");
    var salesList=$("[data-attach-point=salesList]");
    var priceUpList=$("[data-attach-point=priceUpList]");
    var priceDownList=$("[data-attach-point=priceDownList]");
    InfoChannel.getDataByAjax(url, param, function (data) {
        if(data.flag){
            $("[data-attach-point=cat_name]").html(data.data.cateInfo.cat_name);
            if(data.seo) {
                UtilTool.renderKeyWords(data.seo);
            }
        }
    });


    var pageSizeTo = 1;//综合第一页
    var pageSizeSales = 1;//销量第一页
    var pageSizePU = 1;//价格升序第一个
    var pageSizePD = 1;//价格降序第一个

    var dropload = $("[data-attach-point=order-list]").dropload({
        scrollArea: window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">加载中...</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData"></div>'
        },
        loadDownFn: function (me) {
            $(".dropload-down").show();
            //综合排序
            if (param.type === "") {
                var paramAll = {
                    p: pageSizeTo,
                    cid:cateId,
                    action: 'cateInfoIndex'
                };
                InfoChannel.getDataByAjax(url, paramAll, function (data) {
                    $("[data-attach-point=cat_name]").html(data.data.cateInfo.cat_name);
                    if (data.data.gInfo.length === 0) {
                        flag.together = true;
                        dropload.lock();
                        dropload.noData();
                        if(pageSizeTo===1){
                            togetherList.html(nullTemp)  ;
                        }
                        else{
                            togetherList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    } else {
                        togetherList.append(slTemp(data.data.gInfo));
                        pageSizeTo = pageSizeTo + 1;
                        if (data.data.gInfo.length < 10) {
                            flag.together = true;
                            dropload.lock();
                            dropload.noData();
                            togetherList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }

                    }
                    me.resetload();// 每次数据加载完，必须重置
                });
            }
            //销量排序
            else if (param.type === "num") {
                var paramAll = {
                    p: pageSizeSales,
                    cid:cateId,
                    action: 'cateInfoIndex',
                    type:"num"
                };

                InfoChannel.getDataByAjax(url, paramAll, function (data) {
                    if (data.data.gInfo.length === 0) {
                        flag.sale = true;
                        dropload.lock();
                        dropload.noData();
                        if(pageSizeSales===1){
                            salesList.html(nullTemp)  ;
                        }
                        else {
                            salesList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    } else {
                        salesList.append(slTemp(data.data.gInfo));
                        pageSizeSales = pageSizeSales + 1;
                        if (data.data.gInfo.length < 10) {
                            flag.sale = true;
                            dropload.lock();
                            dropload.noData();
                            salesList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    }
                    me.resetload();	// 每次数据加载完，必须重置
                });
            }
            //价格递增排序
            else if (param.type === "priceUp") {
                var paramAll = {
                    p: pageSizePU,
                    type:"price",
                    cid:cateId,
                    action: 'cateInfoIndex',
                    up:1
                };

                InfoChannel.getDataByAjax(url, paramAll, function (data) {
                    if (data.data.gInfo.length === 0) {
                        flag.up = true;
                        dropload.lock();
                        dropload.noData();
                        if(pageSizePU===1){
                            priceUpList.html(nullTemp)  ;
                        }
                        else {
                            priceUpList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    } else {
                        priceUpList.append(slTemp(data.data.gInfo));
                        pageSizePU = pageSizePU + 1;
                        if (data.data.gInfo.length < 10) {
                            flag.up = true;
                            dropload.lock();
                            dropload.noData();
                            priceUpList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }


                    }
                    me.resetload();// 每次数据加载完，必须重置
                });
            }
            //价格递减排序
            else if (param.type === "priceDown"){
                var paramAll = {
                    p: pageSizePD,
                    type:"price",
                    cid:cateId,
                    action: 'cateInfoIndex',
                    up:-1
                };

                InfoChannel.getDataByAjax(url, paramAll, function (data) {
                    if (data.data.gInfo.length === 0) {
                        flag.down = true;
                        dropload.lock();
                        dropload.noData();
                        if(pageSizePD===1){
                            priceDownList.html(nullTemp)  ;
                        }
                        else {
                            priceDownList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    } else {
                        priceDownList.append(slTemp(data.data.gInfo));
                        pageSizePD = pageSizePD + 1;
                        if (data.data.gInfo.length < 10) {
                            flag.down = true;
                            dropload.lock();
                            dropload.noData();
                            priceDownList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div>');
                        }
                    }
                    me.resetload();// 每次数据加载完，必须重置
                });
            }
        }
    });
//tab-综合
    $('[data-attach-point=t1]').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#priceId').removeClass('default up down').addClass('default');
        param.type="";
        togetherList.siblings("ul").hide();
        togetherList.show();
        if (!flag.together) {
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        } else {
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
        dropload.resetload();
    });
//tab-销量
    $('[data-attach-point=t2]').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#priceId').removeClass('default up down').addClass('default');
        param.type="num";
        salesList.siblings("ul").hide();
        salesList.show();
        if (!flag.sale) {
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        } else {
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
        dropload.resetload();
    });
//tab-价格
    $('[data-attach-point=t3]').on('click',function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        if($("#priceId").hasClass('up')){//包含
            $('#priceId').removeClass('default up').addClass('down');
            param.type="priceDown";
            if (!flag.down) {
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            } else {
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
            priceDownList.siblings("ul").hide();
            priceDownList.show();
        }else{//不包含
            $('#priceId').removeClass('default down').addClass('up');
            param.type="priceUp";
            if (!flag.up) {
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            } else {
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
            priceUpList.siblings("ul").hide();
            priceUpList.show();
        };

        dropload.resetload();
    });

    var first = true;

    //加入购物车动效
    $('[data-attach-point=order-list]').on('click','[data-attach-point=addCar]', function (e) {
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
        };
        InfoChannel.getDataByAjax(urlCart, param, function (data){
            $("[data-attach-point=snm]").text(data.cartnum);
            $.cookie("cartnum",data.cartnum,{path: '/' });//将购物车数量加入cookie

            $('.diaInfo').text('加入购物车成功');
            $(".dialog").show().fadeOut(2000);
            e.stopPropagation();
        });
    });

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
    //设置回到顶部动效
    UtilTool.goTop();


})