var fs = require('fs');
var cache=require('../../biz/cache');
var async=require('async');
var midx = require('../../biz/midx');
var biz_account = require('../../biz/account');
var youmi_code={
    normal:{name:'normal',val:0},
    parameter_cannot_be_resolved:{name:'parameter cannot be resolved',val:-3106},
    unable_to_resolve_device:{name:'unable to resolve device',val:-3201},
    unable_to_resolve_promotional_products:{name:'unable to resolve promotional products',val:-2103},
    other_reason:{name:'other reason',val:-300}
}

exports.views = {

    /**
     * 有米推广
     * @param req
     * @param res
     */
    youmi:function(req,res){
        var ifa=req.param('ifa')||'';
        var mac=req.param('mac')||'';
        var callback_url=req.param('callback_url')||'';
        var osifa=req.param('osifa')||'';
        callback_url=decodeURIComponent(callback_url);
        async.waterfall([
            function(next){
                if(!callback_url){
                    next(youmi_code.parameter_cannot_be_resolved.val);
                }else{
                    if((ifa && ifa.length>10)|| (osifa && osifa.length>10)){
                        next(null);
                    }else{
                        next(youmi_code.unable_to_resolve_device.val);
                    }
                }
            },
            function(next){
                cache.checkFrequentAction('youmi_request'+ifa+osifa,3000,function(err) {
                    next(err?youmi_code.unable_to_resolve_promotional_products.val:null);
                });
            },
            function(next){
                var Str = '请求时间:' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ';\t' + 'ifa:' + ifa + '\t' + 'mac:' +mac  + '\t' + 'osifa:' +osifa+ 'callback_url:' +callback_url+'\n';
                fs.appendFile('./logs/youmi.log', Str, function (err) {
                    next(null);
                });
            },
            function(next){
                var youmi={adIdentifier:ifa,simulateIDFA:osifa,mac:mac,callbackUrl:callback_url};
                midx('/youmi/save',youmi , function (err, body) {
                    if(!err && body && !body.message){
                        next(youmi_code.normal.val);
                    }else{
                        next(youmi_code.other_reason.val);
                    }
                })
            }
        ],function(c,body){
            return res.json({c:c});
        })
    },

    /**
     * 今日头条
     * @param req
     * @param res
     */
    toutiao:function(req,res){
        var cid=req.param('cid')||'';
        var adid=req.param('adid')||'';
        var callback_url=req.param('callback_url')||'';
        var mac=req.param('mac')||'';
        var os=req.param('os')||'';
        var timestamp=req.param('timestamp')||'';
        var aandroidid=req.param('aandroidid')||'';
        callback_url=decodeURIComponent(callback_url);

        //ios
        var idfa=req.param('idfa')||'';
        //android
        var imei=req.param('imei')||'';


        async.waterfall([
            function(next){
                if(!callback_url ||!cid || !adid || !os || !timestamp ||!mac){
                    next("missing params");
                }else{
                    if(os=="1" && !idfa){
                        next("missing params idfa");
                    }else if(os=="0" && !imei){
                        next("missing params imei");
                    }else{
                        next(null);
                    }
                }
            },
            function(next){
                cache.checkFrequentAction('toutiao_request'+mac+idfa+imei,3000,function(err) {
                    next(err);
                });
            },
            function(next){
                var Str = '请求时间:' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ';\t'+ 'cid:' + cid + '\t' + 'adid:' + adid + '\t' + 'imei:' + imei + '\t' + 'idfa:' + idfa + '\t' + 'mac:' +mac  + '\t' + 'os:' +os+  '\t' + 'aandroidid:' +aandroidid+  '\t' + 'timestamp:' +timestamp+ '\t'+ 'callback_url:' +callback_url+'\n';
                fs.appendFile('./logs/toutiao.log', Str, function (err) {
                    next(null);
                });
            },
            function(next){
                var toutiao={idfa:idfa,imei:imei,mac:mac,callbackUrl:callback_url};
                midx('/toutiao/save',toutiao , function (err, body) {
                    if(!err && body && !body.message){
                        next(null);
                    }else{
                        next(err||"system error");
                    }
                })
            }
        ],function(err,body){
            if(!err){
                return res.json({ret: 0, msg:"success"})
            }else{
                return res.json({ret: -1, msg:err});
            }
        })
    }

}
exports.v1_getTopDebtAds = function (req,res) {
    biz_account.v1_getTopDebtAds(function (err,body) {
        if(!err){
            if(body.img!=""){
                body.img=com.env.static_url+body.img;
            }
            res.json({message:"",code:1,date:body});
        }else{
            res.json({message:err||"获取推荐失败",code:-1});
        }
    })
}