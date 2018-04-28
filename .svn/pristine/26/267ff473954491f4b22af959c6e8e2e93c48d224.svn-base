var md5 = require('MD5');
var cache = require('./cache');

//node的版本对这个有影响
// var ccap = com.env.name == 'dev' ? require('ccap-windows')({
//     generate: function () {
//         var code = com.env.guid();
//         return code.substr(code.length - 4, code.length);
//     }, offset: 70
// }) : require('ccap-linux')({
//     generate: function () {
//         var code = com.env.guid();
//         return code.substr(code.length - 4, code.length);
//     }, offset: 70
// });
// exports.getImageCode = function (req, res) {
//     var ary = ccap.get();
//     var txt = ary[0];
//     var buf = ary[1];
//     cache.setImgCode(req.sessionID, txt, function (err) {
//         res.send(buf);
//     })
// }



var captchapng = require('captchapng');
exports.getImageCode=function(req,res,key) {
    var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
        //生成随机数以0开头时，会省略开头的0 以此生成非0开头的数
        if(!i && randomcode=='0' ){
            randomcode='';
            i--;
        }
    }
    // req.sessionID= randomcode;
// 输出图片
    var p = new captchapng(80, 30, parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });

    cache.setImgCode(req.sessionID, randomcode, function (err) {
        res.end(imgbase64);
    })

}
exports.checkImageCode = function (req, res, next) {
    cache.getImgCode(req.sessionID, function (err, cacheCode) {
        var code = req.param("imgCode") || '';
        if (cacheCode && cacheCode.toLowerCase() == code)
            next();
        else {
            res.json({err: '图片验证码输入不正确'});
        }
    })
}
