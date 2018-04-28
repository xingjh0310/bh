/**
 * Created by pwx on 2016/8/11.
 */
var midx = require('./midx');

exports.save = function (borrow, call) {
    midx('/borrowApply/save', borrow, function (err, body) {
        call(err || null, body);
    })
}
exports.audit = function (id, state, memo, call) {
    midx('/borrowApply/audit', {id: id, state: state, memo: memo}, function (err, body) {
        call(err || null, body);
    })
}
exports.getList = function (pageNo, pageSize, param, call) {
    midx('/borrowApply/getApplyList', {pageNo: pageNo, pageSize: pageSize, param: param}, function (err, body) {
        call(err || null, body);
    })
}