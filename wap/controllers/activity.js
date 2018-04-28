/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
var biz_content = require('../../biz/content');
var cache = require('../../biz/cache');
var biz_coupon = require('../../biz/coupon');
var async = require('async');
var biz_mall = require('../../biz/integralmall');
var biz_activity = require('../../biz/activity')

exports.before = [session_filter.getUser];
exports.views = {
    "/activity": function (req, res) {
        res.render('index');
    },
    "/yuetou": function (req, res) {
        res.render('yuetou');
    },
    "/channel/channel_register": function (req, res) {
        res.render('channel/channel_register');
    },
    "i_invite_register":[{path: /\/i_invite_register/}, function (req, res) {
        res.render('channel/invite_register');
    }],
    "/xutou": function (req, res) {
        res.render('xutou');
    },
    "/investgift": function (req, res) {
        res.render('investgift');
    },
    "/double": function (req, res) {
        var user = res.locals.user;
        var account = res.locals.account;
        biz_mall.getLotteryActivityList({state:1}, function (err, activity) {
            var lotteryId=0;
            var LuckDraw=1;
            if(activity && activity.list && activity.list instanceof Array){
                lotteryId=activity.list[0].id;
            }
            if (user) {
                cache.getUseCoupon(account.id,function(err,lottery){
                    biz_mall.getLotteryRecordList({userId: user.id}, function (err, record) {
                            if (new Date(lottery.expireTime).getTime()<new Date().getTime() && lottery.isUse==0) {
                                LuckDraw=1;
                                saveIsUse(lottery,account);
                            }else {
                                LuckDraw=lottery.isUse;
                            }
                        return res.render('double', {lotteryId: lotteryId, lottery: LuckDraw, lotteryRecord: record.list})
                        })
                    })
            } else {
                return res.render('double', {lotteryId: lotteryId,lottery: 0, lotteryRecord: []});
            }
        })
    },
    /*约投专享*/
    "/bespeak":function (req, res) {
        var wrap =req.param("wrap") || 0;
        res.render('activities/bespeak',{fromWrap: wrap});
    },
    /*续投有礼*/
    "/invest": function (req, res) {
        var wrap =req.param("wrap") || 0;
        res.render('activities/invest',{fromWrap: wrap});
    },
    /*抽奖*/
    "/luckDraw": function (req, res) {
        var wrap = req.param("wrap") || 0;
        var userid = req.param("userId");
        if(userid){
            req.session['userId']=userid;
        }
        var user = res.locals.user;
        var account = res.locals.account;
        if(user){
            biz_mall.getLotteryActivityList({state:1}, function (err, activity) {
                var lotteryId=0;
                var LuckDraw=1;
                if(activity && activity.list && activity.list instanceof Array){
                    lotteryId=activity.list[0].id;
                }
                if (user) {
                    cache.getUseCoupon(account.id,function(err,lottery){
                        biz_mall.getLotteryRecordList({userId: user.id}, function (err, record) {
                            if (new Date(lottery.expireTime).getTime()<new Date().getTime() && lottery.isUse==0) {
                                LuckDraw=1;
                                saveIsUse(lottery,account);
                            }else {
                                LuckDraw=lottery.isUse;
                            }
                            return res.render('activities/luckDraw', {lotteryId: lotteryId, lottery: LuckDraw, lotteryRecord: record.list,fromWrap: wrap})
                        })
                    })
                } else {
                    return res.render('activities/luckDraw', {lotteryId: lotteryId,lottery: 0, lotteryRecord: [],fromWrap: wrap});
                }
            })

        }else{
            res.render('activities/luckDraw', {fromWrap: wrap,user:{id: userid}});
        }
    },
    /*新手专享活动*/
    "/newUser": function (req, res) {
        var wrap =req.param("wrap") || 0;
        res.render('activities/newUser',{fromWrap: wrap});
    },
    /*排行榜*/
    "/investmentRankings": function (req, res) {
        res.render('activities/investmentRankings');
    },
    /*五一活动*/
    "/redEnvelopes": function (req, res) {
        var wrap = req.param("wrap") || 0;
        var userid = req.param("userId");
        var activityId = req.param("activityId");
        if(userid){
            req.session['userId']=userid;
        }
        var user = res.locals.user;
        var account = res.locals.account;
        if(user){
            var id = account==null? 0 : account.id;
            biz_activity.getBuryingPoint(id,function (err, body) {
                var isR = body.isReceived == 0 ? false : true;
                var activityId = req.param("activityId") || 0;
                res.render('activities/redEnvelopes',{activityID:activityId,isReceived:isR});
            });

        }else {
            var id = account==null? 0 : account.id;
            biz_activity.getBuryingPoint(id,function (err, body) {
                var isR = body.isReceived == 0 ? false : true;
                var activityId = req.param("activityId") || 0;
                res.render('activities/redEnvelopes',{activityID:activityId,isReceived:isR,user:{id:userid}});
            });
        }
        }
}
//渠道注册：
exports.routeRegister=function (req,res) {
    var mobile=req.param('mobile');
    var password=req.param('password');
    var code=req.param('code');

}

exports.getActive = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 20;
    biz_content.getAllActivity(pn, ps, com.biz.fields.state.Complete.v, '', '', com.biz.fields.showType.APP.v, function (err, body) {
        res.json(body);
    })
}

exports.getMyRecordList = function (req, res) {
    var user = res.locals.user;
    var account = res.locals.account;
    biz_mall.getLotteryActivityList({state:1},function (err, activity) {
        var lotteryId=0;
        var LuckDraw=1;
        if(activity && activity.list && activity.list instanceof Array){
            lotteryId=activity.list[0].id;
        }
        if (user) {
            cache.getUseCoupon(account.id,function(err,lottery){
                biz_mall.getLotteryRecordList({userId: user.id}, function (err, record) {
                    console.log(record.list)
                    if (new Date(lottery.expireTime).getTime()<new Date().getTime() && lottery.isUse==0) {
                        LuckDraw=1;
                        saveIsUse(lottery,account);
                    }else {
                        LuckDraw=lottery.isUse;
                    }
                    if(record.list.length > 3){
                        var newList = [];
                        for(var i=0; i<3; i++){
                            newList[i] = record.list[i];
                        }
                        res.json(newList);
                    }else{
                        res.json(record.list);
                    }
                })
            })
        } else {
            var empty = [];
            res.json(empty);
        }

    })
}

//抽奖
exports.doLuckDraw = [cache.limit,function (req, res) {
    var lotteryActivityId = req.param("lotteryActivityId");
    var user = res.locals.user;
    var account = res.locals.account;
    if (!user) {
        console.log(user)
        return res.json({type:1,err:"sessionid失效，请重新登录"})
    }
    async.waterfall([
            function (next) {
                biz_mall.getActivityById(lotteryActivityId, function (err, body) {
                    console.log(body)
                    if (body) {
                        if (body.beginTime > new Date()) {
                            next('活动未开始');
                        } else if (body.endTime < new Date()) {
                            next('活动已结束');
                        } else {
                            next(null);
                        }
                    } else {
                        next('活动不存在');
                    }
                })
            }, function ( next) {
                cache.getUseCoupon(account.id,function(err,body){
                    if (body && parseInt(body.isUse) ==0 ) {
                        next('您还有未使用的幸运加息券，使用后才可获得新的抽奖机会哦！');
                    } else {
                        next(null);
                    }
                })
            }, function ( next) {
                cache.checkFrequentAction('doluck' + user.id, 2000, function (error) {
                    next(error);
                })
            },
            /*抽奖获取抽得奖项*/
            function (next) {
                biz_mall.getLotteryPrizeList({lotteryActivityId: lotteryActivityId,state:1}, function (err, lotteryPrize) {
                    var count = 0;
                    if (lotteryPrize) {
                        for (var i in lotteryPrize.list) {
                            count += lotteryPrize.list[i].count;
                        }
                        if (!isNaN(count)&&count <= 0) {
                            next("奖品已被抽完,请联系客服.");
                        }
                        else {
                            var prize = createLuckDraw({prizescount: count, pro: 100000000, prize: lotteryPrize.list}).doLuckDraws();
                            if (prize) {
                                cache.saveUseCoupon(prize.virtualId,account.id, 0, function (err, result) {
                                    biz_mall.Lottery(prize.prizeId, user.id, function (err, body) {
                                        if (err) {
                                            next(err);
                                        } else {
                                            next(null, prize)
                                        }
                                    })
                                });
                            } else {
                                next("抽奖出错！", null);
                            }
                        }
                    } else {
                        next("无奖项", null);
                    }
                })
            }],
        function (err, result) {   //返回抽奖信息
            if (!err) {
                res.json(result);
            } else {
                res.json({err: err});
            }
        });
}]

exports.aaa = function (req,res) {
    return res.json('aaa')
}
//五一活动  立即领取  红包
exports.v1_mayDayReceiveBonus = function (req,res) {
    console.log(res)
    var activityId = req.param("activityId");
    console.log(res);
    var user = res.locals.user;
    var account = res.locals.account;
    if (!user) {
        return res.json({code:"-1",err:"sessionid失效，请重新登录"})
    }

    biz_content.getActivity(activityId, function (err, body) {
        if (body) {
            if (body.beginTime > new Date()) {
                res.json('活动未开始');
            } else if (body.endTime < new Date()) {
                res.json('活动已结束');
            } else {
                biz_activity.receiveBonus(account.id,user.mobile,function (err,body) {
                    if(err){
                        res.json({
                            code:-2,
                            message:err
                        });
                    }else{
                        res.json({
                            code : body.code,
                            message:"领取成功"
                        });
                    }
                })
            }
        } else {
            res.json('活动不存在');
        }
    })

}

//获取五一活动埋点
exports.v1_getMayDayActivityBuryingPoint = function (req, res) {
    var account = res.locals.account;
    var id = 0;
    if (account){
        id = account.id;
    }
    biz_activity.getBuryingPoint(id,function (err, body) {
        res.json(body);
    });
}

var createLuckDraw = function (option) {
    var l = {};
    if (!option)
        option = {};
    /*
     模拟测试数据传入，正式环境，需由数据库配置
     */
    l.prizescount = option.prizescount || 1000;   //奖品数量
    l.goods = option.prize || [];   //奖品项,需要根据概率进行升序排序
    l.pro = option.pro || 100000000;         //随机数产生基数，基数越大，准确率越高
    /*
     抽奖主函数
     */
    l.doLuckDraws = function () {

        if (this.prizescount > 0) {
            /*
             获取随机数
             */
            var r = Math.ceil(Math.random() * l.prizescount * l.pro);
            /*
             奖品区间临时存储
             */
            var p = 0;
            /*
             遍历整个奖品列表，然后跟随机数进行比较，获取奖品
             */
            for (var i = 0; i < this.goods.length; i++) {
                var g = this.goods[i];
                /*
                 判断奖品库存
                 */
                if (g.count > 0) {
                    /*
                     根据奖品库存，设置获奖区间
                     */
                    var b = p * l.pro, e = (g.count + p) * l.pro;
                    /*
                     判断是否在奖品区间
                     */
                    if (r > b && r <= e) {
                        return {
                            "img": g.img,
                            "name": g.name,
                            "prizeId": g.id,
                            "virtualId": g.virtualId,
                            "index": i
                        };
                    }
                }
                p += g.count;
            }
        }
        else
            return null;
    }
    return l;

}

exports.lotteryRecordList = function (req, res) {
    var view = {
        pageNo: 1,
        pageSize: 50,
        lotteryActivityId:req.param("lotteryActivityId")|| ''
    };
    biz_mall.getLotteryRecordList(view, function (err, body) {
        body.noteNum = body.list.length
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].mobile = body.list[i].mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
            body.list[i].realName = '*';
            body.list[i].userId = '*';
            body.list[i].LotteryActivityId = '*';
            body.list[i].LotteryPrizeId = '*';
            body.list[i].state = '*';
            body.list[i].id = '*';
        }
        res.json(body);
    })
}


function saveIsUse(lottery,account) {
if(lottery  && account){
    cache.saveUseCoupon(lottery.CouponIds,account.id,1,function (err,body) {
        console.log("幸运加息劵已失效："+lottery.CouponIds+"重置用户："+account.id+"抽奖机会")
    })
}
}