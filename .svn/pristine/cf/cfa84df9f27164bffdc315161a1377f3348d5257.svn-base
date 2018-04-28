/**
 * Created by Administrator on 2017/5/8.
 */
var biz_mall = require('../../biz/integralmall');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];

exports.views = {

    "edittype": function (req, res) {
        var id = req.param('id') || '';
        var goodsType = {};
        if (id) {
            biz_mall.getGooodsTypeById(id, function (err, body) {
                return res.render('edittype', {goodsType: body});
            })
        } else {
            return res.render('edittype', {goodsType: goodsType});
        }
    },

    "goodstypelist": function (req,res) {
        return res.render('goodstypelist')
    },

    "orderlist": function (req,res) {
        var views = {};
        biz_mall.getGoodsTypeList(views, function (err, body) {
            return res.render('orderlist',{GoodsType:body});
        });
    },

    "sendGoods": function (req, res) {
        var id = req.param('id');
        var order = {};
        biz_mall.getOrderById(id, function (err, body) {
            return res.render('sendGoods', {order: body});
        })
    },

    "editgoods": function (req, res) {
        var id = req.param('id') || '';
        var goods = {};
        if (id) {
            biz_mall.getGooodsById(id, function (err, result) {
                biz_mall.getGoodsTypeList(goods, function (err, body) {
                    return res.render('editgoods', {goods: result,GoodsType:body});
                })
            })
        } else {
            biz_mall.getGoodsTypeList(goods, function (err, body) {
                return res.render('editgoods', {goods: goods,GoodsType:body});
            })
        }
    },

    "goodslist": function (req,res) {
        var views = {};
        biz_mall.getGoodsTypeList(views, function (err, body) {
            return res.render('goodslist',{GoodsType:body});
        });
    },

    "orderdetail": function (req,res) {
        var id = req.param('id') || '';
        var order = {};
        if(id){
            biz_mall.getOrderById(id, function (err, body) {
                return res.render('orderdetail',{order:body});
            });
        }else {
            return res.render('orderdetail',{order:order});
        }
    },

    "editlotteryactivity": function (req, res) {
        var id = req.param('id') || '';
        var goods = {};
        if (id) {
            biz_mall.getActivityById(id, function (err, result) {
                return res.render('editlotteryactivity', {lotteryActivity: result});
            })
        } else {
            return res.render('editlotteryactivity', {lotteryActivity: goods});
        }
    },

    "lotteryactivitylist": function (req, res) {
        return res.render('lotteryactivitylist')
    },

    "lotteryprizelist": function (req, res) {
        var views = {};
        biz_mall.getLotteryActivityList(views, function (err, body) {
            return res.render('lotteryprizelist', {activitys: body})
        })
    },

    "lotteryrecordlist": function (req, res) {
        var views = {};
        biz_mall.getLotteryActivityList(views, function (err, activity) {
            return res.render('lotteryrecordlist', {activitys: activity})
        })
    },

    "editprize": function (req, res) {
        var views = {};
        var id = req.param('id') || '';
        if (id) {
            biz_mall.getPrizeById(id, function (err, body) {
                biz_mall.getLotteryActivityList(views, function (err, activity) {
                    return res.render('editprize', {prize: body, activitys: activity})
                })
            })
        } else {
            biz_mall.getLotteryActivityList(views, function (err, activity) {
                return res.render('editprize', {prize: views, activitys: activity})
            })
        }
    },

    "sendprize": function (req, res) {
        var id = req.param('id');
        var prize = {};
        if(id) {
            biz_mall.getRecordById(id, function (err, body) {
                return res.render('sendprize', {prize: body});
            })
        }else {
            return res.render('sendprize', {prize: prize});
        }
    }
}


//类型添加或更新
exports.editType = [cache.limit, function (req, res) {
    var goodsType = req.param('goodsType') || '{}';
    biz_mall.saveGoodsType(goodsType, function (err, body) {
        res.json({err: err});
    })
}]

//删除
exports.deleteGoodsType = [cache.limit, function (req, res) {
    var Id = req.param('Id') || '{}';
    biz_mall.deleteGoodsTypeById(Id, function (err, body) {
        return res.json({err: err});
    })
}]

//类型列表
exports.getTypeList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getGoodsTypeList(views, function (err, body) {
        if (body && body.list && body.list instanceof Array) {
            for (var i = 0; i < body.list.length; i++) {
                body.list[i].nowtime = new Date().getTime();
            }
        }
        return res.json(body);
    })
}


//===============================商品==========================
//添加更新
exports.editGoods = [cache.limit, function (req, res) {
    var goods = req.param('goods') || '{}';
    biz_mall.saveGoods(goods, function (err, body) {
        return res.json({err: err});
    })
}]
//添加更新
exports.deleteGoods = [cache.limit, function (req, res) {
    var Id = req.param('Id') || '{}';
    biz_mall.deleteGoodsById(Id, function (err, body) {
        return  res.json({err: err});
    })
}]

//推荐
exports.recommend = [cache.limit, function (req, res) {
    var goods = req.param('goods') || '{}';
    biz_mall.recommend(goods, function (err, body) {
        return res.json({err: err});
    })
}]

//上下架
exports.lanchOrBan = [cache.limit, function (req, res) {
    var goodsId = req.param('goodsId') || 0;
    var state = req.param('state') || 0;
    biz_mall.goodsState(goodsId, state, function (err, body) {
        return res.json({err: err});
    })
}]

//列表
exports.getGoodsList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getGoodsList(views, function (err, body) {
        return res.json(body);
    })
}


//================================兑换订单=========================

//列表
exports.getOrderList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getOrderList(views, function (err, body) {
        if (body && body.list && body.list instanceof Array) {
            for (var i = 0; i < body.list.length; i++) {
                body.list[i].nowtime = new Date().getTime();
            }
        }
        return res.json(body);
    })
}

exports.sendGoodsById = function (req, res) {
    var orderId = req.param("orderId") || '';
    var memo = req.param("memo") || '';
    if (orderId) {
        var order = {
            id: orderId,
            state: 2,
            memo:memo
        }
        biz_mall.updateOrder(order, function (err, body) {
            return res.json({err: err});
        })
    } else {
        return res.json({err: "出现异常！"});
    }
}

//===============================抽奖活动==========================

//类型添加或更新
exports.editLotteryActivity = [cache.limit, function (req, res) {
    var lotteryActivity = req.param('lotteryActivity') || '{}';
    biz_mall.saveLotteryActivity(lotteryActivity, function (err, body) {
        return res.json({err: err});
    })
}]


//活动列表
exports.getActivityList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getLotteryActivityList(views, function (err, body) {
        return res.json(body);
    })
}

exports.savePrize = [cache.limit, function (req, res) {
    var prize = req.param('prize') || '{}';
    biz_mall.saveLotteryPrize(prize, function (err, body) {
        return res.json({err: err});
    })
}]

//奖品列表
exports.getPrizeList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getLotteryPrizeList(views, function (err, body) {
        return res.json(body);
    })
}
//抽奖记录列表
exports.getRecordList = function (req, res) {
    var views = JSON.parse(req.param('view') || '{}');
    biz_mall.getLotteryRecordList(views, function (err, body) {
        return res.json(body);
    })
}

//完成实物
exports.completeOrder = function (req, res) {
    var record = req.param('record') || '{}';
    biz_mall.updateRecord(record, function (err, body) {
        return res.json({err: err});
    })
}

//推荐
exports.lotteryRecommend = [cache.limit, function (req, res) {
    var lotteryActivity = req.param('lotteryActivity') || '{}';
    biz_mall.recommendLottery(lotteryActivity, function (err, body) {
        return res.json({err: err});
    })
}]

exports.sendPrizeById = function (req, res) {
    var prizeId = req.param("prizeId") || '';
    var memo = req.param("memo") || '';
    if (prizeId) {
        var order = {
            id: prizeId,
            state: 1,
            memo: memo
        }
        biz_mall.updateRecord(order, function (err, body) {
            return  res.json({err: err});
        })
    } else {
        return res.json({err: "出现异常！"});
    }
}
