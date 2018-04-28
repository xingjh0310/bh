/**
 * Created by pwx on 2016/6/30.
 */
var midx = require('./midx');
/**
 * 管理员登录
 * @author          Pangwenxuan
 * @param mobile    手机号
 * @return          user
 */
exports.login = function (userName, password, googleCode,call) {
    midx('/supervisors/login', {name: userName, password: password,googleCode:googleCode}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 管理员列表
 * @return          arr
 */
exports.getAll = function (pageNo, pageSize, call) {
    midx('/supervisors/getList', {pageNo: pageNo, pageSize: pageSize}, function (err, body) {
        call(err || null, body);
    })
}
/**
 * 角色列表
 * @return          arr
 */
exports.getRoles = function (pageNo, pageSize, state, call) {
    midx('/role/getList', {pageNo: pageNo, pageSize: pageSize, state: state}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 获取角色
 * @return
 */
exports.getRole = function (id, call) {
    midx('/role/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}
/**
 * 权限列表
 * @return          arr
 */
exports.getRights = function (roleId, call) {
    midx('/supervisors/getRightsList', {roleId: roleId}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存角色权限
 * @return          arr
 */
exports.saveRights = function (roleId, ids, call) {
    midx('/role/saveRights', {roleId: roleId, rightsIds: ids}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 保存管理员
 */
exports.saveSupervisors = function (supervisors, call) {
    midx('/supervisors/save', supervisors, function (err, body) {
        call(err || null, body);
    })
}

exports.saveRole = function (role, call) {
    midx('/role/save', role, function (err, body) {
        call(err || null, body);
    })
}
/**
 *  获取管理员
 */
exports.getSupervisors = function (id, call) {
    midx('/supervisors/get/' + id, {}, function (err, body) {
        call(err || null, body);
    })
}

/**
 * 生成谷歌验证账号
 */
exports.genSecret = function (id,name, call) {
    if(!id || isNaN(id) || !name){
        call('参数错误.',null);
    }
    midx('/supervisors/genSecret',{id : id, name : name}, function (err, body) {
        call(err || null, body);
    })
}