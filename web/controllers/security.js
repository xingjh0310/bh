/**
 * Created by pwx on 2016/8/3.
 */
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getUser];
exports.views = {
    "/security": function (req, res) {
        res.render('index');
    },
    "/ensure": function (req, res) {
        res.render('ensure');
    }

}

