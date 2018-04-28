/**
 * Created by pwx on 2016/12/9.
 */
var midx = require('./midx');


exports.getAll = function (pageNo, pageSize, accountId, call) {
    midx('/transfer/getAll', {
        pageNo: pageNo,
        pageSize: pageSize,
        accountId: accountId
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getSure = function (pageNo, pageSize, accountId, call) {
    midx('/transfer/getSure', {
        pageNo: pageNo,
        pageSize: pageSize,
        accountId: accountId
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.create = function (investId, award, call) {
    midx('/transfer/create', {
        investId: investId,
        award: award
    }, function (err, body) {
        call(err || null, body);
    })
}


exports.buy = function (transferId, amount, accountId, bonusId, call) {
    midx('/transfer/buy', {
        transferId: transferId,
        amount: amount,
        accountId: accountId,
        bonusId: bonusId,
    }, function (err, body) {
        call(err || null, body);
    })
}

