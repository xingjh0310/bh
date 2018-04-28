/**
 * Created by pwx on 2016/6/13.
 */
var biz_supervisors = require('../../biz/supervisors');
var session_filter = require('../filters/session-filter');
var biz_account = require('../../biz/account');
var biz_common = require('../../biz/common');
var biz_debt = require('../../biz/debt');
var async = require('async');
var cache = require('../../biz/cache');
exports.views = {
    "/": [session_filter.checkLogin, function (req, res, next) {
        var user = res.locals.user;
        biz_supervisors.getRights(user.roleId, function (err, body) {
            res.render('index', {rights: body});
        })
    }],
    "welcome": [session_filter.checkLogin, function (req, res) {
        res.render('welcome');
    }],

    "top": function (req, res) {
        res.render('top');
    },

    "/login": [function (req, res) {
        res.render("login");
    }],

    "/logout": [function (req, res) {
        req.session['user'] = null;
        res.redirect('/login/'+com.env.site_path);
    }]

}

exports.getTotalInvest = function (req, res) {
    var data = [];
    biz_common.getTotalInvest(function (err, body) {
        async.map(body, function (item, call) {
            data.push([new Date(item.time).getTime(), item.amount]);
            call(null);
        }, function (err, result) {
            biz_common.getTotal(function (err, body) {
                data.push([new Date(new Date().Format('yyyy-MM-dd')).getTime(), parseFloat(body.todayInvest || 0)]);
                res.json(data);
            })
        });
    })
}

exports.getTotal = function (req, res) {
    var total = {};
    async.waterfall([
        function (cb) {
            biz_common.getTotal(function (err, body) {
                $.extend(total, body);
                cb(null);
            })
        }, function (cb) {
            biz_debt.getPaymentIngList(1, 1000, '', new Date().Format('yyyy-MM-dd') + ' 00:00', new Date().Format('yyyy-MM-dd') + ' 23:59', function (err, body) {
                total.todayWaitBillCount = body.list.length;
                total.todayWaitBillAmount = 0;
                async.map(body.list, function (item, call) {
                    total.todayWaitBillAmount += (item.paymentCorpus + item.paymentInterest);
                    call(null);
                }, function (err, result) {
                    cb(null);
                });
            })
        },
        function (cb) {
            biz_account.getWithdrawList(0, '', '', '', com.biz.fields.state.Wait.v, '',0, 1, 1000,'','', function (err, body) {
                total.withdrawAuditCount = body.list.length;
                cb(null);
            })
        }, function (cb) {
            biz_account.getWithdrawList(0, '', '', '', com.biz.fields.state.Complete.v, com.biz.fields.state.Wait.v,0, 1, 1000,'','', function (err, body) {
                total.withdrawAlreadyCount = body.list.length;
                cb(null);
            })
        }], function (err, result) {
        res.json(total);
    })
}

exports.login = [cache.limit, {path: /login/}, function (req, res) {
    var name = req.param('name');
    var pwd = req.param('password');
    var googleCode = req.param('googleCode');
    if (name && pwd) {
        biz_supervisors.login(name, pwd,googleCode, function (err, body) {
            if (!err && body && !body.error) {
                req.session['user'] = body;
                return res.redirect('/' + com.env.site_path);
            } else {
                res.json({err: err||'登录失败！'});
            }
        })
    } else {
        res.json({err: '请输入帐号密码'});
    }
}]