/**
 * Created by pwx on 2016/8/4.
 */
var biz_user = require('../../biz/user');
var biz_system = require('../../biz/system');
var async = require('async');
var cache=require('../../biz/cache');
var base64=require('base64-url');

exports.getUser = function (req, res, next) {
    var userId = req.session['userId'];
    if (userId) {
        biz_user.getUserById(userId, function (err, body) {
            var user = body.user;
            var account = body.account;
            if (user && account) {
                if (user.lock || user.type != com.biz.fields.accountType.Investor.v) {
                    if (req.method == 'GET') {
                        req.flash('alert', '您的账户已被锁定，请联系管理员');
                        req.session['userId'] = null;
                        return res.redirect('/login');
                    }
                    else
                        return res.json({err: '您的账户已被锁定，请联系管理员'});
                }
                else {
                    res.locals.user = user;
                    res.locals.account = account;
                    next();
                }
            } else {
                req.session['userId'] = null;
                return res.redirect('/login');
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

exports.getPlatform = function (req, res, next) {
    async.waterfall([function (cb) {
        biz_system.getSeo(function (err, body) {
            res.locals._seo = body;
            cb(null);
        })
    }, function (cb) {
        biz_system.getPlatform(function (err, body) {
            res.locals._platform = body;
            cb(null);
        })
    }], function (err) {
        next();
    });

}

exports.checkLogin = function (req, res, next) {
    if (req.session['userId']) {
        next();
    } else {
        if (req.method == 'GET')
            return res.redirect('/login?r=' + encodeURIComponent(req.originalUrl));
        else
            return res.json({err: '请您登录'});
    }
}

exports.checkReal = function (req, res, next) {
    var user = res.locals.user;
    var account = res.locals.account;
    if (!user || !account) {
        req.flash('alert', '请您登录');
        return res.redirect('/login');
    }
    else if (!user.realName || !user.idCard) {
        req.flash('alert', '请先进行实名认证');
        return res.redirect('/account/realname');
    }
    else if (!user.payPassword) {
        req.flash('alert', '请设置交易密码');
        return res.redirect('/account/setPayPassword');
    }
    else if (!account.bindCard) {
        req.flash('alert', '请先绑定银行卡');
        return res.redirect('/account/bankcards');
    }
    else {
        next();
    }
}

/**
 * 获取渠道信息
 */
exports.getChannel = function (req,res,next) {
    var code = req.param('channelcode') || '';
    if(code){
        cache.getChannelByCode(code,function (err, data) {
            if (!err && data) {
                res.locals.channel = data;
                data = base64.encode(JSON.stringify(data));
                res.cookie("channel", data);
            }
            return next();
        });
    }else{
        if(req.cookies['channel']){
            var channel = req.cookies['channel']||'';
            if(channel) channel=JSON.parse(base64.decode(channel));
            res.locals.channel=channel;
            return next();
        }
        else{
            return next();
        }
    }
}