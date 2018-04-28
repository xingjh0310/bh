/**
 * Created by pwx on 2016/7/13.
 */

var biz_content = require('../../biz/content');
var session_filter = require('../filters/session-filter');
var cache = require('../../biz/cache');
var biz_debt = require('../../biz/debt');
//exports.before = [session_filter.checkUser];
exports.views = {
    "partnerList": function (req, res) {
        res.render("partnerlist");
    },
    "partnerEdit": function (req, res) {
        var id = req.param('id');
        var partner = {};
        if (id) {
            biz_content.getPartner(id, function (err, body) {
                res.render('partneredit', {partner: body});
            });
        } else
            res.render('partneredit', {partner: partner});
    },
    "adsList": function (req, res) {
        res.render("adslist");
    },
    "adsEdit": function (req, res) {
        var id = req.param('id');
        var ads = {};

        if (id) {
            biz_content.getAds(id, function (err, body) {
                biz_debt.getNotFull(function (err,debts) {
                    return  res.render('adsedit',{debt:debts,ads:body});
                });
            });
        } else{
            biz_debt.getNotFull(function (err,body) {
                return  res.render('adsedit',{debt:body,ads:ads});
            });
        }


    },
    "newsList": function (req, res) {
        res.render("newslist");
    },
    "newsEdit": function (req, res) {
        var id = req.param('id');
        var news = {};
        if (id) {
            biz_content.getNews(id, function (err, body) {
                res.render('newsedit', {news: body});
            });
        } else
            res.render('newsedit', {news: news});
    }
    ,
    "activityList": function (req, res) {
        res.render("activitylist");
    },
    "activityEdit": function (req, res) {
        var id = req.param('id');
        var activity = {};
        if (id) {
            biz_content.getActivity(id, function (err, body) {
                res.render('activityedit', {activity: body});
            });
        } else
            res.render('activityedit', {activity: activity});
    },
    "complainList": function (req, res) {
        res.render("complainList");
    }
}
exports.getAllPartner = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_content.getAllPartner(pageNo, pageSize, '', function (err, body) {
        res.json(body);
    })
}

exports.savePartner = [cache.limit, function (req, res) {
    var partner = JSON.parse(req.param('partner') || '{}');
    partner.id = partner.id || 0;
    biz_content.savePartner(partner, function (err, body) {
        res.json({err: err});
    })
}]
exports.getAllAds = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_content.getAllAds(pageNo, pageSize, '', '', function (err, body) {
        res.json(body);
    })
}

exports.saveAds = [cache.limit, function (req, res) {
    var ads = JSON.parse(req.param('ads') || '{}');
    ads.id = ads.id || 0;
    biz_content.saveAds(ads, function (err, body) {
        res.json({err: err});
    })
}]
exports.getAllNews = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    var type = req.param('type') || '';
    biz_content.getAllNews(pageNo, pageSize, '', type, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}

exports.saveNews = [cache.limit, function (req, res) {
    var news = JSON.parse(req.param('news') || '{}');
    news.id = news.id || 0;
    biz_content.saveNews(news, function (err, body) {
        res.json({err: err});
    })
}]

exports.getAllActivity = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    biz_content.getAllActivity(pageNo, pageSize, '', bTime, eTime, '', function (err, body) {
        res.json(body);
    })
}

exports.saveActivity = [cache.limit, function (req, res) {
    var activity = JSON.parse(req.param('activity') || '{}');
    activity.id = activity.id || 0;
    biz_content.saveActivity(activity, function (err, body) {
        res.json({err: err});
    })
}]

/**
 * 意见反馈列表
 * @param req
 * @param res
 */
exports.getComplainList = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var bTime = req.param('bTime') || '';
    var eTime = req.param('eTime') || '';
    var param = req.param('param') || '';
    biz_content.getComplainList(pageNo, pageSize, param, bTime, eTime, function (err, body) {
        res.json(body);
    })
}

/**
 * 意见反馈删除
 * @param req
 * @param res
 */
exports.delComplainById = function (req, res) {
    var id = req.param('id') || '';
    if (id) {
        biz_content.delComplainById(id, function (err, body) {
            res.json({err: err});
        })
    } else
        res.json({err: '主键不存在'});
}
