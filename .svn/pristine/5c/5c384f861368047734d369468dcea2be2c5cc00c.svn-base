/**
 * Created by pwx on 2016/10/10.
 */
var biz_system = require('../system');
var biz_product = require('../product');
biz_system.getSystemSet(function (err, body) {
    if (!err && body) {
        com.env.key = body.key;
        com.env.static_url = body.static_url;
        com.env.base = body.base;
        com.env.apiBase = body.apiBase;
        com.env.transmissionType = body.transmissionType;
    }
})
biz_product.getAll(com.biz.fields.state.Complete.v, function (err, body) {
    if (!err && body) {
        var productType = {};
        for (var i = 0; i < body.length; i++) {
            productType[body[i].id] = {v: body[i].id, desc: body[i].name, memo: body[i].desc};
        }
        com.biz.fields.productType = productType;
    }
})
biz_system.getSeo(function (err, body) {
    com.env.seo = body;
})
biz_system.getPlatform(function (err, body) {
    com.env.platform = body;
})