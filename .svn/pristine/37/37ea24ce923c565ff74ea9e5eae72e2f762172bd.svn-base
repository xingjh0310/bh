/**
 * Created by pwx on 2016/6/30.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var adm_zip = require('adm-zip');
var cache = require('../../biz/cache');
var session_filter = require('../filters/session-filter');
var midx = require('../../biz/midx');
var email_biz=require('../../biz/email');
var template=require('../../biz/template');
var process = require('child_process');

exports.before = [session_filter.checkLogin];

var action = {
    /// 上传图片
    uploadimage: function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var name = new Date().getTime() + filename.match(/(\.\w+)$/)[1];
            var newFilename = "/upload/" + (new Date().getMonth() + 1) + name;
            var path = "../static" + newFilename;
            var filesize = 0;
            fstream = fs.createWriteStream(path);
            file.on('data', function (data) {
                filesize = data.length;
            });
            fstream.on('close', function () {
                res.send(JSON.stringify({
                    "originalName": filename,
                    "name": name,
                    "url": newFilename,
                    "size": filesize,
                    "type": 'image',
                    "state": "SUCCESS"
                }));
            });
            file.pipe(fstream);
        });
    },
    uploadzip: function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var time = new Date().getTime();
            var name = time + filename.match(/(\.\w+)$/)[1];
            var newFilename = "/upload/activity/" + name;
            var path = "../static" + newFilename;
            var filesize = 0;
            fstream = fs.createWriteStream(path);
            file.on('data', function (data) {
                filesize = data.length;
            });
            fstream.on('close', function () {
                var unzip = new adm_zip(path);
                unzip.extractAllTo("../static/upload/activity/" + time, true);
                res.send(JSON.stringify({
                    "url": com.env.base + "/upload/activity/" + time + "/index.html",
                    "type": 'html',
                    "state": "SUCCESS"
                }));
            });
            file.pipe(fstream);
        });
    },
    /// 获取配置文件
    config: function (req, res) {
        var json = JSON.parse(fs.readFileSync('public/ueditor/config.json', 'utf-8'));
        return res.json(json);
    },
    /// 在线管理
    listimage: function (req, res) {
        fs.readdir('../static/upload/', function (err, files) {
            var total = 0, list = [];
            files.sort().splice(req.query.start, req.query.size).forEach(function (a, b) {
                /^.+.\..+$/.test(a) &&
                list.push({
                    url: '/upload/' + a,
                    mtime: new Date(fs.statSync('../static/upload/' + a).mtime).getTime()
                });
            });
            total = list.length;
            res.json({
                state: total === 0 ? 'no match file' : 'SUCCESS',
                list: list,
                total: total,
                start: req.query.start
            });
        });
    },
    /// 抓取图片（粘贴时将图片保存到服务端）
    catchimage: function (req, res) {
        var list = [];
        req.body.source.forEach(function (src, index) {
            http.get(src, function (_res) {
                var imagedata = '';
                _res.setEncoding('binary');
                _res.on('data', function (chunk) {
                    imagedata += chunk
                });
                _res.on('end', function () {
                    var pathname = url.parse(src).pathname;
                    var original = pathname.match(/[^/]+\.\w+$/g)[0];
                    var suffix = original.match(/[^\.]+$/)[0];
                    var filename = Date.now() + '.' + suffix;
                    var filepath = '../static/upload/catchimages/' + filename;
                    fs.writeFile(filepath, imagedata, 'binary', function (err) {
                        list.push({
                            original: original,
                            source: src,
                            state: err ? "ERROR" : "SUCCESS",
                            title: filename,
                            url: '/upload/catchimages/' + filename
                        });
                    })
                });
            })
        });
        var f = setInterval(function () {
            if (req.body.source.length === list.length) {
                clearInterval(f);
                res.json({state: "SUCCESS", list: list});
            }
        }, 50);

    }
};

exports.views = {

    "upload": [cache.limit, function (req, res) {
        action[req.query.action](req, res);
    }],

    "downExcel": [{path: /\/downExcel\/(\w+)/}, function (req, res) {
        var name = req.params[0];
        if (name) {
            var path = com.env.excel_path + name + '.xlsx';
            fs.exists(path, function (exists) {
                if (exists) {
                    res.download(path, name + ".xlsx");
                }
                else
                    res.json({err: '失败'});
            })
        }
    }],

    execExport: [cache.limit, function(req,res){
        var id=req.param('id')||'';
        var data=req.param('data')||'';
        data=decodeURIComponent(data);
        try{
            data=JSON.parse(data);
        }catch(e){
            data={};
        }
        if(!id){
            return res.send("参数错误.")
        }
        template.getExport(id,function(err,body){
            if(body){
                var sql = body.sql.replace(/\n/,'');
                if(body.params && body.params instanceof Array && body.params.length>0){
                    for(var i=0;i<body.params.length;i++){
                        sql=sql.replace(new RegExp("@"+body.params[i].param_name,"gm"),data[body.params[i].param_name]);
                    }
                }
                var time=new Date().getTime();
                if(com.env.mysql_exec && com.env.excel_path){
                    var exec=com.env.mysql_exec+" '"+sql+" ' "+('|sed \'s/\t/","/g;s/^/"/g;s/$/"\r/g\'')+" > "+com.env.excel_path+"/"+time+'.csv';
                    var child = process.exec(exec,{encoding: 'utf8'}, function (err, stdout, stderr) {
                        if(err){
                            return res.send(err);
                        }else{
                            return res.download(com.env.excel_path+"/"+time+'.csv', time+".csv");
                        }
                    });
                    child.stdin.write(com.env.mysql.password);
                    child.stdin.end();
                }else{
                    return res.send('环境不支持导出!');
                }
            }else{
                return res.send("数据错误.")
            }
        })
    }]
}
exports.upload = [cache.limit, function (req, res) {
    action[req.query.action](req, res);
}]

exports.sendExcelToEmail=[cache.limit, function (req, res) {
    var user=res.locals.user;
    var name =req.param('fileName')||'';
    var msg =req.param('msg')||'财务数据发送';
    var title =req.param('title')||'附件发送';
    if (name) {
        var path = com.env.excel_path + name;
        fs.exists(path, function (exists) {
            if (exists) {
                if(user && user.email){
                    midx('/systemSet/getParamVal', {key: 'email'}, function (err, body) {
                        if(body && body.url && body.user && body.key ){
                            email_biz.send(body,msg,user.email,title,path,function(err,result){
                                return res.json({err:err});
                            })
                        }else{
                            return res.json({err: '尚未配置邮件发送功能！'});
                        }
                    })
                }else{
                    return res.json({err: '管理员邮箱信息有误！'});
                }
            }
            else{
                return res.json({err: '发送至邮箱失败'});
            }
        })
    }else{
        return res.json({err: '发送至邮箱失败'});
    }
}]

/**
 * 根据id获取导出配置
 * @param id
 * @param call
 */
exports.getExport=function(req,res){
    var id=req.param('id')||'';
    template.getExport(id,function(err,body){
        return res.json(body);
    })
}

/**
 * 获取导出配置列表
 * @param pageNo
 * @param pageSize
 * @param call
 */
exports.getExports=function(req,res){
    var pageNo = req.param('pageNo') || 1;
    var pageSize = req.param('pageSize') || 20;
    template.getExports(pageNo,pageSize,function(err,body){
        return res.json(body);
    })
}

/**
 * 保存导出配置
 * @param params
 * @param call
 */
exports.saveExport=function(req,res){
    var name=req.param('name')||'';
    var id=req.param('id')||'';
    var sql=req.param('sql')||'';
    var params=req.param('params')||'';
    if(!name || !sql){
        return res.json({err:'参数错误.'})
    }
    template.saveExport({id:id,name:name,sql:sql,params:params},function(err,body){
        return res.json({err:err});
    })
}














