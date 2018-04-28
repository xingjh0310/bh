/**
 * Created by pwx on 2016/6/30.
 */
/**
 * midx请求
 */
var request = require('request');
var x = com.env;
module.exports = function (url, postdata, callback) {
    if (typeof postdata == "function") {
        callback = postdata;
        postdata = {};
    }
    console.error(x.core_path + url);
    console.error(postdata);
    request.post(x.core_path + url, {timeout: 5000}, function (err, _res, body) {
        //console.error(body);
        if (err) {
            console.error(err);
            callback(err);
        }
        else {
            if (body)
                body = JSON.parse(body);
            callback(body.code < 0 ? body.message : null, body ? body : null);
        }
    }).form(postdata);

}