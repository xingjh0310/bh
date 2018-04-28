/**
 * Created by Administrator on 2017/5/8.
 */

var midx = require('./midx');
var cache = require('../biz/cache');

/**
 * 添加或修改商品类型信息
 * @param call
 */
exports.saveGoodsType = function (goodsType, call) {
    cache.checkFrequentAction("saveGoodsType",5000,function(error) {
        if(!error){
            midx('/goodsType/saveOrUpdate', {goodsType: goodsType}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error ,null);
        }
    });
}

/**添加或修改商品信息
 * @param call
 */
exports.saveGoods = function (goods, call) {
    cache.checkFrequentAction("saveGoods",5000,function(error) {
        if(!error){
            midx('/goods/saveOrUpdate', {goods: goods}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error ,null);
        }
    });
}

/**删除
 * @param call
 */
exports.deleteGoodsById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/goods/delete', {Id: id}, function (err, body) {
        call(err || null, body);
    })
}

/**删除类型
 * @param call
 */
exports.deleteGoodsTypeById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/goodsType/delete', {Id: id}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 添加订单信息
 * @param userId 用户id
 * @param num 商品个人
 * @param goodsId 商品id
 * @param addressId 地址id
 * @param mobile 手机号
 * @param call
 * @returns {*}
 */
exports.saveOrder = function (userId, num, goodsId, addressId, mobile, call) {
    if (!userId) {
        return call("session失效，请重新登录!", null);
    }
    if (!num || isNaN(num) || parseInt(num) <= 0) {
        return call("兑换数量不正确.", null);
    }
    if (!goodsId || isNaN(goodsId)) {
        return call('商品信息有误.', null);
    }
    cache.checkFrequentAction("saveOrder"+userId+goodsId,5000,function(error) {
        if(!error){
            midx('/order/createOrder', {
                userId: userId,
                num: num,
                goodsId: goodsId,
                addressId: addressId,
                mobile: mobile
            }, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error ,null);
        }
    });
}

/**添加或修改订单地址信息
 * @param call
 */
exports.saveAddress = function (address, call) {
    cache.checkFrequentAction("saveAddress",5000,function(error) {
        if(!error){
            midx('/address/saveOrUpdate', {address: address}, function (err, body) {
                call(err || null, body);
            })
        }else{
            call(error ,null);
        }
    });
}

/**根据条件获取商品类型列表
 * @param call
 */
exports.getGoodsTypeList = function (GoodsTypeViews, call) {
    midx('/goodsType/getList', GoodsTypeViews, function (err, body) {
        call(err || null, body);
    })
}

/**根据条件获取订单
 * @param call
 */
exports.getOrderList = function (OrderViews, call) {
    midx('/order/getList', OrderViews, function (err, body) {
        call(err || null, body);
    })
}

/**根据条件获取商品类型列表
 * @param call
 */
exports.getGoodsList = function (goodsViews,isMobile, call) {
    if(typeof isMobile=='function'){
        call=isMobile;
        isMobile=false;
    }
    midx('/goods/getList', goodsViews, function (err, body) {
        if (body && body.list && body.list instanceof Array) {
            for (var i = 0; i < body.list.length; i++) {
                body.list[i].currentTime = new Date().getTime();
                if(body.list[i].image && isMobile) {//如果是客户端 图片加域名前缀
                    body.list[i].image = com.env.static_url + body.list[i].image;
                }
            }
        }
        call(err || null, body);
    })
}

/**根据条件获取收货地址
 * @param call
 */
exports.getAddressList = function (AddressViews, call) {
    midx('/address/getList', AddressViews, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据商品Id上架或下架
 * @param goodsId
 * @param state
 * @param call
 */
exports.goodsState = function (goodsId, state, call) {
    if (!goodsId || isNaN(goodsId)) {
        return call('商品信息有误.', null);
    }
    midx('/goods/lanchOrBan', {goodsId: goodsId, state: state}, function (err, body) {
        call(err || null, body);
    });
}

exports.deleteAddressById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/address/delete', {Id: id}, function (err, body) {
        call(err || null, body);
    });
}

/**
 *根据商品类型Id禁用或开启
 * @param goodsId
 * @param state
 * @param call
 */
exports.goodsTypeState = function (goodsTypeId, state, call) {
    if (!goodsTypeId || isNaN(goodsTypeId)) {
        return call('参数有误.', null);
    }
    midx('/goodsType/onOrOff', {goodsTypeId: goodsTypeId, state: state}, function (err, body) {
        call(err || null, body);
    });
}

/**
 * 更新订单
 * @param entity
 * @param call
 */
exports.updateOrder = function (order, call) {
    midx('/order/updateOrder', order, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取商品
 * @param entity
 * @param call
 */
exports.getGooodsById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/goods/getGoods/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}
/**
 * 根据id获取订单详情
 * @param entity
 * @param call
 */
exports.getOrderById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/order/getOrder/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取商品类型
 * @param entity
 * @param call
 */
exports.getGooodsTypeById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/goodsType/getGoodsType/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id地址信息
 * @param entity
 * @param call
 */
exports.getAddressById = function (addressId, userId, call) {
    if (!userId) {
        return call('session失效，请重新登录.', null);
    }
    if (!addressId || isNaN(addressId)) {
        return call('参数有误.', null);
    }
    midx('/address/getAddress', {
        Id: addressId,
        userId: userId
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 推荐
 * @param debt
 * @param call
 */
exports.recommend = function (goods, call) {
    midx('/goods/recommend', {goods: goods}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 兑换限制
 * @param entity
 * @param call
 */
exports.checkExchange = function (userId, goodsId, num, call) {
    if (!userId) {
        return call('session失效，请重新登录.', null);
    }
    if (!goodsId || isNaN(goodsId)) {
        return call('商品信息有误.', null);
    }
    midx('/order/checkExchange', {
        userId: userId,
        goodsId: goodsId,
        num: num
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存活动
 * @param entity
 * @param call
 */
exports.saveLotteryActivity = function (lotteryActivity, call) {
    midx('/lotteryActivity/saveOrUpdate', {lotteryActivity: lotteryActivity}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存奖品
 * @param entity
 * @param call
 */
exports.saveLotteryPrize = function (lottreyPrize, call) {
    midx('/lotteryPrize/save', {lotteryPrize: lottreyPrize}, function (err, body) {
        call(err || null, body);
    })
}

/**根据条件获取抽奖活动
 * @param call
 */
exports.getLotteryActivityList = function (activityViews, call) {
    midx('/lotteryActivity/getList', activityViews, function (err, body) {
        call(err || null, body);
    })
}

/**根据code获取抽奖活动
 * @param call
 */
exports.getLotteryActivityByCode = function (code, call) {
    if (!code) {
        return call('活动编号不能空.', null);
    }
    midx('/lotteryActivity/getLotteryActivityByCode', {code: code}, function (err, body) {
        call(err || null, body);
    })
}

/**根据条件获取奖品
 * @param call
 */
exports.getLotteryPrizeList = function (prizeViews, call) {
    midx('/lotteryPrize/getList', prizeViews, function (err, body) {
        call(err || null, body);
    })
}

/**根据条件获取抽奖记录
 * @param call
 */
exports.getLotteryRecordList = function (recordViews, call) {
    midx('/lotteryRecord/getList', recordViews, function (err, body) {
        call(err || null, body);
    })
}

/**抽奖后处理
 * @param call
 */
exports.Lottery = function (prizeId, userId, call) {
    if (!userId) {
        return call('session失效，请重新登录.', null);
    }
    if (!prizeId || isNaN(prizeId)) {
        return call('奖品信息有误.', null);
    }
    midx('/lotteryActivity/lottery', {
        prizeId: prizeId,
        userId: userId
    }, function (err, body) {
        call(err || null, body);
    })
}

/**保存记录
 * @param call
 */
exports.Lotterys = function (activityId, prizeId, userId, call) {
    if (!userId) {
        return call('session失效，请重新登录.', null);
    }
    if (!prizeId || isNaN(prizeId)) {
        return call('奖品信息有误.', null);
    }
    if (!activityId || isNaN(activityId)) {
        return call('活动信息有误.', null);
    }
    var view = {
        lotteryActivityId: activityId,
        prizeId: prizeId,
        userId: userId
    };
    midx('/lotteryRecord/save', view, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 更新订单
 * @param entity
 * @param call
 */
exports.updateRecord = function (record, call) {
    midx('/lotteryRecord/updateRecord', record, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取抽奖活动信息
 * @param entity
 * @param call
 */
exports.getActivityById = function (id, call) {
    midx('/lotteryActivity/getActivity/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取抽奖奖品
 * @param entity
 * @param call
 */
exports.getPrizeById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/lotteryPrize/getPrize/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取抽奖记录
 * @param entity
 * @param call
 */
exports.getRecordById = function (id, call) {
    if (!id || isNaN(id)) {
        return call('参数有误.', null);
    }
    midx('/lotteryRecord/getReocrd/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 推荐
 * @param debt
 * @param call
 */
exports.recommendLottery = function (lotteryActivity, call) {
    midx('/lotteryActivity/recommend', {lotteryActivity: lotteryActivity}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 抽奖扣积分
 * @param entity
 * @param call
 */
exports.deIntegral = function (activityId, userId, call) {
    if (!userId) {
        return call('session失效，请重新登录.', null);
    }
    if (!activityId || isNaN(activityId)) {
        return call('活动信息有误.', null);
    }
    midx('/lotteryActivity/deductionScore', {
        activityId: activityId,
        userId: userId
    }, function (err, body) {
        call(err || null, body);
    })
}

/*设置默认地址
 * @param call
 */
exports.setDefaultAddress = function (addressView, call) {
    midx('/address/setDefault', addressView, function (err, body) {
        call(err || null, body);
    })
}

/**根据userId获取默认地址
 * @param call
 */
exports.getDefaultAddress = function (userId, call) {
    midx('/address/getDefaultAddress', {userId: userId}, function (err, body) {
        call(err || null, body);
    })
}