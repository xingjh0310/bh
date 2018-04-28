/**
 * Created by pwx on 2016/8/11.
 */
var biz_borrow = require('../../biz/borrow');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];

exports.views = {

    "borrowApplyList": function (req, res) {
        return res.render('borrowapplylist');
    },

    "borrowApplyAudit": function (req, res) {
        var id = req.param('id');
        return res.render('borrowapplyaudit', {id: id});
    }
}

exports.auditBorrowApply = [cache.limit, function (req, res) {
    var id = req.param('id') || 0;
    var state = req.param('state') || '';
    var memo = req.param('memo') || '';
    biz_borrow.audit(id, state, memo, function (err, body) {
        return res.json(body);
    })
}]

exports.getBorrowApplyList = function (req, res) {
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_borrow.getList(pageNo, pageSize, param, function (err, body) {
        return res.json(body);
    })
}