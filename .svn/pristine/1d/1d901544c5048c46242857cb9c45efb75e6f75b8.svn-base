/**
 * 资金相关业务
 */
var biz_account = require('../../biz/account');
var biz_user = require('../../biz/user');
var biz_invite = require('../../biz/invite');
var biz_debt = require('../../biz/debt');
var biz_recharge = require('../../biz/recharge');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
var fs=require('fs');
var date = require('date.js');
var template=require('../../biz/template');

exports.before = [session_filter.checkUser];

exports.views = {

    "lineRecharge": function (req, res) {
        return res.render("linerecharge");
    },

    "rechargeList": function (req, res) {
        return res.render("rechargelist");
    },

    "cashFlowList": function (req, res) {
        return res.render("cashflowlist");
    },

    "lineDebit": function (req, res) {
        return res.render("linedebit");
    },

    "bankCardList": function (req, res) {
        return res.render("bankcardlist");
    },

    "auditWithdrawList": function (req, res) {
        return res.render("auditwithdrawlist");
    },

    "alreadyAuditWithdraw": function (req, res) {
        return res.render('alreadyauditwithdraw');
    },

    "auditWithdraw": function (req, res) {
        var id=req.param('id')||'';
        biz_account.getWithdraw(id,function(err,body){
            return res.render('auditwithdraw',{withdraw:body});
        })
    },

    "approve": function (req, res) {
        var id=req.param('id')||'';
        biz_account.getWithdraw(id,function(err,body){
            return res.render('approve',{withdraw:body});
        })
    },

    "payWithdraw": function (req, res) {
        return res.render('paywithdraw');
    },

    "borrowerList": function (req, res) {
        return res.render('borrowerlist');
    },

    "borrowerEdit": function (req, res) {
        var id = req.param('id');
        var borrower = {};
        if (id) {
            biz_user.getUserById(id, function (err, body) {
                return res.render('borroweredit', {borrower: body.user});
            });
        } else{
            return res.render('borroweredit', {borrower: borrower});
        }
    },

    "invite": function (req, res) {
        return res.render('invite');
    },

    "invests": function (req, res) {
        return res.render('invests');
    },

    "editBankCard": function (req, res) {
        var id = req.param('id');
        var bankCard = {};
        if (id) {
            biz_account.getAccountBankCard(id, function (err, body) {
                return res.render('editbankcard', {bankCard: body});
            });
        } else{
             return res.render('editbankcard', {bankCard: bankCard});
        }
    },

    "bindcard":function(req,res){
        return res.render('bindcard');
    },

    "downloadProtocol": function (req, res) {
        var name = req.param("name") || '';
        if (name) {
            var path = com.env.protocol_path + name + '.pdf';
            fs.exists(path, function (exists) {
                if (exists) {
                    return res.download(path, "借款协议.pdf");
                }
                else
                    return res.send('协议还没生成.');
            })
        }
    },

    "exportConfig":function(req,res){
        var id=req.param('id')||'';
        if(id){
            template.getExport(id,function(err,model){
                return res.render('exportConfig',{model:model?model:{}});
            })
        }else{
            return res.render('exportConfig',{model:{}});
        }
    },

    export:function(req,res){
        return res.render('exportList');
    }
}

exports.saveBankCard = function (req, res) {
    var bankCard = req.param('bankCard') || '{}';
    biz_account.saveBankCardById(bankCard, function (err, body) {
        return res.json({err: err});
    })
}

exports.completeOrder = function (req, res) {
    var orderNo = req.param('orderNo') || '';
    if (orderNo) {
        biz_recharge.completeOrder(orderNo, function (err, body) {
            return  res.json({err: err});
        })
    } else{
        return  res.json({err: '订单号不存在'});
    }
}

exports.getInvests = function (req, res) {
    var pn = req.param('pageNo') || 1;
    var ps = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var route = req.param('route') || '';
    var invite = req.param('invite') || '';
    var isExport = eval(req.param('isExport')) || false;
    biz_debt.getInvests(pn, ps, '', '', bTime, eTime,route, param,invite, function (err, body) {
        if(body && body.list&& body.list.length>0){
            for(var i=0;i<body.list.length;i++){
                body.list[i].lastpayment=body.list[i].debtPeriodUnit == com.biz.fields.periodUnit.Day.v ? new Date(new Date(body.list[i].time).getTime() +body.list[i].debtPeriod * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd') : date((body.list[i].debtPeriod+' months'), new Date(body.list[i].time)).Format('yyyy-MM-dd');
                body.list[i].interest = body.list[i].debtPeriodUnit == com.biz.fields.periodUnit.Day.v ? (body.list[i].debtRate / 365 * body.list[i].debtPeriod * body.list[i].amount).toFixed(2) : (body.list[i].debtRate / 12 * body.list[i].debtPeriod * body.list[i].amount).toFixed(2);
            }
        }
        if (!isExport)
           return res.json(body);
        else {
            var fields = ['time','lastpayment', 'mobile', 'realName','online','invite_mobile','invite_name', 'debtTitle', 'productType', 'debtPeriod', 'debtRate', 'amount', 'pieceAmount','route','bonusAmount', 'investState'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.export(formatConfig, body.list, function (fileName) {
                return res.json({fileName: fileName});
            })
        }
    })
}

exports.getAllInviteAward = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var isExport = eval(req.param('isExport')) || false;
    var isSendEmail = eval(req.param('isSendEmail')) || false;
    biz_invite.getAllInviteAward(pageNo, pageSize, param, bTime, eTime, '', function (err, body) {
        if (isExport || isSendEmail){
            var fields = ['time', 'inviteRealName', 'inviteMobile', 'beInviteRealName', 'beInviteMobile', 'buy_amount', 'debtTitle', 'awardRate', 'awardAmount'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                return res.json({fileName: fileName});
            })
        }
        else {
            return res.json(body);
        }
    })
}

exports.saveLineRecharge =function (req, res) {
    var mobile = req.param('mobile') || '';
    var amount = req.param('amount') || '0';
    var memo = req.param('memo') || '';
    biz_account.saveLineRecharge(mobile, amount, memo, function (err, body) {
        return res.json({err: err});
    })
}

exports.saveBorrower = function (req, res) {
    var borrower = JSON.parse(req.param('borrower') || '{}');
    var user = {
        mobile: borrower.mobile,
        password: '123456',
        channel: com.biz.fields.route.PC.v,
        type: com.biz.fields.accountType.Borrower.v,
        realName: borrower.realName,
        idCard: borrower.idCard,
        legalName: borrower.legalName,
        legalIdNo: borrower.legalIdNo,
        userNature: borrower.userNature,
        id: borrower.id || 0
    }
    biz_user.save(user, function (err, body) {
        return res.json({err: err});
    })
}

exports.auditWithdraw =  function (req, res) {
    var user = res.locals.user || {};
    var id = req.param('id') || 0;
    var state = req.param('state') || '0';
    var memo = req.param('memo') || '';
    var fee = req.param('fee') || '';
    var otherFee = req.param('otherFee') || '';
    var noInvestedFee = req.param('noInvestedFee') || '';
    biz_account.auditWithdraw(id, user.id, state, memo, fee,otherFee,noInvestedFee,function (err, body) {
        return res.json({err: err});
    })
}

exports.payWithdraw =function (req, res) {
    var user = res.locals.user || {};
    var id = req.param('id') || 0;
    var state = req.param('state') || '0';
    var memo = req.param('memo') || '';
    biz_account.payWithdraw(id, user.id, state,memo, function (err, body) {
        return res.json({err: err});
    })
}

exports.saveLineDebit =function (req, res) {
    var mobile = req.param('mobile') || '';
    var amount = req.param('amount') || '0';
    var memo = req.param('memo') || '';
    biz_account.saveLineDebit(mobile, amount, memo, function (err, body) {
        res.json({err: err});
    })
}

exports.getAuditWithdrawList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var state = req.param('state') || '';
    var route =req.param('route') || 0;
    biz_account.getWithdrawList(0, bTime, eTime, param, state,'',route, pageNo, pageSize,'','',function (err, body) {
         return res.json(body);
    })
}

exports.getAlreadyAuditWithdrawList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var state = req.param('state') || '';
    var isExport = eval(req.param('isExport')) || false;
    var route =req.param('route') || 0;
    biz_account.getWithdrawList(0, '', '', param, com.biz.fields.state.Complete.v, state,route, pageNo, pageSize,bTime ,eTime,function (err, body) {
        if (!isExport)
            return res.json(body);
        else {
            var fields = ['time', 'mobile', 'realName', 'idCard','bankMobile', 'amount','arrive_amount','no_invested_fee','bank', 'cardId','province','city','branch', 'audit_time', 'auditSuper', 'memo', 'pay_time', 'paySuper', 'pay_state'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                return res.json({fileName: fileName});
            })
        }
    })
}

exports.getCashFlowList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var type = req.param('type') || '0';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var isExport = eval(req.param('isExport')) || false;
    biz_account.getCashFlowList(0, bTime, eTime, param, type, pageNo, pageSize, function (err, body) {
        if (!isExport)
            return res.json(body);
        else {
            var fields = ['time', 'mobile', 'realName', 'idCard', 'fundType', 'in', 'out', 'balance', 'memo'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.export(formatConfig, body.list, function (fileName) {
                return res.json({fileName: fileName});
            })
        }
    })
}

exports.getBorrowerList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_user.getUserList(pageNo, pageSize, param, bTime, eTime,-1, com.biz.fields.accountType.Borrower.v, function (err, body) {
        return  res.json(body);
    })
}

exports.getRechargeList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var gatWay = req.param('gatWay') || '';
    var memo = req.param('memo') || '';
    var route = req.param('route') || 0;
    var bAmount = req.param('bAmount') || '';
    var eAmount = req.param('eAmount') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var state=req.param('state')||'';
    var isExport = eval(req.param('isExport')) || false;
    biz_account.getRechargeList(0,bTime, eTime, param, gatWay, memo, bAmount, eAmount, pageNo, pageSize,route,state, function (err, body) {
        if (!isExport)
            return res.json(body);
        else {
            var fields = ['id', 'order_no', 'mobile', 'realName', 'gatway','route', 'amount', 'balance', 'is_completed', 'memo', 'time'];
            var formatConfig = createCashFlowExcelFormat(fields);
            excel.export(formatConfig, body.list, function (fileName) {
                return res.json({fileName: fileName});
            })
        }
    })
}

exports.getBankCardList = function (req, res) {
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_account.getBankCardList('', bTime, eTime, param, pageNo, pageSize, function (err, body) {
        return res.json(body);
    })
}

 /**
  * 绑卡
  * @param req
  * @param res
 */
exports.bindCard=function(req,res){
    var bankCard = req.param('bankCard') || '{}';
    biz_account.saveBankCardByAdmin(JSON.parse(bankCard), function (err, body) {
        return res.json({err: err});
    })
}

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
            case 'arrive_amount':
                obj.title = '到账金额';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'online':
                obj.title = '推广类型';
                obj.format = function (o, x) {
                    return x==0 ? '线下' : '线上';
                };
                break;
            case 'no_invested_fee':
                obj.title = '未理财扣除手续费';
                obj.format = function (o, x) {
                    return (x || 0) + "";
                };
                break;
            case 'time':
                obj.title = '时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'lastpayment':
                obj.title = '预期还款时间';
                obj.format = function (o, x) {
                    return x?new Date(x).Format('yyyy-MM-dd'):'';
                };
                break;
            case 'pay_time':
                obj.title = '审批时间';
                obj.format = function (o, x) {
                    return x?new Date(x).Format('yyyy-MM-dd hh:mm'):'';
                };
                break;
            case 'audit_time':
                obj.title = '审核时间';
                obj.format = function (o, x) {
                    return x?new Date(x).Format('yyyy-MM-dd hh:mm'):'';
                };
                break;
            case 'gatway':
                obj.title = '充值方式';
                obj.format = function (o, x) {
                    return com.biz.fields.getDesc(com.biz.fields.gatWay, x);
                };
                break;
            case 'route':
                obj.title = '渠道';
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
                    if(x==com.biz.fields.state.Complete.v){
                        return '已审核'
                    }else if( x == com.biz.fields.state.Wait.v ){
                        return '未审核'
                    }else{
                        return '审核不通过'
                    }
                };
                break;
            case 'pay_state':
                obj.title = '审批状态';
                obj.format = function (o, x) {
                    if(x==com.biz.fields.state.Complete.v){
                        return '已审批'
                    }else if( x == com.biz.fields.state.Wait.v ){
                        return '未审批'
                    }else{
                        return '审批不通过'
                    }

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
            case 'bankMobile':
                obj.title = '预留手机号';
                obj.format = function (o, x) {
                    return x + "";
                };
                break;
            case 'cardId':
                obj.title = '银行卡号';
                obj.format = function (o, x) {
                    return x||'' + "";
                };
                break;
            case 'paySuper':
                obj.title = '审批人';
                obj.format = function (o, x) {
                    return x||"" + "";
                };
                break;
            case 'auditSuper':
                obj.title = '审核人';
                obj.format = function (o, x) {
                    return x||'' + "";
                };
                break;
            case 'branch':
                obj.title = '支行';
                obj.format = function (o, x) {
                    return x||"" + "";
                };
                break;
            case 'province':
                obj.title = '省';
                obj.format = function (o, x) {
                    return x||'' + "";
                };
                break;
            case 'city':
                obj.title = '市';
                obj.format = function (o, x) {
                    return x||'' + "";
                };
                break;
            case 'invite_mobile':
                obj.title = '邀请人手机号';
                obj.format = function (o, x) {
                    return x||'';
                };
                break;
            case 'invite_name':
                obj.title = '邀请人';
                obj.format = function (o, x) {
                    return x||'';
                };
                break;
            case 'bank':
                obj.title = '开户行';
                obj.format = function (o, x) {
                    if(x){
                        return (com.biz.bank[x] && com.biz.bank[x].desc)?com.biz.bank[x].desc:''
                    }else{
                        return "";
                    }
                };
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





