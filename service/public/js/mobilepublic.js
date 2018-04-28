var browser = {
    versions:function () {
        var u = navigator.userAgent,
            ua = window.navigator.userAgent.toLowerCase(),
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1,//IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            wx:ua.match(/MicroMessenger/i) == 'micromessenger'//判断微信端

        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


// var activity = {
//     gobuy:function (ev) {//邀请好友
//         if(browser.versions.ios){//ios
//             try {
//                 window.webkit.messageHandlers.gobuy.postMessage(ev);
//             } catch(err) {
//                 // location.href = '';
//             }
//         }else if(browser.versions.android){//android
//             try {
//                 window.android.gobuy(ev);
//             } catch(err) {
//                 // location.href = '';
//             }
//
//         }else{
//             // location.href='';
//         }
//     },
//     inviteFriend:function () {//邀请好友
//         if(browser.versions.ios){//ios
//             try {
//                 window.webkit.messageHandlers.inviteFriend.postMessage("123456");
//             } catch(err) {
//                 // location.href = '';
//             }
//         }else if(browser.versions.android){//android
//             try {
//                 window.android.inviteFriend();
//             } catch(err) {
//                 // location.href = '';
//             }
//
//         }else{
//             // location.href='';
//         }
//     },
//     instantly: function() { //投资列表
//         if(browser.versions.ios) { //ios
//             try {
//                 window.webkit.messageHandlers.hello.postMessage("123456");
//             } catch(err) {
//                 location.href = '/debts?el=2';
//             }
//
//         } else if(browser.versions.android) { //android
//
//             try {
//                 window.android.startMainActivity();
//             } catch(err) {
//                 location.href = '/debts?el=2';
//             }
//         } else {
//             location.href = '/debts/lctz';
//         }
//     },
//     login: function() { //登录
//         if(browser.versions.mobile &&browser.versions.ios){//ios
//
//             try {
//                 window.webkit.messageHandlers.login.postMessage("123456");
//             } catch(err) {
//                 location.href = '/member/login';
//             }
//
//         }else if(browser.versions.mobile &&browser.versions.android){//android
//             try {
//                 window.android.startLoginActivity();
//             } catch(err) {
//                 location.href = '/member/login';
//             }
//
//         }else{
//             location.href='/member/login'
//         };
//     },
//     register: function(ev) { //注册
//         if(browser.versions.ios) { //ios
//             try {
//                 window.webkit.messageHandlers.register.postMessage("123456");
//             } catch(err) {
//                 location.href = '/account/coupon';
//             }
//
//         } else if(browser.versions.android) { //android
//
//             try {
//                 window.android.startRegisterActivity();
//             } catch(err) {
//                 location.href = '/account/coupon';
//             }
//         } else {
//             location.href = '/member/register' + ev;
//         };
//     },
//     coupon: function() { //优惠券
//         if(browser.versions.ios) { //ios
//             try {
//                 window.webkit.messageHandlers.register.postMessage("123456"); //注册
//
//             } catch(err) {
//                 //location.href = '/account/coupon';
//             }
//         } else if(browser.versions.android) { //android
//             try {
//                 window.android.startRegisterActivity(); //注册
//             } catch(err) {
//                 //location.href = '/account/coupon';
//             }
//         } else {
//             location.href = '/account?bonus';
//         };
//     },
//     novicelabel: function(ev) { //标详情
//
//         if(browser.versions.ios) { //ios
//             try {
//                 window.webkit.messageHandlers.Novicelabel.postMessage(ev);
//
//             } catch(err) {
//                 location.href = '/debts/' + ev;
//             }
//
//         } else if(browser.versions.android) { //android
//             try {
//
//                 window.android.startBidInfoActivity(ev);
//
//             } catch(err) {
//                 location.href = '/debts/' + ev;
//             }
//
//         } else {
//             location.href = '/debt/' + ev;
//         };
//     }
// }
