/**
 * 定义测试环境参数配置，全局变量:env
 */
(function () {
    this.com = this.com || {};
    com.env = {
        // mongo_conn: "mongodb://121.196.224.90:37017/zckj",
        cookiehost: "",
        // redis: {
        //     port: 12688,
        //     host: "121.196.224.90"
        // },

        redis: {
            port: 6379,
            host: "127.0.0.1"
        },
        wx: {
            token: 'bohomm',
            appID: 'wxc6008182a131483a',
            AppSecret: 'e56ed6616a9c422e4b6ad45003744ded'
        },
        mysql:{
            host:'127.0.0.1',
            port:'3306',
            user:'root',
            password:'1234',
            database:'zcwk'
        },
        // host:'https://www.bohomm.com',
        host:'http://localhost:8000',
        protocol_path: 'D:/protocol/',
        excel_path: 'D:/excel/',
        core_path: "http://localhost:8000",
        guid: function () {
            return new Date().getTime().toString() + Math.abs((((1 + Math.random()) * 0x10000) | 0)).toString();
        },
        site_path:''
    };
})();