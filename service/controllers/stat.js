/**
 * Created by pwx on 2016/9/21.
 */
var biz_stat = require('../../biz/stat');
var appSessionFilter = require('../filters/app-sessionid-filter');
exports.before = [appSessionFilter.verifySignature];

/**
 * 渠道日报
 * @param day
 * @param callback
 * @returns {*}
 */
exports.v1_getChannelDataByDay=function(req,res){
    var day=req.param('day')||'';
    biz_stat.getChannelDataByDay(day,function(err,list){
        if(!err && list && list instanceof Array){
            return res.json({
                message: '',
                code: 1,
                list:list
            });
        }else{
            return res.json({
                message:err,
                code: 1,
                list:[]
            });
        }
    })

}

/**
 * 渠道统计
 * @param req
 * @param res
 * @returns {*}
 */
exports.v1_getChannelData=function(req,res){
    biz_stat.getChannelData(function(err,list){
        if(!err && list && list instanceof Array){
            return res.json({
                message: '',
                code: 1,
                list:list
            });
        }else{
            return res.json({
                message: '',
                code: 1,
                list:[]
            });
        }
    })
}
/**
 * 获取平台数据
 * @param req
 * @param res
 */
exports.getYearAndSexRate = function(req,res){
    biz_stat.getYearAndSexRate(function(err,body){
        if(!err){
            return res.json({code:1,message:body});
        }else{
            return res.json({code:-1,message:"获取平台数据失败"})
        }
    })
}
