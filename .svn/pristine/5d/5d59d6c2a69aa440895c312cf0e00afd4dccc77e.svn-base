/**
 * 图片上传
 * @type {exports}
 */
var fs =require('fs');
var images = require("images");
exports.dealImgUpload = function(fileReadStream,filename,encoding,mimetype,cb) {
    var path = "/upload/" + (new Date().getMonth()+1),
        path2 = path + new Date().getTime() + filename.match(/(\.\w+)$/)[1];
        //path3 = path + "/" + new Date().getTime() + "_s" + filename.match(/(\.\w+)$/)[1];
    if(['image/png' , 'image/jpeg','image/gif','image/bmp','image/jpeg'].indexOf(mimetype) == -1)
        return cb({err:'仅限png,jpg,gif,bmp,jpeg'});
    fs.mkdir("../static" + path, function (err, files) {
        var fileWriteStream = fs.createWriteStream("../static" + path2);
        fileReadStream.pipe(fileWriteStream);
        fileWriteStream.on('close', function () {
            var img = images("../static" + path2);              //加载图像文件
            if (img.width() > 200)
                img.resize(200)
            //img.save("../static" + path3, {         //保存图片到文件,图片质量为50
                //quality : 50
            //});
            //fs.unlink("../static"+ path2)    //fs.unlink 删除用户上传的文件
            return cb({path: path2, url: path2});
        });
    })
}