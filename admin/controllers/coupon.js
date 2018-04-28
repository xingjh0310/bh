/**
 * Created by pwx on 2016/7/27.
 */
var biz_coupon = require('../../biz/coupon');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];

exports.views = {
    "setList": function (req, res) {
        res.render('setlist');
    }, "sendList": function (req, res) {
        res.render('sendlist');
    }, "editSet": function (req, res) {
        var id = req.param('id');
        var couponSet = {};
        if (id) {
            biz_coupon.getCouponSetById(id, function (err, body) {
                res.render('editset', {couponSet: body});
            });
        } else
            res.render('editset', {couponSet: couponSet});
    }, "send": function (req, res) {
        biz_coupon.getCouponSetList(com.biz.fields.state.Complete.v, '', '', 1, 100, function (err, body) {
            res.render('send', {coupon: body.list});
        })
    }
}

exports.sendCoupon = function (req, res) {
    var mobile = req.param('mobile') || '';
    var couponId = req.param('couponId') || '0';
    biz_coupon.sendCoupon(mobile, couponId, function (err, body) {
        res.json({err: err});
    })
}

exports.getAllCouponSet = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var state = req.param('state') || '';
    biz_coupon.getCouponSetList(state, bTime, eTime, pageNo, pageSize, function (err, body) {
        res.json(body);
    })
}


exports.getAllCouponRecord = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var state = req.param('state') || '';
    var param = req.param('param') || '';
    biz_coupon.getCouponRecordList(bTime, eTime, null, false, null, null, null, param, state, pageNo, pageSize, function (err, body) {
        res.json(body);
    })
}

exports.saveCouponSet = [cache.limit, function (req, res) {
    var couponSet = JSON.parse(req.param('couponSet') || '{}');
    couponSet.id = couponSet.id || 0;
    biz_coupon.saveCouponSet(couponSet, function (err, body) {
        res.json({err: err});
    })
}]