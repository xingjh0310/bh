/**
 * Created by pwx on 2016/9/21.
 */
var biz_user = require('../../biz/user');
var common = require('../../biz/common');
var cache = require('../../biz/cache');
var md5 = require('MD5');
var appSessionFilter = require('../filters/app-sessionid-filter');
exports.before = [appSessionFilter.verifySignature];
exports.v1_login = function (req, res) {
    var mobile = req.param('mobile') || '';
    var pwd = req.param('password') || '';
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号输入错误'});
    } else {

        biz_user.login(mobile, pwd, function (err, body) {
            if (err || body.code < 0) {
                return res.json({message: body.message, code: -1});
            } else {
                cache.createAppSession(body.user.id, function (err, sessionId) {
                    if (!err){
                        var clientId = req.param('clientId');
                        var route = res.locals.route;
                        var userId = body.user.id;
                        if(clientId != null){
                            biz_user.saveAppClient(clientId,userId,route,function(err,body){
                                return res.json({message: '', code: 1, sessionid: sessionId});
                            });
                        }else{
                            return res.json({message: '', code: 1, sessionid: sessionId});
                        }
                    }else{
                        return res.json({message: '登录失败', code: -1});
                    }
                })
            }
        })
    }
}

exports.v1_logout = function (req, res) {
    var sessionId = req.param('sessionid') || '';
    cache.deleteAppSession(sessionId, function (err) {
        return res.json({message: '', code: 1});
    })
}

exports.v1_send_code = function (req, res) {
    var mobile = req.param('mobile') || '';
    var type = req.param('type') || '';
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        return res.json({message: '手机号码输入错误', code: -1});
    }
    else {
        common.sendCode(mobile, type, function (err, body) {
            if (err) {
                return res.json({message: err, code: -1});
            } else {
                return res.json({message: '发送成功', code: 1});
            }
        })
    }
}

exports.v1_register = function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    var pwd = req.param('pwd') || '';
    var invite = req.param('invite') || '';
    var channel = req.param('channel') || 0;
    var subChannel = req.param('subChannel') || 0;
    var route = res.locals.route;
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        return res.json({message: '手机号码输入错误', code: -1});
    }
    else {
        common.checkCode(mobile, com.biz.fields.smsCodeType.Register.v, code, function (err, body) {
            if (err) {
                return res.json({message: err, code: -1});
            } else {
                var user = {
                    mobile: mobile,
                    password: pwd,
                    route: route,
                    channel: channel,
                    subChannel: subChannel,
                    type: com.biz.fields.accountType.Investor.v,
                    invite: invite
                }
                biz_user.save(user, function (err, body) {
                    if (err) {
                        return res.json({message: err, code: -1});
                    } else {
                        biz_user.login(mobile, pwd, function (err, body) {
                            if (err || body.code < 0) {
                                return res.json({message: body.message, code: -1});
                            } else {
                                cache.createAppSession(body.user.id, function (err, sessionId) {
                                    if (!err)
                                        return res.json({message: '', code: 1, sessionid: sessionId});
                                    else
                                        return res.json({message: '注册成功', code: -1});
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.v1_find_loginPassword = function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    var password = req.param('pwd') || '';
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        return res.json({message: '手机号码输入错误', code: -1});
    } else if (!password)
        return res.json({message: '登录密码不得为空', code: -1});
    else {
        common.checkCode(mobile, com.biz.fields.smsCodeType.Password.v, code, function (err) {
            if (err) {
                return res.json({message: err, code: -1});
            }
            else {
                biz_user.getUserByMobile(mobile, function (err, user) {
                    if (user) {
                        var userid = user.id;
                        biz_user.saveLoginPassword(userid, password, function (err, body) {
                            if (!err)
                                cache.createAppSession(userid, function (err, sessionId) {
                                    if (!err)
                                            return res.json({message: '', code: 1, sessionid: sessionId});
                                    else
                                        return res.json({message: '登录失败', code: -1});
                                })
                              // return res.json({message: '', code: 1});
                            else
                                return res.json({message: err || '设置失败', code: -1});
                        })
                    } else
                        return res.json({message: '用户不存在', code: -1});
                })
            }
        })
    }
}

exports.v1_exists_mobile = function (req, res) {
    var mobile = req.param('mobile') || '';
    biz_user.getUserByMobile(mobile, function (err, body) {
        if (body) {
            return res.json({message: '', code: 1});
        } else
            return res.json({message: '手机号不存在', code: -1});
    })
}

/**
 * 今日头条推广激活
 * @param req
 * @param res
 */
exports.v1_popularize = function (req, res) {
    var adIdentifier=req.param('adIdentifier')||'';
    var simulateIDFA=req.param('simulateIDFA')||'';
    var mac=req.param('mac')||'';
    var imei=req.param('imei')||'';
    console.log(mac);
    console.log(imei);
    if(imei){
        imei=md5(imei);
    }
    if(mac){
        mac=mac.replace(/[\:]/g, '');
        mac=md5(mac);
    }
    console.log("mac="+mac);
    console.log("imei="+imei);
    biz_user.activate({adIdentifier:adIdentifier,imei:imei},function(){
        return res.json({message:null,code:1});
    })
}


/**
 * 验证码登陆
 * @param mobile
 * @param call
 */
exports.v1_identifyCodeLogin = function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        return res.json({message: '手机号码输入错误', code: -1});
    }
    common.checkCode(mobile, com.biz.fields.smsCodeType.IdentifyCodeLogin.v, code, function (err) {
        if (err) {
            return res.json({message: err, code: -1});
        } else {
            biz_user.identifyCodeLogin(mobile, function (err) {
                if (err) {
                    return res.json({message: err, code: -1});
                } else{
                    return res.json({message: '成功登陆', code: 1});
                }
            })
        }
    })
}

