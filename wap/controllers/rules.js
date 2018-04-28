
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getUser];
exports.views = {
    /*邀请*/
    /*自动投标规则*/
    "/autoRule":  function (req, res) {
        res.render('autoRule');
    },
    /*红包使用规则*/
    "/bonusRule": function (req, res) {
        res.render('bonusrule');
    },
    /*加息券使用规则*/
    "/couponRule": function (req, res) {
        res.render('couponRule');
    },
    /*积分规则*/
    "/integralRule":function (req, res) {
        res.render('integralRule');
    },
    /*充值规则*/
    "/rechargeRule":function (req, res) {
        res.render('rechargeRule');
    },
    /*注册协议*/
    "/registerRule": function (req, res) {
        res.render('registerRule');
    },
    /*提现规则*/
    "/withdrawRule":  function (req, res) {
        res.render('withdrawRule');
    },
}






