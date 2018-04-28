
var biz_user = require('../../biz/user');

var biz_cache = require('../../biz/cache');
var biz_comm = require('../../biz/common')

//判断推荐人是否存在并登录
exports.vl_check_login = function (req,res) {
    var mobile =  req.param('mobile')||'';
    var password = req.param('pwd') || '';
    var invite =req.param('invite') ||'';
    var code = req.param('code')||'';
    biz_comm.checkCode(mobile ,com.biz.fields.actions.Register.v,code,function (err,body) {
        if(!err){
            var  user = {
                mobile:mobile,
                password:password,
                invite:invite,
                type:com.biz.fields.accountType.Investor.v
            };
            biz_user.save(user,function (err,body) {
                if(!err){
                    biz_user.login(mobile,password,function(err,body){
                        req.session['userId'] = body.user.id;
                        return res.json({err: err});
                    })
                }else{
                    return res.json({message :err||"邀请人不存在",code:-1});
                }
            })
        }else {
            return res.json({message :err||"手机验证码出错",code:-1});
        }

    })
}

