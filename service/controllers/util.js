/**
 * Created by Zenas on 2016/9/22.
 */
var biz_cap = require('../../biz/ccap');
var biz_common = require('../../biz/common');
exports.views = {
    "/getImgCode": [function (req, res) {
        biz_cap.getImageCode(req, res, 'captcha');
    }]
}

exports.getSortInvest = function (req, res) {
    var result = {};
    biz_common.getSortInvest(10, function (err, body) {
        for (var key in body) {
            var arr = JSON.parse(body[key]);
            result[key] = [];
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                obj.mobile = obj.mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
                result[key].push(obj);
            }
        }
        res.json(result);
    })
}

exports.getSortInvest_20 = function (req, res) {
    var result = {};
    biz_common.getSortInvest(20, function (err, body) {
        for (var key in body) {
            var arr = JSON.parse(body[key]);
            result[key] = [];
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                // console.log(obj.mobile)
                if(obj.mobile){
                    obj.mobile = obj.mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
                    result[key].push(obj);
                }
            }
        }
        res.json(result);
    })
}