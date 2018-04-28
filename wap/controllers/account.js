/**
 * Created by pwx on 2016/8/8.
 */
var ccap_biz = require('../../biz/ccap');
var session_filter = require('../filters/session-filter');
var biz_debt = require('../../biz/debt');
var common = require('../../biz/common');
var biz_user = require('../../biz/user');
var biz_integral = require('../../biz/integral');
var biz_bonus = require('../../biz/bonus');
var biz_coupon = require('../../biz/coupon');
var biz_invite = require('../../biz/invite');
var biz_account = require('../../biz/account');
var biz_recharge = require('../../biz/recharge');
var cache = require('../../biz/cache');
var fs = require('fs');

exports.before = [session_filter.checkLogin, session_filter.getUser];
exports.views = {
    "downloadProtocol": [{path: /\/protocol\/(\w+)/}, function (req, res) {
        var name = req.params[0];
        if (name) {
            var path = com.env.protocol_path + name + '.pdf';
            fs.exists(path, function (exists) {
                if (exists) {
                    res.download(path, "借款协议.pdf");
                }
                else
                    res.render('noprotocol');
            })
        }
    }],
    "/account": [function (req, res) {
        res.render('index');
    }], "invests": function (req, res) {
        res.render('invests');
    },
    "cashflow": function (req, res) {
        res.render('cashflow');
    },
    "freeze": function (req, res) {
        res.render('freeze');
    }, "integral": function (req, res) {
        res.render('integral');
    }, "invite": function (req, res) {
        var user = res.locals.user;
        biz_invite.getAllInviteAwardSum('', '', user.id, function (err, body) {
            res.render('invite', {award: body});
        })
    }, "invitelist": function (req, res) {
        res.render('invitelist');
    }, "assets": function (req, res) {
        res.render('assets');
    },
    "withdraw": [session_filter.checkReal, function (req, res) {
        var account = res.locals.account;
        biz_account.getAccountBankCard(account.id, function (err, body) {
            res.render('withdraw', {bankCard: body});
        })
    }],
    "recharge": [session_filter.checkReal, function (req, res) {
        var account = res.locals.account;
        biz_account.getAccountBankCard(account.id, function (err, body) {
            res.render('recharge', {bankCard: body});
        })
    }],
    "rechargerecord": [session_filter.checkReal, function (req, res) {
        res.render('rechargerecord');
    }],
    "payment": function (req, res) {
        res.render('payment');
    },
    "paymenttable": [{path: /\/paymenttable\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        res.render('paymenttable', {investId: id});
    }],
    "personal": function (req, res) {
        var account = res.locals.account;
        biz_account.getAccountBankCard(account.id, function (err, body) {
            res.render('personal', {bankCard: body});
        })

    },
    "autoinvest": [session_filter.checkReal, function (req, res) {
        var account = res.locals.account;
        biz_account.getAutoInvest(account.id, function (err, body) {
            res.render('autoinvest', {auto: body, edit: '1'});
        })
    }]

    , "withdrawrule": function (req, res) {
        res.render('withdrawrule');
    }, "rechargerule": function (req, res) {
        res.render('rechargerule');
    }, "rechargelist": function (req, res) {
        res.render('rechargelist');
    }, "withdrawlist": function (req, res) {
        res.render('withdrawlist');
    }, "autorule": function (req, res) {
        res.render('autorule');
    }, "integralrule": function (req, res) {
        res.render('integralrule');
    },"bonusrule": function (req, res) {
        res.render('bonusrule');
    },
    "bankcards": [function (req, res) {
        var account = res.locals.account;
        biz_account.getAccountBankCard(account.id, function (err, body) {
            res.render('bankcards', {bankCard: body});
        })
    }],
    "editbankcard": [function (req, res) {
        var user = res.locals.user;
        if (user.realName && user.idCard) {
            var account = res.locals.account;
            biz_account.getAccountBankCard(account.id, function (err, body) {
                res.render('editbankcard', {bankCard: body || {}});
            })
        } else {
            req.flash('alert', '请先进行实名认证');
            return res.redirect('/account/realname');
        }
    }], "realname": function (req, res) {
        res.render('realname');
    }, "setpaypassword": function (req, res) {
        res.render('setpaypassword');
    }, "vaildemail": function (req, res) {
        res.render('vaildemail');
    }, "updateemail": function (req, res) {
        res.render('updateemail');
    },
    "setloginpassword": function (req, res) {
        res.render('setloginpassword');
    }, "bonus": function (req, res) {
        res.render('bonus');
    }, "result": function (req, res) {
        var orderNo = req.param('orderNo') || '';
        biz_recharge.getOrder(orderNo, function (err, body) {
            req.flash('alert', !err && body.isCompleted ? '充值成功' : '充值失败');
            res.redirect('/account');
        })
    },
    "coupon": function (req, res) {
        return res.render('coupon');
    },couponrule:function(req,res){
        return res.render('couponrule');
    }
}

exports.result = function (req, res) {
    var orderNo = req.param('orderNo') || '';
    biz_recharge.getOrder(orderNo, function (err, body) {
        req.flash('alert', !err && body.isCompleted ? '充值成功' : '充值失败');
        res.redirect('/account');
    })
}


exports.getBonusRecord = function (req, res) {
    var state = req.param('state') || '';
    var isExpiry = req.param('isExpiry') || false;
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    biz_bonus.getBonusRecordList(null, null, account.id, isExpiry, null, null, null, null, state, pn, ps, '', function (err, body) {
        res.json(body);
    })
}

exports.deleteBankCard = [cache.limit, function (req, res) {
    var account = res.locals.account;
    biz_account.deleteAccountBankCard(account.id, function (err, body) {
        res.json({err: err});
    })
}]

exports.getInvests = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    biz_debt.getInvests(pn, ps, '', account.id, beginTime, endTime, 0,'', '',function (err, body) {
        res.json(body);
    })
}

exports.saveAutoInvest = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var data = req.param('data') || '{}';
    var autoInvest = $.extend({accountId: account.id}, JSON.parse(data));
    biz_account.saveAutoInvest(JSON.stringify(autoInvest), function (err, body) {
        res.json({err: err});
    })
}]
exports.saveBankCard = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var user = res.locals.user;
    var data = req.param('data') || '{}';
    var bankCard = $.extend({accountId: account.id, accountName: user.realName}, JSON.parse(data));
    biz_account.saveBankCardByAccount(JSON.stringify(bankCard), function (err, body) {
        res.json({err: err});
    })
}]
exports.getCashFlow = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var type = req.param('type') || 0;
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    biz_account.getCashFlowList(account.id, beginTime, endTime, '', type, pn, ps, function (err, body) {
        res.json(body);
    })
}

exports.getFreeze = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var type = req.param('type') || '';
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    biz_account.getFreezeList(account.id, beginTime, endTime, '', type, pn, ps, function (err, body) {
        res.json(body);
    })
}

exports.getPayments = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    var state = req.param('state') || '';
    var investId = req.param('investId') || '';
    biz_account.getPaymentList(account.id, beginTime, endTime, pn, ps, state, investId, function (err, body) {
        res.json(body);
    })
}
exports.getWithdraws = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    biz_account.getWithdrawList(account.id, beginTime, endTime, '', '', '',0, pn, ps,'','', function (err, body) {
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].cardId = body.list[i].cardId.replace(/^(\d{4})(.+)(\w{4})$/, "$1****$3");
        }
        res.json(body);
    })
}

exports.getRecharges = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    var beginTime = req.param('beginTime') || '';
    var endTime = req.param('endTime') || '';
    biz_account.getRechargeList(account.id, beginTime, endTime, '', '', '', 0, 0, pn, ps,0,'', function (err, body) {
        res.json(body);
    })
}

exports.bindCard = [cache.limit, function (req, res) {
    var account = res.locals.account;
    if (!account.bindCard) {
        biz_account.bindCard(account.id, function (err, body) {
            if (!err)
                res.json({});
            else {
                res.json({err: err});
            }
        })
    }
    else {
        req.flash("alert", '您已经绑定过该卡');
        res.redirect("/account/bankcards");
    }
}]

exports.getPaymentByDay = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 5;
    var account = res.locals.account;
    var time = req.param('time') || new Date().Format('yyyy-MM-dd');
    var beginTime = time;
    var endTime = time + ' 23:59:59';
    biz_account.getPaymentList(account.id, beginTime, endTime, pn, ps, '', '', function (err, body) {
        body.totalCorpus = 0;
        body.totalInterest = 0;
        for (var i = 0; i < body.list.length; i++) {
            body.totalCorpus += body.list[i].payment_corpus;
            body.totalInterest += body.list[i].payment_interest;
        }
        res.json(body);
    })
}

exports.saveRealName = [cache.limit, function (req, res) {
    var user = res.locals.user;
    var realName = req.param('realName') || '';
    var idCard = req.param('idCard') || '';
    if (!realName || !idCard) {
        res.json({err: '请输入正确的身份信息'});
    } else {
        biz_user.saveRealName(user.id, realName, idCard, function (err, body) {
            res.json({err: err});
        })
    }
}]

exports.validEmail = function (req, res) {
    var user = res.locals.user;
    var email = req.param('email') || '';
    var code = req.param('code') || '';
    if (!email) {
        res.json({err: '请输入正确的邮箱'});
    } else {
        biz_user.validEmail(user.id, email, function (err, body) {
            res.json({err: err});
        })

    }
}
exports.resetEmail = [cache.limit, function (req, res) {
    var user = res.locals.user;
    var email = req.param('email') || '';
    if (!email) {
        res.json({err: '请输入正确的邮箱'});
    } else {
        var code = req.param('code') || '';
        common.checkCode(user.mobile, com.biz.fields.smsCodeType.Email.v, code, function (err) {
            if (err) {
                res.json({err: err});
            }
            else {
                biz_user.validEmail(user.id, email, function (err, body) {
                    res.json({err: err});
                })
            }
        })


    }
}]
exports.resetEmailCode = [cache.limit, function (req, res) {
    var user = res.locals.user;
    common.sendCode(user.mobile, com.biz.fields.smsCodeType.Email.v, function (err) {
        res.json({err: err});
    })
}]

exports.withdraw = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var user = res.locals.user;
    var amount = req.param('amount') || 0;
    var payPassword = req.param('payPassword') || '';
    biz_account.withdraw(user.id, account.id, amount, payPassword,com.biz.fields.route.Wap.v, function (err, body) {
        res.json({err: err});
    })
}]

exports.authRecharge = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var amount = req.param('amount') || 0;
    if (amount < 2) {
        req.flash("alert", '起充金额必须大于等于2');
        res.redirect("/account/recharge");
    } else {
        biz_recharge.createAuthPay(account.id, amount, com.biz.fields.route.Wap.v, function (err, body) {
            if (!err)
                res.render('post', {items: body});
            else {
                req.flash("alert", err);
                res.redirect("/account/recharge");
            }
        })
    }

}]

exports.recharge = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var amount = req.param('amount') || '';
    var bankId = req.param('bankId') || '';
    var gatWay = req.param('gatWay') || '';
    biz_recharge.createPay(account.id, amount, gatWay, bankId, function (err, body) {
        if (!err)
            res.render('post', {items: body});
        else {
            req.flash("alert", err);
            res.redirect("/account/recharge");
        }
    })
}]

exports.changeAutoInvest = [cache.limit, function (req, res) {
    var account = res.locals.account;
    var state = req.param('state') || com.biz.fields.state.Wait.v;
    biz_account.changeAutoInvest(account.id, state, function (err, body) {
        res.json({err: err});
    })
}]

exports.getInviteUser = function (req, res) {
    var pageNo = req.param('pn') || 1;
    var pageSize = 10;
    var bTime = req.param('beginTime') || '';
    var eTime = req.param('endTime') || '';
    var user = res.locals.user;
    biz_invite.getInviteUser(pageNo, pageSize, '', bTime, eTime, user.id, function (err, body) {
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].mobile = body.list[i].mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
        }
        res.json(body);
    })
}
exports.resetPayPassword = [cache.limit, function (req, res) {
    var user = res.locals.user;
    var tradePwd = req.param('tradePwd') || '';
    var code = req.param('code') || '';
    common.checkCode(user.mobile, com.biz.fields.smsCodeType.PayPassword.v, code, function (err) {
        if (err) {
            res.json({err: err});
        }
        else {
            biz_user.savePayPassword(user.id, tradePwd, function (err, body) {
                res.json({err: err});
            })
        }
    })

}]
exports.savePayPassword = [cache.limit, ccap_biz.checkImageCode, function (req, res) {
    var user = res.locals.user;
    var password = req.param('tradePwd') || '';
    var confirmPassword = req.param('tradePwd1') || '';
    if (password && password != confirmPassword)
        res.json({err: '两次密码输入不相同'});
    else {
        biz_user.savePayPassword(user.id, password, function (err, body) {
            res.json({err: err});
        })
    }
}]


exports.getInviteAward = function (req, res) {
    var pageNo = req.param('pn') || 1;
    var pageSize = 10;
    var bTime = req.param('beginTime') || '';
    var eTime = req.param('endTime') || '';
    var user = res.locals.user;
    biz_invite.getAllInviteAward(pageNo, pageSize, '', bTime, eTime, user.id, function (err, body) {
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].inviteMobile = body.list[i].inviteMobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
        }
        res.json(body);
    })
}


exports.getIntegralRecord = function (req, res) {
    var pageNo = req.param('pn') || 1;
    var pageSize = 10;
    var bTime = req.param('beginTime') || '';
    var eTime = req.param('endTime') || '';
    var action = req.param('action') || '';
    var user = res.locals.user;
    biz_integral.getRecordList(pageNo, pageSize, '', bTime, eTime, user.id, action, function (err, body) {
        res.json(body);
    })
}

exports.getCouponRecord = function (req, res) {
    var state = req.param('state') || '';
    var isExpiry = req.param('isExpiry') || false;
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var account = res.locals.account;
    biz_coupon.getCouponRecordList(null, null, account.id, isExpiry, null, null, null, null, state, pn, ps,function (err, body) {
        res.json(body);
    })
}
