/**
 * Created by pwx on 2016/7/1.
 */
var biz_supervisors = require('../../biz/supervisors');
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.checkUser];
exports.views = {
    "list": function (req, res) {
        res.render('list');
    }, "roles": function (req, res) {
        res.render('roles');
    }, "modulars": function (req, res) {
        var roleId = req.param('id') || '0';
        biz_supervisors.getRights(roleId, function (err, body) {
            biz_supervisors.getRole(roleId, function (err, role) {
                res.render("modulars", {rights: body, role: role});
            })
        })
    }, "supervisorEdit": function (req, res) {
        var id = req.param('id');
        biz_supervisors.getRoles(1, 100, com.biz.fields.state.Complete.v, function (err, roles) {
            var supervisor = {};
            if (id) {
                biz_supervisors.getSupervisors(id, function (err, body) {
                    res.render('supervisoredit', {supervisor: body, roles: roles.list});
                });
            } else
                res.render('supervisoredit', {supervisor: supervisor, roles: roles.list});
        })
    }
    , "roleEdit": function (req, res) {
        var id = req.param('id');
        var role = {};
        if (id) {
            biz_supervisors.getRole(id, function (err, body) {
                res.render('roleedit', {role: body});
            });
        } else
            res.render('roleedit', {role: role});
    }
}

exports.getAll = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_supervisors.getAll(pageNo, pageSize, function (err, body) {
        res.json(body);
    })
}

exports.getRoles = function (req, res) {
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    biz_supervisors.getRoles(pageNo, pageSize, '', function (err, body) {
        res.json(body);
    })
}

exports.saveRole = function (req, res) {
    var role = JSON.parse(req.param('role') || '{}');
    role.id = role.id || 0;
    biz_supervisors.saveRole(role, function (err, body) {
        res.json({err: err});
    })
}

exports.saveSupervisors = function (req, res) {
    var supervisor = JSON.parse(req.param('supervisor') || '{}');
    supervisor.id = supervisor.id || 0;
    biz_supervisors.saveSupervisors(supervisor, function (err, body) {
        res.json({err: err});
    })
}

exports.saveRights = function (req, res) {
    var roleId = req.param('roleId') || 0;
    var ids = req.param('ids') || '';
    biz_supervisors.saveRights(roleId, ids, function (err, body) {
        res.json(body);
    })
}

exports.genSecret = function (req, res) {
    var id = req.param('id') || 0;
    var name = req.param('name') || '';
    biz_supervisors.genSecret(id,name, function (err, body) {
        res.json({err: err});
    })
}