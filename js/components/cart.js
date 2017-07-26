/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'doT',
    'text!tpl/cart.tpl',
    'text!tpl/cartNull.tpl'
], function (jquery, InfoChannel, UtilTool, doT, cartTpl,cartNullTpl) {
    var cartTemp = doT.template(cartTpl);//doT编译模版
    var cartNullTemp = doT.template(cartNullTpl);//doT编译模版
    var sid = $.cookie("sid");
    var uid = $.cookie("uid");
    var url = configData.dataHost + '/cart.php';//设置url
    var param = {
        action: "check_cart",
        sid: sid,
        user_id: uid,
        type: "",
        flag: "",
        rec_id: ""
    };

//返回
    $('[data-attach-point=sb]').on('click', function () {
        window.history.back();
    });

//修改全选状态
    function changeState(elements){
        var flag = true;
        elements.each(function (i, item){
            if (!$(item).is(':checked')){
                flag = false;
                $("[data-attach-point=sa]").prop("checked", false);
                return false;
            }
        });
        if (flag) {
            $("[data-attach-point=sa]").prop("checked", true);
        };
    };

//callback
function cartCallBack(data){
    if(data.flag){
        if(data.info.allcart.length===0){
            $('.shopBox').html(cartNullTemp());
            $.cookie("cartnum", 0,{path: '/' });//设置购物车数量
        }else{
            $('[data-attach-point=lord]').html(cartTemp(data));//加载模版
            $('[data-attach-point="num"]').text(data.info.cartInfo.totalNum);//设置已选中数量
            $.cookie("cartnum", data.info.cartInfo.allGoodsNum,{path: '/' });//设置购物车数量
            if(param.type==='only'){//改变全选状态
                changeState($("[name = chkItem]:checkbox"));
            }
        }
    }else{
        var errorDiv = "<div id='common-div'>超过库存</div>";
        $("body").after(errorDiv);
        setTimeout(function () {
            $("#common-div").remove();
        }, 1000);
    }
};

//全选
    $("[data-attach-point=ck]").on('click', function () {
        if ($(this).prev().is(':checked')) {
            $("[name = chkItem]:checkbox").attr("checked", false);
            //未全选
            param.type="all";
            param.flag="false";
            InfoChannel.getDataByAjax(url, param,cartCallBack);
        } else {
            $("[name = chkItem]:checkbox").attr("checked", true);
            //全选
            param.type="all";
            param.flag="true";
            InfoChannel.getDataByAjax(url, param,cartCallBack);
        }
    });


//单选
    window.onlyClinkCart=function(el){
        if ($(el).is(':checked')){
            //选中
            param.type="only";
            param.flag="true";
            param.rec_id=$(el).attr('recId');
            InfoChannel.getDataByAjax(url, param,cartCallBack);
        }else{
            //未选中
            param.type="only";
            param.flag="false";
            param.rec_id=$(el).attr('recId');
            InfoChannel.getDataByAjax(url, param,cartCallBack);
        }
    };

//加减
    var editParam={
        action: "edit_number",
        sid:sid,
        user_id: uid,
        rec_id: "",
        goods_number:""
    };
    window.cartAdd=function(el){
        var n=parseInt($(el).prev().val());
        if(n){//小于上限
            var num=n+1;
            editParam.rec_id=$(el).attr('recId');
            editParam.goods_number=num;
            $("[data-attach-point=reduceNum]").removeClass("reduceDisable");
            $(el).removeClass("reduceDisable");
            InfoChannel.getDataByAjax(url, editParam,cartCallBack);
        }else{//大于上限
            $(el).addClass("reduceDisable");
            $('.diaInfo').text('商品数量不能大于200');
            $(".dialog").show().fadeOut(2000);
        }
    };
    window.cartDel=function(el){
        var n=$(el).next().val();
        var num=parseInt(n)-1;
        if(num==0){ $(el).addClass("reduceDisable");return;}
        $(el).removeClass("reduceDisable");
        editParam.rec_id=$(el).attr('recId');
        editParam.goods_number=num;
        InfoChannel.getDataByAjax(url, editParam,cartCallBack);
    };
    window.cartBlur=function(el){
        var n=parseInt($(el).val());
        if(n<=0){
            $(el).val(1);
            n=1;
        }
        if(n){//小于上限
            editParam.rec_id=$(el).attr('recId');
            editParam.goods_number=n;
            InfoChannel.getDataByAjax(url, editParam,cartCallBack);
            if(n===1){
                $("[data-attach-point=reduceNum]").addClass("reduceDisable");
            }
        }else{//大于上限
            $('.diaInfo').text('商品数量不能大于200');
            $(".dialog").show().fadeOut(2000);
        }
    };
//删除
    var delParam={
        action: "del_goods",
        sid:sid,
        user_id: uid,
        rec_id: ""
    };
    window.cartDelItem=function(el){
        $("#top").show();
        $("#below").show();
        $("#cancel").on('click',function(){
            $("#top").hide();
            $("#below").hide();
        });
        $("#ok").on('click',function(event){
            $("#top").hide();
            $("#below").hide();
            delParam.rec_id=$(el).attr('recId');
            InfoChannel.getDataByAjax(url,delParam,cartCallBack);
        })
    };

//结算
    window.cartPay=function(){
        if($("[name=chkItem]:checked").length>0){
          window.location.href="/orderSure";
        }
    };
    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
})