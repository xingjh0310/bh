/**
 * Created by pwx on 2016/9/27.
 */
var midx = require('./midx');
var cache=require('./cache');

exports.createPay = function (accountId, money, bankId, call) {
    cache.checkFrequentAction('createPay_'+accountId,2000,function(error){
        if(!error){
            midx('/recharge/createPay', {
                accountId: accountId,
                money: money,
                bankId: bankId
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

exports.createAuthPay = function (accountId, money, route, call) {
    cache.checkFrequentAction('createAuthPay_'+accountId,2000,function(error){
        if(!error){
            midx('/recharge/createAuthPay', {
                accountId: accountId,
                money: money,
                route: route
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

exports.subPay = function (orderId, code, call) {
    cache.checkFrequentAction('subPay_'+orderId,2000,function(error){
        if(!error){
            midx('/recharge/subPay', {
                orderId: orderId,
                code: code
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

exports.getOrder = function (orderNo, call) {
    midx('/recharge/getOrder', {
        orderNo: orderNo
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.completeOrder = function (orderNo, call) {
    cache.checkFrequentAction('completeOrder_'+orderNo,2000,function(error){
        if(!error){
            midx('/recharge/completeOrder', {
                orderNo: orderNo
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}