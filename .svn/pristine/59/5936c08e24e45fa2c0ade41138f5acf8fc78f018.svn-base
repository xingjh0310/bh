/**
 * 个推记录
 * @author zp
 * @since 2017年2月20日
 *
 */
var biz_appManager = require('../../biz/appManager');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];
exports.views = {

    "getAppPushMessageList": function (req, res) {
        return res.render("appPushMessageList");
    },

    "appPushMessage": function (req, res) {
        return res.render("appPushMessage");
    },

    "appUpload": function (req, res) {
        return res.render("appUpload");
    },

    "appUploadList": function (req, res) {
        return res.render("appUploadList");
    },

    "selectUser": function (req, res) {
        var mobiles = req.param('mobiles');
        if(!mobiles){
            mobiles = {};
        }
        return res.render('selectUser', {mobiles: mobiles});
    }

}

/**
 * 个推记录列表
 * @param req
 * @param res
 */
exports.getAppPushMessageList = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    biz_appManager.getAppPushMessageList(pageNo, pageSize, bTime, eTime, function (err, body) {
        return res.json(body);
    })
}

/**
 * 上传列表
 * @param req
 * @param res
 */
exports.getAppUploadList = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    biz_appManager.getAppUploadList(pageNo, pageSize, function (err, body) {
        return res.json(body);
    })
}

/**
 * app上传
 * @param req
 * @param res
 */
exports.appUpload = function (req, res) {
    var appUpload = JSON.parse(req.param('appUpload') || '{}');
    appUpload.id = appUpload.id || 0;
    biz_appManager.appUpload(appUpload,function (err, body) {
        return res.json(body);
    })
}

/**
 * 消息推送
 */
exports.saveAppPushMessage = [cache.limit, function (req, res) {
    var appPushMessage = JSON.parse(req.param('appPushMessage') || '{}');
    appPushMessage.id = appPushMessage.id || 0;
    biz_appManager.appPushMessage(appPushMessage, function (err, body) {
        return res.json({err: err});
    })
}]