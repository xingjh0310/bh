var request=require('request');
var fs=require('fs');

exports.send=function(server,msg,addr,title,file,cb){
    var req =  request.post(server.url||'https://sendcloud.sohu.com/webapi/mail.send.json',requestCallback);
    var form = req.form();
    form.append("api_user",server.user);
    form.append("api_key",server.key);
    form.append("to", addr);
    form.append("subject", title);
    form.append("html", msg);
    form.append("from", server.from||'sendcloud@sendcloud.org');
    form.append('files',fs.createReadStream(file) );
    function requestCallback(err,dta) {
        try{
            var message=JSON.parse(dta.body);
            if(message.message=='success'){
                cb(null,null);
            }else
                cb("发送失败！",null);
        }catch(e){
            cb("发送失败！",null)
        }
    }
}
