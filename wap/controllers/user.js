/**
 * Created by pwx on 2016/8/4.
 */
var ccap_biz = require('../../biz/ccap');
var user_biz = require('../../biz/user');
var common = require('../../biz/common');
var cache = require('../../biz/cache');
var biz_debt = require('../../biz/debt');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getChannel,session_filter.getUser];
exports.views = {
    "/login": [function (req, res) {
        if (req.session['mobile']){
            return res.render("login");
        }else{
            if(req.param('r')){
                return res.redirect('/inputMobile?r=' + req.param('r'));
            }else{
                return res.redirect('/inputMobile');
            }
        }
    }], "/register": [{path: /\/register\/(\w+)|\/register/}, function (req, res) {
        if (req.session['mobile']) {
            var inviteCode = req.session['inviteCode'] || '';
            res.render("register", {invite: inviteCode || ''});
        }
        else
            res.redirect('/inputMobile');

    }], "/logout": [function (req, res) {
        req.session['userId'] = null;
        req.session['mobile'] = null;
        res.redirect('/inputmobile');
    }], "/validEmailSuccess": function (req, res) {
        var userId = req.param('uid') || '';
        var sign = req.param('sign') || '';
        var time = req.param('time') || 0;
        user_biz.validEmailCall(userId, time, sign, function (err, body) {
            res.render('validemailsuccess', {err: err});
        })
    }, "/findPwd": [function (req, res) {
        res.render('findpwd');
    }], "/inputMobile": [function (req, res) {
        res.render('inputmobile');
    }]
    , "/recommend": [{path: /\/recommend\/(\w+)|\/recommend/}, function (req, res) {
        var inviteCode = req.params[0];
        res.render("recommend", {invite: inviteCode || ''});
    }],

    "/tgldy01":  [{path: /\/tgldy01\/(\w+)|\/tgldy01/},function (req, res) {
        res.render('tgldy01');
    }],

    "/tgldy02": [{path: /\/tgldy02\/(\w+)|\/tgldy02/}, function (req, res) {
        var channelcode = req.params[0];
        biz_debt.getNoviceDebt(1, function (err, body) {
            var novice = body;
            biz_debt.selectHomeBiding(0, 1, 5,1, function (err, body) {
                var marks = body|| [];
                biz_debt.selectHomeBiding(1, 0, 5,1, function (err, body) {
                    var seckill = body[0]|| [];
                    biz_debt.selectHomeBiding(0, 0, 5, 1, function (err, body) {
                        var debts = body|| [];
                        return res.render("tgldy02", {channelcode: channelcode || '',novice:novice,marks:marks,seckill:seckill,debts:debts});
                    })
                })
            })
        })
    }],


    "/invitereg": [{path: /\/invitereg\/(\w+)|\/invitereg/}, function (req, res) {
        var inviteCode = req.params[0];
        res.render("invitereg", {inviteCode: inviteCode || ''});
    }]
}

exports.inputMobile = function (req, res) {
    var mobile = req.param('mobile') || '';
    var inviteCode = req.param('inviteCode') || '';
    if (!mobile || !(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        res.json({err: '手机号码输入不正确'});
    }
    else {
        req.session['mobile'] = mobile;
        req.session['inviteCode'] = inviteCode;
        user_biz.getUserByMobile(mobile, function (err, user) {
            if (user) {
                if(req.param('r')){
                    return res.redirect('/login?r='+ req.param('r'));
                }else{
                    return res.redirect('/login');
                }
            } else {
                if(req.param('r')){
                    return res.redirect('/register?r=' + req.param('r'));
                }else{
                    return res.redirect('/register');
                }
            }
        })
    }
}


exports.resetLoginPassword = [cache.limit, function (req, res) {
    var user = res.locals.user;
    var code = req.param('code') || '';
    var password = req.param('pwd') || '';
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

}]
exports.checkMobile = function (req, res) {
    var mobile = req.param('mobile') || '';
    if (mobile) {
        user_biz.getUserByMobile(mobile, function (err, user) {
            if (user)
                res.json({err: err, code: 1});
            else
                res.json({err: err, code: -1});
        });
    }
}
exports.findLoginPassword = [cache.limit, function (req, res) {
    //var mobile = req.param('mobile') || '';
    var mobile = req.session['mobile'];
    var code = req.param('code') || '';
    var password = req.param('pwd') || '';

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
                        user_biz.saveLoginPassword(user.id, password, function (err, body) {
                            res.json({err: err});
                        })
                    } else {
                        res.json({err: '用户不存在'});
                    }
                })
            }
        })
    }
}]

exports.sendSpreadCode = [cache.limit, function (req, res) {
    var mobile = req.session['mobile'];
    if(req.param('mobile')){
        mobile=req.param('mobile');
    }
    if (mobile) {
        user_biz.getUserByMobile(mobile, function (err, user) {
            if (!user)
                common.sendCode(mobile, com.biz.fields.smsCodeType.Register.v, function (err) {
                    return res.json({err: err});
                })
            else{
                return res.json({err: '手机号已存在'});
            }
        })
    } else{
        return res.json({err: '请输入手机号码'});
    }
}]

/**
 * 推广注册
 * @type {[*]}
 */
exports.spreadRegister = [{path: /spreadRegister/}, cache.limit,session_filter.getChannel,  function (req, res) {
    var mobile = req.session['mobile'];
    if(req.param("mobile")){
        mobile=req.param("mobile");
    }
    var code = req.param('code') || '';
    var pwd = req.param('pwd') || '';
    var invite = req.param('invite') || '';
    var channel=res.locals.channel||null;
    console.log(channel)
    var code = req.param('code') || '';
    console.log(mobile+":"+invite);
    common.checkCode(mobile, com.biz.fields.smsCodeType.Register.v, code, function (err) {
        if (err) {
            return res.json({err: err});
        }else {
            var user = {
                mobile: mobile,
                password: pwd,
                route: com.biz.fields.route.Wap.v,
                channel:(channel && channel.id)?channel.id:'',
                subChannel: '',
                type: com.biz.fields.accountType.Investor.v,
                invite: invite
            }
            user_biz.save(user, function (err, body) {
                if (err) {
                    return  res.json({err: err});
                } else {
                    user_biz.login(mobile, pwd, function (err, body) {
                        if (err || body.code < 0) {
                            res.json({err: body.message});
                        } else {
                            req.session['userId'] = body.user.id;
                            return res.json({err: null});
                        }
                    })

                }
            })
        }
    })
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


exports.sendRegisterCode = [cache.limit, function (req, res) {
    var mobile = req.param('mobile') || req.session['mobile'];
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

exports.sendResetLoginPasswordCode = [cache.limit, function (req, res) {
    var user = res.locals.user;
    common.sendCode(user.mobile, com.biz.fields.smsCodeType.Password.v, function (err) {
        res.json({err: err});
    })
}]

exports.sendFindLoginPasswordCode = [cache.limit, function (req, res) {
    var mobile = req.session['mobile'];
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

exports.sendResetPayPasswordCode = [cache.limit, function (req, res) {
    var user = res.locals.user;
    common.sendCode(user.mobile, com.biz.fields.smsCodeType.PayPassword.v, function (err) {
        res.json({err: err});
    })
}]

exports.register = [{path: /register/}, cache.limit, session_filter.getChannel, function (req, res) {
    var mobile = req.param('mobile') || req.session['mobile'];
    var code = req.param('code') || '';
    var pwd = req.param('pwd') || '';
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
                    route: com.biz.fields.route.Wap.v,
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


exports.login = [{path: /login/}, cache.limit, function (req, res) {
    var mobile = req.session['mobile'];
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


exports.authLogin=function(req,res){
    var sessionId=req.param('sessionId')||'';
    if(!sessionId){
        return res.json({err: '参数错误.', code: -1});
    }
    if(req.session['userId']){
        return res.json({err: '已登录.', code: -1});
    }
    console.log("sessionId="+sessionId);
    cache.getAppSession(sessionId, function (err, uid) {
        console.log("uid="+uid);
        if (uid) {
            user_biz.getUserById(uid, function (err, body) {
                if(body && body.user && body.account && !body.user.lock){
                    req.session['userId'] = uid;
                    return res.json({err: null});
                }else{
                    return res.json({err: 'sessionId失效'});
                }
            })
        } else{
            return res.json({err: '会话已失效'});
        }
    })
}

