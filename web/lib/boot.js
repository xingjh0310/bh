/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
module.exports = function (parent, options) {
    var verbose = options.verbose;
    fs.readdirSync(__dirname + '/../controllers').forEach(function (controllerName) {
        controllerName = controllerName.replace('.js', '');
        console.log('\n   %s:', controllerName);
        var obj = require('./../controllers/' + controllerName);
        var name = obj.name || controllerName;
        var prefix = obj.prefix || '';
        var app = express();
        var handler;
        var path;
        var views = null;

        if (obj.engine) app.set('view engine', obj.engine);
        app.set('views', __dirname + '/../views/' + name);

        for (var key in obj) {
            // "reserved" exports
            if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
            // route exports

            switch (key) {
                case 'views':
                    for (var _viewkey in obj[key]) {
                        handler = obj[key][_viewkey];
                        if (_viewkey.indexOf('/') == 0) {
                            path = _viewkey;
                        }
                        else {
                            path = '/' + controllerName + "/" + _viewkey;
                        }
                        generalPath(app, obj, key + "['" + _viewkey + "']", path, 'get', handler);
                    }

                    break;
                default:
                    path = '/' + controllerName + "/" + key;
                    handler = obj[key];
                    path = prefix + path;
                    generalPath(app, obj, key, path, 'post', handler);
                    break;
            }

        }

        parent.use(app);


    });
};


var generalPath = function (app, obj, key, path, method, handler) {
    var filter = [];
    //dev,test环境严格检查session key
    //if(com.env == 'dev' || com.env == 'test')
    //    filter.push(sessionFilter.strictCheck);
    if (obj.before && obj.before instanceof Array) {
        filter = filter.concat(obj.before)
    }
    else if (obj.before)
        filter.push(obj.before);


    if (handler instanceof Array) {
        for (i = 0; i < handler.length - 1; i++) {
            if (typeof handler[i] == 'object' && handler[i].path) {
                path = handler[i].path;
            }
            if (typeof handler[i] == 'function') {
                filter.push(handler[i]);
            }
        }
        handler = handler[handler.length - 1];
    }
    app[method](path, filter, handler);
    console.log('     %s %s -> %s', method.toUpperCase(), path, key);
}