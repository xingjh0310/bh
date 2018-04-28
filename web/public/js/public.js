//弹出框
var tipType = {
    //error: {img: '/img/error.png', title: '错误提示'},
    error: {img: '/img/error.png'},
    notes: {img: '/img/notes.png'},
    success: {img: '/img/success.png'},
    later: {img: '/img/later.png'},
    email: {img: '/img/yx.png'},
    password: {img: '/img/mm.png'},
    realname: {img: '/img/sf.png'},
    app: {img: '/img/appdv.jpg'}

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


    // 首页banner
    $('.banner_span span ').Banner();
    //首页切换
    $('.productconl li').hover(function () {
        $('.productconr_ul>div').eq($(this).index()).show().siblings().hide();
    })



    $('.productconl ol li').SetTableHover();


    $('.personal_play ul li').SetTableUI();
    //帮助中心
    $('.fuwu_list li').SetTableUI();
    $('.fuwu_setab ul li').click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().next().children().eq($(this).index()).show().siblings().hide();
    });

    $('.zhiyin_list li').click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $('.TabMain>div').eq($(this).index()).show().siblings().hide();
    });
    //账户首页
    $('#image').click(function () {
        $('.upload_a').show();
    })

    //返回顶部
    $(".return_top").ToTop();

    $('.slide_down').click(function () {
        $('.secu_form').slideUp();
        $('.slide_up').hide();
        $('.slide_down').show();
        $(this).parent().nextAll('.secu_form').slideDown(300);
        $(this).hide();
        $(this).next('.slide_up').show();
        $('.persecurity li').removeClass('active');
        $(this).parents('li').addClass('active');
    })
    $('.slide_up').click(function () {
        $(this).parent().nextAll('.secu_form').slideUp(300);
        $(this).hide();
        $(this).prev('.slide_down').show();
        $(this).parent().parents('li').removeClass('active');
    })
    //安全保障
    $('.security_list2 li').hover(function () {
        $('.sec_tab li').eq($(this).index()).show().siblings().hide();
    })

    //积分
    $('.inte_w .inte_main a').click(function () {
        $('.inte_w').hide()
    })

    // 项目详情
    $(".item_tab>ul li").SetTableUI();
    // 邀请有礼
    $(".yq_ul li").SetTableUI();
    $(".yq_ul2 li").SetTableUI();
    // 首页公告切换
    var unslider01 = $('.b01').unslider({}),
        data01 = unslider01.data('unslider');
    $('.unslider-arrow01').click(function () {
        var fn = this.className.split(' ')[1];
        data01[fn]();
    });
    //安全保障
    $('.secu_nav li').FixedNav();

    //团队


    $('.filtTag_A ul li').click(function () {
        $(this).addClass("hb_active1").siblings().removeClass('hb_active1');
        /*$(this).addClass('hb_active1');*/
        $('.hb_div_right>.li2').eq($(this).index()).show().siblings('.li2').hide();

    })
    $('.filtTag_A li').hover(function () {
        $('.hb_div_right>.li2').eq($(this).index()).show().siblings('.li2').hide();
    }, function () {
        $('.hb_div_right>.li2').eq($('.hb_active1').parent().index()).show().siblings('.li2').hide();
    })
    $('.item_main .item_sx li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    $('.investment_tab .tab_list li').click(function () {
        $('.item_swep >div').hide().eq($(this).index()).show().siblings();
    })
    //历程
    //$('.layer-close').click(function () {
    //    $('.dialog-overlay').hide();
    //})
    //$('.layer-close').click(function () {
    //    $('.dialog-over').hide();
    //})
    //$('.about_main .main4_ul ul li .a1').click(function () {
    //    $('.dialog-overlay').show();
    //})
    //$('.about_main .main4_ul ul li .a2').click(function () {
    //    $('.dialog-over').show();
    //})

    $('.zf_ul li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');

    })
    /*$('.ensure_div').click(function(){
        alert('质保服务专款，将在3月15日之前上传')
    })*/


    $('.secu_div').click(function () {
        alert('正在建站中...', tipType.later)
    })

    $('.help_app').click(function () {
        alert('', tipType.app)
    })
    $("#amount_input").InputBr();
    $('.login_div input').InputBr();
    $('.register_div input').InputBr();


    //邀请有礼页面点击复制链接
    $('.copyUrl').click(function () {
        var e = $(this).prev("input");//对象是content
        e.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
        alert("复制成功", tipType.success);
    })

    $('.yqm_div .p1').click(function () {
        $(this).next('.form-group').toggleClass('hide');
        $(this).children('.iconfont').toggleClass('yaoqm_rot');

    })

    //头像上传
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


    //首页公告
   /* $(".logo_scroll").Scroll({line: 1, speed: 1000, timer: 3000});*/
        $(".bulletin").textSlider({line: 1, speed: 1000, timer: 3000});

    //安全保障

    $('.security_list .li1').hover(function(){
        //$(this).addClass('pos_sec');
        $(this).children('.pos_sec').addClass('animated bounceInLeft');
        $(this).children('.pos_sec').show();

    },function(){
        $(this).children('.pos_sec').hide();
    })
    $('.security_list .li2').hover(function(){
        //$(this).addClass('pos_sec');
        $(this).children('.pos_sec').addClass('animated bounceInUp');
        $(this).children('.pos_sec').show();

    },function(){
        $(this).children('.pos_sec').hide();
    })
    $('.security_list .li3').hover(function(){
        //$(this).addClass('pos_sec');
        $(this).children('.pos_sec').addClass('animated bounceInRight');
        $(this).children('.pos_sec').show();

    },function(){
        $(this).children('.pos_sec').hide();
    })
    $('.banner').hover(function(){
        $('.banner_fix').addClass('animated bounceInUp');
        $('.banner_fix').show();
    },function(){
        $('.banner_fix').fadeOut();
    })


})


$(function () {
    var index = 0;
    Swidth = 890;
    timer = null;
    $(".Div1_prev img").hide();
    function NextPage() {
        if (index > 1) {
            index = 0;
        }
        $(".Div1_main").stop(true, false).animate({left: -index * Swidth + "px"}, 600)
    }

    function PrevPage() {
        if (index < 0) {
            index = 1;
        }
        $(".Div1_main").stop(true, false).animate({left: -index * Swidth + "px"}, 600)
    }

    //下一页
    $(".Div1_next img").click(function () {
        index++;
        NextPage();
        $(this).hide();
        $(".Div1_prev img").show();
    });
    //上一页
    $(".Div1_prev img").click(function () {
        index--;
        PrevPage();
        $(this).hide();
        $(".Div1_next img").show();
    });


})//建站套餐

//ie8及以下显示浏览器升级
function getByClass(oParent, sClass) {
    if (oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(sClass);
    } else {
        var re = new RegExp("\\b" + sClass + "\\b");
        var result = [];
        var aEle = oParent.getElementsByTagName("*");
        for (var i = 0; i < aEle.length; i++) {
            if (re.test(aEle[i].className)) {
                result.push(aEle[i]);
            }
        }
        return result;
    }
};

if (window.navigator.userAgent.indexOf('MSIE 6') != -1 || window.navigator.userAgent.indexOf('MSIE 7') != -1 || window.navigator.userAgent.indexOf('MSIE 8') != -1) {
    $('.tmpwen').show();
}

