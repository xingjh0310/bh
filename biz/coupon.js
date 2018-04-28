/**
 * Created by pwx on 2016/7/27.
 */
var midx = require('./midx');

/**
 * 根据加息券设置ID获取设置信息
 * @author          Pangwenxuan
 * @param id    ID
 * @return      couponSet
 */
exports.getCouponSetById = function (id, call) {
    midx('/coupon/getCouponSet/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据加息券
 * @author          Pangwenxuan
 * @param id    ID
 * @return      couponSet
 */
exports.getCouponRecordById = function (id, call) {
    midx('/coupon/getCouponRecord/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 发送加息券
 * @author          Pangwenxuan
 * @return
 */
exports.sendCoupon = function (mobile, couponId, call) {
    midx('/coupon/sendCoupon', {mobile: mobile, couponId: couponId}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询加息券设置
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getCouponSetList = function (state, bTime, eTime, pageNo, pageSize, call) {
    midx('/coupon/getCouponSetList', {
        bTime: bTime,
        eTime: eTime,
        pageNo: pageNo,
        pageSize: pageSize,
        state: state
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询加息券记录
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getCouponRecordList = function (bTime, eTime, accountId, isExpiry, productType, periodUnit, period, param, state, pageNo, pageSize,buyAmount, call) {
    if(typeof buyAmount == 'function'){
        call = buyAmount;
        buyAmount = null;
    }
    midx('/coupon/getCouponRecordList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        isExpiry: isExpiry,
        productType: productType,
        periodUnit: periodUnit,
        period: period,
        param: param,
        pageNo: pageNo,
        pageSize: pageSize,
        state: state,
        buyAmount:buyAmount
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存加息券设置
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveCouponSet = function (couponSet, call) {
    midx('/coupon/saveCouponSet', {couponSet: JSON.stringify(couponSet)}, function (err, body) {
        call(err || null, body);
    })
}