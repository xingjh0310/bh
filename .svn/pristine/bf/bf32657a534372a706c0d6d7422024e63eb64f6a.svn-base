/**
 * Created by Administrator on 2017/1/16.
 */
var midx = require('./midx');
var cache=require('./cache');
exports.getChannelcount = function (sTime,bTime, eTime, channelTy, call) {
    midx('/channel/channelct', {
        sTime: sTime,
        bTime: bTime,
        eTime: eTime,
        channelTy: channelTy
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 渠道保存
 * @param entity
 * @param call
 */
exports.Channelsave = function (channelSp,call) {
    midx('/channel/saveChannel',
        {channelSp: JSON.stringify(channelSp)},
        function (err, body) {
            cache.deleteRedisByKey("channel_Alllist",function(){
                call(err || null, body);
            })
        })
}

/**
 *
 * @param entity
 * @param call
 */
exports.get = function (id, call) {
    midx('/channel/get/' + id,function (err, body) {
        call(err || null, body);
    })
}

/**
 * 渠道推广列表
 * @param pageNo
 * @param pageSize
 * @param bTime
 * @param eTime
 * @param call
 */
exports.getSpreadchannList= function (pageNo, pageSize,bTime,eTime, call) {
    midx('/channel/getSpreadList', {
        pageNo: pageNo,
        pageSize: pageSize,
        bTime:bTime,
        eTime:eTime
    }, function (err, body) {
        call(err || null, body);
    })
}