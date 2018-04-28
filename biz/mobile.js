/**
 *create in 2018-04-09
 */
var midx = require('./midx');
var cache=require('./cache');


/**
 * 根据相应的类型获取信息列表
 * @param sTime
 * @param eTime
 * @param key
 * @param type
 */
exports.getListBystatus = function (pageNo, pageSize,sTime,eTime,key,type,call) {
    midx('/mobilefee/list', {
        pageNo:pageNo,
        pageSize:pageSize,
        sTime: sTime,
        eTime: eTime,
        key:key,
        type: type
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取单笔订单的详情
 * @param id
 * @param call
 */
exports.getInfoById=function (id,call) {
    midx('/mobilefee/info',{id:id},function (err,body) {
        call(err || null, body);
    })
}

/**
 * 开始话费的充值
 * @param id
 * @param telfee
 * @param call
 */
exports.getstartOrder=function (id,telfee,name,call) {
    midx('/mobilefee/startOrder',{id:id,telfee:telfee,name:name},function (err,body) {
        call(err || null, body);
    })
}

exports.gettovoid=function (id,adminname,call) {
    midx('/mobilefee/tovoid',{id:id,name:adminname},function (err,body) {
        call(err || null, body);
    })
}



