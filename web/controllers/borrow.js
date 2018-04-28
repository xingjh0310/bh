/**
 * Created by pwx on 2016/8/10.
 */
var session_filter = require('../filters/session-filter');
var biz_borrow = require('../../biz/borrow');
var cache = require('../../biz/cache');
exports.before = [session_filter.getUser];
exports.views = {
    "/borrow": function (req, res) {
        res.render('index');
    }
}

exports.saveBorrowApply = [cache.limit, function (req, res) {
    var borrow = JSON.parse(req.param('borrow') || '{}');
    biz_borrow.save(borrow, function (err, body) {
        res.json(body);
    })
}]
