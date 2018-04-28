// 账户中心通知上下滚动
(function ($) {
    $.fn.extend({
        //通知向上滚动
        Scroll: function (opt, callback) {
            if (!opt) var opt = {};
            var oo;
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height(),//23
                line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10),
                speed = opt.speed ? parseInt(opt.speed, 10) : 7000, //卷动速度，数值越大，速度越慢（毫秒）
                timer = opt.timer ? parseInt(opt.timer, 10) : 7000; //滚动的时间间隔（毫秒）
            if (line == 0) line = 1;
            var upHeight = 0 - line * lineH;//-总高度
            scrollUp = function () {
                _this.animate({
                        marginTop: upHeight // <li>的margin-top
                    }, speed, function () {
                        for (i = 1; i <= line; i++) {
                            _this.find("li:first").appendTo(_this);
                        }
                        _this.css({marginTop: 0});
                    }
                );
            };
            var timerID = function () {
                oo = setInterval("scrollUp()", timer);
            };
            timerID();
            _this.hover(function () {
                clearInterval(oo);
            }, function () {
                timerID();
            }).mouseout(function () {

            });
        },
        //banner淡入淡出
        Banner: function (options) {
            var num = $('.banner_span span').length;
            var i_mun = 0;
            var timer_banner = null;
            $('.banner_ul li:gt(0)').hide();

            function move_banner() {
                if (i_mun == num - 1) {
                    i_mun = -1
                }
                $('.banner_ul li').eq(i_mun + 1).fadeIn('slow').siblings('li').fadeOut('slow');
                $('.banner_span span').eq(i_mun + 1).addClass('banner_active').siblings('span').removeClass('banner_active');
                i_mun++
            }

            function bannerMoveks() {
                timer_banner = setInterval(function () {
                    move_banner()
                }, 3000)
            };
            bannerMoveks();

            $('.banner_main span').hover(function () {
                clearInterval(timer_banner);
            }, function () {
                bannerMoveks();
            });

            this.each(function () {
                var thisTable = $(this);
                $(thisTable).bind("click", function () {
                    $(this).addClass('banner_active').siblings('span').removeClass('banner_active');
                    var i_mun1 = thisTable.index();
                    $('.banner_ul li').eq(i_mun1).fadeIn('slow').siblings('li').fadeOut('slow');
                    i_mun = i_mun1;
                });

            });


        },
        //div点击切换
        SetTableUI: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var num = $(this).index();
                $(thisTable).bind("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $('.setTabMain>div').eq($(this).index()).show().siblings().hide();
                });

            });
        },
        //div移上去切换
        SetTableHover: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var num = $(this).index();
                $(thisTable).hover(function(){
                    $(this).addClass("active").siblings().removeClass("active");
                    $('.setTabMain>div').eq($(this).index()).show().siblings().hide();
                });
            });
        },
        //返回顶部
        ToTop: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var speed = 500;//滚动速度
                var h = document.body.clientHeight
                $(thisTable).bind("click", function () {
                    $('html,body').animate({scrollTop: '0px'}, speed);
                });

            });
        },
        //更换用户头像
        UploadImg: function (options) {
            this.each(function () {
                var thisTable = $(this);
                if ($('.imageBox').length > 0) {
                    var options =
                    {
                        thumbBox: '.thumbBox',
                        spinner: '.spinner',
                        imgSrc: '/img/13_07.png'
                    }
                    var cropper = $('.imageBox').cropbox(options);
                    $('#upload-file').on('change', function () {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            options.imgSrc = e.target.result;
                            cropper = $('.imageBox').cropbox(options);
                        }
                        reader.readAsDataURL(this.files[0]);
                        this.files = [];
                    })
                    $('#btnCrop').on('click', function () {
                        var img = cropper.getDataURL();
                        $('.cropped').html('');
                        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:132px;margin-top:90px;box-shadow:0px 0px 12px #7E7E7E;"><p style="text-align: center;margin-top: 10px;">132px*132px</p>');
                    })
                    $(thisTable).bind("click", function () {
                        var img = cropper.getDataURL();
                        $('.img1').attr('src', img);
                        $(".upload_a").hide();
                        options.imgSrc = '/img/13_07.png';
                        cropper = $('.imageBox').cropbox(options);
                        ZC_api.saveHeadImg(img);
                    })
                }


            });
        },
        //input获得焦点时加边框
        InputBr: function (options) {
            this.each(function () {
                var thisTable = $(this);
                $(thisTable).blur( function () {
                    $(this).css("border-color","#ededed");
                });
                $(thisTable).bind("focus", function () {
                    $(this).css("border-color","#fe8749");
                });

            });
        },
        //合作伙伴自动滚动
        Rolling: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var odiv = document.getElementById('cooperationul');
                var oul = odiv.getElementsByTagName('ul')[0];
                var ali = oul.getElementsByTagName('li');
                var spa = -1;

                if(ali.length<7){

                }else{
                    oul.innerHTML=oul.innerHTML+oul.innerHTML;
                    oul.style.width=ali[0].offsetWidth*ali.length+'px';
                    function move(){
                        if(oul.offsetLeft<-oul.offsetWidth/2){
                            oul.style.left='0';
                        }
                        if(oul.offsetLeft>0){
                            oul.style.left=-oul.offsetWidth/2+'px'
                        }
                        oul.style.left=oul.offsetLeft+spa+'px';
                    }
                    var timer = setInterval(move,30)

                    odiv.onmousemove=function(){clearInterval(timer);}
                    odiv.onmouseout=function(){timer = setInterval(move,30)};
                    document.getElementsByTagName('a')[0].onclick = function(){
                        spa=-2;
                    }
                    document.getElementsByTagName('a')[1].onclick = function(){
                        spa=2;
                    }
                }
            });
        },
        //资质荣誉自动滚动
        HonorRolling: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var odiv = document.getElementById('Div1');
                var oul = odiv.getElementsByTagName('ul')[0];
                var ali = oul.getElementsByTagName('li');
                var spa = -1;

                if(ali.length<3){

                }else{
                    oul.innerHTML=oul.innerHTML+oul.innerHTML;
                    oul.style.width=ali[0].offsetWidth*ali.length+'px';
                    function move(){
                        if(oul.offsetLeft<-oul.offsetWidth/2){
                            oul.style.left='0';
                        }
                        if(oul.offsetLeft>0){
                            oul.style.left=-oul.offsetWidth/2+'px'
                        }
                        oul.style.left=oul.offsetLeft+spa+'px';
                    }
                    var timer = setInterval(move,30)

                    odiv.onmousemove=function(){clearInterval(timer);}
                    odiv.onmouseout=function(){timer = setInterval(move,30)};
                    document.getElementsByTagName('a')[0].onclick = function(){
                        spa=-2;
                    }
                    document.getElementsByTagName('a')[1].onclick = function(){
                        spa=2;
                    }
                }
            });
        },
        TopScroll: function (Swidth,Num,Classname) {
            var index = 0 ;
            var Swidth = Swidth ;
            function NextPage()
            {
                if(index>Num)
                {
                    index = 0 ;
                }
                $("."+Classname+" ul").stop(true, false).animate({top: -index*Swidth+"px"},1000);
            }
            /*自动轮播*/
            var timer = setInterval(function(){
                index++ ;
                NextPage();
            },4000);

            $("."+Classname+" ul div li").mouseover(function(){
                clearInterval(timer);
            });
            $("."+Classname+" ul div li").mouseleave(function(){
                timer = setInterval(function(){
                    index++ ;
                    NextPage();
                },4000);
            });
        },
        wenCount: function(options) {
            this.each(function() {
                var e = $(this);
                var sys_str = e.attr("sysstr"),sys_second = Number(e.attr("systime"));
                e.html(getTimerStr(sys_second));
                var timer = setInterval(function(){
                    if (sys_second > 0){
                        sys_second -= 1;
                        e.html(getTimerStr(sys_second));
                    }else{
                        clearInterval(timer);
                        /*window.location.reload(true);*/
                    }
                }, 1000);
                //时间格式转换
                function getTimerStr(time){
                    if(time>0){
                        //var dd = checkN(parseInt(time/60/60/24,10));
                        //var hh = checkN(parseInt(time/60/60%24,10));
                        var hh = checkN(parseInt(time/60/60,10));
                        var mm = checkN(parseInt(time/60%60,10));
                        var ss = checkN(parseInt(time%60,10));
                        return "<span>" + hh + "</span>时<span>" + mm + "</span>分<span>" + ss + "</span>秒" + sys_str ;
                    }
                    else if(parseInt(time)==0){
                        window.location.reload(true);
                    }
                    else if(time<0){
                        return sys_str + "<span>00</span>时<span>00</span>分<span>00</span>秒";
                    }
                }
            });
            //时间数字转换
            function checkN(s){
                return s < 10 ? "0" + s : s
            }
        },
        //导航条置顶
        FixedNav: function (options) {
            this.each(function () {
                var thisTable = $(this);
                var AllHet = $(window).height();
                var mainHet= $('.floatCtro').height();
                var fixedTop = (AllHet - mainHet)/2
                var navH = $(".floatCtro").offset().top;
                $(window).scroll(function(){
                    var scroH = $(this).scrollTop();
                    if(scroH>=navH){
                        $(".floatCtro").addClass('fixednav');
                    }
                    else if(scroH<navH){
                        $(".floatCtro").removeClass('fixednav');
                    }
                })
                $('div.floatCtro a').click(function(){
                    $('body,html').animate({scrollTop:0},800)
                })
                $(window).scroll(scrolls)
                scrolls()
                function scrolls(){
                    var f1,f2,f3,f4,f5;
                    var fixRight = $('div.floatCtro li');
                    var blackTop = $('div.floatCtro li')
                    var sTop = $(window).scrollTop();
                    fl = ($('#float01').offset().top)-100;
                    f2 = $('#float02').offset().top;
                    f3 = $('#float03').offset().top;
                    f4 = $('#float04').offset().top;
                    f5 = $('#float05').offset().top;
                    if(sTop>=fl){
                        fixRight.eq(0).addClass('cur').siblings().removeClass('cur');
                    }
                    if(sTop>=f2-100){
                        fixRight.eq(1).addClass('cur').siblings().removeClass('cur');
                    }
                    if(sTop>=f3-100){
                        fixRight.eq(2).addClass('cur').siblings().removeClass('cur');
                    }
                    if(sTop>=f4-100){
                        fixRight.eq(3).addClass('cur').siblings().removeClass('cur');
                    }
                    if(sTop>=f5-100){
                        fixRight.eq(4).addClass('cur').siblings().removeClass('cur');
                    }

                }
                $(thisTable).bind("click", function () {
                    var ind = $('div.floatCtro li').index(this)+1;
                    var topVal = $('#float0'+ind).offset().top-50;
                    $('body,html').animate({scrollTop:topVal},800)
                });

            });
        }

    });
})(jQuery);

String.prototype.ReplaceHtml = function (size) {
    var str = this.replace(/<[^>]+>/g, "").replace('&nbsp;', '');
    return str.length > size ? str.substring(0, size) + '......' : str;
}

