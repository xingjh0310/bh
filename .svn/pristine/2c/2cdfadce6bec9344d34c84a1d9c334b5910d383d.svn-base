/**
 * Created by pwx on 2016/9/26.
 */

var biz_content = require('../../biz/content');
var async = require('async');
var biz_user = require('../../biz/user');

var appSessionFilter = require('../filters/app-sessionid-filter');
exports.before = [appSessionFilter.verifySignature];


exports.v1_get_ads = function (req, res) {
    var clientId = req.param('clientId') || "";
    var route = res.locals.route;
    var sessionId = req.param('sessionid') || '';
    async.waterfall([function(next){
        if(clientId != "" && sessionId == ''){
            biz_user.saveAppClient(clientId,0,route,function(err,body){
                next(null);
            });
        }else{
            next(null);
        }
    }],function(err,data){
        biz_content.getAllAds(1, 100, com.biz.fields.state.Complete.v, com.biz.fields.showType.APP.v, function (err, body) {
            async.map(body.list, function (item, call) {
                item.img = com.env.static_url + item.img;
                call(null, item);
            }, function (err, result) {
                body.list = result;
                res.json(body);
            });
        });
    })
}

exports.v1_get_informs = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('size') || 10;
    var type = req.param('type') || 0;
    biz_content.getAllNews(pn, ps, com.biz.fields.state.Complete.v, type, '', '', '', function (err, body) {
        async.map(body.list, function (item, call) {
            //delete item.content;
            item.img = com.env.static_url + item.img;
            call(null, item);
        }, function (err, result) {
            body.list = result;
            res.json(body);
        });
    })

}


exports.v1_get_activity = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('size') || 10;
    var isExpiry = req.param('isExpiry') == 'true' ? true : false;
    biz_content.getAllActivity(pn, ps, com.biz.fields.state.Complete.v, '', '', com.biz.fields.showType.APP.v, function (err, body) {
        var list = [];
        async.map(body.list, function (item, call) {
            item.img = com.env.static_url + item.img;
            item.isExpiry = item.endTime < new Date().getTime() ? true : false;
            if (isExpiry) {
                if (item.endTime > new Date().getTime()) {
                    list.push(item);
                }
            }
            else
                list.push(item);
            call(null, null);
        }, function (err, result) {
            body.list = list;
            res.json(body);
        });
    })
}

exports.v1_get_platform = function (req, res) {
    res.json({code: 1, message: '', data: com.env.platform});
}
//老用户版本更新
exports.v1_get_version=function(req,res){
    biz_content.getNewestApp(function (err, body) {
        if(body) {
            res.json({
                verSion: body.verSion,
                content:body.content,
                downloadUrl : body.downloadUrl
            });
        }else {
            return res.json({
                verSion:2,
                content:'',
                downloadUrl: com.env.cdn_url+'/wap/download/app.apk'
            });
        }
    })
}

//新用户版本更新
exports.v1_get_new_version=function(req,res){
    var type = req.param("type");
    biz_content.getNewestAppByType(type,function (err, body) {
        if(body) {
            res.json({
                verSion: body.verSion,
                content:body.content,
                downloadUrl : body.downloadUrl,
                isForce : body.isForce,
                versionName:body.versionName,
                message:"返回成功",
                code:1
            });
        }else {
            return res.json({
                verSion:2,
                content:'',
                downloadUrl: com.env.cdn_url+'/wap/download/app.apk',
                isForce : 0,
                message:"返回失败",
                code:-1
            });
        }
    })
}