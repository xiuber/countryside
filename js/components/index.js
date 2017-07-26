/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'infoChannel',
    'swiper',
    'utilTool',
    'searchTool'
], function (jquery, InfoChannel, swiper, UtilTool, searchTool) {
    var url = configData.dataHost + '/user.php';//设置url

    //设置焦点图动效
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-container .swiper-pagination',
        paginationClickable: true,
        autoplay: 3000
    });

    //设置商品列表动效
    var goodSwiper = new Swiper('.swiper-container-g', {
        pagination: '.swiper-container-g .swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 1
    });

    //设置回到顶部动效
    UtilTool.goTop();

    //input叉号处理
    var input = $('[data-attach-point=searchCase]');
    var icon = $('[data-attach-point=icon]');
    UtilTool.inputFork(input, icon);

    //搜索页返回到主页
    $('[data-attach-point=goIn]').on('click', function () {
        $('[data-attach-point=master]').show();
        $('[data-attach-point=footer]').show();
        $('[data-attach-point=searchPage]').hide();
    });

    //个人中心
    $('[data-attach-point=my]').on('click', function () {
        var param = {
            action: 'getUserID'
        };
        InfoChannel.getDataByAjax(url, param, function (data) {
            if(data.flag){
                window.location.href='/user';
            }else{
                window.location.href = '/login';
            }
        })

    });
  //下载app
    $("[data-attach-point=downApp]").on("click",function(){
        window.location=UtilTool.app_download();
    })
    //************************加载优化配置文件***************************************************
    require(['libConfig']);
})