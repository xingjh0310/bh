/**
 * Created by pwx on 2016/8/4.
 */
var ccap_biz = require('../../biz/ccap');
var user_biz = require('../../biz/user');
var common = require('../../biz/common');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getChannel,session_filter.getUser];
exports.views = {
    "/login": [function (req, res) {
        res.render("login");
    }],

    "/register": [{path: /\/register\/(\w+)|\/register/}, function (req, res) {
        var inviteCode = req.params[0];
        res.render("register", {invite: inviteCode || ''});
    }],

    "/logout": [function (req, res) {
        req.session['userId'] = null;
        res.redirect('/login');
    }],

    "/validEmailSuccess": function (req, res) {
        var userId = req.param('uid') || '';
        var sign = req.param('sign') || '';
        var time = req.param('time') || 0;
        user_biz.validEmailCall(userId, time, sign, function (err, body) {
            res.render('validemailsuccess', {err: err});
        })
    },

    "/findPwd": [function (req, res) {
        res.render('findpwd');
    }],

    "/findPwd2": [function (req, res) {
        res.render('findpwdstep2');
    }]
}


exports.resetLoginPassword = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var user = res.locals.user;
    var code = req.param('code') || '';
    var password = req.param('pwd') || '';
    var confirmPassword = req.param('pwd2') || '';
    if (password != confirmPassword)
        res.json({err: '两次密码输入不相同'});
    else {
        common.checkCode(user.mobile, com.biz.fields.smsCodeType.Password.v, code, function (err) {
            if (err) {
                res.json({err: err});
            }
            else {
                user_biz.saveLoginPassword(user.id, password, function (err, body) {
                    res.json({err: err});
                })
            }
        })
    }
}]

exports.findLoginPasswordStep2 = [cache.limit, function (req, res) {
    var password = req.param('pwd') || '';
    var confirmPassword = req.param('pwd1') || '';
    if (password != confirmPassword)
        res.json({err: '两次密码输入不相同'});
    else {
        var uid = req.session['findUser'];
        if (uid != null) {
            user_biz.saveLoginPassword(uid, password, function (err, body) {
                res.json({err: err});
            })
        } else
            res.json({err: '非法访问'});
    }
}]

exports.findLoginPasswordStep1 = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    if (!mobile || !(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号码输入不正确'});
    }
    else {
        common.checkCode(mobile, com.biz.fields.smsCodeType.Password.v, code, function (err) {
            if (err) {
                res.json({err: err});
            }
            else {
                user_biz.getUserByMobile(mobile, function (err, user) {
                    if (user) {
                        req.session['findUser'] = user.id;
                        res.json({err: null});
                    } else {
                        res.json({err: '用户不存在'});
                    }
                })
            }
        })
    }
}]

exports.saveHeadImg = [cache.limit, function (req, res) {
    var user = res.locals.user;
    var img = req.param('img') || '';
    if (img) {
        user_biz.saveHeadImg(user, img, function (err, body) {
            res.json({err: err});
        })
    } else
        res.json({err: '上传出错'});
}]


exports.sendRegisterCode = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var mobile = req.param('mobile');
    if (mobile) {
        user_biz.getUserByMobile(mobile, function (err, user) {
            if (!user)
                common.sendCode(mobile, com.biz.fields.smsCodeType.Register.v, function (err) {
                    res.json({err: err});
                })
            else
                res.json({err: '手机号已存在'});
        })
    } else
        res.json({err: '请输入手机号码'});
}]

exports.sendResetLoginPasswordCode = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var user = res.locals.user;
    common.sendCode(user.mobile, com.biz.fields.smsCodeType.Password.v, function (err) {
        res.json({err: err});
    })
}]

exports.sendFindLoginPasswordCode = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var mobile = req.param('mobile');
    if (mobile) {
        user_biz.getUserByMobile(mobile, function (err, user) {
            if (user)
                common.sendCode(mobile, com.biz.fields.smsCodeType.Password.v, function (err) {
                    res.json({err: err});
                })
            else
                res.json({err: '手机号不存在'});
        });
    } else
        res.json({err: '请输入手机号码'});
}]

exports.sendResetPayPasswordCode = [ccap_biz.checkImageCode, cache.limit, function (req, res) {
    var user = res.locals.user;
    common.sendCode(user.mobile, com.biz.fields.smsCodeType.PayPassword.v, function (err) {
        res.json({err: err});
    })
}]

exports.register = [{path: /register/}, cache.limit, ccap_biz.checkImageCode, session_filter.getChannel,function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    var pwd = req.param('pwd') || '';
    var pwd1 = req.param('pwd1') || '';
    var invite = req.param('invite') || '';
    var channel=res.locals.channel||null;
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号输入错误'});
    } else {
        var code = req.param('code') || '';
        common.checkCode(mobile, com.biz.fields.smsCodeType.Register.v, code, function (err) {
            if (err) {
                res.json({err: err});
            }
            else {
                var user = {
                    mobile: mobile,
                    password: pwd,
                    route: com.biz.fields.route.PC.v,
                    channel:(channel && channel.id)?channel.id:'',
                    subChannel: '',
                    type: com.biz.fields.accountType.Investor.v,
                    invite: invite
                }
                user_biz.save(user, function (err, body) {
                    if (err) {
                        res.json({err: err});
                    } else {
                        user_biz.login(mobile, pwd, function (err, body) {
                            if (err || body.code < 0) {
                                res.json({err: body.message});
                            } else {
                                req.session['userId'] = body.user.id;
                                res.json({err: null});
                            }
                        })
                    }
                })

            }
        })
    }
}]

/**
 * PC的用户登录
 * @type {*[]}
 */
exports.login = [{path: /login/}, cache.limit, function (req, res) {
    var mobile = req.param('mobile') || '';
    var pwd = req.param('password') || '';
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号输入错误'});
    } else {
        user_biz.login(mobile, pwd, function (err, body) {
            if (err || body.code < 0) {
                res.json({err: body.message});
            } else {
                req.session['userId'] = body.user.id;
                res.json({err: null});
            }
        })
    }
}]




/**
 * 推广注册
 * @type {[*]}
 */
exports.spreadRegister = [{path: /spreadRegister/}, cache.limit, session_filter.getChannel, function (req, res) {
    var mobile = req.param('mobile') || '';
    var code = req.param('code') || '';
    var pwd = req.param('pwd') || '';
    var pwd1 = req.param('pwd1') || '';
    var invite = req.param('invite') || '';
    var channel=res.locals.channel||null;
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号输入错误'});
    } else {
        var code = req.param('code') || '';
        common.checkCode(mobile, com.biz.fields.smsCodeType.Register.v, code, function (err) {
            if (err) {
                return res.json({err: err});
            } else {
                var user = {
                    mobile: mobile,
                    password: pwd,
                    route: com.biz.fields.route.PC.v,
                    channel:(channel && channel.id)?channel.id:'',
                    subChannel: '',
                    type: com.biz.fields.accountType.Investor.v,
                    invite: invite
                }
                user_biz.save(user, function (err, body) {
                    if (err) {
                        res.json({err: err});
                    } else {
                        user_biz.login(mobile, pwd, function (err, body) {
                            if (err || body.code < 0) {
                                res.json({err: body.message});
                            } else {
                                req.session['userId'] = body.user.id;
                                res.json({err: null});
                            }
                        })

                    }
                })
            }
        })
    }
}]