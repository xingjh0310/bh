/**
 * Created by pwx on 2016/10/12.
 */
var nodeExcel = require('excel-export');
var xlsx = require('node-xlsx');
var fs = require('fs');

exports.export = function (config, list, call) {
    var data=[];
    var conf=[];
    for (var i = 0; i < config.length; i++) {
        conf.push(config[i].title);
    }
    data.push(conf);
    for (var i = 0; i < list.length; i++) {
        (function (i) {
            var row = [];
            for (var j = 0; j < config.length; j++) {
                row.push(config[j].format(list[i], list[i][config[j].field]) || '');
            }
            data.push(row);
        })(i);
    }
    if(data && data instanceof  Array && data.length>0){
        var buffer = xlsx.build([
            {
                name:'sheet1',
                data:data
            }
        ]);
        var random = Math.floor(Math.random() * 10000 + 0);
        var fileName = new Date().getTime().toString() + random + ".xlsx";
        fs.writeFile(com.env.excel_path + fileName, buffer, {'flag':'w'},function(err,result){
            if(!err){
                call(fileName);
            }else{
                call(null);
            }
        });
    }else{
        call(null);
    }
}
/**
 * 导出excle
 * @param data 导出的数据
 * @param callback  function(err,path){ ...}
 */
exports.newExport=function(config, list,callback){
    var data=[];
    var conf=[];
    for (var i = 0; i < config.length; i++) {
        conf.push(config[i].title);
    }
    data.push(conf);
    for (var i = 0; i < list.length; i++) {
        (function (i) {
            var row = [];
            for (var j = 0; j < config.length; j++) {
                row.push(config[j].format(list[i], list[i][config[j].field]) || '');
            }
            data.push(row);
        })(i);
    }
    if(data && data instanceof  Array && data.length>0){
        var buffer = xlsx.build([
            {
                name:'sheet1',
                data:data
            }
        ]);
        var random = Math.floor(Math.random() * 10000 + 0);
        var fileName = new Date().getTime().toString() + random + ".xlsx";
        fs.writeFile(com.env.excel_path + fileName, buffer, {'flag':'w'},function(err,result){
            if(!err){
                callback(null,fileName);
            }else{
                callback(err,null);
            }
        });
    }else{
        callback('导出的数据格式不正确!',null);
    }
}





