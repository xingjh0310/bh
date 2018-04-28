/**
 * Created by pwx on 2016/6/3.
 */
var zckj = {
    checks: {
        amount: {reg: /^\d+$/, msg: '请输入正确的金额'},
        withdraw_amount: {reg: /^\d{1,30}(\.\d{1,2})?$/, msg: '请输入正确的金额'},
        bank: {reg: /\w+/, msg: '请选择银行'},
        cardno: {reg: /\w+/, msg: '请输入银行卡号'},
        validcode: {reg: /\w+/, msg: '请输入验证码'},
        mobile: {reg: /^1[3|4|5|7|8][0-9]\d{8}$/, msg: '请输入11位手机号'},
        nick: {reg: /.+/, msg: '请输入昵称'},
        tradepwd: {reg: /.{6,}/, msg: '输入至少6位交易密码'},
        tradepwd1: {reg: /.{6,}/, reg1: 'tradepwd', msg: '两次交易密码输入不一致'},
        password: {reg: /.{6,}/, msg: '请输入至少6位密码'},
        pwd2: {reg: /.{6,}/, reg1: 'pwd', msg: '两次密码输入不一致'},
        realname: {reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/, msg: '请输入您的真实姓名'},
        idcard: {reg: /\d{17}\w/, msg: '请输入您的身份证号'},
        imagecode: {reg: /\w+/, msg: '请输入验证码'},
        email: {reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, msg: '请输入正确的邮箱地址'}
    }
}
jQuery.fn.extend({
    pager: function (options) {
        var elPager = $(this);
        var defOpt = {
            pageIndex: 1,
            numericPagerItemCount: 10,
            size: 1,
            pageTotal: 1,
            total: null,
            pagerItemCount: 10,

            showPreNext: true,
            prevPageText: '<',
            nextPageText: '>',

            showFirstLast: true,
            firstPageText: '<<',
            lastPageText: '>>',

            showNumericPagerItems: true,

            pagerItemClick: null
        };
        options.pagerItemCount = options.pagerItemCount ? options.pagerItemCount : options.size;
        var opt = $.extend(defOpt, options);
        opt.pageIndex = parseInt(opt.pageIndex, 10);
        opt.pagerItemCount = parseInt(opt.pagerItemCount, 10);
        opt.pageTotal = parseInt(opt.pageTotal, 10);
        if (opt.total && opt.size)
            opt.pageTotal = parseInt(opt.total / opt.size) + ((opt.total % opt.size) > 0 ? 1 : 0);
        elPager.options = opt;

        elPager.addPagerItem = function (text, pageIndex, enabled, type) {
            var $tmpl = $('<a class="page-v" p="' + pageIndex + '"><span>' + text + '</span></a>');
            if (!elPager.options.pagerItemClick) {
                var href = location.href.replace(/[\?&]pn=\d+/, '').replace(/[\?&]s=\d+/, '');
                href += (href.indexOf('?') == -1 ? '?' : '&') + 'pn=' + pageIndex + '&s=' + elPager.options.size;
                $tmpl.attr("href", href);
            }
            //var pagerItem = $("<span p='" + pageIndex + "' class='" + type + "'><a>" + text + "</a></span>").click(function () {
            var pagerItem = $tmpl.click(function () {
                if ($.isFunction(elPager.options.pagerItemClick)) {
                    var p = parseInt($(this).attr("p"), 10);
                    elPager.options.pagerItemClick(p, elPager.options.pagerItemCount);
                }
            });
            if (type == "numeric" && pageIndex == elPager.options.pageIndex) {
                pagerItem.css('background', '#5a98de');
                pagerItem.find('span').css("color", "#ffffff");
            }
            if (enabled) {
                this.append(pagerItem);
            }
        };

        elPager.addFirst = function () {
            this.addPagerItem(this.options.firstPageText, 1, this.options.showFirstLast && this.options.pageIndex > 1, 'first');
        }
        elPager.addPre = function () {
            this.addPagerItem(this.options.prevPageText, this.options.pageIndex - 1, this.options.showPreNext && this.options.pageIndex > 1, 'pre');
        }
        elPager.addNumeric = function (page) {
            this.addPagerItem(page, page, this.options.showNumericPagerItems, 'numeric');
        }
        elPager.addNext = function () {
            this.addPagerItem(this.options.nextPageText, this.options.pageIndex + 1, this.options.showPreNext && this.options.pageIndex < this.options.pageTotal, 'next');
        }
        elPager.addLast = function () {
            this.addPagerItem(this.options.lastPageText, this.options.pageTotal, this.options.showFirstLast && this.options.pageIndex < this.options.pageTotal, 'last');
        }
        var _startPageIndex = opt.pageIndex - parseInt(opt.pagerItemCount / 2);
        if (_startPageIndex + opt.pagerItemCount > opt.pageTotal)
            _startPageIndex = opt.pageTotal + 1 - opt.pagerItemCount;
        if (_startPageIndex < 1)
            _startPageIndex = 1;
        var _endPageIndex = _startPageIndex + opt.pagerItemCount - 1;
        if (_endPageIndex > opt.pageTotal)
            _endPageIndex = opt.pageTotal;

        elPager.addClass("fy").html("");
        elPager.addFirst();
        elPager.addPre();
        if (opt.showNumericPagerItems) {
            for (var i = _startPageIndex; i <= _endPageIndex; i++) {
                elPager.addNumeric(i);
            }
        }
        elPager.addNext();
        elPager.addLast();
        return elPager;
    }, checkForm: function () {
        var valid = true, res = {}, name;
        $.each(this.find("input,select"), function (i, o) {
            var _check = $(o).attr("_check");
            var _allownull = $(o).attr("_allownull");
            var cond = true;
            if (_allownull == "true" && $.trim(o.value).length == 0) {

            }
            else {
                if ((_check == "amount" || _check == "withdraw_amount") && $(this).attr("_max")) {
                    var max = parseFloat($(this).attr("_max"));
                    cond = (parseFloat(this.value) <= max);
                }
                if (_check && cclc.checks[_check]) {
                    if (!$.trim(o.value).match(zckj.checks[_check].reg) || !cond) {
                        $(o).nextAll('p.tips:first').addClass('err').html(zckj.checks[_check].msg);
                        valid = false;
                    }
                    if (zckj.checks[_check].reg1 && $.trim(o.value) != $("input[name='" + zckj.checks[_check].reg1 + "']").val()) {
                        $(o).nextAll('p.tips:first').addClass('err').html(zckj.checks[_check].msg);
                        valid = false;
                    }
                }


                if (valid) {
                    $(o).nextAll('p.tips:first').removeClass('err').html('');
                }
            }
            name = $(o).attr("name");
            if (name) {
                switch (o.type) {
                    case "text":
                    case "hidden":
                    case "select-one":
                    case "password":
                        res[name] = $.trim(o.value);
                        break;
                    case "checkbox":
                        if (o.checked) {
                            res[name] = res[name] || [];
                            res[name].push(o.value);
                        }
                        break;
                    case "radio":
                        if (o.checked) {
                            res[name] = o.value;
                        }
                        break;
                    default:
                        break;

                }
            }
        })
        return valid == false ? valid : res;
    }
});

(function ($) {
    $.addCss = function (t) {
        var style = $("<style type=\"text/css\" ></style>");
        style.append(t);
        $(document.body).append(style);
    }
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var DataProxy = {
    data: {},
    save: function (key, value, cached) {
        this.data[$_seller._id + key] = value;
        if (cached)
            localStorage[$_seller._id + key] = JSON.stringify(value);
    },
    get: function (key) {
        if (this.data[$_seller._id + key])
            return this.data[$_seller._id + key];
        else if (localStorage[$_seller._id + key])
            return JSON.parse(localStorage[$_seller._id + key]);


    },
    //返回删除的数据数量
    remove: function (key, cached) {
        var v = this.get(key);
        delete this.data[$_seller._id + key];
        if (cached)
            delete localStorage[$_seller._id + key];
        return v ? 1 : 0;
    },
    setTmplDta: function (dta, tmpl, format) {
        var that = this;
        var check2 = function (_tmpl, key, dta) {
            var exp, arr, innerText, res = "";
            key = key.replace("$", "\\$");
            if (typeof dta == "string" || typeof dta == "number") {
                return dta ? dta : "";
            }
            if (dta instanceof Array) {
                exp = new RegExp("{x}((.|\n)+){:end x}".replace(/x/g, key));
                arr = _tmpl.match(exp);
                if (!(arr && arr[1]))
                    return JSON.stringify(dta);
                innerText = arr[1];
                for (_k in dta) {
                    res += that.setTmplDta({$value: dta[_k]}, innerText.replace(/{\$key}/, _k))//check2(innerText.replace(/{$key}/,_k),"$value",dta[_k]);
                }
                return res ? res : "";
            }
            else if (dta instanceof Date) {

            }
            else if (dta instanceof Object) {
                exp = new RegExp("{x}((.|\n)+){:end x}".replace(/x/g, key));
                arr = _tmpl.match(exp);
                if (!(arr && arr[1]))
                    return JSON.stringify(dta);
                innerText = arr[1];
                if (innerText.indexOf("{$key}") > -1)
                    for (_k in dta) {
                        res += that.setTmplDta({$value: dta[_k]}, innerText.replace(/{\$key}/, _k))//check2(innerText.replace(/{$key}/,_k),"$value",dta[_k]);
                    }
                else
                    return that.setTmplDta(dta, innerText);
                return res ? res : "";
            }
        }
        return tmpl
            .replace(/{([^}]+)}((.|\n)+){:end \1}/g, function (m1, m2, m3) {
                if (!m3)
                    return "";
                return (format && format[m2]) ? format[m2](dta[m2], dta) : (check2(tmpl, m2, dta[m2]));
            })
            .replace(/{([^}]+)}/g, function (m1, m2) {
                if (!m2)
                    return "";
                return (format && format[m2]) ? format[m2](dta[m2], dta) : (check2(tmpl, m2, dta[m2]));
            })
            .replace(/encodeURIComponent\((.*)\)/g, function (m1, m2) {
                if (!m2)
                    return "";
                return encodeURIComponent(m2.replace(/\%/g, "%25"));
            })
    }
}
$(function () {
    $('.skin-minimal input').iCheck({
        checkboxClass: 'icheckbox-blue',
        radioClass: 'iradio-blue',
        increaseArea: '20%'
    });
});
window.confirm = function (opt, callBack) {
    $('#confirmTitle').text(opt.title);
    $('#confirmContent').text(opt.content);
    $('#confirmOk').text(opt.okText);
    $('#confirmNo').text(opt.noText);
    $('#confirm').click();
    $('#confirmOk').unbind().click(function () {
        opt.ok();
    });
    $('#confirmNo').unbind().click(function () {
        opt.no();
    });
}
_fields = window.parent.__fields;
