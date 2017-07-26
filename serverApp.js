/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var controller = require('./serverRoutes/controller');
var log4j = require('./serverUtil/su-log');
var doT = require("dot");
var app = express();
//设置环境变量
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');
global.dots = doT.process({path:app.get('views')});//预编译公共模版

//调用中间件
log4j.use(app);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/htmlStatic')));
app.use(controller);
console.log(__dirname);

//外站数据地址
global.dataHost="http://cbs.youde.com";


//处理404错误
/*app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 //res.send('');
 next(err);
 });*/
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;