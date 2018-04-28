/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getUser];
exports.views = {
    "/product_safety": function (req, res) {
        res.render('index');
    },

}
/**
 * Created by Zenas on 2016/8/9.
 */