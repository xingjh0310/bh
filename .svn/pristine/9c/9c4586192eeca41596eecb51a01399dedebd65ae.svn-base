/**
 * Created by pwx on 2016/8/23.
 */
var midx = require('./midx');

/**
 * 保存积分规则
 * @author          Pangwenxuan
 */
exports.saveRule = function (rule, call) {
    midx('/integral/saveRule', rule, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取积分规则
 * @author          Pangwenxuan
 */
exports.getRule = function (id, call) {
    midx('/integral/getRule/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取规则列表
 * @author          Pangwenxuan
 * @return         arr
 */
exports.getRuleList = function (pageNo, pageSize, action, state, call) {
    midx('/integral/getAllRule', {
        pageNo: pageNo,
        pageSize: pageSize,
        action: action,
        state: state
    }, function (err, body) {
        call(err || null, body);
    });
}


/**
 * 获取积分列表
 * @author          Pangwenxuan
 * @return         arr
 */
exports.getRecordList = function (pageNo, pageSize, param, bTime, eTime, userId, action, call) {
    midx('/integral/getAllRecord', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime,
        userId: userId,
        action: action
    }, function (err, body) {
        call(err || null, body);
    });
}



