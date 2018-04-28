//弹出框
var tipType = {
    //error: {img: '/img/error.png', title: '错误提示'},
    error: {img: '/img/error.png'},
    notes: {img: '/img/notes.png'},
    success: {img: '/img/success.png'},
    later: {img: '/img/later.png'},
    email: {img: '/img/yx.png'},
    password: {img: '/img/mm.png'},
    realname: {img: '/img/sf.png'}

}

window.alert = function (msg, tip) {
    tip = tip || {};
    $('#alert-warp').show();
    //$('#modal_title').text(tip.title || '提示');
    $('#modal_content').text(msg);
    $('#modal_img').attr('src', tip.img || '/img/success.png');
}

window.confirm = function (title,msg,callback,cancel_fun) {
    title=title||'提示';
    $(".zhao_t").show();
    $(".tishi_t").show();
    $(".tishi_t p.title").text(title);
    $(".tishi_t h2.msg").text(msg);
    $(".tishi_t a.cancel").click(function(){
        $(".zhao_t").hide();
        $(".tishi_t").hide();
        if(cancel_fun && typeof cancel_fun=='function'){
            cancel_fun();
        }
    })
    $(".tishi_t a.submit").click(function(){
        $(".zhao_t").hide();
        $(".tishi_t").hide();
        if(callback && typeof callback=='function'){
            callback();
        }
    })
}

$(document).ready(function () {
    //首页公告
    $(".bulletin").Scroll({line: 1, speed: 1000, timer: 3000});
    //项目详情页切换

    $(".item_list .ul2 li").SetTableUI();

    // 回款计划
    $('.pay_main .list1 li').SetTableUI();
    $('.pay_main .list1 li').click(function () {
        $('.pay_tit >div').eq($(this).index()).show().siblings().hide();
    })
    //我的红包
    $('.bonus_main .list1 li').SetTableUI()
    //资金明细
    $('.cash_sele li').click(function(){
        $(this).addClass('active').siblings().removeClass("active");
    })
    $('.cash_btn').click(function(){
        $('.cash_warp').hide();
        $('.cashflow_head .img').addClass('img_tran');
    })
    $('.cashflow_head').click(function(){
        $('.cash_warp').show();
        $('.cashflow_head .img').removeClass('img_tran');
    })
    //注册
    $('.yqm_div .p3').click(function(){
        $(this).next('.form-group').toggleClass('hide');
        $(this).children('.iconfont').toggleClass('yaoqm_rot');
    })
    //自动投标
    $('.auto_tt').click(function(){
        $('.auto_swwarp').hide()
    })

    //帮助中心
    $('.list1').click(function () {
        $(this).next(".list2").slideDown(300).parent().siblings().children(".list2").slideUp();
        $('.help_main li').removeClass('active');
        $(this).parents('li').addClass('active');
        $(".img2").removeClass("m1");
        $(this).children('.img2').toggleClass('m1');

    })
    //推广记录
    $('.invite_main .list1 li').SetTableUI()

    $('.Btnsty_sure').UploadImg();
    $('.img2').click(function () {
        if ($(".upload_a").css("display") == "none") {
            $(".upload_a").show();
        } else {
            $(".upload_a").hide();
        }
    })

    $('.del').click(function () {
        $(".upload_a").hide();
    })
    //显示隐藏密码
    $('#password').togglePassword({
        el: '#togglePassword'
    });
    $('#togglePassword').click(function () {
        $(this).toggleClass('show_ps')
        $(this).toggleClass('hide_ps')
    })




})

