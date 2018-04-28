/**
 * Created by pwx on 2016/10/10.
 */
var midx = require('./midx');
exports.getAll = function (state, call) {
    midx('/product/getAll', {state: state}, function (err, body) {
        call(err || null, body);
    })
}