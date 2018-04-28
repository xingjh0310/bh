/**
 * Created by pwx on 2016/8/23.
 */
var biz_integral = require('../../biz/integral');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
exports.before = [session_filter.checkUser];
exports.views = {
    "ruleList": function (req, res) {
        res.render('rulelist');
    }, "recordList": function (req, res) {
        res.render('recordlist');
    }, "ruleEdit": function (req, res) {
        var id = req.param('id');
        var rule = {};
        if (id) {
            biz_integral.getRule(id, function (err, body) {
                res.render('ruleedit', {rule: body});
            });
        } else
            res.render('ruleedit', {rule: rule});
    }
}

exports.getAllRecord = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var action = req.param('action') || '';
    var isExport = eval(req.param('isExport')) || false;
    var isSendEmail = eval(req.param('isSendEmail')) || false;
    biz_integral.getRecordList(pageNo, pageSize, param, bTime, eTime, '', action, function (err, body) {
        if (isExport ||isSendEmail ){
            var fields = ['time', 'mobile', 'realName', 'action', 'number','out'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                res.json({fileName: fileName});
            })
        }else{
            return res.json(body);
        }
    })
}

exports.getAllRule = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var action = req.param('action') || '';
    biz_integral.getRuleList(pageNo, pageSize, action, '', function (err, body) {
        res.json(body);
    })
}

exports.saveRule = [cache.limit, function (req, res) {
    var rule = JSON.parse(req.param('rule') || '{}');
    rule.id = rule.id || 0;
    biz_integral.saveRule(rule, function (err, body) {
        res.json({err: err});
    })
}]

function createCashFlowExcelFormat(arr) {
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
            case 'is_completed':
                obj.title = '结果';
                obj.format = function (o, x) {
                    return x ? '成功' : '失败';
                };
                break;
            case 'productType':
                obj.title = '产品类型';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.productType, x);
                };
                break;
            case 'time':
                obj.title = '时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'pay_time':
                obj.title = '审批时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'audit_time':
                obj.title = '审批时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'gatway':
                obj.title = '充值方式';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.gatWay, x);
                };
                break;
            case 'route':
                obj.title = '充值渠道';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.route, x);
                };
                break;
            case 'inviteRealName':
                obj.title = '邀请人姓名';
                obj.format = function (o, x) {
                    return o.realName;
                };
                break;
            case 'inviteMobile':
                obj.title = '邀请人手机号';
                obj.format = function (o, x) {
                    return o.mobile;
                };
                break;
            case 'beInviteRealName':
                obj.title = '被邀请人姓名';
                obj.format = function (o, x) {
                    return o.inviteRealName;
                };
                break;
            case 'debtTitle':
                obj.title = '标的名称';
                obj.format = function (o, x) {
                    return o.title;
                };
                break;
            case 'awardRate':
                obj.title = '奖励系数';
                obj.format = function (o, x) {
                    return o.rate + '';
                };
                break;
            case 'pieceAmount':
                obj.title = '续投金额';
                obj.format = function (o, x) {
                    return x + '';
                };
                break;
            case 'bonusAmount':
                obj.title = '红包金额';
                obj.format = function (o, x) {
                    return x + '';
                };
                break;
            case 'awardAmount':
                obj.title = '奖励金额';
                obj.format = function (o, x) {
                    return o.amount + '';
                };
                break;
            case 'beInviteMobile':
                obj.title = '被邀请人手机号';
                obj.format = function (o, x) {
                    return o.inviteMobile;
                };
                break;
            case 'period':
                obj.title = '期限';
                obj.format = function (o, x) {
                    return x + com.biz.fields.getDesc(com.biz.fields.periodUnit, o.period_unit);
                };
                break;
            case 'debtPeriod':
                obj.title = '期限';
                obj.format = function (o, x) {
                    return x + com.biz.fields.getDesc(com.biz.fields.periodUnit, o.debtPeriodUnit);
                };
                break;
            case 'debtRate':
                obj.title = '预期年化';
                obj.format = function (o, x) {
                    return (x * 100).toFixed(2) + '%';
                };
                break;
            case 'buy_amount':
                obj.title = '购买金额';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'amount':
                obj.title = '金额';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;

            case 'number':
                obj.title = '收入';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'in':
                obj.title = '收入';
                obj.format = function (o, x) {
                    return (o.amount > 0 ? o.amount : 0) + '';
                };
                break;
            case 'out':
                obj.title = '支出';
                obj.format = function (o, x) {
                    return (o.amount < 0 ? o.amount : 0) + '';
                };
                break;
            case 'freeze':
                obj.title = '冻结金额';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'fundType':
                obj.title = '类型';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.fundType, o.type);
                };
                break;
            case 'balance':
                obj.title = '余额';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'order_no':
                obj.title = '流水号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'memo':
                obj.title = '备注';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'state':
                obj.title = '状态';
                obj.format = function (o, x) {
                    return x == com.biz.fields.state.Complete.v ? '成功' : '失败';
                };
                break;
            case 'investState':
                obj.title = '状态';
                obj.format = function (o, x) {
                    return (o.state == com.biz.fields.state.Complete.v || o.state == com.biz.fields.state.Wait.v) ? '成功' : '失败';
                };
                break;
            case 'audit_state':
                obj.title = '审核状态';
                obj.format = function (o, x) {
                    return x == com.biz.fields.state.Complete.v ? '成功' : '失败';
                };
                break;
            case 'pay_state':
                obj.title = '审批状态';
                obj.format = function (o, x) {
                    return x == com.biz.fields.state.Complete.v ? '成功' : '失败';
                };
                break;
            case 'mobile':
                obj.title = '手机号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'realName':
                obj.title = '姓名';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'idCard':
                obj.title = '身份证号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'cardId':
                obj.title = '银行卡号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'paySuper':
                obj.title = '审批人';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'auditSuper':
                obj.title = '审核人';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'action':
                obj.title='发放场景';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.actions, x)||''+'';
                };
                break
            default:
                obj.format = function (o, x) {
                    return x;
                };
                break;
        }
        config.push(obj);
    }
    return config;

}