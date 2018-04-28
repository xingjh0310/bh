/**
 * Created by pwx on 2016/12/15.
 */
/**
 * 微信授权业务
 */
var jsSHA = require('jssha');
var cache = require('../../biz/cache');
/**
 * 获取微信js验签
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getSignature = function (req, res, next) {
    var url = req.param('url');
    var timestamp = req.param('timestamp');
    var nonceStr = req.param('nonceStr');
    cache.getApi_ticket(function (err, api_ticket) {
        if (api_ticket) {
            var ret = {
                jsapi_ticket: api_ticket,
                noncestr: nonceStr,
                timestamp: timestamp,
                url: url
            };
            var string = raw(ret),
                shaObj = new jsSHA(string, 'TEXT');
            var signature = shaObj.getHash('SHA-1', 'HEX');
            return res.json({signature: signature});
        } else {
            return res.json({signature: ''});
        }
    })

}
var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

