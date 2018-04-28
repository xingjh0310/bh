/**
 * Created by pwx on 2016/7/27.
 */
var midx = require('./midx');

/**
 * 根据红包设置ID获取设置信息
 * @author          Pangwenxuan
 * @param id    ID
 * @return      BonusSet
 */
exports.getBonusSetById = function (id, call) {
    midx('/bonus/getBonusSet/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 发送红包
 * @author          Pangwenxuan
 * @return
 */
exports.sendBonus = function (mobile, bonusId, call) {
    midx('/bonus/sendBonus', {mobile: mobile, bonusId: bonusId}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询红包设置
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getBonusSetList = function (state, bTime, eTime, pageNo, pageSize, call) {
    midx('/bonus/getBonusSetList', {
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
 * 根据条件查询红包记录
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getBonusRecordList = function (bTime, eTime, accountId, isExpiry, productType, periodUnit, period, param, state, pageNo, pageSize, type, buyAmount,call) {
    if(typeof buyAmount == 'function'){
        call = buyAmount;
        buyAmount = null;
    }
    midx('/bonus/getBonusRecordList', {
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
        type: type,
        buyAmount:buyAmount
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存红包设置
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveBonusSet = function (bonusSet, call) {
    midx('/bonus/saveBonusSet', {bonusSet: JSON.stringify(bonusSet)}, function (err, body) {
        call(err || null, body);
    })
}