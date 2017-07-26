/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
(function toggle(jquery) {
    var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //window.origin="http://"+window.location['host'];
        window.pathname=window.location['pathname'];
        var list = window.pathname.split('/');
        //console.info(list);
        if(list[1]===''){//首页
            window.location.href="http://touch.youde.com";
        }
        else if(list[1]==='content'){//内容
            var temp=list[2].split('-')[1];
            var str=temp.substring(0,temp.length-5);
            window.location.href='http://touch.youde.com/html/content.html?id='+str;
        }
        else if(list[1]==='search'){//搜索
            var str =list[2].substring(0,list[2].length-5);
            window.location.href='http://touch.youde.com/html/searchList.html?key='+str;
        }else{//栏目
            var str=list[1].split('-')[1];
            window.location.href='http://touch.youde.com/html/zxList.html?catid='+str;
        }
    }
 })(window.jQuery);




