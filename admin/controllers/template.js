/**
 * Created by pwx on 2016/9/30.
 */
var biz_template = require('../../biz/template');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];

exports.views = {

    "edit": function (req, res) {
        var id = req.param('id');
        var template = {};
        if (id) {
            biz_template.get(id, function (err, body) {
                return res.render('edit', {template: body});
            });
        } else{
            return  res.render('edit', {template: template});
        }
    },

    "list": function (req, res) {
        return res.render('list');
    },

    "protocolEdit": function (req, res) {
        var id = req.param('id');
        var template = {};
        if (id) {
            biz_template.getProtocol(id, function (err, body) {
                return res.render('protocoledit', {template: body});
            });
        } else{
            return res.render('protocoledit', {template: template});
        }
    },

    "protocolList": function (req, res) {
        return res.render('protocollist');
    },

    "select": function (req, res) {
        var id = req.param('id');
        var template = {};
        if (id) {
            biz_template.getProtocol(id, function (err, body) {
                return res.render('select', {template: body});
            });
        } else{
            return  res.render('select', {template: template});
        }
    }

}

exports.saveProtocol = function (req, res) {
    var template = JSON.parse(req.param('template') || '{}');
    template.id = template.id || 0;
    biz_template.saveProtocol(template, function (err, body) {
        return res.json({err: err});
    })
}

exports.getAllProtocol = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var type = req.param('type') || '';
    biz_template.getAllProtocol(pageNo, pageSize, type, function (err, body) {
        return res.json(body);
    })
}

exports.save = function (req, res) {
    var template = JSON.parse(req.param('template') || '{}');
    template.id = template.id || 0;
    biz_template.save(template, function (err, body) {
        return res.json({err: err});
    })
}

exports.getAll = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    var state = req.param('state') || '';
    var type = req.param('type') || '';
    var action = req.param('action') || '';
    biz_template.getAll(pageNo, pageSize, action, state, type, function (err, body) {
        return res.json(body);
    })
}