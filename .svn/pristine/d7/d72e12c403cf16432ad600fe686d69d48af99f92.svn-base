/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
var biz_content = require('../../biz/content');
exports.before = [session_filter.getUser];
exports.views = {
    "/help": function (req, res) {
        res.render('index');
    },
        "/suggest": function (req, res) {
            res.render('suggest');
        }, "/list1": function (req, res) {
        res.render('list1');
    }, "/list2": function (req, res) {
        res.render('list2');
    }, "/list3": function (req, res) {
        res.render('list3');
    }, "/list4": function (req, res) {
        res.render('list4');
    },
    "/list5": function (req, res) {
        res.render('list5');
    }, "/list6": function (req, res) {
        res.render('list6');
    },
//**********************************//
    /*关于注册登录*/
    "/aboutRL": function (req, res) {
        res.render('aboutRL');
    },
    /*关于充值投资*/
    "/aboutInvest": function (req, res) {
        res.render('aboutInvest');
    },
    /*关于回款提现*/
    "/aboutWithdrawals": function (req, res) {
        res.render('aboutWithdrawals');
    },
    /*铂恒与安全保障*/
    "/aboutBH":  function (req, res) {
        res.render('aboutBH');
    },
    /*其他问题*/
    "/other":  function (req, res) {
        res.render('other');
    },
    /*流程指引*/
    "/guide":  function (req, res) {
        res.render('guide');
    },
}



