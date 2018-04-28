/**
 * Created by Zenas on 2016/8/9.
 */
var session_filter = require('../filters/session-filter');
var biz_common = require('../../biz/common');
var biz_stat = require('../../biz/stat');
var async = require('async');
exports.before = [session_filter.getUser];
exports.views = {
    /*邀请*/
    "/pData": function (req, res) {
        async.waterfall([function (cb) {
            biz_common.getTotal(function (err, body) {
                var arrTotal = [
                    parseFloat(body.totalInvest).toFixed(2) ,
                    parseFloat(body.totalInterest).toFixed(2) ,
                    body.totalRegister ,
                    parseFloat(body.totalDebt)
                ];
                // var reTotal = [];
                // arrTotal.forEach(function(item, idx){
                //     var thousand = item % 10000;
                //     var tenThousand = ((item - item % 10000)/10000) % 10000;
                //     var billion = (item - (((item - item % 10000)/10000) % 10000 * 10000 + item % 10000)) / 10000 / 10000;
                //     var all = billion>0 ? billion+' 亿 '+tenThousand+' 万 '+thousand : (tenThousand>0 ? tenThousand+' 万 '+thousand : thousand);
                //     reTotal[idx] = all;
                // })
                cb(err, {total: arrTotal});
            })
        }, function (model, cb) {
            biz_stat.getYearAndSexRate(function (err, body) {
                model.Rate = body;
                cb(null, model);
            })
        }, function (model, cb) {
            biz_common.getSortInvest(5, function (err, body) {
                var sort = JSON.parse(body.totalInvest);
                var newSort = [];
                sort.forEach(function(item){
                    newSort.push({
                        value : item.amount / 10000,
                        name : item.mobile.replace(/^(\d{3})(.+)(\w{4})$/, "$1****$3")
                    })
                })
                console.log(newSort)
                model.sortList = newSort;
                cb(null, model);
            })
        }], function (err, result) {
            res.render('pData', result);
        });
    }
}
/**
 * Created by Zenas on 2016/8/9.
 */