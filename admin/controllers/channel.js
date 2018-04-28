/**
 * Created by Administrator on 2017/1/16.
 */
var biz_channel = require('../../biz/channel');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
exports.before = [session_filter.checkUser];
exports.views = {
    "channelct": function (req, res) {
        return res.render("channelct");
    },
    "channelspread": function (req, res) {
        var id =req.param("id") || 0;
        var channelSp = {};
        if(id){
            biz_channel.get(id, function (err, body) {
                return res.render('channelspread', {channelSp: body,hostname:com.env.host+"/register",download:"http://qiniu.bohomm.com/"});
            })
        } else{
            return res.render('channelspread', {channelSp:channelSp,hostname:com.env.host+"/register",download:"http://qiniu.bohomm.com/"});
        }
    },
    "channelSpreadList": function (req, res) {
        return res.render("channelSpreadList");
    }
}

exports.getChannelCt = function (req, res) {
    var isExport = eval(req.param('isExport')) || false;
    var sTime = req.param('sTime') || '';
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var channelTy = req.param('channelTy') || 1;
    if (sTime == null||sTime=='') {
        sTime = new Date().Format('yyyy-MM-dd')
    }
    if(channelTy==1){
        return res.json({list:[]});
    }
    biz_channel.getChannelcount(sTime,bTime, eTime, channelTy, function (err, body) {
        if (!isExport)
            return res.json(body);
        else {
            var fields = ['channelName', 'todayRegister', 'todayRealName', 'todayBindCard', 'todayRechargeNum', 'todayTradeNum', 'todayRecharge', 'todayTrade', 'todayWithdraw','waitReceive', 'totalRegister', 'totalRealName', 'totalBindCard', 'totalRechargeNum', 'totalTradeNum','totalRecharge','totalTrade','totalWithdraw'];
            var formatConfig = createChannelExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName) {
                return res.json({fileName: fileName});
            })
        }
    })
}

/**
 * 渠道推广
 * @param req
 * @param res
 */
exports.saveChannel = function (req, res) {
    var channelSp = JSON.parse(req.param('channelSp') || '{}');
    channelSp.id = channelSp.id || '';
    biz_channel.Channelsave(channelSp,function (err, body) {
        res.json(body);
    })
}

/**
 * 渠道推广列表
 * @param req
 * @param res
 */
exports.getSpreadList = function (req, res) {
    var isExport = eval(req.param('isExport')) || false;
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    biz_channel.getSpreadchannList(pageNo, pageSize, bTime,eTime,function (err, body) {
        if (!isExport)
            res.json(body);
        else {
            var fields = ['id', 'time','channelName', 'registerAdr', 'downloadAdr'];
            var formatConfig = createChannelListExcelFormat(fields);
            excel.newExport(formatConfig, body.list, function (err,fileName)  {
                res.json({fileName: fileName});
            })
        }
    })
}

function createChannelListExcelFormat(arr) {
    var config = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {};
        obj.field = arr[i];
        switch (arr[i]) {
            case 'id':
                obj.title = '序号';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'time':
                obj.title = '添加时间';
                obj.format = function (o, x) {
                    return new Date(x).Format('yyyy-MM-dd hh:mm');
                };
                break;
            case 'channel_name':
                obj.title = '渠道名称';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'register_adr':
                obj.title = '注册地址';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'download_adr':
                obj.title = '注册地址';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
        }
        config.push(obj);
    }
    return config;
}

function createChannelExcelFormat(arr) {
    var config = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {};
        obj.field = arr[i];
        switch (arr[i]) {
            case 'channelName':
                obj.title = '渠道';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayRegister':
                obj.title = '单日注册用户数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayRealName':
                obj.title = '单日实名用户数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayBindCard':
                obj.title = '单日绑卡用户数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayRechargeNum':
                obj.title = '单日充值用户数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayTradeNum':
                obj.title = '单日交易用户数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayRecharge':
                obj.title = '单日充值金额';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayTrade':
                obj.title = '单日交易金额';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'todayWithdraw':
                obj.title = '单日提现金额';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;



            case 'totalRegister':
                obj.title = '累计注册人数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalRealName':
                obj.title = '累计实名人数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalBindCard':
                obj.title = '累计绑卡人数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalRechargeNum':
                obj.title = '累计充值人数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalTradeNum':
                obj.title = '累计交易人数';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalRecharge':
                obj.title = '累计充值金额';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalTrade':
                obj.title = '累计交易金额';
                obj.format = function (o, x) {
                    return x == null ? 0  : x;
                };
                break;
            case 'totalWithdraw':
                obj.title = '累计提现金额';
                obj.format = function (o, x) {
                    return x == null ? 0 : x;
                };
                break;
            case 'waitReceive':
                obj.title = '待收金额';
                obj.format = function (o, x) {
                    return x == 0 ? 0 : (o.paymentCorpus+o.paymentInterest) ;
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

/**
 * 获取所有渠道列表
 * @param req
 * @param res
 */
exports.getChannelList=function(req,res){
    cache.getChannelList(function(err,list){
        return res.json({err:err,list:list});
    })
}