/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
exports.before = [session_filter.getUser];
exports.views = {
    /*邀请*/
    "/invite":function (req, res) {
        var userPhone=req.param("phone") || 0;
        var inviteCode = req.param('inviteCode') || 0;
        console.log(userPhone)
        res.render('invite',{phone: userPhone,inCODE:inviteCode});
    },
    "/rule": function (req, res) {
        res.render('rule');
    }
}
/**
 * Created by Zenas on 2016/8/9.
 */