/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
var biz_content = require('../../biz/content');
exports.before = [session_filter.getUser];
exports.views = {
    "/help": function (req, res) {
        res.render('index');
    }
}



