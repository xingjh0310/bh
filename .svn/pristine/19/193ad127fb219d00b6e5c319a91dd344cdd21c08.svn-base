/**
 * Created by pwx on 2016/8/17.
 */
/**
 * 全局引用，如com.db.user.find(),不要在单个js里独立引用mongo client connection
 */

(function () {
    this.com = this.com || {};
    com.db = com.db || {};
    require('../global/util');
    var mongodb = require('mongoskin');
    var db = mongodb.db(com.env.mongo_conn);
    var _extend_db = {
        user: 'user'
    };

    $.extend(com.db, _extend_db);


    //user_bankcard 转换成 UserBankcard

    var _getModelName = function (name) {
        return name.replace(/(^|_)(\w)/g, function (a, b, c, d) {
            return c.toUpperCase();
        })
    }

    var modelName, collName, methods, methods2, coll;
    for (var key in _extend_db) {
        collName = com.db[key].toString();
        modelName = _getModelName(collName);
        com.db[key] = {};//$.extend({}, db0.collection(collName));

        methods = ['save', 'insert'];
        for (var i = 0; i < methods.length; i++) {
            (function (i, key, model, collName) {
                com.db[key][methods[i]] = function (query, cb) {
                    var _coll = db.collection(collName);
                    return _coll[methods[i]].call(_coll, query, cb);
                };
            })(i, key, modelName, collName);
        }
        methods2 = ['count', 'find', 'findOne', 'update', 'remove', 'findAndModify', 'distinct', 'runCommand'];
        for (var i = 0; i < methods2.length; i++) {
            (function (i, key, model, collName) {
                com.db[key][methods2[i]] = function () {
                    var _coll = db.collection(collName);
                    return _coll[methods2[i]].apply(_coll, arguments);
                    //
                }
            })(i, key, modelName, collName);
        }
    }
})();
