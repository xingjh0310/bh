/**
 * 个推记录
 * @author zp
 * @since 2017年2月20日
 *
 */
var midx = require('./midx');

/**
 * 个推列表
 * @param pageNo
 * @param pageSize
 * @param bTime
 * @param eTime
 * @param call
 */
exports.getAppPushMessageList = function (pageNo, pageSize, bTime, eTime,call) {
    midx('/appPushMessage/getList', {
        pageNo: pageNo,
        pageSize: pageSize,
        status:0,
        bTime:bTime,
        eTime:eTime
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * app列表
 * @param pageNo
 * @param pageSize
 * @param bTime
 * @param eTime
 * @param call
 */
exports.getAppUploadList= function (pageNo, pageSize, call) {
    midx('/appPushMessage/getAppList', {
        pageNo: pageNo,
        pageSize: pageSize,

    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * app上传
 * @param entity
 * @param call
 */
exports.appUpload = function (appUpload,call) {
    midx('/appPushMessage/saveApp',
        {appUpload: JSON.stringify(appUpload)},
        function (err, body) {
            call(err || null, body);
        })
}

/**
 * 个推推送
 * @param entity
 * @param call
 */
exports.appPushMessage = function (entity,call) {
    midx('/appPushMessage/appPushMessage', entity, function (err, body) {
        call(err || null, body);
    })
}