function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function init(title, desc, url, img, signature, nonceStr, timestamp, appId) {
    jWeixin.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            "getLocation"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    jWeixin.ready(function () {
        jWeixin.onMenuShareTimeline({
            title: title, // 分享标题
            link: url,
            imgUrl: img,// 分享图标
            success: function (res) {
                console.log("成功！")
            },
            trigger: function (res) {
                console.log('用户点击发送给朋友');
            },
            cancel: function (res) {
                console.log('已取消');
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        jWeixin.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url,
            imgUrl: img,// 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function (res) {
                console.log("成功！")
            },
            trigger: function (res) {
                console.log('用户点击发送给朋友');
            },
            cancel: function (res) {
                console.log('已取消');
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
        jWeixin.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url,
            imgUrl: img,// 分享图标
            trigger: function (res) {
                console.log('用户点击分享到QQ');
            },
            complete: function (res) {
                console.log(JSON.stringify(res));
            },
            success: function (res) {
                console.log("成功！")
            },
            cancel: function (res) {
                console.log('已取消');
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    });
}
ZC_api.invite = function (title, desc, url, img, baseUrl, appId) {
    $.getScript("https://res.wx.qq.com/open/js/jweixin-1.0.0.js", function(data, textStatus, jqxhr) {
        var nonceStr = randomString(16);
        var timestamp = Math.floor(new Date().getTime() / 1000);
        $.ajax({
            url: '/wechart/getSignature',
            async: false,
            type: 'post',
            data: {url: baseUrl, timestamp: timestamp, nonceStr: nonceStr},
            success: function (dta) {
                if (dta && dta.signature) {
                    init(title, desc, url, img, dta.signature, nonceStr, timestamp, appId)
                }
            }
        });
    });
}
