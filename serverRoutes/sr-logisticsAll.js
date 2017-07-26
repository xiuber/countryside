/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

router.get('/logisticsAll', function(req, res) {
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    if(Cookies.uid===''||Cookies.uid===undefined){
        res.cookie('loginFrom','/logisticsAll');
        res.redirect('/login');
    }else{

        Promise.all([sfFile.read('html/goLogistics.html', 'utf8')]).then(onFulfilled,onRejected);
        function onFulfilled(files) {
            try {
                var html = files[0];//主页面
                $ = cheerio.load(html, {decodeEntities: false});//dom结构

                //*********处理js挂马***************
                renderUtil.removeBadScript();

                res.set('Content-Type', 'text/html');
                res.send(new Buffer($.html()));
            } catch (err) {
                renderUtil.logger(err);
            }
            ;
        };
        function onRejected(err) {
            renderUtil.logger(err);
        };
    }
});

module.exports = router;