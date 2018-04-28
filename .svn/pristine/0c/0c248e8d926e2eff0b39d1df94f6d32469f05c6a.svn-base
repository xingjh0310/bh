/**
 * Created by pwx on 2016/9/30.
 */
var midx = require('./midx');
var cache = require('./cache');

exports.getAll = function (pageNo, pageSize, action, state, type, call) {
    midx('/template/getAll', {
        pageNo: pageNo,
        pageSize: pageSize,
        action: action,
        state: state,
        type: type
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.get = function (id, call) {
    midx('/template/get', {
        id: id
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.save = function (template, call) {
    midx('/template/save', template, function (err, body) {
        call(err || null, body);
    })
}

exports.getAllProtocol = function (pageNo, pageSize, type, call) {
    midx('/protocolTemplate/getAll', {
        pageNo: pageNo,
        pageSize: pageSize,
        type: type
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getProtocol = function (id, call) {
    midx('/protocolTemplate/get', {
        id: id
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.saveProtocol = function (template, call) {
    midx('/protocolTemplate/save', template, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取导出配置列表
 * @param pageNo
 * @param pageSize
 * @param call
 */
exports.getExports=function(pageNo,pageSize,call){
    midx('/template/getExports', {
        pageNo: pageNo,
        pageSize: pageSize,
    }, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据id获取导出配置
 * @param id
 * @param call
 */
exports.getExport=function(id,call){
    if(!id || isNaN(id)){
        call('参数错误.',null);
    }
    midx('/template/getExport', {
        id: id
    }, function (err, body) {
        if(body && body.params){
            try{
                body.params=JSON.parse(body.params);
            }catch(e){
                body.params=null;
            }
        }
        call(err || null, body);
    })
}

/**
 * 保存导出配置
 * @param params
 * @param call
 */
exports.saveExport=function(params,call){
    cache.checkFrequentAction('saveExport',2000,function(error){
        if(error){
            call(error ,null);
        }else{
            midx('/template/saveExport', params, function (err, body) {
                call(err || null, body);
            })
        }
    })
}