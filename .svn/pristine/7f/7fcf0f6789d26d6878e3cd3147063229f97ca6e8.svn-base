/**
 * Created by pwx on 2016/8/3.
 */
var async = require('async');
var biz_debt = require('../../biz/debt');
var biz_common = require('../../biz/common');
var biz_content = require('../../biz/content');
var session_filter = require('../filters/session-filter');
var biz_cache = require('../../biz/cache');
exports.before = [session_filter.getUser];
exports.views = {
    "/": function (req, res) {
        async.waterfall([function (cb) {
            biz_debt.selectHomeBiding(0, 0, 5, 4, function (err, body) {
                cb(err, {debts: body});
            })
        }, function (model, cb) {
            biz_debt.getNoviceDebt(2, function (err, body) {
                model.novice = body;
                cb(null, model);
            })
        }, function (model, cb) {
            biz_content.getAllAds(1, 100, com.biz.fields.state.Complete.v, com.biz.fields.showType.PC.v, function (err, body) {
                model.ads = body.list || [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_content.getAllNews(1, 5, com.biz.fields.state.Complete.v, com.biz.fields.newsType.Notice.v, '', '', '', function (err, body) {
                model.notice = body.list || [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_content.getAllNews(1, 5, com.biz.fields.state.Complete.v, com.biz.fields.newsType.Inform.v, '', '', '', function (err, body) {
                model.inform = body.list || [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_content.getAllPartner(1, 100, com.biz.fields.state.Complete.v, function (err, body) {
                model.partner = body.list || [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_debt.selectHomeBiding(1, 0, 5,1, function (err, body) {
                model.seckill = body[0]|| [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_debt.selectHomeBiding(0, 1, 5,2, function (err, body) {
                model.marks = body|| [];
                cb(null, model);
            })
        }, function (model, cb) {
            biz_common.getTotal(function (err, body) {
                model.total = body;
                cb(null, model);
            })
        }], function (err, result) {
            res.render('index', result);
        });
    },
    "/download": function (req, res) {
        res.render('download');
    }
}