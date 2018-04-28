/**
 * Created by pwx on 2016/9/19.
 */
var biz_debt = require('../../biz/debt');
var async = require('async');
var biz_common = require('../../biz/common');
var appSessionFilter = require('../filters/app-sessionid-filter');
var biz_account = require('../../biz/account');
exports.before = [appSessionFilter.verifySignature];



exports.v1_get_debts = function (req, res) {
    var pn = req.param("pn") || 1;
    var size = req.param("size") || 10;
    var type = req.param("type") || '0';
    var novice = req.param("novice") || 0;
    biz_debt.getInList(pn, size, type, novice, function (err, body) {
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].newProduct= body.list[i].productType == 5 ? "1":"0"
            }
        }
        async.map(body.list, function (item, call) {
            item = debt_format(item);
            call(null, item);
        }, function (err, result) {
            body.list = result;
            res.json(body);
        });
    })
}

/**
 * 获取首页项目  2.0 之前的
 * @param req
 * @param res
 */
/*exports.v1_get_home_debts = function (req, res) {
    var fields = com.biz.fields;
    var investPeriodtype = req.param("investPeriodtype") || 0;
    var isCustomization = req.param("isCustomization") || 0;
    var state = req.param("state") || 5;
    var limit = req.param("limit") || 2;
    biz_debt.selectHomeBiding(investPeriodtype, isCustomization, state, limit, function (err, body) {
        if(body  && body instanceof  Array){
            for(var i=0;i<body.length;i++ ){
                if(body[i]){
                    body[i].newProduct= body[i].productType == 5 ? "1":"0"
                    body[i].stateN = fields.getDesc(fields.debtType,body[i].state);
                    if(body[i].isNew==1 && body[i].state==5){
                        body[i].debtType = 1;
                    }else if(body[i].investPeriodType==1 &&  body[i].state==5){
                        body[i].debtType = 1;
                    }else if( body[i].state>5){
                        body[i].debtType=5
                    }else if(body[i].debtPwd &&  body[i].state==5){
                        body[i].debtType=4
                    }else{
                        body[i].debtType=2
                    }
                }
            }
        }
        async.map(body, function (item, call) {
            item = debt_format(item);
            call(null, item);
        }, function (err, result) {
            body = result;
            res.json({message: "", total: 2, pagesize: 2, list:body,code:1,pageno:1});
        });
    })
}*/
/**
 * 获取首页项目 2018 04 18 修改  APP页面展示 标的类型
 * @param req
 * @param res
 */
exports.v1_get_home_debts = function (req, res) {
    var fields = com.biz.fields;
    var investPeriodtype = req.param("investPeriodtype") || 0;
    var isCustomization = req.param("isCustomization") || 0;
    var state = req.param("state") || 5;
    var limit = req.param("limit") || 3;
    var accountId  = req.param("accountId")||'';
    biz_debt.selectHomeBidingupdatge(investPeriodtype, isCustomization, state, limit,accountId, function (err, body) {
        if(body  && body instanceof  Array){
            for(var i=0;i<body.length;i++ ){
                if(body[i]){
                    body[i].newProduct= body[i].productType == 5 ? "1":"0"
                    body[i].stateN = fields.getDesc(fields.debtType,body[i].state);
                    if(body[i].isNew==1 && body[i].state==5){
                        body[i].debtType = 1;
                    }else if(body[i].investPeriodType==1 &&  body[i].state==5){
                        body[i].debtType = 3;
                    }else if( body[i].state>5){
                        body[i].debtType=5
                    }else if(body[i].debtPwd &&  body[i].state==5){
                        body[i].debtType=4
                    }else{
                        body[i].debtType=2
                    }
                }
            }
        }
        async.map(body, function (item, call) {
            item = debt_format(item);
            call(null, item);
        }, function (err, result) {
            body = result;
            res.json({message: "", total: 2, pagesize: 2, list:body,code:1,pageno:1});
        });
    })
}



/**
 * 获取列表页项目
 * @param req
 * @param res
 */
exports.v1_get_debtList = function (req, res) {
    var pn = req.param("pn") || 1;
    var size = req.param("size") || 20;
    var product = req.param("productType") || '0';
    biz_debt.getListBidingService(pn, size, product, function (err, body) {
        if(body && body.list && body.list instanceof  Array){
            for(var i=0;i<body.list.length;i++ ){
                body.list[i].newProduct= body.list[i].productType == 5 ? "1":"0"
            }
        }
        async.map(body.list, function (item, call) {
            item = debt_format(item);
            call(null, item);
        }, function (err, result) {
            body.list = result;
            res.json(body);
        });
    })
}


exports.v1_get_debtInvests = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('size') || 10;
    var debtId = req.param('debtId') || '';
    biz_debt.getInvests(pn, ps, debtId, '', '', '', 0,'', '',function (err, body) {
        for (var i = 0; i < body.list.length; i++) {
            body.list[i].stateN = body.list[i].state == com.biz.fields.state.Complete.v ? '成功' : '失败';
            body.list[i].mobile = body.list[i].mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
        }
        res.json(body);
    })
}

exports.v1_get_product_type = function (req, res) {

    var list = [];
    var productTypes = com.biz.fields.productType;

    for (var key in productTypes) {
        list.push(productTypes[key]);
    }
    res.json({message: '', code: 1, data: list});
}

exports.v1_get_novice = function (req, res) {
    biz_debt.getNoviceDebt(2, function (err, body) {
        if(body  && body instanceof  Array){
            for(var i=0;i<body.length;i++ ){
                if(body[i].state > 5){
                    (body).splice(i,1);
                }
                if(body[i]) {
                    body[i].newProduct = body[i].productType == 5 ? "1" : "0"
                }
            }
        }
        async.map(body, function (item, call) {
            item = debt_format(item);
            call(null, item);
        }, function (err, result) {
            body.list = result;
            res.json({message: '', code: 1, list: body});
        });
    })
}

exports.v1_get_debt = function (req, res) {
    var id = req.param('id');
    biz_debt.get(id, function (err, body) {
        res.json({message: '', code: 1, data: debt_format(body)});
    })
}

exports.v1_get_expect = function (req, res) {
    var id = req.param('id') || 0;
    var amount = req.param('amount') || 0;
    biz_debt.getExpect(id, amount, function (err, body) {
        res.json({message: '', code: 1, data: body});
    })
}

exports.v1_get_sortInvest = function (req, res) {
    var result = {};
    biz_common.getSortInvest(20, function (err, body) {
        for (var key in body) {
            var arr = JSON.parse(body[key]);
            result[key] = [];
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                if(obj.mobile != null && obj.mobile != ''){
                    obj.mobile = obj.mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3");
                }
                obj.head_img = obj.head_img ? com.env.static_url + obj.head_img : '';
                result[key].push(obj);
            }
        }
        res.json({message: '', code: 1, data: result});
    })
}

exports.v1_get_total = function (req, res) {
    biz_common.getTotal(function (err, body) {
        body.totalRegister = body.totalRegister || 0;
        body.totalInvest = body.totalInvest || 0;
        body.totalInterest = body.totalInterest || 0;
        body.totalDebt = body.totalDebt || 0;
        body.totalDebtAmount = body.totalDebtAmount || 0;
        body.totalWaitPaymentAmount = body.totalWaitPaymentAmount || 0;
        body.todayInvest = body.todayInvest || 0;
        body.startRate = ((body.startRate || 0) * 100).toFixed(2);
        body.endRate = ((body.endRate || 0) * 100).toFixed(2);
        res.json({message: '', code: 1, data: body});
    })
}

var debt_format = function (debt) {
    var fields = com.biz.fields;
    if (debt) {
        debt.productTypeN = fields.getDesc(fields.productType, debt.productType);
        debt.interestTypeN = fields.getDesc(fields.interestType, debt.interestType);
        debt.periodUnitN = debt.periodUnit == fields.periodUnit.Month.v ? '个月' : '天';
        debt.paymentTypeN = fields.getDesc(fields.paymentType, debt.paymentType);
        debt.awardTypeN = fields.getDesc(fields.awardType, debt.awardType);
        debt.stateN = debt.state == com.biz.fields.debtState.Overdue.v ? com.biz.fields.debtState.InPayment.desc : fields.getDesc(fields.debtState, debt.state);
        debt.rate = (debt.rate * 100).toFixed(2);
        debt.isFullinvestAward=(new Date() > new Date('2017/12/31 23:59:59'))?1:0;
        debt.host=com.env.host;
        debt.currentTime=new Date().getTime();
        if( debt.increaseRate && parseFloat(debt.increaseRate)>0 && parseFloat(debt.increaseRate)<debt.rate){
            debt.increaseRate=parseFloat((parseFloat(debt.increaseRate)*100).toFixed(2));
        }else{
            debt.increaseRate=0;
        }
        debt.isSendFullinvestAward=(debt.amount==debt.investedAmount && new Date() > new Date('2017/12/31 23:59:59') && !debt.isCut)?1:0;
        if (debt.awardType == fields.awardType.Scale.v)
            debt.awardNumber = (debt.awardNumber * 100).toFixed(2);
        if (debt.imgFiles) {
            var arr = debt.imgFiles.split('|');
            async.map(arr, function (item, call) {
                item = com.env.static_url + item;
                call(null, item);
            }, function (err, result) {
                debt.imgFiles = result;
            });
        } else {
            debt.imgFiles = [];
        }
        return debt;
    } else
        return debt;
}