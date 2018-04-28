/**
 * Created by pwx on 2016/6/30.
 */
var biz_user = require('../../biz/user');
var biz_invite = require('../../biz/invite');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
exports.before = [session_filter.checkUser];
exports.views = {
    "list": function (req, res) {
        res.render("list");
    },

    "levelList": function (req, res) {
        res.render("levellist");
    },

    "levelEdit": function (req, res) {
        var id = req.param('id');
        var level = {};
        if (id) {
            biz_user.getLevelById(id, function (err, body) {
                res.render('leveledit', {level: body});
            });
        } else
            res.render('leveledit', {level: level});
    },

    "inviteList": function (req, res) {
        res.render("invitelist");
    },

    "edit": function (req, res) {
        var id = req.param('id');
        var investor = {};
        if (id) {
            biz_user.getUserById(id, function (err, body) {
                res.render('edit', {investor: body.user});
            });
        } else
            res.render('edit', {investor: investor});
    }

}

exports.saveInvestor = [cache.limit, function (req, res) {
    var investor = JSON.parse(req.param('investor') || '{}');
    var investor = {
        realName: investor.realName,
        idCard: investor.idCard,
        id: investor.id || 0
    }
    biz_user.save(investor, function (err, body) {
        res.json({err: err});
    })
}]

exports.getInviteList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var isExport = eval(req.param('isExport')) || false;
    biz_invite.getInviteUser(pageNo, pageSize, param, bTime, eTime, '', function (err, body) {
        if (!isExport){
            res.json(body);
        }else {
            var fields = ['time','inviteMobile','inviteRealName','mobile','realName','idCard','investCount'];
            var formatConfig = createUserExcelFormat(fields);
            excel.export(formatConfig, body.list, function (fileName) {
                res.json({fileName: fileName});
            })
        }
    })
}

exports.getLevelList = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_user.getLevelList(pageNo, pageSize, function (err, body) {
        res.json(body);
    })
}

exports.getUserByMobile = function (req, res) {
    var mobile = req.param('mobile');
    biz_user.getUserByMobile(mobile, function (err, user) {
        res.json(user);
    })
}

exports.saveLevel = [cache.limit, function (req, res) {
    var level = JSON.parse(req.param('level') || '{}');
    level.id = level.id || 0;
    biz_user.saveLevel(level, function (err, body) {
        res.json({err: err});
    })
}]

exports.getInvestorList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var route=req.param('route')||  -1;
    var isExport = eval(req.param('isExport')) || false;
    biz_user.getUserList(pageNo, pageSize, param, bTime, eTime,route,com.biz.fields.accountType.Investor.v, function (err, body) {
        if (!isExport){
            res.json(body);
        }else {
            var fields = ['time','route','mobile','real_name','id_card','level','is_new','balance','collect','freeze','score','total_invest_amount','total_withdraw_amount','total_recharge_amount','invest_count','online'];
            var formatConfig = createIUserExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                res.json({fileName: fileName});
            })
        }
    })
}

exports.lock = [cache.limit, function (req, res) {
    var userId = req.param('userId') || 0;
    var lock = req.param('lock') || false;
    biz_user.lock(userId, lock, function (err, body) {
        res.json({err: err});
    })
}]

function createUserExcelFormat(arr) {
    var config = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {};
        obj.field = arr[i];
        switch (arr[i]) {
            case 'id':
                obj.title = '编号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'time':
                obj.title = '时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'inviteMobile':
                obj.title = '邀请人手机号';
                obj.format = function (o, x) {
                    return o.inviteMobile;
                };
                break;
            case 'online':
                obj.title = '推广类型';
                obj.format = function (o, x) {
                    return x==0 ? '线下' : '线上';
                };
                break;
            case 'inviteRealName':
                obj.title = '邀请人姓名';
                obj.format = function (o, x) {
                    return o.inviteRealName;
                };
                break;
            case 'mobile':
                obj.title = '被邀请人手机号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'realName':
                obj.title = '被邀请人姓名';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'idCard':
                obj.title = '被邀请人身份证号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'investCount':
                obj.title = '有效投资人';
                obj.format = function (o, x) {
                    return x ? '是' : '否';
                };
                break;
        }
        config.push(obj);
    }
    return config;
}

function createIUserExcelFormat(arr) {
    var config = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {};
        obj.field = arr[i];
        switch (arr[i]) {
            case 'time':
                obj.title = '  注册时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'route':
                obj.title = '注册途径';
                obj.format = function (o, x) {
                    if(o.route==1){
                        return 'PC';
                    }else if(o.route==2){
                        return 'IOS';
                    }else if (o.route==3){
                        return 'Android';
                    }else if(o.route==4) {
                        return '微端';
                    }else {
                        return '其他';
                    }
                };
                break;
            case 'mobile':
                obj.title = '手机号';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'real_name':
                obj.title = '真实姓名';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'online':
                obj.title = '推广类型';
                obj.format = function (o, x) {
                    return x==0 ? '线下' : '线上';
                };
                break;
            case 'id_card':
                obj.title = '身份证号';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'level':
                obj.title = '等级';
                obj.format = function (o, x) {
                    return x == null ? "无" + "" : x + "";
                };
                break;
            case 'is_new':
                obj.title = '是否新手';
                obj.format = function (o, x) {
                   if(o.is_new){
                       return '是';
                   }
                   else
                       return '否';
                };
                break;
            case 'balance':
                obj.title = '账户余额';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'collect':
                obj.title = '待收';
                obj.format = function (o, x) {
                    return x == 0 ? 0 + "" : (o.collect_corpus + o.collect_interest).toFixed(2)+ "";
                };
                break;
            case 'freeze':
                obj.title = '冻结金额';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'score':
                obj.title = '分数';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'total_invest_amount':
                obj.title = '累计投资金额';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'total_withdraw_amount':
                obj.title = '累计提现金额';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;
            case 'total_recharge_amount':
                obj.title = '累计充值金额';
                obj.format = function (o, x) {
                    return x ==null ? 0 + "" :x + "";
                };
                break;
            case 'invest_count':
                obj.title = '投资次数';
                obj.format = function (o, x) {
                    return x == null ? 0 + "" : x + "";
                };
                break;


        }
        config.push(obj);
    }
    return config;
}