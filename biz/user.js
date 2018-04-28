/**
 * Created by pwx on 2016/6/30.
 */
var midx = require('./midx');
var fs = require('fs');
var async = require('async');
var cache=require('./cache');

/**
 * 根据手机号获取用户信息
 * @author          Pangwenxuan
 * @param mobile    手机号
 * @return          user
 */
exports.getUserByMobile = function (mobile, call) {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(mobile))
        call('手机号输入错误', null);
    else {
        midx('/user/getUserByMobile', {mobile: mobile}, function (err, body) {
            call(err || null, body);
        })
    }
}

/**
 * 根据account获取用户信息
 * @author          Pangwenxuan
 * @param id    accountId
 * @return          user
 */
exports.getUserByAccountId = function (id, call) {
    midx('/user/getUserByAccountId', {id: id}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 根据ID获取用户信息
 * @author          Pangwenxuan
 * @param mobile    手机号
 * @return          user
 */
exports.getUserById = function (id, call) {
    if (!id)
        call('请输出正确用户编号', null);
    else {
        midx('/user/get/' + id, {}, function (err, body) {
            call(null, body);
        })
    }
}

/**
 * 根据ID获取用户等级信息
 * @author          Pangwenxuan
 * @param mobile    手机号
 * @return          userd
 */
exports.getLevelById = function (id, call) {
    if (!id)
        call('请输出正确用户编号', null);
    else {
        midx('/userLevel/get/' + id, {}, function (err, body) {
            call(null, body);
        })
    }
}

/**
 * 保存用户等级信息
 * @author          Pangwenxuan
 */
exports.saveLevel = function (level, call) {
    midx('/userLevel/save', level, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取用户等级
 * @author          Pangwenxuan
 * @return         arr
 */
exports.getLevelList = function (pageNo, pageSize, call) {
    midx('/userLevel/getList', {pageNo: pageNo, pageSize: pageSize}, function (err, body) {
        call(err || null, body);
    });
}

exports.lock = function (userId, lock, call) {
    midx('/user/lock', {userId: userId, lock: lock}, function (err, body) {
        call(err || null, body);
    });
}

exports.save = function (user, call) {
    cache.checkFrequentAction('saveUser_'+(user.mobile?user.mobile:''),2000,function(error){
        if(!error){
            midx('/user/save', user, function (err, body) {
                call(err || null, body);
            });
        }else{
            call(error,null);
        }
    })
}

exports.login = function (mobile, password, call) {
    midx('/user/login', {
        mobile: mobile,
        password: password
    }, function (err, body) {
        call(err || null, body);
    });
}

exports.saveHeadImg = function (user, img, call) {
    var time = new Date().getTime();
    var path = '../static/upload/head/' + time + '.png';
    async.waterfall([
        function (cb) {
            var imgData = img;
            //过滤data:URL
            var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            fs.writeFile(path, dataBuffer, function (err) {
                cb(null);
            });
        }], function (err, result) {
        if (!err) {
            midx('/user/saveHeadImg', {
                userId: user.id,
                img: '/upload/head/' + time + '.png'
            }, function (err, body) {
                call(err || null, body);
            });
        } else
            call(err, null);
    });
}

exports.saveLoginPassword = function (userId, password, call) {
    midx('/user/saveLoginPassword', {
        userId: userId,
        password: password
    }, function (err, body) {
        call(err || null, body);
    });
}

exports.savePayPassword = function (userId, password, call) {
    midx('/user/savePayPassword', {
        userId: userId,
        password: password
    }, function (err, body) {
        call(err || null, body);
    });
}

exports.saveRealName = function (userId, realName, idCard, call) {
    cache.checkFrequentAction('realname_'+userId,2000,function(err){
        if(!err){
            midx('/user/saveRealName', {
                userId: userId,
                realName: realName,
                idCard: idCard
            }, function (error, body) {
                call(error || null, body);
            });
        }else{
            call(err,body);
        }
    })
}

exports.validEmail = function (userId, email, call) {
    midx('/user/validEmail', {
        userId: userId,
        email: email
    }, function (err, body) {
        call(err || null, body);
    });
}

exports.validEmailCall = function (userId, time, sign, call) {
    midx('/user/validEmailCall', {
        userId: userId,
        time: time,
        sign: sign
    }, function (err, body) {
        call(err || null, body);
    });
}

/**
 * 根据条件查询用户信息
 * @author          Pangwenxuan
 * @param bTime 开始时间，必传
 * @param eTime 结束时间，必传
 * @param param  条件，可传null
 * @param type  账户类型
 * @return         arr
 */
exports.getUserList = function (pageNo, pageSize, param, bTime, eTime,route, type, call) {
    midx('/user/getUserList', {
        bTime: bTime,
        eTime: eTime,
        param: param,
        pageNo: pageNo,
        pageSize: pageSize,
        channel:route,
        type: type
    }, function (err, body) {
        call(err || null, body);
    })
}

exports.saveAppClient = function (clientId,userId,route, call) {
    cache.checkFrequentAction('saveAppClient_'+userId,2000,function(error){
        if(!error){
            midx('/appPushMessage/saveAppClient', {
                clientId: clientId,
                userId:userId,
                route:route
            }, function (err, body) {
                call(err || null, body);
            });
        }else{
            call(error,null);
        }
    })
}

/**
 * 今日头条数据激活
 * @param model
 * @param callback
 */
exports.activate=function(model,callback){
    midx('/toutiao/activate',model, function (err, body) {
        callback(err || null, body);
    })

}

