/**
 * Created by pwx on 2016/6/30.
 */
var biz_debt = require('../../biz/debt');
var biz_account = require('../../biz/account');
var biz_user = require('../../biz/user');
var async = require('async');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
var excel = require('../../biz/excel');
var md5 = require('MD5');

exports.before = [session_filter.checkUser];
exports.views = {
    "edit": [function (req, res) {
        var id = req.param('id') || 0;
        var audit = req.param('audit') || '';
        var debt = {};
        if (id) {
            biz_debt.get(id, function (err, body) {
                if (body.state == com.biz.fields.debtState.InConfirm.v)
                    audit = 1;
                biz_user.getUserByAccountId(body.accountId, function (err, user) {
                    body.mobile = user.mobile;
                    res.render('edit', {debt: body, audit: audit});
                })
            })
        } else
            res.render('edit', {debt: debt});
    }], "auditList": function (req, res) {
        res.render('auditlist');
    }, "audit": function (req, res) {
        var id = req.param('id');
        var debt = {};
        biz_debt.get(id, function (err, body) {
            res.render('audit', {debt: body});
        })
    }, "biddingList": function (req, res) {
        res.render('biddinglist');
    }, "cancelDebt": function (req, res) {
        var id = req.param('id');
        var debt = {};
        biz_debt.get(id, function (err, body) {
            res.render('canceldebt', {debt: body});
        })
    }, "rejectList": function (req, res) {
        res.render('rejectlist');
    }, "cancelList": function (req, res) {
        res.render('cancellist');
    }, "overdueList": function (req, res) {
        res.render('overduelist');
    }, "list": function (req, res) {
        res.render('list');
    }, "paymentIngList": function (req, res) {
        res.render('paymentinglist');
    }, "paymentEndList": function (req, res) {
        res.render('paymentendlist');
    }, "paymentDetail": function (req, res) {
        var debtId = req.param('debtId') || '';
        var group = req.param('group') || '';
        var advance = req.param('advance') || 'false';
        async.waterfall([function (call) {
            biz_debt.getPaymentByDebt(debtId, group, advance, function (err, body) {
                call(null, body);
            });
        }, function (bill, call) {
            biz_account.getAccountById(bill.accountId, function (err, body) {
                call(null, $.extend(bill, body, {advance: advance}));
            })
        }], function (err, bill) {
            res.render('paymentdetail', {bill: bill});
        })
    }
}

exports.save = [cache.limit, function (req, res) {
    var debt = req.param('debt') || '{}';
    debt=JSON.parse(debt);
    if(debt && debt.debtPwd){
        debt.debtPwd=md5(debt.debtPwd + com.env.host).substring(10, 25);
    }
    if(debt && debt.increaseRate && debt.rate&&parseFloat(debt.rate)>0 && parseFloat(debt.increaseRate)>0 && parseFloat(debt.increaseRate)< parseFloat(debt.rate) ){
        debt.increaseRate=parseFloat((parseFloat(debt.increaseRate)/100).toFixed(4));
    }else{
        debt.increaseRate='';
    }
    biz_debt.save(JSON.stringify(debt), function (err, body) {
        res.json({err: err});
    })
}]


exports.audit = [cache.limit, function (req, res) {
    var id = req.param('id') || '';
    var state = req.param('type') || 0;
    var memo = req.param('memo') || '';
    biz_debt.audit(id, state, memo, function (err, body) {
        res.json({err: err});
    })
}]

exports.getAuditList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_debt.getAuditList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}

exports.getPaymentIngList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var isExport = eval(req.param('isExport')) || false;
    var isSendEmail = eval(req.param('isSendEmail')) || false;
    biz_debt.getPaymentIngList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        if (isExport || isSendEmail) {
            var fields = ['id', 'time', 'debtTitle', 'productType', 'mobile', 'realName', 'amount', 'rate', 'paymentType', 'paymentCorpus', 'paymentInterest', 'overdueFine', 'periods'];
            var formatConfig = createPayingExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                return res.json({fileName: fileName});
            })
        } else {
            return res.json(body);
        }
    })
}

exports.getPaymentEndList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var isExport = eval(req.param('isExport')) || false;
    biz_debt.getPaymentEndList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        if (!isExport){
            res.json(body);
        }else {
            var fields = ['id', 'time', 'debtTitle', 'productType', 'mobile', 'realName', 'amount', 'rate', 'paymentType', 'paymentCorpus', 'paymentInterest','realPaymentCorpus','realPaymentInterest', 'realPaymentTime','overdueFine','period','periods'];
            var formatConfig = createPayingExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                res.json({fileName: fileName});
            })
        }
    })
}

exports.getAll = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var isExport = eval(req.param('isExport')) || false;
    biz_debt.getAll(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        if (!isExport)
            res.json(body);
        else {
            var fields = ['id', 'title', 'time', 'beginTime', 'productType', 'mobile', 'realName', 'amount', 'period', 'rate','route', 'paymentType', 'state'];
            var formatConfig = createDebtExcelFormat(fields);
            excel.export(formatConfig, body.list, function (fileName) {
                res.json({fileName: fileName});
            })
        }
    })
}

function createPayingExcelFormat(arr) {
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
            case 'debtTitle':
                obj.title = '标题';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'time':
                obj.title = '应还款时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'paymentCorpus':
                obj.title = '应还本金';
                obj.format = function (o, x) {
                    return x==null?0:x+'';
                };
                break;
            case 'paymentInterest':
                obj.title = '应还利息';
                obj.format = function (o, x) {
                    return x==null?0:x+'';
                };
                break;
            case 'realPaymentCorpus':
                obj.title = '实际还款本金';
                obj.format = function (o, x) {
                    return x==null?0:x+'';
                };
                break;
            case 'realPaymentInterest':
                obj.title = '实际还款利息';
                obj.format = function (o, x) {
                    return x==null?0:x+'';
                };
                break;
            case 'realPaymentTime':
                obj.title = '实际还款时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'productType':
                obj.title = '项目类型';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.productType, x);
                };
                break;
            case 'paymentType':
                obj.title = '回款方式';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.paymentType, x);
                };
                break;
            case 'mobile':
                obj.title = '借款人';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'realName':
                obj.title = '借款人姓名';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'amount':
                obj.title = '借款金额';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'periods':
                obj.title = '本期/总期';
                obj.format = function (o, x) {
                    return o.periods+"/"+o.maxPeriods;
                };
                break;
            case 'rate':
                obj.title = ' 预期年化';
                obj.format = function (o, x) {
                    return (x * 100).toFixed(2) + '%';
                };
                break;
            case 'period':
                obj.title = '借款期限';
                obj.format = function (o, x) {
                    return x + (o.periodUnit == com.biz.fields.periodUnit.Day.v ? '天' : '个月');
                };
                break;
            case 'overdueFine':
                obj.title = ' 逾期罚息';
                obj.format = function (o, x) {
                    return x==null?0:x+'';
                };
                break;
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

function createDebtExcelFormat(arr) {
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
            case 'title':
                obj.title = '标题';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'time':
                obj.title = '创建时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'beginTime':
                obj.title = '开始时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'productType':
                obj.title = '项目类型';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.productType, x);
                };
                break;
            case 'paymentType':
                obj.title = '回款方式';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.paymentType, x);
                };
                break;
            case 'state':
                obj.title = '状态';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.debtState, x);
                };
                break;
            case 'mobile':
                obj.title = '借款人';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'realName':
                obj.title = '借款人姓名';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'amount':
                obj.title = '借款金额';
                obj.format = function (o, x) {
                    return x;
                };
                break;
            case 'period':
                obj.title = '借款期限';
                obj.format = function (o, x) {
                    return x + (o.periodUnit == com.biz.fields.periodUnit.Day.v ? '天' : '个月');
                };
                break;
            case 'rate':
                obj.title = ' 预期年化';
                obj.format = function (o, x) {
                    return (x * 100).toFixed(2) + '%';
                };
                break;
            case 'route':
                obj.title = ' 投资渠道';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.route, x);
                };
                break;
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

exports.getBidingList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_debt.getBidingList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}


exports.getRejectList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_debt.getRejectList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}

exports.getCancelList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_debt.getCancelList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}
exports.getOverdueList = function (req, res) {
    var param = req.param('param') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_debt.getOverdueList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}
exports.cancel = [cache.limit, function (req, res) {
    var id = req.param('id') || '';
    var memo = req.param('memo') || '';
    biz_debt.cancel(id, memo, function (err, body) {
        res.json({err: err});
    })
}]

exports.payment = [cache.limit, function (req, res) {
    var debtId = req.param('debtId') || 0;
    var group = req.param('group') || '';
    var advance = req.param('advance') || 'false';
    biz_debt.payment(debtId, group, advance, function (err, body) {
        res.json({err: err});
    })
}]


/**
 * 推荐标
 */
exports.recommend = [cache.limit, function (req, res) {
    var debt = req.param('debt') || '{}';
    biz_debt.recommend(debt, function (err, body) {
        return res.json({err: err});
    })
}]
