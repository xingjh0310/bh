/**
 * Created by pwx on 2016/8/4.
 */
exports.checkLogin = function (req, res, next) {
    if (req.session['user']) {
        res.locals.user = req.session['user'];
        next();
    } else {
        if(req.method=="GET"){
            return res.redirect('/login/'+com.env.site_path);
        }else{
            return res.json({err:'session失效,请重新登录.'})
        }
    }
}

exports.checkUser = function (req, res, next) {
    if (req.session['user']) {
        res.locals.user = req.session['user'];
        next();
    } else {
        if(req.method=="GET"){
            return res.redirect('/login/'+com.env.site_path);
        }else{
            return res.json({err:'session失效,请重新登录.'})
        }
    }
}
