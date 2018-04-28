/**
 * Created by pwx on 2016/8/4.
 */
var zckj = {
    checks: {
        amount: {reg: /^\+?[1-9][0-9]*$/, msg: '请输入正确的金额'},
        balance: {reg: /^\+?[0-9][0-9]*$/, msg: '请输入正确的金额'},
        withdraw_amount: {reg: /^\d{3,30}(\.\d{1,2})?$/, msg: '请输入正确的金额'},
        bank: {reg: /\w+/, msg: '请选择银行'},
        cardno: {reg: /^(\d{16}|\d{18}|\d{19})$/, msg: '请输入正确的银行卡号'},
        validcode: {reg: /\w+/, msg: '请输入验证码'},
        mobile: {reg: /^1[3|4|5|7|8][0-9]\d{8}$/, msg: '请输入正确的11位手机号码'},
        nick: {reg: /.+/, msg: '请输入昵称'},
        tradepwd: {reg: /^(?!\$)\S{6,20}$/, msg: '输入6位至20位交易密码'},
        tradepwd1: {reg: /^(?!\$)\S{6,20}$/, reg1: 'tradePwd', msg: '两次交易密码输入不一致'},
        password: {reg: /^(?!\$)\S{6,20}$/, msg: '请输入6位至20位密码'},
        pwd2: {reg: /^(?!\$)\S{6,20}$/, reg1: 'pwd', msg: '两次密码输入不一致'},
        realname: {reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/, msg: '请输入您的真实姓名'},
        idcard: {reg: /\d{17}\w/, msg: '请输入您的身份证号'},
        imagecode: {reg: /\w+/, msg: '请输入验证码'},
        email: {reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, msg: '请输入正确的邮箱地址'},
        notnull: {reg: /.+/, msg: '不能为空'},
        branch: {reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/, msg: '支行信息不能为空'},
        province: {reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/, msg: '请选择省份'},
        city: {reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/, msg: '请选择市区'}
    }
}
jQuery.fn.extend({
    pager: function (options) {
        var elPager = $(this).find('ol');
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

            showFirstLast: false,
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
            var $li = $('<li></li>')
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
                pagerItem.addClass("cur");
            }
            if (enabled) {
                $li.append(pagerItem);
                this.append($li);
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
        elPager.addPre('');
        if (opt.showNumericPagerItems) {
            for (var i = _startPageIndex; i <= _endPageIndex; i++) {
                elPager.addNumeric(i);
            }
        }
        elPager.addNext();
        elPager.addLast();
        return elPager;
    },
    checkForm: function () {
        var valid = true, res = {}, name;
        $.each(this.find("input,select"), function (i, o) {
            var _check = $(o).attr("_check");
            var cond = true;
            if ((_check == "amount" || _check == "withdraw_amount") && $(this).attr("_max")) {
                var max = parseFloat($(this).attr("_max"));
                cond = (parseFloat(this.value) <= max);
            }
            if ((_check == "amount" || _check == "withdraw_amount") && $(this).attr("_min")) {
                var min = parseFloat($(this).attr("_min"));
                cond = (parseFloat(this.value) > min);
            }
            if (_check && zckj.checks[_check]) {
                if (!$.trim(o.value).match(zckj.checks[_check].reg) || !cond) {
                    $(o).addClass('err');
                    //$(o).nextAll('div.tips:first').html(zckj.checks[_check].msg).show();
                    $(o).parents('form').children('.tipsYz').html(zckj.checks[_check].msg).fadeIn();
                    valid = false;
                    return false;
                }
                if (zckj.checks[_check].reg1 && $.trim(o.value) != $("input[name='" + zckj.checks[_check].reg1 + "']").val()) {
                    //$(o).nextAll('div.tips:first').html(zckj.checks[_check].msg).show();
                    $(o).addClass('err');
                    $(o).parents('form').children('.tipsYz').html(zckj.checks[_check].msg).fadeIn();
                    valid = false;
                    return false;
                }
            }
            if (valid)
                $(o).parents('form').children('.tipsYz').html('').hide();
            $(o).removeClass('err');

            //$(o).removeClass('err').val('');
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

var ZC_api = {
    loadInvests: function (pn, size) {
        var ele = $('#invest_list');
        var pager = $('#page');
        $.post("/debt/getInvests", {
            pn: pn,
            s: size,
            debtId: $('#debtId').val()
        }, function (res) {
            var tmpl = $('#invest_tmpl').html();
            var full_flag=$("#full_flag").val();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return (size * (pn - 1)) + i + 1;
                        },
                        mobile: function (x) {
                            if(i==0 && full_flag=='1' &&　res && res.pageno==1){
                                return x + "<img src='/img/show1.png' style=' position: absolute;'/>";
                            }else{
                                return x;
                            }
                        },
                        amount: function (x) {
                            return x.toFixed(2);
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        bonusAmount: function (x) {
                            return x.toFixed(2);
                        },
                        award: function (x) {
                            if (o.awardType == 1)
                                return '<span class="awardspan">' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                            else if (o.awardType == 2)
                                return '<span class="awardspan">' + (o.awardNumber) + '元' + '</span>';
                            else
                                return '';
                        }
                        ,   route:function(x){
                            if(o.route==1){
                                return 'PC';
                            }else if(o.route==2){
                                return 'IOS';
                            }else if (o.route==3){
                                return 'Android';
                            }else if(o.route==4) {
                                return '微端';
                            }else if(o.route==5) {
                                return '自动投标';
                            }else {
                                return '其他';
                            }

                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadInvests(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadBonusRecord: function (pn, size, state) {
        var ele = $('#bonus' + state + '_list');
        var pager = $('#page' + state);
        $.post("/account/getBonusRecord", {
            pn: pn,
            s: size,
            state: state,
            isExpiry: state == _gbl.state.Cancel.v ? true : false
        }, function (res) {
            var tmpl = $('#bonus' + state + '_tmpl').html();
            var arr = [];
            $('#total' + state).text(res.total);
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        buy_amount: function (x) {
                            return x > 0 ? '单次购买' + x + '元可使用' : '单次购买金额无限制';
                        },
                        begin_time: function (x) {
                            return new Date(x).Format('yyyy.MM.dd')
                        },
                        end_time: function (x) {
                            return new Date(x).Format('yyyy.MM.dd')
                        },
                        period: function (x) {
                            return x > 0 ? '大于等于' + x : '';
                        },
                        product_type: function (x) {
                            return x > 0 ? getDesc(_gbl.productType, x) + '使用' : '项目类型无限制';
                        },
                        period_unit: function (x) {
                            return x > 0 ? getDesc(_gbl.periodUnit, x) + '标使用' : '天（月）标使用';
                        },
                        state: function (x) {
                            if (new Date().getTime() > o.end_time && x == _gbl.state.Wait.v)
                                return 'w4';
                            else
                                return 'w2';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBonusRecord(pn, s, state);
                    }
                });
            } else {

                $(ele).html('').append("<img src='/img/nob.png' class='bonus_no'>");
            }
        });
    },
    loadPaymentByDay: function (time) {
        var start = new Date(time);
        $('.acc_month').html(start.getMonth() + 1);
        $('.acc_date').html(start.getDate());

        $.post("/account/getPaymentByDay", {time: time}, function (res) {
            $('#totalCorpus').text(res.totalCorpus.toFixed(2) || 0);
            $('#totalInterest').text(res.totalInterest.toFixed(2) || 0);

            $('#paymentDetail').empty();
            for (var i = 0; i < res.list.length; i++) {
                $('#paymentDetail').append('<tr> <th>' + res.list[i].title + '</th> <th>' + res.list[i].periods + '/' + res.list[i].max_periods + '</th> <th>' + (res.list[i].state == _gbl.state.Wait.v ? '等待回款' : '已回款') + '</th> </tr>');
            }
        })
    },
    loadCashFlow: function (pn, size) {
        var ele = $('#cashflow_list');
        var pager = $('#page');
        $.post("/account/getCashFlow", {
            pn: pn,
            s: size,
            type: $('#type').val(),
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#cashflow_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        type: function (x) {
                            return getDesc(_gbl.fundType, x);
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        amount: function (x) {
                            return x > 0 ? '<span style="color: #fe8749;">+' + x + '</span>' : '<span style="color: #6dbe43;">-' + (x * -1).toFixed(2) + '</span>';
                        },
                        balance: function (x) {
                            return x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadCashFlow(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                pager.find('li').remove();
            }
        });
    },
    loadFreeze: function (pn, size) {
        var ele = $('#freeze_list');
        var pager = $('#page');
        $.post("/account/getFreeze", {
            pn: pn,
            s: size,
            type: $('#type').val(),
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#freeze_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        type: function (x) {
                            return getDesc(_gbl.fundType, x);
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        state: function (x) {
                            if (_gbl.state.Complete.v == x)
                                return '已释放';
                            else if (_gbl.state.Wait.v == x)
                                return '等待处理';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadFreeze(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadRecharges: function (pn, size) {
        var ele = $('#recharge_list');
        var pager = $('#page');
        $.post("/account/getRecharges", {
            pn: pn,
            s: size,
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#recharge_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        isCompleted: function (x) {
                            return o.is_completed ? '已完成' : '未完成';
                        },
                        gatWay: function (x) {
                            return getDesc(_gbl.gatWay, o.gatway);
                        },
                        balance: function (x) {
                            return x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadRecharges(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                pager.find('li').remove();
            }
        });
    },
    loadWithdraws: function (pn, size) {
        var ele = $('#withdraw_list');
        var pager = $('#page');
        $.post("/account/getWithdraws", {
            pn: pn,
            s: size,
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#withdraw_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        payTime: function (x) {
                            var t = _gbl.state.Cancel.v == o.audit_state ? o.audit_time : o.pay_time;
                            return t ? new Date(t).Format('yyyy-MM-dd hh:mm:ss') : '';
                        },
                        payState: function (x) {
                            if (_gbl.state.Cancel.v == o.audit_state || _gbl.state.Cancel.v == o.pay_state)
                                return '未通过';
                            else if (_gbl.state.Wait.v == o.pay_state)
                                return '待审核';
                            else if (_gbl.state.Complete.v == o.pay_state)
                                return '已通过';
                        },
                        memo: function (x) {
                            return x || '';
                        },
                        amount: function (x) {
                            return x.toFixed(2);
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadWithdraws(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadPayments: function (pn, size) {
        var ele = $('#payment_list');
        var pager = $('#page');
        $.post("/account/getPayments", {
            pn: pn,
            s: size,
            beginTime: $('#start').val(),
            endTime: $('#end').val(),
            type: $('#type').val(),
        }, function (res) {
            var tmpl = $('#payment_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        payment_time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        title: function (x) {
                            if(o.state == _gbl.state.Cancel.v){
                                return '<a href="javascript:;" onclick="Cancles()">' + x + '</a>';
                            }else{
                                return '<a href="/debt/' + o.debt_id + '">' + x + '</a>';
                            }
                        },
                        total: function (x) {
                            return (o.payment_corpus + o.payment_interest).toFixed(2);
                        },
                        state: function (x) {
                            if (x == _gbl.state.Cancel.v)
                                return '已撤标';
                            if (x == _gbl.state.Wait.v)
                                return '等待回款';
                            if (x == _gbl.state.Complete.v)
                                return '已回款';
                        },
                        payment_interest: function (x) {
                            return x || 0
                        },
                        payment_corpus: function (x) {
                            return x || 0;
                        },
                        payment_coupon_interest:function(x){
                            return x|| 0;
                        },
                        real_payment_time: function (x) {
                            return x ? new Date(x).Format('yyyy-MM-dd') : '';
                        },
                        total_payment: function (x) {
                            return (o.real_payment_corpus + o.real_payment_interest + (o.state == _gbl.state.Complete.v ? o.overdue_fine : 0)).toFixed(2);
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadPayments(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                pager.find('li').remove();
            }
        });
    },
    getExpect: function (debtId, amount, obj) {
        if ((/^\+?[1-9][0-9]*$/).test(amount)) {
            $.post('/debt/getExpect', {debtId: debtId, amount: amount}, function (res) {
                $(obj).text(res || 0);
            })
        }
    },
    loadCouponRecord: function (pn, size, state) {
        var ele = $('#coupon' + state + '_list');
        var pager = $('#page' + state);
        $.post("/account/getCouponRecord", {
            pn: pn,
            s: size,
            state: state
        }, function (res) {
            var tmpl = $('#coupon' + state + '_tmpl').html();
            var arr = [];
            $('#total' + state).text(res.total);
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        buy_amount: function (x) {
                            return x > 0 ? '单次购买' + x + '元可使用' : '单次购买金额无限制';
                        },
                        begin_time: function (x) {
                            return new Date(x).Format('yyyy.MM.dd')
                        },
                        end_time: function (x) {
                            return new Date(x).Format('yyyy.MM.dd')
                        },
                        period: function (x) {
                            return x > 0 ? '大于等于' + x : '';
                        },
                        product_type: function (x) {
                            return x > 0 ? getDesc(_gbl.productType, x) + '使用' : '项目类型无限制';
                        },
                        period_unit: function (x) {
                            return x > 0 ? getDesc(_gbl.periodUnit, x) + '标使用' : '天（月）标使用';
                        },
                        state: function (x) {
                            if (new Date().getTime() > o.end_time && x == _gbl.state.Wait.v)
                                return 'w4';
                            else
                                return 'w2';
                        },
                        rate:function(x){
                            if (x && !isNaN(x) && parseFloat(x)>0 && parseFloat(x)<1)
                                return parseFloat((parseFloat(x)*100).toFixed(2))+"%"
                            else
                                return '0%';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadCouponRecord(pn, s, state);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/coupon_none.png' class='hb_photo' style='display: block;margin: auto;margin-top: 100px;'> ");
            }
        });
    },
    loadAccountInvests: function (pn, size) {
        var ele = $('#invest_list');
        var pager = $('#page');
        $.post("/account/getInvests", {
            pn: pn,
            s: size,
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#invest_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        title: function (x) {

                            return '<a href="/debt/' + o.debtId + '">' + x + '</a>';
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        debtRate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        period: function (x) {
                            return o.debtPeriod + (o.debtPeriodUnit == _gbl.periodUnit.Month.v ? '个月' : '天');
                        },
                        isAutomaticInvest: function (x) {
                            return x ? '自动' : '手动';
                        },
                        bonusAmount: function (x) {
                            return x.toFixed(2);
                        },
                        amount: function (x) {
                            return x.toFixed(2);
                        },
                        down: function (x) {
                            if (o.protocol){
                                if(o.state == _gbl.state.Cancel.v){
                                    return '<a href="javascript:" onclick="Cancle()" >下载 </a>';
                                }else{
                                    return '<a href="/protocol/' + o.protocol + '" target="_blank">下载</a>';
                                }
                            }else{
                                return '--';
                            }
                        },
                        state: function (x) {
                            return (x == _gbl.state.Complete.v || x == _gbl.state.Wait.v) ? '成功' : '撤销';
                        },
                        couponRate:function(x){
                            if(x && !isNaN(x) &&  parseFloat(x)>0&& parseFloat(x)<1 ){
                                return parseFloat((parseFloat(x)*100).toFixed(2));
                            }else{
                                return 0;
                            }
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAccountInvests(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                pager.find('li').remove();
            }
        });
    },
    loadDebt: function (pn, size, product) {
        var ele = $('#debt_list');
        var pager = $('#page');
        $.post("/debt/getListInList", {
            pn: pn,
            s: size,
            product: product,
        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#debt_tmpl').html();
                var arr = [];
                var arr2 = [];
                var arr3 = [];
                var arr4 = [];
                var arr5 = [];
                $.each(res.list, function (i, o) {
                    if(o.debtType ==1){
                        arr2.push(DataProxy.setTmplDta(o, tmpl, {
                            title: function (x) {
                                return '<a href="/debt/' + o.id + '" target="_blank">' + x + '</a>';
                            },
                            rate: function (x) {
                                if(o.increaseRate && parseFloat(o.increaseRate)>0 && parseFloat(o.increaseRate)<o.rate){
                                    return parseFloat(((o.rate-o.increaseRate) * 100).toFixed(2))+"<lable style='font-size:15px;'>+</lable>"+ "<lable style='font-size:18px;'>"+parseFloat((o.increaseRate * 100).toFixed(2))+"</lable>";
                                }else{
                                    return parseFloat((parseFloat(x) * 100).toFixed(2));
                                }
                            },
                            amount: function (x) {
                                return x;
                            },
                            period: function (x) {
                                return x;
                            },
                            periodUnit: function (x) {
                                if (parseInt(x) == _gbl.periodUnit.Month.v)
                                    return '个月';
                                return '天';
                            },
                            isCut: function (x) {
                                if (x)
                                    return '<span style="color: red;" class="awardspan">已截标</span>';
                                return '';
                            },
                            productType: function (x) {
                                if (x == 5 && o.state == _gbl.debtState.ApprovalPass.v )
                                    return '<img src="/img/index_xin.png" style="position: absolute;top:0px;right:0px;">';
                                else if(x == 5 && o.state != _gbl.debtState.ApprovalPass.v && o.beginTime <o.nowtime)
                                    return '<img src="/img/index_xin3.png" style="position: absolute;top:0px;right:0px;">';
                                return '';
                            },
                            increaseRate:function(x){
                                if (o.increaseRate) {
                                    return '<span style="margin-left:8px;background-color: #fffcf2;border: 1px solid #ffcf4c;color: #ffa200" class="awardspan">加息</span>'
                                } else {
                                    return '';
                                }
                            },
                            surplus: function (x) {
                                return (o.amount - o.investedAmount).toFixed(2);
                            },
                            state: function (x) {
                                if (o.beginTime >o.nowtime)
                                    return '<a class="btn"  href="/debt/' + o.id + '"  style="font-size: 14px;"><div class="countdown" systime="' + (o.beginTime - o.nowtime)/1000+ '" sysstr="后开始"></div></a>';
                                else if (x == _gbl.debtState.ApprovalPass.v)
                                    return '<a class="btn"  href="/debt/' + o.id + '">立即投资</a>';
                                else if (x == _gbl.debtState.InPayment.v || x == _gbl.debtState.Overdue.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">还款中</a>';
                                else if (x == _gbl.debtState.EndPayment.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">已还款</a>';
                                return '';
                            },
                            stateClass: function (x) {
                                if (o.state == _gbl.debtState.ApprovalPass.v)
                                    return '';
                                else
                                    return 'opaClass';

                            },
                            investedAmount: function (x) {
                                if (parseFloat(o.amount) - parseFloat(o.investedAmount) == 0)
                                    return '已满标';
                                return getDesc(_gbl.debtState, o.state);
                            },
                            schedule: function (x) {
                                return (parseFloat(x) * 100).toFixed(2);
                            },
                            award: function (x) {
                                if (o.awardType == 1)
                                    return '<span class="awardspan">' + '奖' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                                else if (o.awardType == 2)
                                    return '<span class="awardspan">' + '奖' + (o.awardNumber) + '元' + '</span>';
                                else
                                    return '';
                            },
                            is_new: function (x) {
                                if (o.isNew == true) {
                                    return '<span class="awardspan">仅限首投</span>';
                                } else {
                                    return ''
                                }
                            },
                            full_award: function (x) {
                                if ((parseFloat(o.schedule) * 100).toFixed(0) >= 80 && (parseFloat(o.schedule) * 100).toFixed(0) < 100 && !o.isCut &&  new Date() > new Date('2017/12/31 23:59:59'))
                                    return '<span class="awardspan" style="margin-left:8px;background-color: #fff9f2;border: 1px solid #ffc17f;color: #ff8a10">满奖¥10</span>';
                                else
                                    return '';
                            },
                        }));
                    }else if(o.debtType ==2){
                        arr3.push(DataProxy.setTmplDta(o, tmpl, {
                            title: function (x) {
                                return '<a href="/debt/' + o.id + '" target="_blank">' + x + '</a>';
                            },
                            rate: function (x) {
                                if(o.increaseRate && parseFloat(o.increaseRate)>0 && parseFloat(o.increaseRate)<o.rate){
                                    return parseFloat(((o.rate-o.increaseRate) * 100).toFixed(2))+"<lable style='font-size:15px;'>+</lable>"+ "<lable style='font-size:18px;'>"+parseFloat((o.increaseRate * 100).toFixed(2))+"</lable>";
                                }else{
                                    return parseFloat((parseFloat(x) * 100).toFixed(2));
                                }
                            },
                            amount: function (x) {
                                return x;
                            },
                            period: function (x) {
                                return x;
                            },
                            periodUnit: function (x) {
                                if (parseInt(x) == _gbl.periodUnit.Month.v)
                                    return '个月';
                                return '天';
                            },
                            isCut: function (x) {
                                if (x)
                                    return '<span style="color: red;" class="awardspan">已截标</span>';
                                return '';
                            },
                            productType: function (x) {
                                if (x == 5 && o.state == _gbl.debtState.ApprovalPass.v )
                                    return '<img src="/img/index_xin.png" style="position: absolute;top:0px;right:0px;">';
                                else if(x == 5 && o.state != _gbl.debtState.ApprovalPass.v && o.beginTime <o.nowtime)
                                    return '<img src="/img/index_xin3.png" style="position: absolute;top:0px;right:0px;">';
                                return '';
                            },
                            increaseRate:function(x){
                                if (o.increaseRate) {
                                    return '<span style="margin-left:8px;background-color: #fffcf2;border: 1px solid #ffcf4c;color: #ffa200" class="awardspan">加息</span>'
                                } else {
                                    return '';
                                }
                            },
                            surplus: function (x) {
                                return (o.amount - o.investedAmount).toFixed(2);
                            },
                            state: function (x) {
                                if (o.beginTime >o.nowtime)
                                    return '<a class="btn"  href="/debt/' + o.id + '"  style="font-size: 14px;"><div class="countdown" systime="' + (o.beginTime - o.nowtime)/1000+ '" sysstr="后开始"></div></a>';
                                else if (x == _gbl.debtState.ApprovalPass.v)
                                    return '<a class="btn"  href="/debt/' + o.id + '">立即投资</a>';
                                else if (x == _gbl.debtState.InPayment.v || x == _gbl.debtState.Overdue.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">还款中</a>';
                                else if (x == _gbl.debtState.EndPayment.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">已还款</a>';
                                return '';
                            },
                            stateClass: function (x) {
                                if (o.state == _gbl.debtState.ApprovalPass.v)
                                    return '';
                                else
                                    return 'opaClass';

                            },
                            investedAmount: function (x) {
                                if (parseFloat(o.amount) - parseFloat(o.investedAmount) == 0)
                                    return '已满标';
                                return getDesc(_gbl.debtState, o.state);
                            },
                            schedule: function (x) {
                                return (parseFloat(x) * 100).toFixed(2);
                            },
                            award: function (x) {
                                if (o.awardType == 1)
                                    return '<span class="awardspan">' + '奖' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                                else if (o.awardType == 2)
                                    return '<span class="awardspan">' + '奖' + (o.awardNumber) + '元' + '</span>';
                                else
                                    return '';
                            },
                            is_new: function (x) {
                                if (o.isNew == true) {
                                    return '<span class="awardspan">仅限首投</span>';
                                } else {
                                    return ''
                                }
                            },
                            full_award: function (x) {
                                if ((parseFloat(o.schedule) * 100).toFixed(0) >= 80 && (parseFloat(o.schedule) * 100).toFixed(0) < 100 && !o.isCut &&  new Date() > new Date('2017/12/31 23:59:59'))
                                    return '<span class="awardspan" style="margin-left:8px;background-color: #fff9f2;border: 1px solid #ffc17f;color: #ff8a10">满奖¥10</span>';
                                else
                                    return '';
                            },
                        }));
                    }else if(o.debtType ==3){
                        arr4.push(DataProxy.setTmplDta(o, tmpl, {
                            title: function (x) {
                                return '<a href="/debt/' + o.id + '" target="_blank">' + x + '</a>';
                            },
                            rate: function (x) {
                                if(o.increaseRate && parseFloat(o.increaseRate)>0 && parseFloat(o.increaseRate)<o.rate){
                                    return parseFloat(((o.rate-o.increaseRate) * 100).toFixed(2))+"<lable style='font-size:15px;'>+</lable>"+ "<lable style='font-size:18px;'>"+parseFloat((o.increaseRate * 100).toFixed(2))+"</lable>";
                                }else{
                                    return parseFloat((parseFloat(x) * 100).toFixed(2));
                                }
                            },
                            amount: function (x) {
                                return x;
                            },
                            period: function (x) {
                                return x;
                            },
                            periodUnit: function (x) {
                                if (parseInt(x) == _gbl.periodUnit.Month.v)
                                    return '个月';
                                return '天';
                            },
                            isCut: function (x) {
                                if (x)
                                    return '<span style="color: red;" class="awardspan">已截标</span>';
                                return '';
                            },
                            productType: function (x) {
                                if (x == 5 && o.state == _gbl.debtState.ApprovalPass.v )
                                    return '<img src="/img/index_xin.png" style="position: absolute;top:0px;right:0px;">';
                                else if(x == 5 && o.state != _gbl.debtState.ApprovalPass.v && o.beginTime <o.nowtime)
                                    return '<img src="/img/index_xin3.png" style="position: absolute;top:0px;right:0px;">';
                                return '';
                            },
                            increaseRate:function(x){
                                if (o.increaseRate) {
                                    return '<span style="margin-left:8px;background-color: #fffcf2;border: 1px solid #ffcf4c;color: #ffa200" class="awardspan">加息</span>'
                                } else {
                                    return '';
                                }
                            },
                            surplus: function (x) {
                                return (o.amount - o.investedAmount).toFixed(2);
                            },
                            state: function (x) {
                                if (o.beginTime >o.nowtime)
                                    return '<a class="btn"  href="/debt/' + o.id + '"  style="font-size: 14px;"><div class="countdown" systime="' + (o.beginTime - o.nowtime)/1000+ '" sysstr="后开始"></div></a>';
                                else if (x == _gbl.debtState.ApprovalPass.v)
                                    return '<a class="btn"  href="/debt/' + o.id + '">立即投资</a>';
                                else if (x == _gbl.debtState.InPayment.v || x == _gbl.debtState.Overdue.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">还款中</a>';
                                else if (x == _gbl.debtState.EndPayment.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">已还款</a>';
                                return '';
                            },
                            stateClass: function (x) {
                                if (o.state == _gbl.debtState.ApprovalPass.v)
                                    return '';
                                else
                                    return 'opaClass';

                            },
                            investedAmount: function (x) {
                                if (parseFloat(o.amount) - parseFloat(o.investedAmount) == 0)
                                    return '已满标';
                                return getDesc(_gbl.debtState, o.state);
                            },
                            schedule: function (x) {
                                return (parseFloat(x) * 100).toFixed(2);
                            },
                            award: function (x) {
                                if (o.awardType == 1)
                                    return '<span class="awardspan">' + '奖' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                                else if (o.awardType == 2)
                                    return '<span class="awardspan">' + '奖' + (o.awardNumber) + '元' + '</span>';
                                else
                                    return '';
                            },
                            is_new: function (x) {
                                if (o.isNew == true) {
                                    return '<span class="awardspan">仅限首投</span>';
                                } else {
                                    return ''
                                }
                            },
                            full_award: function (x) {
                                if ((parseFloat(o.schedule) * 100).toFixed(0) >= 80 && (parseFloat(o.schedule) * 100).toFixed(0) < 100 && !o.isCut &&  new Date() > new Date('2017/12/31 23:59:59'))
                                    return '<span class="awardspan" style="margin-left:8px;background-color: #fff9f2;border: 1px solid #ffc17f;color: #ff8a10">满奖¥10</span>';
                                else
                                    return '';
                            },
                        }));
                    }else if(o.debtType ==4){
                        arr5.push(DataProxy.setTmplDta(o, tmpl, {
                            title: function (x) {
                                return '<a href="/debt/' + o.id + '" target="_blank">' + x + '</a>';
                            },
                            rate: function (x) {
                                if(o.increaseRate && parseFloat(o.increaseRate)>0 && parseFloat(o.increaseRate)<o.rate){
                                    return parseFloat(((o.rate-o.increaseRate) * 100).toFixed(2))+"<lable style='font-size:15px;'>+</lable>"+ "<lable style='font-size:18px;'>"+parseFloat((o.increaseRate * 100).toFixed(2))+"</lable>";
                                }else{
                                    return parseFloat((parseFloat(x) * 100).toFixed(2));
                                }
                            },
                            amount: function (x) {
                                return x;
                            },
                            period: function (x) {
                                return x;
                            },
                            periodUnit: function (x) {
                                if (parseInt(x) == _gbl.periodUnit.Month.v)
                                    return '个月';
                                return '天';
                            },
                            isCut: function (x) {
                                if (x)
                                    return '<span style="color: red;" class="awardspan">已截标</span>';
                                return '';
                            },
                            productType: function (x) {
                                if (x == 5 && o.state == _gbl.debtState.ApprovalPass.v )
                                    return '<img src="/img/index_xin.png" style="position: absolute;top:0px;right:0px;">';
                                else if(x == 5 && o.state != _gbl.debtState.ApprovalPass.v && o.beginTime <o.nowtime)
                                    return '<img src="/img/index_xin3.png" style="position: absolute;top:0px;right:0px;">';
                                return '';
                            },
                            increaseRate:function(x){
                                if (o.increaseRate) {
                                    return '<span style="margin-left:8px;background-color: #fffcf2;border: 1px solid #ffcf4c;color: #ffa200" class="awardspan">加息</span>'
                                } else {
                                    return '';
                                }
                            },
                            surplus: function (x) {
                                return (o.amount - o.investedAmount).toFixed(2);
                            },
                            state: function (x) {
                                if (o.beginTime >o.nowtime)
                                    return '<a class="btn"  href="/debt/' + o.id + '"  style="font-size: 14px;"><div class="countdown" systime="' + (o.beginTime - o.nowtime)/1000+ '" sysstr="后开始"></div></a>';
                                else if (x == _gbl.debtState.ApprovalPass.v)
                                    return '<a class="btn"  href="/debt/' + o.id + '">立即投资</a>';
                                else if (x == _gbl.debtState.InPayment.v || x == _gbl.debtState.Overdue.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">还款中</a>';
                                else if (x == _gbl.debtState.EndPayment.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">已还款</a>';
                                return '';
                            },
                            stateClass: function (x) {
                                if (o.state == _gbl.debtState.ApprovalPass.v)
                                    return '';
                                else
                                    return 'opaClass';

                            },
                            investedAmount: function (x) {
                                if (parseFloat(o.amount) - parseFloat(o.investedAmount) == 0)
                                    return '已满标';
                                return getDesc(_gbl.debtState, o.state);
                            },
                            schedule: function (x) {
                                return (parseFloat(x) * 100).toFixed(2);
                            },
                            award: function (x) {
                                if (o.awardType == 1)
                                    return '<span class="awardspan">' + '奖' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                                else if (o.awardType == 2)
                                    return '<span class="awardspan">' + '奖' + (o.awardNumber) + '元' + '</span>';
                                else
                                    return '';
                            },
                            is_new: function (x) {
                                if (o.isNew == true) {
                                    return '<span class="awardspan">仅限首投</span>';
                                } else {
                                    return ''
                                }
                            },
                            full_award: function (x) {
                                if ((parseFloat(o.schedule) * 100).toFixed(0) >= 80 && (parseFloat(o.schedule) * 100).toFixed(0) < 100 && !o.isCut &&  new Date() > new Date('2017/12/31 23:59:59'))
                                    return '<span class="awardspan" style="margin-left:8px;background-color: #fff9f2;border: 1px solid #ffc17f;color: #ff8a10">满奖¥10</span>';
                                else
                                    return '';
                            },
                        }));
                    }else{
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            title: function (x) {
                                return '<a href="/debt/' + o.id + '" target="_blank">' + x + '</a>';
                            },
                            rate: function (x) {
                                if(o.increaseRate && parseFloat(o.increaseRate)>0 && parseFloat(o.increaseRate)<o.rate){
                                    return parseFloat(((o.rate-o.increaseRate) * 100).toFixed(2))+"<lable style='font-size:15px;'>+</lable>"+ "<lable style='font-size:18px;'>"+parseFloat((o.increaseRate * 100).toFixed(2))+"</lable>";
                                }else{
                                    return parseFloat((parseFloat(x) * 100).toFixed(2));
                                }
                            },
                            amount: function (x) {
                                return x;
                            },
                            period: function (x) {
                                return x;
                            },
                            periodUnit: function (x) {
                                if (parseInt(x) == _gbl.periodUnit.Month.v)
                                    return '个月';
                                return '天';
                            },
                            isCut: function (x) {
                                if (x)
                                    return '<span style="color: red;" class="awardspan">已截标</span>';
                                return '';
                            },
                            productType: function (x) {
                                if (x == 5 && o.state == _gbl.debtState.ApprovalPass.v )
                                    return '<img src="/img/index_xin.png" style="position: absolute;top:0px;right:0px;">';
                                else if(x == 5 && o.state != _gbl.debtState.ApprovalPass.v && o.beginTime <o.nowtime)
                                    return '<img src="/img/index_xin3.png" style="position: absolute;top:0px;right:0px;">';
                                return '';
                            },
                            increaseRate:function(x){
                                if (o.increaseRate) {
                                    return '<span style="margin-left:8px;background-color: #fffcf2;border: 1px solid #ffcf4c;color: #ffa200" class="awardspan">加息</span>'
                                } else {
                                    return '';
                                }
                            },
                            surplus: function (x) {
                                return (o.amount - o.investedAmount).toFixed(2);
                            },
                            state: function (x) {
                                if (o.beginTime >o.nowtime)
                                    return '<a class="btn"  href="/debt/' + o.id + '"  style="font-size: 14px;"><div class="countdown" systime="' + (o.beginTime - o.nowtime)/1000+ '" sysstr="后开始"></div></a>';
                                else if (x == _gbl.debtState.ApprovalPass.v)
                                    return '<a class="btn"  href="/debt/' + o.id + '">立即投资</a>';
                                else if (x == _gbl.debtState.InPayment.v || x == _gbl.debtState.Overdue.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">还款中</a>';
                                else if (x == _gbl.debtState.EndPayment.v)
                                    return '<a class="btn btn_end" href="/debt/' + o.id + '">已还款</a>';
                                return '';
                            },
                            stateClass: function (x) {
                                if (o.state == _gbl.debtState.ApprovalPass.v)
                                    return '';
                                else
                                    return 'opaClass';

                            },
                            investedAmount: function (x) {
                                if (parseFloat(o.amount) - parseFloat(o.investedAmount) == 0)
                                    return '已满标';
                                return getDesc(_gbl.debtState, o.state);
                            },
                            schedule: function (x) {
                                return (parseFloat(x) * 100).toFixed(2);
                            },
                            award: function (x) {
                                if (o.awardType == 1)
                                    return '<span class="awardspan">' + '奖' + ((o.awardNumber) * 100).toFixed(2) + '%' + '</span>';
                                else if (o.awardType == 2)
                                    return '<span class="awardspan">' + '奖' + (o.awardNumber) + '元' + '</span>';
                                else
                                    return '';
                            },
                            is_new: function (x) {
                                if (o.isNew == true) {
                                    return '<span class="awardspan">仅限首投</span>';
                                } else {
                                    return ''
                                }
                            },
                            full_award: function (x) {
                                if ((parseFloat(o.schedule) * 100).toFixed(0) >= 80 && (parseFloat(o.schedule) * 100).toFixed(0) < 100 && !o.isCut &&  new Date() > new Date('2017/12/31 23:59:59'))
                                    return '<span class="awardspan" style="margin-left:8px;background-color: #fff9f2;border: 1px solid #ffc17f;color: #ff8a10">满奖¥10</span>';
                                else
                                    return '';
                            },
                        }));
                    }

                });

                if(arr2.length >0){
                    $("#debt_list2").html('<h3 class="list_title">新客专享</h3>').append(arr2.join(''));
                }else{
                    $("#debt_list2").html('')
                }
                if(arr3.length >0){
                    $("#debt_list3").html('<h3 class="list_title">优选理财</h3>').append(arr3.join(''));
                }else{
                    $("#debt_list3").html('')
                }
                if(arr4.length >0){
                    $("#debt_list4").html('<h3 class="list_title">限时秒杀</h3>').append(arr4.join(''));
                }else{
                    $("#debt_list4").html('')
                }
                if(arr5.length >0){
                    $("#debt_list5").html('<h3 class="list_title">VIP尊享</h3>').append(arr5.join(''));
                }else{
                    $("#debt_list5").html('')
                }
                if(arr.length >0){
                    $("#debt_list").html('<h3 class="list_title">已满标</h3>').append(arr.join(''));
                }else{
                    $("#debt_list").html('')
                }

                $(".countdown").wenCount();
                loadSchedule();
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadDebt(pn, s, product);
                    }
                });
            } else {
                $(pager).find('ol').html('');
                $(ele).html('').append("<img src='/img/none.png' style='margin: 0 auto;display: block;padding: 50px 0;'>");
            }
        });
    },
    sendFindLoginPasswordCode: function (mobile) {
        var $a = $('#subFindPwdCode');
        $form = $('form')
        $.post('/user/sendFindLoginPasswordCode', {mobile: mobile, imgCode: $('#imgCode').val()}, function (res) {

            if (!res.err) {
                $a.attr("disabled", "disabled");
                $form.children('.tipsYz').hide();
                //reloadImgCode($('#picCode'));
                var time = 120;
                var _interval = setInterval(function () {
                    time--;
                    if (time < 1) {
                        $a.removeAttr("disabled");
                        $a.val('获取');
                        clearInterval(_interval);
                        $a.removeClass('btn_cf')
                        reloadImgCode($('#picCode'));
                    } else {

                        $a.val("重发" + time + "s");
                        $('.tipsMob ').show();
                        $a.addClass('btn_cf')
                        if (time < 117) {
                            $('.tipsMob ').hide();
                        }
                    }
                }, 1000)
            } else {
                reloadImgCode($('#picCode'));
                $('.tipsYz').html(res.err).fadeIn();
            }
        });
    },
    sendRegisterCode: function (mobile) {
        var $a = $('#subRegisterCode');
        var $form = $('form');
        $.post('/user/sendRegisterCode', {mobile: mobile, imgCode: $('#imgCode').val()}, function (res) {
            if (!res.err) {
                $a.attr("disabled", "disabled");
                $form.children('.tipsYz').hide();
                //reloadImgCode($('#picCode'));
                var time = 120;
                var _interval = setInterval(function () {
                    time--;
                    if (time < 1) {
                        $a.attr("disabled", false);
                        $a.removeClass('btn_cf')
                        $a.val('获取验证码');
                        clearInterval(_interval);
                    }
                    else {
                        $('.tipsMob ').show();
                        $a.addClass('btn_cf')
                        $a.val("(重发)" + time + "s");
                        if (time < 117) {
                            $('.tipsMob ').hide();
                        }

                    }
                }, 1000)
            } else {
                reloadImgCode($('#picCode'));
                $('.tipsYz').html(res.err).fadeIn();
            }
        });
    },
    sendResetLoginPasswordCode: function () {
        var $a = $('#sendResetLoginPasswordCode');
        var $form = $('.formResetLoginPwd');
        $.post('/user/sendResetLoginPasswordCode', {imgCode: $form.find('.imgCode').val()}, function (res) {
            if (!res.err) {
                $a.attr("disabled", "disabled");
                $form.children('.tipsYz').hide();
                //reloadImgCode($('#picCode'));
                var time = 120;
                var _interval = setInterval(function () {
                    time--;
                    if (time < 1) {
                        $a.attr("disabled", false);
                        $a.val('获取');
                        clearInterval(_interval);
                        $a.removeClass('btn_cf')

                    } else {
                        $a.val("(重发)" + time + "s");
                        $a.addClass('btn_cf')
                        $('.tipsMob ').show();
                        if (time < 117) {
                            $('.tipsMob ').hide();
                        }
                    }
                }, 1000)
            } else {
                reloadImgCode($form.find('#picCode'));
                $form.children('.tipsYz').html(res.err).fadeIn();
            }
        });
    },
    buy: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res) {
            var bonusAmount = $('#bonusIds option:selected').attr('_amount');
            $('#totalAmount').text(res.amount);
            $('#balance').text(res.amount - bonusAmount);
            $('#bonusAmount').text(bonusAmount);
            $('#showBuyDetail').show();
        }
    },
    login: function () {
        var r = GetQueryString("r");
        var $form = $('form');
        var res = $form.checkForm();
        if (res)
            $.post("/login", res, function (dta) {
                if (dta.err)
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                else
                    location.href = r ? r : "/account";
            });
        return false;
    }, findpsw_yz: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res)
            location.href = "/findpsw_step2";
        return false;
    }, findpsw_step2: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res)
            location.href = "/findpsw_suc";
        return false;
    },
    register: function () {
        var r = GetQueryString("r");
        if ($('#check').is(':checked')) {
            $('.tipsYz').html('');
            var $form = $('form');
            var res = $form.checkForm();
            if (res)
                $.post("/user/register", res, function (dta) {
                    if (dta.err)
                        $form.children('.tipsYz').html(dta.err).fadeIn();
                    else
                        location.href = r ? r : "/account";
                });
        } else
            $('.tipsYz').html('请仔细阅读并同意注册协议').show();
        return false;
    },
    saveBorrowApply: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res) {
            res.province = $("#loc_province option:selected").text();
            res.city = $("#loc_city option:selected").text();
            res.description = $('#description').val();
            $.post("/borrow/saveBorrowApply", {borrow: JSON.stringify(res)}, function (dta) {
                if (dta.err)
                    alert(dta.err);
                else
                    alert('申请成功');
            });
        }
        return false;
    },
    saveHeadImg: function (img) {
        $.post("/user/saveHeadImg", {img: img}, function (dta) {
            if (dta.err)
                alert(dta.err);
        });
    },
    savePayPassword: function () {
        var $form = $('.PayPasswordForm');
        var res = $form.checkForm();
        var t = $('.time22');
        if (res)
            $.post("/account/savePayPassword", res, function (dta) {
                if (dta.err) {
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                }
                else {
                    $(".modal-conten-alert .btn_zd").attr("href", "/account/security");
                    alert('交易密码设置成功！', tipType.password)

                }
            });
        return false;
    },
    resetPayPassword: function () {
        var $form = $('.resetPayPassword');
        var res = $form.checkForm();
        var t = $('.time22');
        if (res)
            $.post("/account/resetPayPassword", res, function (dta) {
                if (dta.err) {
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                }
                else {
                    $(".modal-conten-alert .btn_zd").attr("href", "/account/security");
                    alert('支付密码修改成功！', tipType.password)
                }
            });
        return false;
    },
    resetLoginPassword: function () {
        var $form = $('.formResetLoginPwd');
        var res = $form.checkForm();
        if (res)
            $.post("/user/resetLoginPassword", res, function (dta) {
                if (dta.err) {
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                }
                else {
                    $(".modal-conten-alert .btn_zd").attr("href", "/account/security");
                    alert('登录密码修改成功！', tipType.password)

                }
            });
        return false;
    },
    findLoginPassword: function () {
        var $form = $('.formResetLoginPwd');
        var res = $form.checkForm();
        if (res)
            $.post("/user/findLoginPasswordStep2", res, function (dta) {
                if (dta.err) {
                    $('.tipsYz').html(dta.err).fadeIn();
                }
                else {
                    location.href = "/login";
                }
            });
        return false;
    }, findLoginPassword1: function () {
        var $form = $('.formResetLoginPwd1');
        var res = $form.checkForm();
        if (res)
            $.post("/user/findLoginPasswordStep1", res, function (dta) {
                if (dta.err) {
                    $('.tipsYz').html(dta.err).fadeIn();
                    reloadImgCode($form.find('#picCode'));
                }
                else {
                    location.href = "/findPwd2";
                }
            });
        return false;
    },
    saveRealName: function () {
        var $form = $('.RealNameForm');
        var res = $form.checkForm();
        var t = $('.time22')
        if (res)
            $.post("/account/saveRealName", res, function (dta) {
                if (dta.err) {
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                }
                else {

                    $(".modal-conten-alert .btn_zd").attr("href", "/account/security");
                    alert('实名认证成功！', tipType.realname)

                }

            });
        return false;
    },

    withdraw: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res){
            confirm('提现',"是否确定提现？",function(){
                $.post("/account/withdraw", res, function (dta) {
                    if (dta.err) {
                        $form.children('.tipsYz').html(dta.err).fadeIn();
                    }
                    else {
                        $(".modal-conten-alert .btn_zd").attr("href", "/account/withdraw");
                        alert('申请成功', tipType.success)
                    }
                });
            })
        }
        return false;
    },
    recharge: function () {
        var $form = $('#gatWayRecharge');
        if ($('#bankId').val().length <= 0)
            alert('请选择支付银行');
        else
            $form.submit();
    },
    saveBankCard: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res) {
            var dta = $form.serializeJson();
            dta.province = $("#province option:selected").val();
            dta.city = $("#city option:selected").val();
            dta.area = '';
            $.post("/account/saveBankCard", {data: JSON.stringify(dta)}, function (dta) {
                if (dta.err)
                    alert(dta.err);
                else {
                    location.href = "/account/bankcards";
                }
            });
        }
        return false;
    },
    bindCard: function () {
        $.post("/account/bindCard", {}, function (dta) {
            if (dta.err)
                alert(dta.err);
            else window.location.reload();
        });
    },
    delBankCard: function () {
        //$('.bank_modWarp').show();
        //var time = 5;
        //var t = $(".time22");
        //var _interval = setInterval(function () {
        //    time--;
        //    if (time < 1) {
        //        location.href = "/account/bankcards";
        //    } else {
        //        t.html(time);
        //    }
        //}, 1000)
        $.post("/account/deleteBankCard", {}, function (dta) {
            if (dta.err)
                alert(dta.err);
            else {
                location.href = "/account/editbankcard";
            }
        });
    },
    saveAutoInvest: function (state) {
        var $form = $('form');
        var res = $form.checkForm();
        if (res) {
            var dta = $('#form').serializeJson();
            dta.state = state;
            if ($('input[type="checkbox"][name="productType"]:checked').size() == 0) {
                alert("请选择产品类型");
            }
            if (dta.productType.length > 1)
                dta.productType = dta.productType.join(',');
            $.post("/account/saveAutoInvest", {data: JSON.stringify(dta)}, function (dta) {
                if (dta.err)
                    alert(dta.err);
                else {
                    location.href = "/account/autoInvest";
                }
            });
        }
        return false;
    },
    changeAutoInvest: function (state) {
        $.post("/account/changeAutoInvest", {state: state}, function (dta) {
            if (dta.err)
                alert(dta.err);
            else {
                location.href = "/account/autoInvest";
            }
        });
        return false;
    },
    validEmail: function () {
        var $form = $(".vEmailForm");
        var res = $form.checkForm();
        var t = $(".time22");
        if (res)
            $.post("/account/validEmail", res, function (dta) {
                if (dta.err)
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                else
                    $('.tipsYz').hide();
                $('.tipsYz_em').show();
                $('.email_yzbt').hide();
                $('.email_yzbt1').show();

            });
        return false;
    },
    resetEmail: function () {
        var $form = $(".vEmailForm");
        var res = $form.checkForm();
        var t = $(".time22");
        if (res)
            $.post("/account/resetEmail", res, function (dta) {
                if (dta.err) {
                    $form.children('.tipsYz').html(dta.err).fadeIn();
                }
                else {
                    $(".modal-conten-alert .btn_zd").attr("href", "/account/security");
                    alert('验证邮箱已发送，去邮箱完成认证！', tipType.email)

                }
            });
        return false;
    },
    sendSavePayPasswordCode: function () {
        var $a = $('#sendSavePayPasswordCode');
        var $form = $('.resetPayPassword');
        $.post('/user/sendResetPayPasswordCode', {imgCode: $form.find('.imgCode').val()}, function (res) {
            if (!res.err) {
                $a.attr("disabled", true);
                $form.children('.tipsYz').hide();
                //reloadImgCode($('#picCode'));
                var time = 120;
                var _interval = setInterval(function () {
                    time--;
                    if (time < 1) {
                        $a.attr("disabled", false);
                        $a.val('获取');
                        clearInterval(_interval);
                        $a.removeClass('btn_cf')
                    } else {
                        $a.val("(重发)" + time + "s");
                        $a.addClass('btn_cf')
                        $('.tipsMob ').show();
                        if (time < 117) {
                            $('.tipsMob ').hide();
                        }
                    }
                }, 1000)
            } else {
                reloadImgCode($form.find('#picCode'));
                $form.children('.tipsYz').html(res.err).fadeIn();
            }
        });
    },
    popularize: function () {
        var r = GetQueryString("r");
        if ($('#check').is(':checked')) {
            $('.tipsYz').html('');
            var $form = $('form');
            var res = $form.checkForm();
            if (res)
                $.post("/user/spreadRegister", res, function (dta) {
                    if (dta.err)
                        $form.children('.tipsYz').html(dta.err).fadeIn();
                    else{
                        //_taq.push({convert_id:"69310660053", event_type:"form"});
                        location.href ="/debts";
                    }
                });
        } else
            $('.tipsYz').html('请仔细阅读并同意注册协议').show();
        return false;
    },
    sendSaveEmailCode: function () {
        var $a = $('#sendSaveEmailCode');
        var $form = $('.vEmailForm');
        $.post('/account/resetEmailCode', {imgCode: $form.find('.imgCode').val()}, function (res) {
            if (!res.err) {
                $a.attr("disabled", true);
                $form.children('.tipsYz').hide();
                //reloadImgCode($('#picCode'));
                var time = 120;
                $('.tipsYz').html("").hide();
                var _interval = setInterval(function () {
                    time--;
                    if (time < 1) {
                        $a.attr("disabled", false);
                        $a.val('获取');
                        $a.removeClass('btn_cf')
                        clearInterval(_interval);
                    } else {
                        $a.val("(重发)" + time + "s");
                        $a.addClass('btn_cf')
                        $('.tipsMob ').show();
                        if (time < 117) {
                            $('.tipsMob ').hide();
                        }
                    }
                }, 1000)
            } else {
                reloadImgCode($form.find('#picCode'));
                $form.children('.tipsYz').html(res.err).fadeIn();
            }
        });
    },
    loadAnnounceList: function (pn, size) {
        var ele = $('#annunce_list');
        var pager = $('#page');
        $.post("/aboutus/getAnnounceList", {
            pn: pn,
            s: size,

        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#annunce_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        title: function (x) {
                            return x;

                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAnnounceList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }

        });
    },
    loadNewsList: function (pn, size) {
        var ele = $('#news_list');
        var pager = $('#page');
        $.post("/aboutus/getNewslist", {
            pn: pn,
            s: size,

        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#news_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        title: function (x) {
                            return x;
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        content: function (x) {
                            return x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                //$(pager).pager({
                //    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                //        ZC_api.loadNewsList(pn, s);
                //    }
                //});
            } else {
                $(ele).html('').append("<img src='/img/nr.png' class='nr_photo'>");
            }
        });
    },
    loadNewsMore: function (pn, size) {
        var ele = $('#news_list');
        var pager = $('#page');
        $.post("/aboutus/getNewslist", {
            pn: pn,
            s: size,
        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#news_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        title: function (x) {
                            return x;
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        content: function (x) {
                            return x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadNewsMore(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadInviteUser: function (pn, size) {
        var state = $('#state').val() || '0';
        var ele = $('#invite_list');
        var pager = $('#pageInvite');
        $.post("/account/getInviteUser", {
            pn: pn,
            s: size,
            beginTime: $('#inviteStart').val(),
            endTime: $('#inviteEnd').val()
        }, function (res) {
            var tmpl = $('#invite_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        real: function (x) {
                            return o.realName && o.idCard ? '是' : '否';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadInviteUser(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                $(pager).find('ol').html('');
            }
        });
    },
    loadInviteAward: function (pn, size) {
        var ele = $('#inviteAward_list');
        var pager = $('#pageInviteAward');
        $.post("/account/getInviteAward", {
            pn: pn,
            s: size,
            beginTime: $('#inviteAwardStart').val(),
            endTime: $('#inviteAwardEnd').val()
        }, function (res) {
            var tmpl = $('#inviteAward_tmpl').html();
            var arr = [];
            $('#totalAmount').text(res.totalAmount || 0);
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        period_unit: function (x) {
                            return getDesc(_gbl.periodUnit, x);
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadInviteAward(pn, s);
                    }
                });
            } else {
                $(ele).html('').append("<img src='/img/none.png' class='none_img'>");
                $(pager).find('ol').html('');
            }
        });
    },
    loadSort: function () {
        $.post("/util/getSortInvest", {}, function (res) {
            if (res) {
                for (var key in res) {
                    var data = res[key];
                    $('#' + key).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('#' + key).append('<li><span class="num top">' + (i + 1) + '</span>' + data[i].mobile + '<span class="sp1">' + data[i].amount + '元</span></li>');
                    }
                }
            }
        });
    },
    loadIntegralRecord: function (pn, size) {
        var ele = $('#record_list');
        var pager = $('#page');
        $.post("/account/getIntegralRecord", {
            pn: pn,
            s: size,
            action: $('#action').val(),
            beginTime: $('#start').val(),
            endTime: $('#end').val()
        }, function (res) {
            var tmpl = $('#record_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        action: function (x) {
                            return getDesc(_gbl.actions, x);
                        },
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadIntegralRecord(pn, s);
                    }
                });
            } else {
                $(ele).html('');
                $(pager).find('ol').html('');
            }
        });
    },
    loadActive: function (pn, size) {
        var ele = $('#active_list');
        var pager = $('#page');
        $.post("/activity/getActive", {
            pn: pn,
            s: size,
        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#active_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        title: function (x) {
                            return '<a href="' + o.url + '?id='+o.id+'"  target="_blank" >' + x + '</a>';
                        },
                        endTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd');
                        },
                        state: function (x) {
                            if (o.beginTime > new Date().getTime())
                                return '<a class="a1 a1_wait" target="_blank"  href="' + o.url + '"><i>预热中</i></a>';
                            else if (o.endTime < new Date().getTime())
                                return '<a class="a1 a1_end" target="_blank" href="javascript:"><i>已结束</i></a>';
                            else
                                return '<a class="a1 a1_com" target="_blank" href="' + o.url + '"><i>进行中</i></a>';
                        },
                        stateClass: function (x) {
                            if (o.beginTime > new Date().getTime())
                                return '';
                            else if (o.endTime < new Date().getTime())
                                return 'endClass';
                            else
                                return 'comClass';
                        },
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadDebt(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }


}

function loadSchedule() {
    $.each($('.bar'), function (i, item) {
        $(item).width($(item).attr('w') + '%');
        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animate-positive',
                offset: 0,
                mobile: true,
                live: true
            });
            wow.init();
        }
        ;
    })
}


function GetQueryString(name, url) {
    if (!url)
        url = window.location.href;
    var reg = new RegExp("(/?|&)" + name + "=([^&]*)(&|$)");
    var r = url.match(reg);
    if (r != null) return decodeURIComponent(r[2]).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    else return null;
}


var getDesc = function (type, v) {
    for (var key in type) {
        if (type[key].v == v)
            return type[key].desc;
    }
    return '';
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
function reloadImgCode(obj) {
    $(obj).attr("src", "/getImgCode?t=" + new Date().getTime());
}

