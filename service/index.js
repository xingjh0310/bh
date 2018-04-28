/**
 * Created by pwx on 2016/9/19.
 */
var env = process.argv[2];
require('../env/env-' + env);
var flash = require('connect-flash');
var express = require("express");
var app = module.exports = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
require('../biz/global/fields');
require('../biz/global/bank');
require('../biz/global/util');
require('../biz/global/init');
//require('../biz/global/db');
console.log(__dirname);
app.use(busboy());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('../biz'));
app.use(express.static('../static'));
app.use(express.static(com.env.protocol_path));
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.locals.alert = '';
    res.locals.req = req;
    res.locals.user = null;
    res.locals._global = com.biz.fields;
    next();
});
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '2000kb',
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

require('./lib/boot')(app, {verbose: !module.parent});


process.on('uncaughtException', function (err) {
    console.log(err);
    console.error(err);
});

/* istanbul ignore next */
if (!module.parent) {
    var port = isNaN(parseInt(process.argv[3])) ? 7081 : parseInt(process.argv[3]);
    app.listen(port);
    console.log('Express started on port ' + port);
}


//500错误
app.use(function (err, req, res, next) {
    res.status(500).json({code: -1, message: '服务内部错误'});
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
    res.status(404).json({code: -1, message: '服务不存在'});
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
    res.status(304).render('4xx', {url: req.originalUrl, req: req});
});

var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'file', filename: './logs/error.log', category: 'error', maxLogSize: 20480},
        {type: 'file', filename: './logs/info.log', category: 'info', maxLogSize: 20480}
    ]
});
console.error = function (msg) {
    var logger2 = log4js.getLogger("error");
    console.log(msg);
    logger2.error(msg)
}
console.info = function (msg) {
    var logger2 = log4js.getLogger("info");
    console.log(msg);
    logger2.info(msg);
}
console.error = function (msg) {
    var logger2 = log4js.getLogger("error");
    console.log(msg);
    logger2.error(msg)
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}