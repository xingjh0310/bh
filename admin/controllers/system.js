/**
 * Created by pwx on 2016/8/1.
 */
var biz_system = require('../../biz/system');
var biz_invite = require('../../biz/invite');
var cache = require('../../biz/cache');
exports.views = {

    "seo": function (req, res) {
        biz_system.getSeo(function (err, body) {
            return  res.render('seo', {seo: body || {}});
        })
    },

    "platform": function (req, res) {
        biz_system.getPlatform(function (err, body) {
            return res.render('platform', {platform: body || {}});
        })
    },

    "invite": function (req, res) {
        biz_invite.getInvite(function (err, body) {
            return res.render('invite');
        })
    },

    editInvite:function(req,res){
        var id = req.param('id');
        var news = {};
        if (id) {
            biz_invite.getInviteSetById(id, function (err, body) {
                return res.render('editInvite',  {invite: body || {}});
            });
        } else{
            return res.render('editInvite',  {invite:{}});
        }
    },

    "params": function (req, res) {
        biz_system.getSets(function (err, body) {
            return res.render('params', {sets: body || []});
        })
    }

}

exports.savePlatform = [cache.limit, function (req, res) {
    var platform = JSON.parse(req.param('platform') || '{}');
    platform.id = platform.id || 0;
    biz_system.savePlatform(platform, function (err, body) {
        res.json({err: err});
    })
}]

exports.saveSet = [cache.limit, function (req, res) {
    var _set = JSON.parse(req.param('set') || '{}');
    _set.id = _set.id || 0;
    biz_system.saveSet(_set, function (err, body) {
        res.json({err: err});
    })
}]

exports.saveSeo = [cache.limit, function (req, res) {
    var seo = JSON.parse(req.param('seo') || '{}');
    seo.id = seo.id || 0;
    biz_system.saveSeo(seo, function (err, body) {
        res.json({err: err});
    })
}]

exports.saveInvite = [cache.limit, function (req, res) {
    var invite = JSON.parse(req.param('invite') || '{}');
    invite.id = invite.id || 0;
    biz_invite.saveInvite(invite, function (err, body) {
        res.json({err: err});
    })
}]

exports.getParamVal = function (req, res) {
    var key = req.param('key') || '';
    biz_system.getParamVal(key, function (err, body) {
        res.json({err: err,data:body});
    })
}

/**
 * 奖励配置
 * @param req
 * @param res
 */
exports.getInviteSetList=function(req,res){
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_invite.getInviteSetList(pageNo,pageSize, function (err, body) {
       return res.json(body);
    })
}