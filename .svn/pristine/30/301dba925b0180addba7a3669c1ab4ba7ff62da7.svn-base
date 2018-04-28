/**
 * Created by pwx on 2016/8/24.
 */
var midx = require('./midx');

exports.getInvite = function (call) {
    midx('/invite/getInviteSet', {}, function (err, body) {
        call(err || null, body);
    })
}

exports.getInviteSetById = function (id,call) {
    midx('/invite/getInviteSetById',{id:id}, function (err, body) {
        call(err || null, body);
    })
}

exports.saveInvite = function (inviteSet, call) {
    midx('/invite/saveInviteSet', {inviteSet: JSON.stringify(inviteSet)}, function (err, body) {
        console.log(err);
        console.log(body);
        call(err || null, body);
    })
}

exports.getAllInviteAward = function (pageNo, pageSize, param, bTime, eTime, inviteId, call) {
    midx('/invite/getAllInviteAward', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime,
        inviteId: inviteId
    }, function (err, body) {
        call(err || null, body);
    })
}
exports.getAllInviteAwardSum = function (bTime, eTime, inviteId, call) {
    midx('/invite/getAllInviteAwardSum', {
        bTime: bTime,
        eTime: eTime,
        inviteId: inviteId
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 邀请好友奖励
 */
exports.getInviteAwardByAccountId = function(accountId,call){
    midx('/invite/getInviteAwardByAccountId',{
        accountId:accountId
    },function (err,body) {
        call(err || null,body);
    })
}

/**
 * 查询邀请记录
 * @author          Pangwenxuan
 * @return         arr
 */
exports.getInviteUser = function (pageNo, pageSize, param, bTime, eTime, inviteId, call) {
    midx('/user/getInviteUser', {
        bTime: bTime,
        eTime: eTime,
        param: param,
        pageNo: pageNo,
        pageSize: pageSize,
        inviteId: inviteId
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 查询邀请配置记录
 * @author
 * @return
 */
exports.getInviteSetList = function (pageNo, pageSize,call) {
    midx('/invite/getInviteSetList', {
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}