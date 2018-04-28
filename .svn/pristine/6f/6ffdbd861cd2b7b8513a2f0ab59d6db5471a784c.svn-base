
/**
 * Created by pwx on 2016/6/30.
 */
var midx = require('./midx');
var cache=require('./cache');
var async=require('async');
var md5 = require('MD5');
var fields=com.biz.fields;

/**
 * 添加借款标
 * @author          Pangwenxuan
 * @param debt    标信息
 * @return          user
 */
exports.save = function (debt, call) {
    cache.checkFrequentAction('saveDebt_',2000,function(error){
        if(!error){
            midx('/debt/save', {debt: debt}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 获取预期收益
 * @author          Pangwenxuan
 * @param debt    标信息
 * @return          user
 */
exports.getExpect = function (debtId, amount, call) {
    midx('/debt/getExpect', {debtId: debtId, amount: amount}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据借款标ID获取款标信息
 * @author          Pangwenxuan
 * @param id    标ID
 * @return          user
 */
exports.get = function (id, call) {
    midx('/debt/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取审核中的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getAuditList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getAuditList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取所有借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getAll = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getAll', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取招标中的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getBidingList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getBidingList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取审核失败的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getRejectList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getRejectList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取逾期的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getOverdueList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getOverdueList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取撤销的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getCancelList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getCancelList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取待回款计划
 * @author          Pangwenxuan
 * @return          list
 */
exports.getPaymentIngList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getPaymentIngList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取已回款计划
 * @author          Pangwenxuan
 * @return          list
 */
exports.getPaymentEndList = function (pageNo, pageSize, param, bTime, eTime, call) {
    midx('/debt/getPaymentEndList', {
        pageNo: pageNo,
        pageSize: pageSize,
        param: param,
        bTime: bTime,
        eTime: eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取进行中的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getInList = function (pageNo, pageSize, productType, containNovice, call) {
    midx('/debt/getInList', {
        pageNo: pageNo,
        pageSize: pageSize,
        productType: productType,
        containNovice: containNovice,
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取首页进行中的借款标
 * @author          Pangwenxuan
 * @return          list
 */
exports.getHomeInList = function (pageNo, pageSize, productType, containNovice, call) {
    midx('/debt/getHomeInList', {
        pageNo: pageNo,
        pageSize: pageSize,
        productType: productType,
        containNovice: containNovice,
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取首页版块化进行中的标
 * @param investPeriodtype 按有效期类型  1秒杀标 其他非效期类型
 * @param isCustomization 1查询约标 其他非约标
 * @param state 标的状态
 * @param limit 返回几条
 * @param call
 */
exports.selectHomeBiding = function ( investPeriodtype,  isCustomization, state, limit, call) {
    midx('/debt/selectBiding', {
        investPeriodtype: investPeriodtype,
        isCustomization: isCustomization,
        state: state,
        limit: limit,
    }, function (err, body) {
        call(err || null, body);
    })

}
exports.selectHomeBidingupdatge = function ( investPeriodtype,  isCustomization, state, limit, accountId, call) {
    if(accountId==null || accountId==""){
        accountId=0;
    }
    midx('/debt/selectBidingupdate', {
        investPeriodtype: investPeriodtype,
        isCustomization: isCustomization,
        state: state,
        limit: limit,
        accountId:accountId,
    }, function (err, body) {
        call(err || null, body);
    })

}
/**
 * 获取列表页标的 service
 * @param pageNo 页码
 * @param pageSize 每页条数
 * @param call
 */
exports.getListBidingService = function (pageNo, pageSize,productType, call) {
    midx('/debt/getBhInList2', {
        pageNo: pageNo,
        pageSize: pageSize,
        productType:productType
    }, function (err, body) {
        //debtType 1 新手、2、常规 3、秒杀 4、约标  5、已满标
        var list1=[];
        var list2=[];
        var list3=[];
        var list4=[];
        var list5=[];
        var list=[];
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].nowtime=new Date().getTime();
                if(body.list[i].isNew==1 && body.list[i].state==5){
                    body.list[i].debtType=1
                    list1.push(body.list[i]);
                }else if(body.list[i].investPeriodType==1 &&  body.list[i].state==5){
                    body.list[i].debtType=3
                    list3.push(body.list[i]);
                }else if( body.list[i].state>5){
                    if(body.list[i].isNew==1){
                        body.list[i].debtstate=1;
                    }else if(body.list[i].investPeriodType==1){
                        body.list[i].debtstate=3;
                    }else if(body.list[i].debtPwd){
                        body.list[i].debtstate=4;
                    }else{
                        body.list[i].debtstate=2;
                    }
                    body.list[i].debtType=5
                    list5.push(body.list[i]);
                }else if(body.list[i].debtPwd &&  body.list[i].state==5){
                    body.list[i].debtType=4
                    list4.push(body.list[i]);
                }else{
                    body.list[i].debtType=2
                    list2.push(body.list[i]);
                }
            }
            list=list1.concat(list2).concat(list3).concat(list4).concat(list5);
        }
        body.list=list;
        call(err || null, body);
    })

}

/**
 * 获取列表页标的
 * @param pageNo 页码
 * @param pageSize 每页条数
 * @param call
 */
exports.getListBiding = function (pageNo, pageSize,productType, call) {
    //midx('/debt/getBhInList', {
    //    pageNo: pageNo,
    //    pageSize: pageSize,
    //    productType:productType
    //}, function (err, body) {
    //    call(err || null, body);
    //})
    midx('/debt/getBhInList2', {
        pageNo: pageNo,
        pageSize: pageSize,
        productType:productType
    }, function (err, body) {
        //debtType 1 新手、2、常规 3、秒杀 4、约标  5、已满标
        var list1=[];
        var list2=[];
        var list3=[];
        var list4=[];
        var list5=[];
        var list=[];
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].nowtime=new Date().getTime();
                if(body.list[i].isNew==1 && body.list[i].state==5){
                    body.list[i].debtType=1
                    list1.push(body.list[i]);
                }else if(body.list[i].investPeriodType==1 &&  body.list[i].state==5){
                    body.list[i].debtType=3
                    list3.push(body.list[i]);
                }else if( body.list[i].state>5){
                    body.list[i].debtType=5
                    list5.push(body.list[i]);
                }else if(body.list[i].debtPwd &&  body.list[i].state==5){
                    body.list[i].debtType=4
                    list4.push(body.list[i]);
                }else{
                    body.list[i].debtType=2
                    list2.push(body.list[i]);
                }
            }
            list=list1.concat(list2).concat(list3).concat(list4).concat(list5);
        }
        call(err || null, body);
    })

}

/**
 * 审核借款标
 * @author          Pangwenxuan
 * @param id    标ID
 * @param memo    备注
 * @param state 是否通过
 * @return          user
 */
exports.audit = function (id, state, memo, call) {
    cache.checkFrequentAction('auditDebt_'+id,2000,function(error){
        if(!error){
            midx('/debt/audit', {id: id, state: state, memo: memo}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 撤销借款标
 * @author        Pangwenxuan
 * @param id      标ID
 * @param memo    备注
 * @param state   是否通过
 * @return          user
 */
exports.cancel = function (id, memo, call) {
    cache.checkFrequentAction('cancelDebt_'+id,2000,function(error){
        if(!error){
            midx('/debt/cancel', {id: id, memo: memo}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 还款
 * @author        Pangwenxuan
 * @param id      标ID
 * @param time    回款时间
 * @param state   期数
 */
exports.payment = function (debtId, group, advance, call) {
    cache.checkFrequentAction('payment_'+debtId+group+advance,2000,function(error){
        if(!error){
            midx('/debt/payment', {debtId: debtId, group: group, advance: advance}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error,null);
        }
    })
}

/**
 * 还款详情
 */
exports.getPaymentByDebt = function (debtId, group, advance, call) {
    midx('/debt/getPaymentByDebt', {
        debtId: debtId,
        group: group,
        advance: advance
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取新手标
 */
exports.getNoviceDebt = function (limit, call) {
    midx('/debt/getNoviceDebt', {limit: limit}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 购买
 */
exports.buy = function (debtId, amount, accountId, bonusIds, couponIds, route, debtPwd, call) {
    async.waterfall([
        function (next) {
            cache.checkFrequentAction("buy" + debtId + accountId, 2000, function (err) {
                next(err);
            });
        }, function (next) {
            midx('/debt/get/' + debtId, {}, function (err, body) {
                if (body && body.minInvestAmount && amount % body. minInvestAmount == 0) {
                    if (body && body.debtPwd && body.debtPwd != md5(debtPwd + com.env.host).substring(10, 25)) {
                        next("约标密码不正确.")
                    } else if (body.debtPwd && couponIds) {
                        next('约标项目不能使用加息券.');
                    }
                    else if (body.isNew && couponIds) {
                        next('新手项目不能使用加息券.');
                    }
                    else if (body.increaseRate && parseFloat(body.increaseRate)>0 && couponIds) {
                        next('加息项目不能使用加息券.');
                    }
                    else if (body.investPeriodType == fields.investPeriodType.Hours.v && couponIds) {
                        next('抢购项目不能使用加息券.');
                    }
                    else {
                        next(null);
                    }
                } else {
                    next('购买金额不正确.');
                }
            })
        }
    ], function (err) {
        if (!err) {
            midx('/debt/buy', {
                debtId: debtId,
                amount: parseInt(amount),
                accountId: accountId,
                bonusIds: bonusIds,
                couponIds: couponIds,
                route: route
            }, function (err, body) {
                if (!err && couponIds) {
                    cache.getUseCoupon(accountId, function (err, body) {
                            midx('/coupon/getCouponRecordById/'+ parseFloat(couponIds), {}, function (err, coupon) {
                                if(!err && body) {
                                if (parseFloat(body.CouponIds) == parseFloat(coupon.couponId)) {
                                    cache.saveUseCoupon(parseFloat(body.CouponIds) , accountId, 1, function (err, result) {
                                        call(err || null, body);
                                    })
                                } else {
                                    call(err || null, body);
                                }
                                }else {
                                    call(err || null, body);
                                }
                            })
                    })
                } else {
                    call(err || null, body);
                }
            })
        } else {
            call(err, null);
        }
    })
}

/**
 * 投资列表
 */
exports.getInvests = function (pageNo, pageSize, debtId, accountId, beginTime, endTime, route,param,invite, call) {
    midx('/debt/getInvests', {
        debtId: debtId,
        pageNo: pageNo,
        pageSize: pageSize,
        accountId: accountId,
        beginTime: beginTime,
        endTime: endTime,
        route:route,
        param: param,
        invite:invite
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 个人中心的投资列表
 * @param pageNo
 * @param pageSize
 * @param debtId
 * @param accountId
 * @param beginTime
 * @param endTime
 * @param route
 * @param param
 * @param invite
 * @param call
 */
exports.getpersonInvests = function (pageNo, pageSize, debtId, accountId, beginTime, endTime, route,param,invite, call) {
    midx('/debt/getPersonInvests', {
        debtId: debtId,
        pageNo: pageNo,
        pageSize: pageSize,
        accountId: accountId,
        beginTime: beginTime,
        endTime: endTime,
        route:route,
        param: param,
        invite:invite
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 推荐标
 * @param debt
 * @param call
 */
exports.recommend = function (debt, call) {
    midx('/debt/recommend', {debt: debt}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 得到所有未满标
 * **/
exports.getNotFull = function (call) {
    var list1 = [];
    midx("/debt/getNotFull",{},function (err,body) {
       call(err || null, body);
    })

}

/**
 *  判断用户投资之后是否有话费奖励
 * @param mobile
 * @param f
 */
exports.isOrNoMibilefeeRecord = function(debtId,mobile, call) {
    midx('/mobilefee/isOrNoMibilefeeRecord', {debtId: debtId,mobile:mobile}, function (err, body) {
        call(err || null, body);
    })
}