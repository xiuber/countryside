/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var log4j = require('./su-log').logger;
//关键词渲染
module.exports.renderKeyWords=function(seoinfo){
        $('[data-attach-point=keywords]').attr('content',seoinfo.keywords);
        $('[data-attach-point=description]').attr('content',seoinfo.description);
        $('[data-attach-point=title]').text(seoinfo.title);
};
//js挂马
module.exports.removeBadScript=function(){
    $('script').each(function(index,domEle){
     var temp=domEle.attribs.src;
         if(temp!=undefined){
            var num=temp.toLowerCase().indexOf('http');
             if(num>=0&&temp!="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9183"){
                 //日志记录
                 try {
                     log4j.info("非法js=="+domEle.attribs.src+"=已从内存中清除");
                     $(domEle).remove();
                 } catch (e) {
                     log4j.info(e);
                 }
             }
         }
     });
}
//解析cookie
module.exports.splitCookie=function(obj){
    var Cookies = {};
    if(obj!=undefined){
        obj.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
    }
    return Cookies;
};
//判断设备
module.exports.toggleAppointed=function(deviceAgent,comFrom,res,id){
      var agentID = deviceAgent.match(/(iphone|android)/);
      var urlLocation="http://www.youde.com/";
      if(!agentID){
            switch (comFrom){
                  case "cart":
                        urlLocation=urlLocation+"cart.php";
                        break;
                  case "goodsDetail":
                        urlLocation=urlLocation+"view.php?id="+id;
                        break;
                  case "classifyFl":
                        urlLocation=urlLocation+"category.php?cid="+id;
                        break;
                  case "classify":
                        urlLocation=urlLocation+"category.php?cate_id="+id;
                        break;
                  case "register":
                        urlLocation=urlLocation+"register.php";
                        break;
                  case "login":
                        urlLocation=urlLocation+"login.php";
                        break;
                  default:;
            }
            res.redirect(urlLocation)
      }
};
//记录日志
module.exports.logger=function(info){
    log4j.info(info);
}