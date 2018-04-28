/**
 * Created by pwx on 2016/9/29.
 */
var midx = require('./midx');
/**
 * 统计
 * @author          Pangwenxuan
 * @return          {}
 */
exports.getTotal = function (call) {
    midx('/common/getTotal', {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 投资统计
 * @author          Pangwenxuan
 * @return          {}
 */
exports.getTotalInvest = function (call) {
    midx('/common/getTotalInvest', {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 排行榜
 * @author          Pangwenxuan
 * @return          {}
 */
exports.getSortInvest = function (limit, call) {
    midx('/common/getSortInvest', {limit: limit}, function (err, body) {
        call(err || null, body);
    })
}


exports.sendCode = function (mobile, type, call) {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile)) {
        call('手机号输入错误', null);
    } else {
        midx('/common/sendCode', {
            mobile: mobile, type: type
        }, function (err, body) {
            call(err || null, body);
        })
    }
}


exports.checkCode = function (mobile, type, code, call) {
    midx('/common/checkCode', {
        mobile: mobile, type: type, code: code
    }, function (err, body) {
        call(err || null, body);
    })
}