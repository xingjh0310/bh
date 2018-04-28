/**
 * Created by pwx on 2016/8/4.
 */
var biz_debt = require('../../biz/debt');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var async = require('async');
var biz_bonus = require('../../biz/bonus');
var biz_coupon = require('../../biz/coupon');
exports.before = [session_filter.getUser];

exports.views = {

    "/debts":function (req, res) {
        res.render('list');
    },

    "show": [{path: /\/debt\/(\d+)/}, function (req, res) {
        var user = res.locals.user;
        var id = req.params[0];
        if (id) {
            var dt = {};
            async.waterfall([function (cb) {
                biz_debt.get(id, function (req, debt) {
                    dt.debt = debt;
                    cb(null, debt);
                })
            }, function (debt, cb) {
                if(debt && debt.state>com.biz.fields.debtState.ApprovalPass.v){
                    if(user){
                        biz_debt.getInvests(1,1,debt.id,user.accountId,'','','','','',function(err,body){
                            dt.showDetail=body && body.list && body.list.length>0?true:false;
                            cb(null,dt);
                        })
                    }else{
                        dt.showDetail=false;
                        cb(null,dt);
                    }
                }else{
                    dt.showDetail=true;
                    cb(null,dt);
                }
            }], function (err, result) {
                res.render('show', dt);
            });
        }
        else {
            res.redirect('/debts');
        }
    }]

}

exports.getExpect = function (req, res) {
    var debtId = req.param('debtId') || '';
    var amount = req.param('amount') || '';
    if (debtId && amount) {
        biz_debt.getExpect(debtId, amount, function (err, body) {
            var amount = 0;
            for (var i = 0; i < body.length; i++) {
                amount += (body[i].interest);
            }
            res.json(amount.toFixed(2));
        })
    } else {
        res.json(0);
    }
}

exports.getDebt = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 20;
    var product = req.param('product') || '0';
    biz_debt.getInList(pn, ps, product, 1, function (err, body) {
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].nowtime=new Date().getTime();
            }
        }
        res.json(body);
    })
}

exports.getListInList = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 10;
    var productType = req.param('product') || 0;
    biz_debt.getListBiding(pn, ps,productType,function (err, body) {
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].nowtime=new Date().getTime();
            }
        }
        return res.json(body);
    })
}

exports.getInvests = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 5;
    var debtId = req.param('debtId') || 0;
    var user = res.locals.user;
    biz_debt.getInvests(pn, ps, debtId, '', '', '', 0,'','', function (err, body) {
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].mobile = body.list[i].mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
        }
        res.json(body);
    })
}

exports.buy = [cache.limit, session_filter.checkReal, function (req, res) {
    var user = res.locals.user;
    var account = res.locals.account;
    var amount = req.param('amount') || '0';
    var debtId = req.param('debtId') || '0';
    var bonusIds = req.param('bonusIds') || '';
    var couponIds = req.param('couponIds') || '';
    var accountId = res.locals.user.accountId;
    var debtPwd=req.param('debtPwd')||'';
    if (user == null) {
        req.flash('alert', '请您先登录');
        res.redirect('/login');
    } else {
        biz_debt.buy(debtId, amount, accountId, bonusIds, couponIds,com.biz.fields.route.PC.v,debtPwd, function (err) {
            if (err) {
                req.flash('alert', err);
                res.redirect('/debt/' + debtId);
            } else {
                req.flash('alert', '购买成功');
                res.redirect('/debt/' + debtId);
            }
        })
    }
}]

exports.getBonusRecordList=function(req,res){
    var account = res.locals.account;
    var amount=req.param('amount')||0;
    var debtId=req.param('debtId');
    async.waterfall([
        function(cb){
            biz_debt.get(debtId, function (err, body) {
                cb(null, body);
            })
        },function(debt,cb){
            if(debt && account){
                biz_bonus.getBonusRecordList(null, null, account.id, true, debt.productType, debt.periodUnit, debt.period, null, com.biz.fields.state.Wait.v, 1, 100, com.biz.fields.bonusType.Deductible.v,amount, function (err, body) {
                    if(body && body.list && body.list.length>0){
                        cb(null,body.list);
                    }else{
                        cb(null,[]);
                    }
                })
            }else{
                cb(null,[]);
            }
        }
    ],function(err,list){
        return res.json({list:list});
    })
}

exports.getCouponRecordList=function(req,res){
    var account = res.locals.account;
    var amount=req.param('amount')||0;
    var debtId=req.param('debtId');
    async.waterfall([
        function(cb){
            biz_debt.get(debtId, function (err, body) {
                cb(null, body);
            })
        },function(debt,cb){
            if(debt && account){
                biz_coupon.getCouponRecordList(null, null, account.id, true, debt.productType, debt.periodUnit, debt.period, null, com.biz.fields.state.Wait.v, 1, 100,amount, function (err, body) {
                    if(body && body.list && body.list.length>0){
                        cb(null,body.list);
                    }else{
                        cb(null,[]);
                    }
                })
            }else{
                cb(null,[]);
            }
        }
    ],function(err,list){
        return res.json({list:list});
    })
}