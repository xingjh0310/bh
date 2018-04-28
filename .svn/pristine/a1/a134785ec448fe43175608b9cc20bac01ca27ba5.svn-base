/**
 * Created by pwx on 2016/8/2.
 */
var midx = require('./midx');

exports.getSets = function (call) {
    midx('/systemSet/getAll', {}, function (err, body) {
        call(err || null, body);
    })
}
exports.getSystemSet = function (call) {
    midx('/systemSet/getSystemSet', {}, function (err, body) {
        call(err || null, body);
    })
}
exports.saveSet = function (_set, call) {
    midx('/systemSet/saveSet', _set, function (err, body) {
        call(err || null, body);
    })
}
exports.saveSeo = function (seo, call) {
    midx('/seo/save', seo, function (err, body) {
        call(err || null, body);
    })
}

exports.getSeo = function (call) {
    midx('/seo/get', {}, function (err, body) {
        call(err || null, body);
    })
}
exports.savePlatform = function (platform, call) {
    midx('/platform/save', platform, function (err, body) {
        call(err || null, body);
    })
}

exports.getPlatform = function (call) {
    midx('/platform/get', {}, function (err, body) {
        call(err || null, body);
    })
}

exports.getParamVal = function (key,call) {
    midx('/systemSet/getParamVal', {key:key}, function (err, body) {
        call(err, body);
    })
}