/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var express=require("express");
var router=express.Router();


var index=require("./sr-index");//首页






router.all('/',index);//首页




module.exports = router;