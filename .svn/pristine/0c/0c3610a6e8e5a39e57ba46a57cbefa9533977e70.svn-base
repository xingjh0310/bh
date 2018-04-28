/**
 * Created by pwx on 2016/7/13.
 */
var midx = require('./midx');

exports.getAllPartner = function (pageNo, pageSize, state, call) {
    midx('/partner/getList', {
        pageNo: pageNo,
        pageSize: pageSize,
        state: state
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getPartner = function (id, call) {
    midx('/partner/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

exports.savePartner = function (partner, call) {
    midx('/partner/save', partner, function (err, body) {
        call(err || null, body);
    })
}

exports.getAllNews = function (pageNo, pageSize, state, type, param, bTime, eTime, call) {
    midx('/news/getList', {
        pageNo: pageNo,
        pageSize: pageSize,
        state: state,
        param: param,
        bTime: bTime,
        eTime: eTime,
        type: type
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getNews = function (id, call) {
    midx('/news/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

exports.saveNews = function (news, call) {
    midx('/news/save', news, function (err, body) {
        call(err || null, body);
    })
}

exports.getAllAds = function (pageNo, pageSize, state, showType, call) {
    midx('/ads/getList', {
        pageNo: pageNo,
        pageSize: pageSize,
        state: state,
        showType: showType
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getAds = function (id, call) {
    midx('/ads/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

exports.saveAds = function (ads, call) {
    midx('/ads/save', ads, function (err, body) {
        call(err || null, body);
    })
}


exports.getAllActivity = function (pageNo, pageSize, state, bTime, eTime, showType, call) {
    midx('/activity/getList', {
        pageNo: pageNo,
        pageSize: pageSize,
        state: state,
        bTime: bTime,
        eTime: eTime,
        showType: showType
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.getActivity = function (id, call) {
    midx('/activity/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

exports.saveActivity = function (activity, call) {
    midx('/activity/save', {activity: JSON.stringify(activity)}, function (err, body) {
        call(err || null, body);
    })
}


/**
 * 查询最新app  新用户使用接口
 * @author          Zhaojiulin
 * @return          arr
 */
exports.getNewestAppByType = function (type, call) {
    midx('/appPushMessage/getNewestAppByType',{type:type},function (err, body) {
        call(err || null, body);
    })
}


/**
 * 查询最新app  新用户使用接口
 * @author          Zhaojiulin
 * @return          arr
 */
exports.getNewestApp = function (call) {
    midx('/appPushMessage/getNewestApp',function (err, body) {
        call(err || null, body);
    })
}