/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var express=require("express");
var router=express.Router();


var index=require("./sr-index");//首页
var login=require("./sr-login");//登录





router.all('/',index);//首页
router.all('/login',login);//登录




module.exports = router;