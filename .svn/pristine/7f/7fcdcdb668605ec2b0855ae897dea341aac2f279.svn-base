/**
 * Created by Zenas on 2016/8/10.
 */

//安全保障

guarantee();//安全保障中动态效果
function guarantee() {
    var oUlsecurity = $('.securityul')[0];
    var aImg = getByClass(document, 'securityl');
    var aP = getByClass(document, 'securityr');

    $(function () {

        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var winHeight = document.body.offsetHeight || document.documentElement.clientHeight;
        var cliheight = scroll + winHeight-122;

        for (var i = 0; i < oUlsecurity.children.length; i++) {
            //console.log(cliheight +"|"+ oUlsecurity.children[i].offsetTop)
            if (scroll+225 > oUlsecurity.children[i].offsetTop){
                move(aImg[i], {left: 0}, {time: 1000})
                move(aP[i], {right: 0}, {time: 1000})
            }else {

            }
        }
    })
    addMousewheel(oUlsecurity, function (down) {
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var winHeight = document.body.offsetHeight || document.documentElement.clientHeight;
        var cliheight = scroll + winHeight-122;
        if (down) {
            for (var i = 0; i < oUlsecurity.children.length; i++) {
                if (scroll+225 > oUlsecurity.children[i].offsetTop) {
                    move(aImg[i], {left: 0}, {time: 1000});
                    move(aP[i], {right: 0}, {time: 1000});
                }
            }
        }
    })

    function addMousewheel(obj, fn) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            obj.addEventListener('DOMMouseScroll', fnwheel, false)
        } else {
            obj.onmousewheel = fnwheel;
        }

        function fnwheel(ev) {
            var oEvt = ev || event;
            var down = true;
            if (oEvt.wheelDelta) {
                down = oEvt.wheelDelta < 0 ? true : false;
            } else {
                down = oEvt.detail > 0 ? true : false;
            }
            fn(down);
        }

        return false;
    };

    $('.securityul li').each(function () {
        $(this).css('top', $(this).index() * $(this).height() - 130 + "px");

    })
    $('.securityul li').eq(0).css('top', '0');

    $('.securityul li h5 img').each(function () {
        var marginimg = (450 - $(this).height()) / 2;
        $(this).css('top', marginimg + 'px')
    });
    $('.securityul li h5 p').each(function () {
        var marginp = (450 - $(this).height()) / 2;
        $(this).css('top', marginp + 'px')
    });

    $('.securityul li').eq(6).css('top','2570px')
}
function getByClass(oParent, sClass) {
    if (oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(sClass);
    }
    var re = new RegExp("\\b" + sClass + "\\b");
    var result = [];
    var aEle = oParent.getElementsByTagName("*");
    for (var i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            result.push(aEle[i]);
        }
    }
    return result;
};
function move(obj, json, optional) {

    var optional = optional || {};
    optional.time = optional.time || 300;
    optional.fn = optional.fn || null;
    optional.type = optional.type || 'ease-out';

    var start = {};
    var dis = {};
    for (var key in json) {
        start[key] = parseFloat(getStyle(obj, key));
        dis[key] = json[key] - start[key];
    }
    var count = Math.round(optional.time / 30);
    var n = 0;

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        n++;
        //办事
        for (var key in json) {

            //确定运动方式
            switch (optional.type) {
                case 'linear':
                    var a = n / count;
                    var cur = start[key] + dis[key] * a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[key] + dis[key] * a * a * a
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var cur = start[key] + dis[key] * (1 - a * a * a);
                    break;

            }

            if (key == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
            } else {
                obj.style[key] = cur + 'px';
            }
        }

        if (n == count) {
            clearInterval(obj.timer);
            optional.fn && optional.fn();
        }
    }, 30);
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }
}