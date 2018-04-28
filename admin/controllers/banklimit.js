var biz_binklimit = require('../../biz/banklimit');
//exports.before = [session_filter.checkUser];
exports.views = {
   "/getBankLimitAll":function (req,res) {
       return  res.render("banklimiAll")
   },
    "/saveBankLimit":function(req,res){
        var id = req.param("id");
        var bankset = {};
        if(id){
            biz_binklimit.getBankLimitById(id,function (eer ,body) {
                return res.render("saveBanklimi",{bank:body})
            })
        }else{
            return res.render("saveBanklimi",{bank:bankset});
        }
    }
}
//获取全部银行信息
exports.getBankLimitAll = function( req,res){
    biz_binklimit.getBankLimitAll(function (err,body) {
        if(!err){
            return res.json({code:1, message:'',data:body});
        }else{
            return res.json({code:-1,message:err||'获取失败'});
        }
    })
}
//根据ID获取银行数据
exports.getBankLimitById = function(req,res){
    var id = req.param("id");
    biz_binklimit.getBankLimitById(id,function (err,body) {
        if(!err){
            return res.json({code:1, message:'',data:body});
        }else{
            return res.json({code:-1,message:err||'获取失败'});
        }
    });

}
//保存银行卡信息
exports.saveBanklimit = function (req,res) {
    var bankLimit = JSON.parse(req.param('bankLimit') || '{}');
    biz_binklimit.checkBankByCode(bankLimit.id,bankLimit.bankCode, function (err,body) {
        if (!err ) {
            biz_binklimit.saveBankLimit(bankLimit, function (err) {
                if (!err) {
                    return res.json({code: 1, err: ''});
                } else {
                    return res.json({code: -1, err: err || '保存失败'});
                }
            })
        } else {
            return res.json({code: -2, err: bankLimit.bankName + "已存在"})
        }
    })
}

