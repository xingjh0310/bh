
/**
 * 话费相关业务
 */
var biz_mobile = require('../../biz/mobile');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var excel = require('../../biz/excel');
var fs=require('fs');
var date = require('date.js');
var template=require('../../biz/template');

exports.before = [session_filter.checkUser];

exports.views = {
    /**
     * 初始加载未充值名单
     * @param req
     * @param res
     */
    "telfee":function (req,res) {
        res.render('telfee');
    },
    "perssonfeeDetail": function (req, res) {
        var id = req.param('id') || '';
        var fee = req.param('fee') || '';
        biz_mobile.getInfoById(id, function (err, body) {
            body.telFee=fee;
            res.render('perssonfeedetail',{telfee:body});
        });


    }


}
/**
 * 根据类型获取相应的信息
 * @param req
 * @param res
 */
exports.getTelFeeListByType = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var sTime = req.param('sTime') || '';
    var eTime = req.param('eTime') || '';
    var key = req.param('key') || '';
    var type = req.param('type') || '';
    biz_mobile.getListBystatus(pageNo, pageSize,sTime,eTime,key,type,function (err,body) {
        for(var i=0;i<body.list.length;i++){
            body.list[i].checkMan = body.list[i].checkMan == null ? '': body.list[i].checkMan;
            body.list[i].orderId  = body.list[i].orderId == null ? '' : body.list[i].orderId;
            body.list[i].telFee   = body.list[i].telFee == null ?  '' : body.list[i].telFee;
            body.list[i].status   = body.list[i].status == null ? '' : body.list[i].status;
        }
        return res.json(body);
    })
}

/**
 * 开始该笔订单的充值
 * @param req
 * @param res
 */
exports.startOrder = function (req, res) {
    var adminuser = req.session['user'];
    var name=adminuser.realName;
    var id = req.param('id');
    var telfee = req.param('telfee');
    biz_mobile.getstartOrder(id,telfee,name,function (err,body) {
        return res.json(body);
    })
}

exports.tovoid=function (req,res) {
    var adminuser = req.session['user'];
    var adminname=adminuser.realName;
    var id = req.param('id');
    biz_mobile.gettovoid(id,adminname,function (err,body) {
        return res.json(body);
    })
}

