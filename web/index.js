/**
 * Created by pwx on 2016/8/2.
 */
/**
 * Module dependencies.
 */
var env = process.argv[2];

require('../env/env-' + env);
var flash = require('connect-flash');
var express = require("express");
var app = module.exports = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var busboy = require('connect-busboy');
require('../biz/global/fields');
require('../biz/global/util');
require('../biz/global/bank');
require('../biz/global/init');
com.env.name = env;
app.use(session({
    secret: 'AH^%^SSFWA2DKJS(*PDSA'
    , key: 'web-session'
    , proxy: 'true'
    , cookie: {
        domain: com.env.cookiehost
    }
    , store: new RedisStore({
        host: com.env.redis.host,
        port: com.env.redis.port,
        prefix: "web_",
        ttl: 60 * 30
    })
}));

console.log(__dirname);
app.use(busboy());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('../static'));
app.use(express.static('public'));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.alert = '';
    res.locals.req = req;
    res.locals._global = com.biz.fields;
    res.locals._bank = com.biz.bank;
    var flash = req.flash('alert');
    if (flash)
        res.locals.alert = flash[0];
    next();
});
//app.use(methodOverride('_method'));
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
    var port = isNaN(parseInt(process.argv[3])) ? 8082 : parseInt(process.argv[3]);
    app.listen(port);
    console.log('Express started on port ' + port);
}


//500错误
app.use(function (err, req, res, next) {
    if (!module.parent) console.error(err.stack);
    res.status(500).render('5xx', {err: err, req: req});
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
    res.status(404).render('4xx', {url: req.originalUrl, req: req});
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
    res.status(304).render('4xx', {url: req.originalUrl, req: req});
});

// var log4js = require('log4js');
// log4js.configure({
//     appenders: [
//         {type: 'file', filename: './logs/error.log', category: 'error', maxLogSize: 20480}
//     ]
// });
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

String.prototype.ReplaceHtml = function () {
    return this.replace(/<[^>]+>/g, "").replace('&nbsp;', '');
}

