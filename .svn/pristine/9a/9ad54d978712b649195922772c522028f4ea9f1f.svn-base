

/**
 * Created by pwx on 2016/6/16.
 */

var midx = require('./midx');
var cache=require('./cache');
var async=require('async');

/**
 * 根据资金账户ID获取资金账户
 * @author          Pangwenxuan
 * @param id    ID
 * @return          user
 */
exports.getAccountById = function (id, call) {
    midx('/account/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/*
 *根据accountId获取回款日期列表
 */
exports.getPaymentDays = function (accountId, call) {
    midx('/account/selectPaymentDays', {accountId: accountId}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 线下充值
 * @author          Pangwenxuan
 * @param mobile    手机号
 */
exports.saveLineRecharge = function (mobile, amount, memo, call) {
    cache.checkFrequentAction('saveLineRecharge_'+mobile,2000,function(error){
        if(!error){
            midx('/account/saveLineRecharge', {mobile: mobile, amount: amount, memo: memo}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 线下扣款
 * @author          Pangwenxuan
 */
exports.saveLineDebit = function (mobile, amount, memo, call) {
    cache.checkFrequentAction('saveLineDebit_'+mobile,2000,function(error){
        if(!error){
            midx('/account/saveLineDebit', {mobile: mobile, amount: amount, memo: memo}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 根据id获取提现信息
 * @param withdrawId
 * @param call
 */
exports.getWithdraw = function (withdrawId,call) {
    if(!withdrawId || isNaN(withdrawId)){
        return call("参数错误!",null);
    }
    midx('/account/getWithdraw', {
        withdrawId: withdrawId
    }, function (err, body) {
        call(err || null, (body && body.withdraw)?body.withdraw:null);
    })
}

/**
 * 审核提现
 * @author          Pangwenxuan
 */
exports.auditWithdraw = function (withdrawId, auditUserId, state, memo,fee,otherFee,noInvestedFee,call) {
    if(!withdrawId){
        return call('提现参数不正确');
    }
    cache.checkFrequentAction('auditWithdraw_'+withdrawId,2000,function(err){
        if(!err){
            midx('/account/auditWithdraw', {
                withdrawId: withdrawId,
                memo: memo,
                auditUserId: auditUserId,
                state: state,
                fee:fee,
                otherFee:otherFee,
                noInvestedFee:noInvestedFee
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(err ,null);
        }
    })
}

/**
 * 审批提现
 * @author          Pangwenxuan
 */
exports.payWithdraw = function (withdrawId, payUserId, state, memo,call) {
    cache.checkFrequentAction('payWithdraw_'+withdrawId,2000,function(error){
        if(!error){
            midx('/account/payWithdraw', {
                withdrawId: withdrawId,
                payUserId: payUserId,
                state: state,
                memo:memo
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 绑卡
 * @author          Pangwenxuan
 */
exports.bindCard = function (accountId, call) {
    cache.checkFrequentAction('bindCard_'+accountId,2000,function(error){
        if(!error){
            midx('/account/bindCard', {
                accountId: accountId
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 根据条件查询充值记录
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @param gatWay 充值网关，可传null
 * @param memo 描述模糊查询，可传null
 * @param bAmount 起始金额，可传null
 * @param eAmount 最高金额，可传null
 * @return          arr
 */
exports.getRechargeList = function (accountId, bTime, eTime, param, gatWay, memo, bAmount, eAmount, pageNo, pageSize,route, state,call) {
    midx('/account/getRechargeList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        gatWay: gatWay,
        memo: memo,
        bAmount: bAmount,
        eAmount: eAmount,
        pageNo: pageNo,
        pageSize: pageSize,
        route:route,
        state:state
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询资金记录
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @param type 资金类型，传0代表所有类型
 * @return          arr
 */
exports.getCashFlowList = function (accountId, bTime, eTime, param, type, pageNo, pageSize, call) {
    midx('/account/getCashFlowList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取用户的资金流水表
 * @param accountId
 * @param bTime
 * @param eTime
 * @param param
 * @param type
 * @param pageNo
 * @param pageSize
 * @param call
 */
exports.getCashFlowListInGroup = function (accountId, bTime, eTime, param, type, pageNo, pageSize, call) {
    midx('/account/getCashFlowListInGroup', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询冻结记录
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @param type 冻结类型
 * @return          arr
 */
exports.getFreezeList = function (accountId, bTime, eTime, param, type, pageNo, pageSize, call) {
    midx('/account/getFreezeList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询提现记录
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @param state 状态
 * @return          arr
 */
exports.getWithdrawList = function (accountId,bTime,eTime,param,auditState, payState,route, pageNo, pageSize,auditStartTime,auditEndTime, call) {
    midx('/account/getWithdrawList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        auditState: auditState,
        payState: payState,
        route:route,
        pageNo: pageNo,
        pageSize: pageSize,
        auditStartTime:auditStartTime,
        auditEndTime: auditEndTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询回款计划
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @return          arr
 */
exports.getPaymentList = function (accountId, bTime, eTime, pageNo, pageSize, state, investId, call) {
    midx('/account/getPaymentList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        state: state,
        investId: investId,
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据条件查询银行卡信息
 * @author          Pangwenxuan
 * @param accountId 查询所有，传null
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @return          arr
 */
exports.getBankCardList = function (accountId, bTime, eTime, param, pageNo, pageSize, call) {
    midx('/account/getBankCardList', {
        accountId: accountId,
        bTime: bTime,
        eTime: eTime,
        param: param,
        pageNo: pageNo,
        pageSize: pageSize
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 查询用户银行卡信息
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getAccountBankCard = function (accountId, call) {
    midx('/account/getAccountBankCard', {accountId: accountId}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 删除用户银行卡信息
 * @author          Pangwenxuan
 * @return          arr
 */
exports.deleteAccountBankCard = function (accountId, call) {
    cache.checkFrequentAction('deleteAccountBankCard_'+accountId,2000,function(error){
        if(!error){
            midx('/account/deleteAccountBankCard', {accountId: accountId}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 添加银行卡
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveBankCardByAccount = function (bankCard, call) {
    async.waterfall([
        function(next){
            try{
                bankCard=JSON.parse(bankCard);
            }catch(e){
                bankCard="";
            }
            if(bankCard && bankCard.accountId){
                next(null);
            }else{
                next("参数错误.");
            }
        },
        function(next){
            if(bankCard && bankCard.mobile && (/^1[3|4|5|7|8][0-9]\d{8}$/).test(bankCard.mobile)){
                 next(null);
            }else{
                next("请输入正确的预留手机号.");
            }
        },
        function(next){
            cache.checkFrequentAction('saveBankCard_'+bankCard.accountId,2000,function(err){
                next(err);
            })
        },function(next){
            midx('/account/saveBankCardByAccount', {
                bankCard: JSON.stringify(bankCard)
            }, function (err, body) {
                call(err || null, body);
            })
        }
    ],function(err,data){
        call(err || null, data);
    })
}

/**
 * 编辑银行卡
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveBankCardById = function (bankCard, call) {
    async.waterfall([
        function(next){
            try{
                bankCard=JSON.parse(bankCard);
            }catch(e){
                bankCard="";
            }
            if(bankCard && bankCard.id){
                next(null);
            }else{
                next("参数错误.");
            }
        },
        function(next){
            cache.checkFrequentAction('saveBankCardById_'+bankCard.id,2000,function(err){
                next(err);
            })
        },function(next){
            midx('/account/saveBankCardById', {
                bankCard: JSON.stringify(bankCard)
            }, function (err, body) {
                call(err || null, body);
            })
        }
    ],function(err,data){
        call(err || null, data);
    })
}

/**
 * 编辑银行卡
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveBankCardByAdmin = function (bankCard, call) {
    cache.checkFrequentAction('saveBankCardByAdmin_'+bankCard.regMobile,2000,function(error){
        if(!error){
            if(bankCard && bankCard.regMobile){
                midx('/user/getUserByMobile', {
                    mobile: bankCard.regMobile
                }, function (err, body) {
                    if(!err && body && body.realName && body.accountId){
                        bankCard.accountId=body.accountId;
                        bankCard.accountName=body.realName;
                        delete bankCard.regMobile;
                        midx('/account/saveBankCardByAdmin',bankCard, function (err, body) {
                            call(err || null, body);
                        })
                    }else{
                        call('该用户不存在..', null);
                    }
                })
            }else{
                call('注册手机号不正确.', null);
            }
        }else{
            call(error, null);
        }
    })
}

/**
 * 保存自动投标设置
 * @author          Pangwenxuan
 * @return          arr
 */
exports.saveAutoInvest = function (autoInvest, call) {
    async.waterfall([
        function(next){
            try{
                autoInvest=JSON.parse(autoInvest);
            }catch(e){
                autoInvest="";
            }
            if(autoInvest && autoInvest.accountId){
                next(null);
            }else{
                next("参数错误.");
            }
        },
        function(next){
            cache.checkFrequentAction('saveAutoInvest_'+autoInvest.accountId,2000,function(err){
                next(err);
            })
        },function(next){
            midx('/account/saveAutoInvest', {
                auto: JSON.stringify(autoInvest)
            }, function (error, body) {
                next(error || null, body);
            })
        }
    ],function(err,data){
        call(err || null, data);
    })
}

/**
 * 更改自动投标状态
 * @author          Pangwenxuan
 * @return          arr
 */
exports.changeAutoInvest = function (accountId, state, call) {
    cache.checkFrequentAction("changeAutoInvest_"+accountId,2000,function(error){
        if(!error){
            midx('/account/changeAutoInvest', {
                accountId: accountId,
                state: state
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error ,null);
        }
    })
}

/**
 * 获取自动投标信息
 * @author          Pangwenxuan
 * @return          arr
 */
exports.getAutoInvest = function (accountId, call) {
    midx('/account/getAutoInvest', {
        accountId: accountId
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 提现
 * @author          Pangwenxuan
 * @return          arr
 */
exports.withdraw = function (userId, accountId, amount, payPassword,route, call) {
    cache.checkFrequentAction('withdraw_'+accountId,2000,function(error){
        if(!error){
            midx('/account/withdraw', {
                userId: userId,
                accountId: accountId,
                amount: amount,
                payPassword: payPassword,
                route:route
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}
/**
 *根据邀请ID获取邀请人
 * */
exports.getInviteByUser = function ( pageNo, pageSize,inviteId,call) {
        midx('/user/getInviteUsers',{
            inviteId:inviteId,
            pageNo:pageNo,
            pageSize:pageSize
        },function (err ,body) {
                call(err||null,body);
        })
}

/**
 * 获取带使用的劵 和 回款中的标
 * **/
exports.getWaitBonusAndCoupon = function (accounid,call) {
    midx('/user/getWaitUse',{
        accountId:accounid
    },function (err,body) {
        call(err||null,body);
    })
}

/**
 * 当前用户获取现金红包
 */
exports.v1_find_userBonus= function (accountId,pageNo,pageSize, call){
    midx('/bonus/getBonusRecordList', {
        accountId: accountId,
        pageNo: pageNo,
        pageSize: pageSize,
        type: 2
    }, function (err,body) {
        call(err || null, body);
    })
}
/**
 * 获取 标详情首页 广告
 * ***/
exports.v1_getTopDebtAds = function (call) {
    midx("/account/selectTopdebt",{},function (err,body) {
        call(err||null,body);
    })
}
