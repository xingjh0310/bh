/**
 * Created by pwx on 2016/8/1.
 */
/**
 * 过滤器 ： 判断是否多次提交
 */
exports.checkToken = function (req, res, next) {
    if (req.session["validPost"]) {
        var _check = req.session["validPost"];
        if (_check.token == req.param('token')) {
            req.session["validPost"] = {
                token: '',
                state: 1
            }
            next();
        }
        else {
            res.json({err: '禁止多次提交'});
        }
    }
    else {
        res.json({err: '禁止多次提交'});
    }
}
exports.setCheckToken = function (req, res, next) {
    var _check = req.session["validPost"] || {state: 1};
    if (_check.state == 1) {
        req.session["validPost"] = {
            token: com.env.guid(),
            state: 2
        }
        next();
    }
    else {
        next();
    }

}