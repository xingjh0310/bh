/**
 * Created by pwx on 2016/9/19.
 */
var md5 = require('MD5');
var cache = require('../../biz/cache');
var biz_user = require('../../biz/user');
var async = require('async');

exports.verifySignature = function (req, res, next) {
    var service = req.param("service");
    var ticks = req.param("ticks") || '';
    var route = req.param("route") || '';
    var sessionid = req.param("sessionid") || '';
    var sign = req.param("sign") || '';
    if (com.env.key) {
        if (md5(route + service + ticks + sessionid + com.env.key).toLowerCase() != sign){
            return res.json({message: '验签不通过', code: -1});
        }
        else if (new Date().getTime() - parseInt(ticks) > 120000)
            return res.json({message: '请求超时', code: -1});
        else {
            var _route = com.biz.fields.getDesc(com.biz.fields.route, parseInt(route));
            res.locals.route = _route ? route : '1';
            next();
        }
    } else
        return res.json({message: '访问异常', code: -1});
}

exports.auth = function (req, res, next) {
    var sessionId = req.param('sessionid');
    if (sessionId) {
        cache.getAppSession(sessionId, function (err, uid) {
            if (uid) {
                biz_user.getUserById(uid, function (err, body) {
                    var user = body.user;
                    var account = body.account;
                    if (user && account) {
                        if (user.lock || user.type != com.biz.fields.accountType.Investor.v)
                            return res.json({message: '您的账户已被锁定，请联系管理员', code: -1});
                        else {
                            res.locals.user = user;
                            res.locals.account = account;
                            next();
                        }
                    } else {
                        return res.json({message: '会话已失效', code: -2});
                    }
                })
           } else
               return res.json({message: '会话已失效', code: -2});
        })
    } else
        return res.json({message: '会话信息不存在', code: -2});
}

exports.checkReal = function (req, res, next) {
    var user = res.locals.user;
    var account = res.locals.account;
    var vertifyPayPassword = req.param("vertifyPayPassword");
    if (!user.realName || !user.idCard) {
        return res.json({message: '请先进行实名认证', code: -1});
    }
    else if(vertifyPayPassword == 1){
        if (!user.payPassword) {
            return res.json({message: '请设置交易密码', code: -1});
        }
    }
    else if (!account.bindCard) {
        return res.json({message: '请先绑定银行卡', code: -1});
    }
    else {
        next();
    }
}
