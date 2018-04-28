/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
var biz_content = require('../../biz/content');
var biz_common = require('../../biz/common');
exports.before = [session_filter.getUser];
exports.views = {
    "/aboutus": function (req, res) {
        res.render('index');
    },
    "team": function (req, res) {
        res.render('team');
    },
    "contact": function (req, res) {
        res.render('contact');
    },
    "platformData": function (req, res) {
        biz_common.getTotal(function (err, body) {
            res.render('platformData', {total: body});
        })
    },
    "announcement": [{path: /\/announcement\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        biz_content.getNews(id, function (err, body) {
            res.render('announcement', {news: body});
        })
    }],
    "announce_list": function (req, res) {
        res.render('announce_list');
    },
    "news_list": function (req, res) {
        res.render('news_list');
    },
    "news_more": function (req, res) {
        res.render('news_more');
    },
    "news":[{path: /\/news\/(\d+)/}, function (req, res) {
        var id = req.params[0];
        biz_content.getNews(id, function (err, body) {
            res.render('news', {news: body});
        })
    }]

}


exports.getAnnouncelist = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 20;
    biz_content.getAllNews(pn, ps, com.biz.fields.state.Complete.v, com.biz.fields.newsType.Notice.v, '', '', '', function (err, body) {
        res.json(body);
    })
}

exports.getNewslist = function (req, res) {
    var pn = req.param('pn') || 1;
    var ps = req.param('s') || 20;
    biz_content.getAllNews(pn, ps, com.biz.fields.state.Complete.v, com.biz.fields.newsType.Inform.v, '', '', '', function (err, body) {
        res.json(body);
    })
}


