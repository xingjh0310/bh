/**
 * Created by pwx on 2016/7/27.
 */
var biz_bonus = require('../../biz/bonus');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];

exports.views = {
    "setList": function (req, res) {
        res.render('setlist');
    }, "sendList": function (req, res) {
        res.render('sendlist');
    }, "editSet": function (req, res) {
        var id = req.param('id');
        var bonusSet = {};
        if (id) {
            biz_bonus.getBonusSetById(id, function (err, body) {
                res.render('editset', {bonusSet: body});
            });
        } else
            res.render('editset', {bonusSet: bonusSet});
    }, "send": function (req, res) {
        biz_bonus.getBonusSetList(com.biz.fields.state.Complete.v, '', '', 1, 100, function (err, body) {
            res.render('send', {bonus: body.list});
        })
    }
}

exports.sendBonus = function (req, res) {
    var mobile = req.param('mobile') || '';
    var bonusId = req.param('bonusId') || '0';
    biz_bonus.sendBonus(mobile, bonusId, function (err, body) {
        res.json({err: err});
    })
}

exports.getAllBonusSet = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var state = req.param('state') || '';
    biz_bonus.getBonusSetList(state, bTime, eTime, pageNo, pageSize, function (err, body) {
        res.json(body);
    })
}


exports.getAllBonusRecord = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var state = req.param('state') || '';
    var param = req.param('param') || '';
    var isExport = eval(req.param('isExport')) || false;
    biz_bonus.getBonusRecordList(bTime, eTime, null, false, null, null, null, param, state, pageNo, pageSize,'', function (err, body) {
        if (isExport){
            var fields = ['name', 'type', 'amount', 'mobile', 'real_name', 'action', 'time', 'state'];
            var formatConfig = createBonusExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                return res.json({fileName: fileName});
            })
        }
        else {
            return res.json(body);
        }
    })
}

exports.saveBonusSet = [cache.limit, function (req, res) {
    var bonusSet = JSON.parse(req.param('bonusSet') || '{}');
    bonusSet.id = bonusSet.id || 0;
    biz_bonus.saveBonusSet(bonusSet, function (err, body) {
        res.json({err: err});
    })
}]

function createBonusExcelFormat(arr) {
    var config = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {};
        obj.field = arr[i];
        switch (arr[i]) {
            case 'name':
                obj.title = '名称';
                obj.format = function (o, x) {
                    return x||"";
                };
                break;
            case 'type':
                obj.title = '红包类型';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.bonusType,x);
                };
                break;
            case 'amount':
                obj.title = '红包金额';
                obj.format = function (o, x) {
                    return x||0;
                };
                break;
            case 'time':
                obj.title = '发放时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'mobile':
                obj.title = '手机号';
                obj.format = function (o, x) {
                    return x||'';
                };
                break;
            case 'real_name':
                obj.title = '姓名';
                obj.format = function (o, x) {
                    return x||'';
                };
                break;
            case 'action':
                obj.title = '发放来源';
                obj.format = function (o, x) {
                    return x?com.biz.fields.getDesc(com.biz.fields.actions, x): '人工发放';
                };
                break;
            case 'state':
                obj.title='状态';
                obj.format=function(o,x){
                    if (x == com.biz.fields.state.Complete.v)
                        return '已使用';
                    else {
                        if (new Date().getTime() > o.end_time)
                            return '已过期';
                        else
                            return '未使用';
                    }
                }
                break;
            default:
                obj.format = function (o, x) {
                    return x||'';
                };
                break;
        }
        config.push(obj);
    }
    return config;

}