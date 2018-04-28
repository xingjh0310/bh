/**
 * Created by pwx on 2016/11/2.
 */
var fs = require('fs');
var biz_content = require('../../biz/content');
var biz_debt = require('../../biz/debt');
var biz_recharge = require('../../biz/recharge');
var biz_stat = require('../../biz/stat');
var biz_common = require('../../biz/common');
var async = require('async');

exports.views = {
    //platform文件夹-------有关本平台
    /*平台数据*/
    "pData": [{path: /\/pData/}, function (req, res) {
        async.waterfall([function (cb) {
            biz_common.getTotal(function (err, body) {
                var arrTotal = [
                    parseFloat(body.totalInvest).toFixed(2) ,
                    parseFloat(body.totalInterest).toFixed(2) ,
                    body.totalRegister ,
                    parseFloat(body.totalDebt)
                ];
                // var reTotal = [];
                // arrTotal.forEach(function(item, idx){
                //     var thousand = item % 10000;
                //     var tenThousand = ((item - item % 10000)/10000) % 10000;
                //     var billion = (item - (((item - item % 10000)/10000) % 10000 * 10000 + item % 10000)) / 10000 / 10000;
                //     var all = billion>0 ? billion+' 亿 '+tenThousand+' 万 '+thousand : (tenThousand>0 ? tenThousand+' 万 '+thousand : thousand);
                //     reTotal[idx] = all;
                // })
                cb(err, {total: arrTotal});
            })
        }, function (model, cb) {
            biz_stat.getYearAndSexRate(function (err, body) {
                model.Rate = body;
                cb(null, model);
            })
        }, function (model, cb) {
            biz_common.getSortInvest(5, function (err, body) {
                var sort = JSON.parse(body.totalInvest);
                var newSort = [];
                sort.forEach(function(item){
                    newSort.push({
                        value : item.amount / 10000,
                        name : item.mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
                    })
                })
                console.log(newSort)
                model.sortList = newSort;
                cb(null, model);
            })
        }], function (err, result) {
            res.render('platform/pData', result);
        });
    }],
    //--------活动文件
    //投资排行榜
    "investmentRankings": [{path: /\/investmentRankings/}, function (req, res) {
        res.render('activities/investmentRankings');
    }],

    // invite
    /*邀请*/
    "invite":[{path: /\/invite/}, function (req, res) {
        var userPhone=req.param("phone") || 0;
        var inviteCode = req.param('inviteCode') || 0;
        res.render('invites/invite',{phone: userPhone,inCODE:inviteCode});
    }],
    "rule":[{path: /\/rule/}, function (req, res) {
        res.render('invites/rule');
    }],

    //help文件夹-----------各种常见问题
    /*关于注册登录*/
    "aboutRL": [{path: /\/aboutRL/}, function (req, res) {
        res.render('help/aboutRL');
    }],
    /*关于充值投资*/
    "aboutInvest": [{path: /\/aboutInvest/}, function (req, res) {
        res.render('help/aboutInvest');
    }],
    /*关于回款提现*/
    "aboutWithdrawals": [{path: /\/aboutWithdrawals/}, function (req, res) {
        res.render('help/aboutWithdrawals');
    }],
    /*铂恒与安全保障*/
    "aboutBH": [{path: /\/aboutBH/}, function (req, res) {
        res.render('help/aboutBH');
    }],
    /*其他问题*/
    "other": [{path: /\/other/}, function (req, res) {
        res.render('help/other');
    }],
    /*流程指引*/
    "guide": [{path: /\/guide/}, function (req, res) {
        res.render('help/guide');
    }],

    //rules文件夹----------各种规则
    /*自动投标规则*/
    "autoRule": [{path: /\/autoRule/}, function (req, res) {
        res.render('rules/autoRule');
    }],
    /*红包使用规则*/
    "bonusRule": [{path: /\/bonusRule/}, function (req, res) {
        res.render('rules/bonusrule');
    }],
    /*加息券使用规则*/
    "couponRule": [{path: /\/couponRule/}, function (req, res) {
        res.render('rules/couponRule');
    }],
    /*积分规则*/
    "integralRule": [{path: /\/integralRule/}, function (req, res) {
        res.render('rules/integralRule');
    }],
    /*充值规则*/
    "rechargeRule": [{path: /\/rechargeRule/}, function (req, res) {
        res.render('rules/rechargeRule');
    }],
    /*注册协议*/
    "registerRule": [{path: /\/registerRule/}, function (req, res) {
        res.render('rules/registerRule');
    }],
    /*提现规则*/
    "withdrawRule": [{path: /\/withdrawRule/}, function (req, res) {
        res.render('rules/withdrawRule');
    }],

    //杂七杂八
    /*产品介绍-安全保障*/
    "product_safety": [{path: /\/product_safety/}, function (req, res) {
        res.render('about/index');
    }],
    /*铂恒金服简介*/
    "about": [{path: /\/about/}, function (req, res) {
        res.render('about');
    }],

    "download": [{path: /\/download/}, function (req, res) {
        res.render('download');
    }],
    /*安全保障*/
    "ensure": [{path: /\/ensure/}, function (req, res) {
        res.render('ensure');
    }],
    "error": [function (req, res) {
        res.render('error');
    }],
    /*新客指引*/
    "guidance": [{path: /\/guidance/}, function (req, res) {
        res.render('guidance');
    }],
    /*公告/新闻 详情*/
    "inform": [{path: /\/inform\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        biz_content.getNews(id, function (err, body) {
            res.render('inform', {inform: body});
        });
    }],
    //邀请注册表单
    "reginvite": [{path: /\/reginvite/}, function (req, res) {
        res.render('invites/invite_register');
    }],
    //邀请注册表单
    "invite_register": [{path: /\/invite_register/}, function (req, res) {
        res.render('invites/invite_register');
    }],

    /*项目详情*/
    "introduce": [{path: /\/introduce\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        biz_debt.get(id, function (err, body) {
            res.render('introduce', {introduce: body ? body.safeguard : ''});
        });
    }],
    /*protocol*/
    "downloadProtocol": [{path: /\/api\/protocol\/(\w+)/}, function (req, res) {
        var name = req.params[0];
        if (name) {
            var path = com.env.protocol_path + name + '.pdf';
            fs.exists(path, function (exists) {
                if (exists) {
                    res.download(path, "借款协议.pdf");
                }
                else
                    res.render('noprotocol');
            })
        }
    }],
    "openProtocol": [{path: /\/api\/openProtocol\/(\w+)/}, function (req, res) {
        var name = req.params[0];
        if (name) {
            res.render('protocol', {name: name});
        }
    }],
    "result": [{path: /\/result\/(\w+)/}, function (req, res) {
        var orderNo = req.params[0] || '';
        biz_recharge.getOrder(orderNo, function (err, body) {
            res.render('result', {msg: !err && body && body.isCompleted ? '充值成功' : '充值失败'});
        })
    }],
    /*旧版安全保障*/
    "security": [{path: /\/security/}, function (req, res) {
        res.render('security');
    }],
    "show_1": [{path: /\/show_1\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        if (id) {
            var dt = {};
            biz_debt.get(id, function (req, debt) {
                res.render('show_1', {debt:debt});
            })
        }
    }]
}

exports.result = [{path: /\/result\/(\w+)/}, function (req, res) {
    var orderNo = req.params[0] || '';
    biz_recharge.getOrder(orderNo, function (err, body) {
        res.render('result', {msg: !err && body && body.isCompleted ? '充值成功' : '充值失败'});
    })
}]
exports.logs = function (req, res) {
    var msg = req.param('msg') || '';
    if (msg) {
        console.info(msg);
    }
    res.json({message: '', code: 1});
}