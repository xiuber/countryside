/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'swiper'
], function (jquery,swiper) {
    $(".swiper-pagination").hide();
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onTransitionEnd: function (swiper) {
            var el = swiper.activeIndex;
            if(el>=1){
                $(".swiper-pagination").show();
            }else{
                $(".swiper-container").hide();
                $(".swiper-pagination").hide();
            }
        }
    });
    var swiper2 = new Swiper('.swiper-container1', {
        onTransitionStart: function (swiper) {
            $(".left").hide();
        }
    });
})