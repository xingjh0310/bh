var midx = require('./midx');

//获取银行信息
exports.getBankLimitAll = function (call) {
    midx("/BankLimit/getAllBankLimit",{},function (err,body) {
        call(err||null, body);
    })
}
//根据Id获取信息
exports.getBankLimitById = function (id , call) {
    midx("/BankLimit/getBankLimitById",{id:id},function (err,body) {
        call(err||null,body);
    })
}
//保存信息
exports.saveBankLimit = function (banklimit,call) {
    midx("/BankLimit/saveBanklimit",{
        banklimit:JSON.stringify(banklimit)
    },function(err,body){
        call(err|null,body);
    });
}
//检查银行是否存在
exports.checkBankByCode = function (id,code,call) {
    if(id < 0){
        midx("/BankLimit/checkBank",{
                code:code
            },
            function(err,body){
                call(err||null,body);
            });
    }else{
        call();
    }
}
//检查银行是否存在
exports.getBankByCode = function (code,call) {
    midx("/BankLimit/getBank",{
            code:code
        },
        function(err,body){
            call(err||null,body);
        });
}

/**
 * 根据银行卡去匹配
 * @param code
 * @param call
 */
exports.checkBankBelong=function (code,call) {
    midx("/BankLimit/checkBankBelong",{code:code},function (err,body) {
        call(err ||null,body);

    })

}