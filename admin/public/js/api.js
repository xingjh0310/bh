/**
 * Created by pwx on 2016/8/8.
 */
ZC_api = {
    loadMobileFeeList: function (pn, size,sTime,eTime,key,type) {
        var ele = $('#telfee_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size};
            data.sTime = sTime;
            data.eTime = eTime;
            data.key = key;
            data.type = type;
        $.post("/telfee/getTelFeeListByType", data, function (res) {
            var tmpl = $('#telfee_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        buyTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        checkTime:function (x) {
                            if(x ==null || x==''){
                                return '';
                            }else{
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            }
                        },
                        status: function (x) {
                            if(x==-1){
                                return "订单已作废";
                            }else if(x==0){
                                return "未充值";
                            }else if(x==1){
                                return "充值中";
                            }else if(x==2){
                                return "充值已到账";
                            }
                        },
                        handle: function (x) {
                            if(o.status==0 ){
                                return '<a href="javascript:;" onclick="showfeedetails(' + o.id + ')">处理</a>';
                            } else{
                                return '';
                            }

                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadMobileFeeList(pn, s,sTime,eTime,key,type);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadBankCardList: function (pn, size) {
        var ele = $('#bankcard_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val()};
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getBankCardList", data, function (res) {
            var tmpl = $('#bankcard_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        isDefault: function (x) {
                            return x ? '是' : '否';
                        },
                        bank: function (x) {
                            return x ? _bank[x].desc : '';
                        },
                        province: function (x) {
                            return x || '';
                        },
                        city: function (x) {
                            return x || '';
                        },
                        area: function (x) {
                            return x || '';
                        },
                        branch: function (x) {
                            return x || '';
                        },
                        handle: function (x) {
                            return '<a href="javascript:void(0)" onclick="edit(' + o.accountId + ')" >编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBankCardList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadBorrowApplyList: function (pn, size) {
        var ele = $('#apply_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size};
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/apply/getBorrowApplyList", data, function (res) {
            var tmpl = $('#apply_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return _fields.getDesc(_fields.state, x);
                        },
                        handle: function (x) {
                            return '<a href="javascript:;" onclick="edit(' + o.id + ')">处理</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBorrowApplyList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadLevelList: function (pn, size) {
        var ele = $('#level_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size};
        $.post("/user/getLevelList", data, function (res) {
            var tmpl = $('#level_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        handle: function (x) {
                            return '<a href="javascript:;" onclick="edit(' + o.id + ')">修改</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadLevelList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadTemplateList: function (pn, size) {
        var ele = $('#template_list');
        var pager = $('#page');
        $.post("/template/getAll", {
            pageNo: pn,
            pageSize: size,
            type: $('#type').val(),
            action: $('#action').val()
        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#template_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        action: function (x) {
                            return _fields.getDesc(_fields.actions, x);
                        },
                        state: function (x) {
                            return x == _fields.state.Wait.v ? '禁用' : '启用';
                        },
                        type: function (x) {
                            return _fields.getDesc(_fields.sendType, x);
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadTemplateList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadProtocolTemplateList: function (pn, size) {
        var ele = $('#template_list');
        var pager = $('#page');
        $.post("/template/getAllProtocol", {
            pn: pn,
            s: size,
            type: $('#type').val(),
            action: $('#action').val()
        }, function (res) {
            if (res.list && res.list.length > 0) {
                var tmpl = $('#template_tmpl').html();
                var arr = [];
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        type: function (x) {
                            return _fields.getDesc(_fields.protocolType, x);
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a onClick="select(' + o.id + ')">预览</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadProtocolTemplateList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadBorrowerList: function (pn, size) {
        var ele = $('#borrower_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val()};
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getBorrowerList", data, function (res) {
            var tmpl = $('#borrower_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        balance: function (x) {
                            return x;
                        },
                        total_borrow_amount: function (x) {
                            return x;
                        },
                        handle: function (x) {
                            return '<a href="javascript:;" onclick="edit(' + o.id + ')">修改</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBorrowerList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    loadInvestorList: function (pn,size,isExport) {
        var ele = $('#investor_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isExport: isExport,
            route:$('#route').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/user/getInvestorList", data, function (res) {
            if (!isExport) {
                var tmpl = $('#investor_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            route:function(x){
                                if(o.route==1){
                                    return 'PC';
                                }else if(o.route==2){
                                    return 'IOS';
                                }else if (o.route==3){
                                    return 'Android';
                                }else if(o.route==4) {
                                    return '微端';
                                }else {
                                    return '其他';
                                }

                            },
                            cName:function(x){
                                if(x){
                                    return x;
                                }else{
                                    return '--';
                                }
                            },
                            balance: function (x) {
                                return x;
                            },
                            is_new: function (x) {
                                return x ? '是' : '否';
                            },
                            collect: function (x) {
                                return (o.collect_corpus + o.collect_interest).toFixed(2);
                            },
                            freeze: function (x) {
                                return x;
                            },
                            total_invest_amount: function (x) {
                                return x;
                            },
                            total_withdraw_amount: function (x) {
                                return x;
                            },
                            total_recharge_amount: function (x) {
                                return x;
                            },
                            invest_count: function (x) {
                                return x;
                            },
                            city:function(x){
                                if(o.id_card){
                                    return get_area(o.id_card);
                                    //console.log(get_array(o.id_card.substring(0,2)));
                                    //return get_name2(get_array(o.id_card.substring(0,2)),o.id_card.substring(0,4));
                                }else{
                                    return '--';
                                }
                            },
                            lock: function (x) {
                                return o.lock ? '已锁定' : '正常';
                            },
                            online: function (x) {
                                return o.online==0 ? '线下' : '线上';
                            },
                            level: function (x) {
                                return x || '普通';
                            },
                            score: function (x) {
                                return x;
                            },
                            handle: function (x) {
                                return '<a href="javascript:;" onclick="lock(' + o.id + ',' + (o.lock ? false : true) + ')">' + (o.lock ? '解锁' : '锁定') + '</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;" onclick="edit(' + o.id + ')">修改</a>';
                            }
                        }))
                        ;
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadInvestorList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },
    loadInviteList: function (pn, size,isExport) {
        var ele = $('#invite_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val(),
            isExport: isExport};
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/user/getInviteList", data, function (res) {
            if (!isExport) {
                var tmpl = $('#invite_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            investCount: function (x) {
                                return x > 0 ? '是' : '否';
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadInviteList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }else{
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName);
                    }, no: function () {

                    }
                });
            }
        });
    },

    loadCashFlowList: function (pn, size, isExport) {
        var ele = $('#cashflow_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            type: $('#type').val(),
            isExport: isExport
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getCashFlowList", data, function (res) {
            if (!isExport) {
                var tmpl = $('#cashflow_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            type: function (x) {
                                return _fields.getDesc(_fields.fundType, x);
                            },
                            amountOut: function (x) {
                                return o.amount < 0 ? o.amount : 0;
                            }
                            , amountIn: function (x) {
                                return o.amount > 0 ? o.amount : 0;
                            }
                            , balance: function (x) {
                                return x;
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadCashFlowList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    loadRechargeList: function (pn, size, isExport,isSendEmail) {
        var ele = $('#recharge_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            bAmount: $('#bAmount').val(),
            eAmount: $('#eAmount').val(),
            gatWay: $('#gatWay').val(),
            route: $('#route').val(),
            memo: $('#memo').val(),
            state: $('#state').val(),
            isExport: isExport,
            isSendEmail:isSendEmail
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getRechargeList", data, function (res) {
            if(isExport){
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }else if(isSendEmail){
                confirm({
                    title: '发送至邮箱', content: '确认发送至邮箱吗', okText: '是', noText: '否', ok: function () {
                        $.post("/util/sendExcelToEmail/", {fileName: res.fileName,msg:'充值数据',title:'系统数据'}, function (res) {
                            if(!res.err){
                                alert('发送成功，请注意查收！');
                            }else{
                                alert(res.err);
                            }
                        })
                    }, no: function () {

                    }
                });
            }
            else{
                var tmpl = $('#recharge_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            }, gatWay: function (x) {
                                return _fields.getDesc(_fields.gatWay, o.gatway);
                            }, isCompleted: function (x) {
                                return o.is_completed ? '成功' : '失败';
                            }, batch: function (x) {
                                if (!o.is_completed)
                                    return '<a onClick="completeOrder(\'' + o.order_no + '\')">补单</a>';
                                return '';
                            },
                            amount: function (x) {
                                return x
                            },
                            balance: function (x) {
                                return x;
                            },
                            route:function(x){
                                if(o.route==1){
                                    return 'PC';
                                }else if(o.route==2){
                                    return 'IOS';
                                }else if (o.route==3){
                                    return 'Android';
                                }else if(o.route==4) {
                                    return '微端';
                                }else {
                                    return '其他';
                                }

                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadRechargeList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }
        });
    },

    loadAuditDebtList: function (pn, size) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getAuditList", data, function (res) {
            var tmpl = $('#debt_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        productType: function (x) {
                            return _fields.getDesc(_gbl.productType, x);
                        },
                        period: function (x) {
                            return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                        },
                        paymentType: function (x) {
                            return _fields.getDesc(_fields.paymentType, x);
                        },
                        audit: function (x) {
                            return '<a onClick="auditDebt(&quot;审核借款标&quot;,&quot;/debt/audit?id=' + o.id + '&quot;)">审核</a>';
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAuditDebtList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadInvestList: function (pn, size, isExport) {
        var ele = $('#invest_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            route:$('#route').val(),
            invite:$("#invite").val(),
            isExport: isExport
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getInvests", data, function (res) {
            if (!isExport) {
                var tmpl = $('#invest_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            lastpayment:function(x){
                                return x?new Date(x).Format('yyyy-MM-dd'):'--';
                            },
                            productType: function (x) {
                                return _fields.getDesc(_gbl.productType, x);
                            },
                            period: function (x) {
                                return o.debtPeriod + (o.debtPeriodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                            },
                            bonusAmount: function (x) {
                                return x;
                            },
                            pieceAmount: function (x) {
                                return x;
                            },
                            debtRate: function (x) {
                                return (x * 100).toFixed(2) + '%';
                            },
                            inviteName:function(x){
                                return o.invite_name||'';
                            },
                            inviteMobile:function(x){
                                return o.invite_mobile||'';
                            },
                            online: function (x) {
                                return o.online==0 ? '线下' : '线上';
                            },
                            state: function (x) {
                                if (x == _fields.state.Complete.v || x == _fields.state.Wait.v)
                                    return '成功';
                                else if (x == _fields.state.Cancel.v)
                                    return '已撤标';
                            },
                            interest:function(x){
                                if(o.debtPeriodUnit == _fields.periodUnit.Month.v){
                                    return (parseInt(o.amount)*parseFloat(o.debtRate)*parseInt(o.debtPeriod)/12).toFixed(2);
                                }else{
                                    return (parseInt(o.amount)*parseFloat(o.debtRate)*parseInt(o.debtPeriod)/365).toFixed(2);
                                }
                            },
                            route:function(x){
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

                            },
                            download: function (x) {
                                if (o.protocol)
                                    return '<a href="/account/downloadProtocol?name=' + o.protocol + '" target="_blank">下载</a>';
                                return '--';
                            },
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadInvestList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    loadBiddingList: function (pn, size) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getBidingList", data, function (res) {
            var tmpl = $('#debt_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        productType: function (x) {
                            return _fields.getDesc(_gbl.productType, x);
                        },
                        period: function (x) {
                            return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                        },
                        paymentType: function (x) {
                            return _fields.getDesc(_fields.paymentType, x);
                        },
                        handle: function (x) {
                            return '<a onClick="cancelDebt(&quot;撤销借款标&quot;,&quot;/debt/cancelDebt?id=' + o.id + '&quot;)">撤标</a>';
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        schedule: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBiddingList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadCancelList: function (pn, size) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getCancelList", data, function (res) {
            var tmpl = $('#debt_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        productType: function (x) {
                            return _fields.getDesc(_gbl.productType, x);
                        },
                        period: function (x) {
                            return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        paymentType: function (x) {
                            return _fields.getDesc(_fields.paymentType, x);
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadCancelList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAllDebtList: function (pn, size, isExport) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isExport: isExport
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getAll", data, function (res) {
            if (!isExport) {
                var tmpl = $('#debt_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            beginTime: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            productType: function (x) {
                                return _fields.getDesc(_gbl.productType, x);
                            },
                            rate: function (x) {
                                return (x * 100).toFixed(2) + '%';
                            },
                            period: function (x) {
                                return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                            },
                            paymentType: function (x) {
                                return _fields.getDesc(_fields.paymentType, x);
                            },
                            state: function (x) {
                                return _fields.getDesc(_fields.debtState, x);
                            },
                            handle: function (x) {
                                var str='';
                                str += '<a href="javascript:void(0)" onclick="edit(' + o.id + ')" >更新</a>';
                                str +="&nbsp;&nbsp;";
                                if(o.isRecommend == 0){
                                    str += '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 1 + ','+ Date.parse(new Date()) + ')" >推荐</a>';
                                }else if(o.isRecommend == 1){
                                    str += '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 0 + ','+ o.time + ')" >取消推荐</a>';
                                }
                                return str;
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadAllDebtList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    loadOverdueDebtList: function (pn, size) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getOverdueList", data, function (res) {
            var tmpl = $('#debt_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        productType: function (x) {
                            return _fields.getDesc(_gbl.productType, x);
                        },
                        period: function (x) {
                            return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                        },
                        paymentType: function (x) {
                            return _fields.getDesc(_fields.paymentType, x);
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadOverdueDebtList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadRejectDebtList: function (pn, size) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getRejectList", data, function (res) {
            var tmpl = $('#debt_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        productType: function (x) {
                            return _fields.getDesc(_gbl.productType, x);
                        },
                        period: function (x) {
                            return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                        },
                        paymentType: function (x) {
                            return _fields.getDesc(_fields.paymentType, x);
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadRejectDebtList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAuditWithdrawList: function (pn, size) {
        var ele = $('#withdraw_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            route: $('#route').val(),
        };
        if ($('#param').val()) data.param = $('#param').val();
        if ($('#state').val()) data.state = $('#state').val();
        $.post("/account/getAuditWithdrawList", data, function (res) {
            var tmpl = $('#withdraw_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        }, amount: function (x) {
                            return x;
                        },
                        memo: function (x) {
                            return x||'';
                        },audit: function (x) {
                            if(o.audit_state==0){
                                return '<a href="javascript:;" onclick="showAudit(' + o.id + ')">审核</a>';
                            }else{
                                return '';
                            }
                        },
                        auditState:function(x){
                            if(o.audit_state==_fields.state.Wait.v){
                                return  '未审核';
                            }else if(o.audit_state==_fields.state.Complete.v){
                                return  '已通过';
                            }else{
                                return  '未通过';
                            }
                        },
                        route:function(x){
                            if(o.route==1){
                                return 'PC';
                            }else if(o.route==2){
                                return 'IOS';
                            }else if (o.route==3){
                                return 'Android';
                            }else if(o.route==4) {
                                return '微端';
                            }else {
                                return '其他';
                            }

                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAuditWithdrawList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAlreadyAuditWithdrawList: function (pn, size, isExport) {
        var ele = $('#withdraw_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isExport: isExport
        };
        if ($('#param').val()) data.param = $('#param').val();
        if ($('#state').val()) data.state = $('#state').val();
        $.post("/account/getAlreadyAuditWithdrawList", data, function (res) {
            if (!isExport) {
                var tmpl = $('#withdraw_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            }, amount: function (x) {
                                return x;
                            }, auditTime: function (x) {
                                return o.audit_time ? new Date(o.audit_time).Format('yyyy-MM-dd hh:mm') : '';
                            },
                            auditSuper: function (x) {
                                return x || '';
                            },
                            allFee:function(x){
                                return parseFloat((o.amount- o.arrive_amount||0).toFixed(2));
                            },
                            paySuper: function (x) {
                                return x || '';
                            },
                            payTime: function (x) {
                                return o.pay_time ? new Date(o.pay_time).Format('yyyy-MM-dd hh:mm') : '';
                            },
                            payMemo:function(x){
                                return o.pay_memo||'';
                            },
                            state: function (x) {
                                if (o.pay_state == _gbl.state.Complete.v)
                                    return '已通过';
                                else if (o.pay_state == _gbl.state.Cancel.v)
                                    return '未通过';
                                else
                                    return '未审批';
                            }, audit: function (x) {
                                if(o.pay_state===_fields.state.Wait.v && o.audit_state==_fields.state.Complete.v){
                                    return '<a href="javascript:;" onclick="showPay(' + o.id + ')">审批</a>';
                                }else{
                                    return '';
                                }
                            }

                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadAlreadyAuditWithdrawList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    auditWithdraw: function (id, state) {
        $.post("/account/auditWithdraw", {id: id, state: state}, function (dta) {
            if (dta.err)
                alert(dta.err);
            else
                ZC_api.loadAuditWithdrawList(1, 20);
        });
        return false;
    },

    loadPaymentIngDebtList: function (pn, size,isExport,isSendEmail) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            isExport:isExport,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isSendEmail:isSendEmail
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getPaymentIngList", data, function (res) {
            if (isExport) {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }else if(isSendEmail){
                confirm({
                    title: '发送至邮箱', content: '确认发送至邮箱吗', okText: '是', noText: '否', ok: function () {
                        $.post("/util/sendExcelToEmail/", {fileName: res.fileName,msg:'待还款数据',title:'系统数据'}, function (res) {
                            if(!res.err){
                                alert('发送成功，请注意查收！');
                            }else{
                                alert(res.err);
                            }
                        })
                    }, no: function () {

                    }
                });
            } else {
                var tmpl = $('#debt_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd');
                            },
                            productType: function (x) {
                                return _fields.getDesc(_gbl.productType, x);
                            },
                            period: function (x) {
                                return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                            },
                            paymentCorpus: function (x) {
                                return x || 0;
                            },
                            paymentInterest: function (x) {
                                return x || 0;
                            },
                            sumAmount: function (x) {
                                return (o.paymentCorpus+o.paymentInterest).toFixed(2) || 0;
                            },
                            rate: function (x) {
                                return (x * 100).toFixed(2) + '%';
                            },
                            overdueFine: function (x) {
                                return x || 0;
                            },
                            paymentType: function (x) {
                                return _fields.getDesc(_fields.paymentType, x);
                            }, handle: function (x) {
                                var url = '/debt/paymentDetail?debtId=' + o.id + '&group=' + o.group;
                                return '<a onClick="payment(&quot;正常回款&quot;,&quot;' + (url + '&advance=false') + '&quot;)">正常</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a onClick="payment(&quot;提前回款&quot;,&quot;' + (url + '&advance=true') + '&quot;)">提前</a>';
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadPaymentIngDebtList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }
        });
    },

    loadPaymentEndDebtList: function (pn, size,isExport) {
        var ele = $('#debt_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isExport: isExport || false
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/debt/getPaymentEndList", data, function (res) {
            if(!isExport) {
                var tmpl = $('#debt_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd');
                            },
                            productType: function (x) {
                                return _fields.getDesc(_gbl.productType, x);
                            },
                            period: function (x) {
                                return x + (o.periodUnit == _fields.periodUnit.Month.v ? '月' : '天');
                            },
                            rate: function (x) {
                                return (x * 100).toFixed(2) + '%';
                            },
                            paymentCorpus: function (x) {
                                return x || 0;
                            },
                            paymentInterest: function (x) {
                                return x || 0;
                            },
                            realPaymentTime: function (x) {
                                return new Date(x).Format('yyyy-MM-dd');
                            },
                            realPaymentCorpus: function (x) {
                                return x;
                            },
                            realPaymentInterest: function (x) {
                                return x;
                            },
                            overdueFine: function (x) {
                                return x;
                            },
                            paymentType: function (x) {
                                return _fields.getDesc(_fields.paymentType, x);
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadPaymentEndDebtList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    login: function () {
        var $form = $('form');
        var res = $form.checkForm();
        if (res) {
            $form.submit();
        }
        return false;
    },

    loadSupervisorsList: function (pn, size) {
        var ele = $('#supervisors_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/supervisors/getAll", data, function (res) {
            var tmpl = $('#supervisors_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        last_login: function (x) {
                            return x ? new Date(x).Format('yyyy-MM-dd hh:mm') : '';
                        },
                        lock: function (x) {
                            return x ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadSupervisorsList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadPartnerList: function (pn, size) {
        var ele = $('#partner_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/content/getAllPartner", data, function (res) {
            var tmpl = $('#partner_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        order: function (x) {
                            return x;
                        },
                        img: function (x) {
                            return '<img style="width:150px;height:50px;" src="' + x + '">';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadPartnerList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAdsList: function (pn, size) {
        var ele = $('#ads_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/content/getAllAds", data, function (res) {
            var tmpl = $('#ads_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        order: function (x) {
                            return x;
                        },
                        showType: function (x) {
                            return _fields.getDesc(_fields.showType, x);
                        },
                        img: function (x) {
                            return '<img style="width:150px;height:50px;" src="' + x + '">';
                        },
                        isRecommend:function (x) {
                            return x == _gbl.state.Wait.v ? '使用' : '未使用';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAdsList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadRoleList: function (pn, size) {
        var ele = $('#role_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/supervisors/getRoles", data, function (res) {
            var tmpl = $('#role_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        lastLogin: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        status: function (x) {
                            return x == '0' ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a onClick="setRight(' + o.id + ')">权限</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadRoleList(pn, s);
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
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            type: $('#type').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/content/getAllNews", data, function (res) {
            var tmpl = $('#news_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        order: function (x) {
                            return x;
                        },
                        type: function (x) {
                            return _fields.getDesc(_fields.newsType, x);
                        },
                        author: function (x) {
                            return x;
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadNewsList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadActivityList: function (pn, size) {
        var ele = $('#activity_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val()
        };
        $.post("/content/getAllActivity", data, function (res) {
            var tmpl = $('#activity_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        endTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        order: function (x) {
                            return x;
                        },
                        showType: function (x) {
                            return _fields.getDesc(_fields.showType, x);
                        },
                        url: function (x) {
                            return '<a href="' + x + '" target="_blank">' + x + '</a>'
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadActivityList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadInviteSetList: function (pn, size) {
        var ele = $('#set_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/system/getInviteSetList", data, function (res) {
            var tmpl = $('#set_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {

                        beginTime: function (x) {
                            return x?new Date(x).Format('yyyy-MM-dd hh:mm:ss'):'--';
                        },
                        endTime: function (x) {
                            return x?new Date(x).Format('yyyy-MM-dd hh:mm:ss'):'--';
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadInviteSetList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadIntegralRecordList: function (pn, size, isExport,isSendEmail) {
        var ele = $('#record_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            action: $('#action').val(),
            isExport:isExport,isSendEmail:isSendEmail
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/integral/getAllRecord", data, function (res) {
            if(isExport){
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }else if(isSendEmail){
                confirm({
                    title: '发送至邮箱', content: '确认发送至邮箱吗', okText: '是', noText: '否', ok: function () {
                        $.post("/util/sendExcelToEmail/", {fileName: res.fileName,msg:'积分数据',title:'系统数据'}, function (res) {
                            if(!res.err){
                                alert('发送成功，请注意查收！');
                            }else{
                                alert(res.err);
                            }
                        })
                    }, no: function () {

                    }
                });
            }else {
                var tmpl = $('#record_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            action: function (x) {
                                return _fields.getDesc(_fields.actions, x);
                            },
                            out: function (x) {
                                return o.number < 0 ? o.number : 0;
                            },
                            in: function (x) {
                                return o.number > 0 ? o.number : 0;
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadIntegralRecordList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }
        });
    },

    loadInviteAwardList: function (pn, size, isExport,isSendEmail) {
        var ele = $('#invite_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            isExport: isExport,
            isSendEmail:isSendEmail
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/account/getAllInviteAward", data, function (res) {
            if (isExport) {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
            else if(isSendEmail){
                confirm({
                    title: '发送至邮箱', content: '确认发送至邮箱吗', okText: '是', noText: '否', ok: function () {
                        $.post("/util/sendExcelToEmail/", {fileName: res.fileName,msg:'邀请奖励数据',title:'系统数据'}, function (res) {
                            if(!res.err){
                                alert('发送成功，请注意查收！');
                            }else{
                                alert(res.err);
                            }
                        })
                    }, no: function () {

                    }
                });
            }
            else {
                var tmpl = $('#invite_tmpl').html();
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $('#pageTotal').val(res.total);
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadInviteAwardList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }
        });
    },

    loadIntegralRuleList: function (pn, size) {
        var ele = $('#rule_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            action: $('#action').val()
        };
        $.post("/integral/getAllRule", data, function (res) {
            var tmpl = $('#rule_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        action: function (x) {
                            return _fields.getDesc(_fields.actions, x);
                        },
                        awardType: function (x) {
                            return _fields.getDesc(_fields.awardType, x);
                        },
                        number: function (x) {
                            if (o.awardType == _fields.awardType.Scale.v)
                                return (x * 100).toFixed(2) + '%';
                            else
                                return x;
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadIntegralRuleList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadBonusSetList: function (pn, size) {
        var ele = $('#bonus_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            state: $('#state').val()
        };
        $.post("/bonus/getAllBonusSet", data, function (res) {
            var tmpl = $('#bonus_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        sendBeginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        sendEndTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        type: function (x) {
                            return _fields.getDesc(_fields.bonusType, x);
                        },
                        action: function (x) {
                            return o.sendAction > 0 ? _fields.getDesc(_fields.actions, o.sendAction) : '人工发放';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadBonusSetList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadCouponSetList: function (pn, size) {
        var ele = $('#coupon_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            state: $('#state').val()
        };
        $.post("/coupon/getAllCouponSet", data, function (res) {
            var tmpl = $('#coupon_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        sendBeginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        sendEndTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2);
                        },
                        action: function (x) {
                            return o.sendAction > 0 ? _fields.getDesc(_fields.actions, o.sendAction) : '人工发放';
                        },
                        handle: function (x) {
                            return '<a onClick="edit(' + o.id + ')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadCouponSetList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadTotal: function () {
        $.post("/main/getTotal", {}, function (total) {
            $('#withdrawCount').text(total.withdrawCount || 0);
            $('#todayWaitBillCount').text(total.todayWaitBillCount || 0);
            $('#todayWaitBillAmount').text(parseFloat(total.todayWaitBillAmount || '0').toFixed(2));
            $('#totalRegister').text(total.totalRegister || 0);
            $('#todayRegister').text(total.todayRegister || 0);
            $('#totalInvest').text(parseFloat(total.totalInvest || '0').toFixed(2));
            $('#todayInvest').text(parseFloat(total.todayInvest || '0').toFixed(2));
            $('#totalInterest').text(parseFloat(total.totalInterest || '0').toFixed(2));
            $('#totalDebt').text(total.totalDebt || 0);
            $('#todayDebt').text(total.todayDebt || 0);
            $('#totalDebtAmount').text(parseFloat(total.totalDebtAmount || '0').toFixed(2));
            $('#todayDebtAmount').text(parseFloat(total.todayDebtAmount || '0').toFixed(2));
            $('#totalWaitPaymentCount').text(total.totalWaitPaymentCount || 0);
            $('#totalWaitPaymentAmount').text(parseFloat(total.totalWaitPaymentAmount || '0').toFixed(2));
            $('#totalWithdrawAmount').text(parseFloat(total.totalWithdrawAmount || '0').toFixed(2));
            $('#todayWithdrawAmount').text(parseFloat(total.todayWithdrawAmount || '0').toFixed(2));
            $('#totalRechargeAmount').text(parseFloat(total.totalRechargeAmount || '0').toFixed(2));
            $('#todayRechargeAmount').text(parseFloat(total.todayRechargeAmount || '0').toFixed(2));
            $('#todayPieceAmount').text(parseFloat(total.todayPieceAmount || '0').toFixed(2));
            $('#withdrawAuditCount').text(total.withdrawAuditCount || 0);
            $('#withdrawAlreadyCount').text(total.withdrawAlreadyCount || 0);
        })
    },

    loadBonusRecordList: function (pn, size,isExport) {
        var ele = $('#bonus_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            state: $('#state').val(),
            isExport: isExport
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/bonus/getAllBonusRecord", data, function (res) {
            if (!isExport) {
                var tmpl = $('#bonus_tmpl').html();
                $('#pageTotal').val(res.total);
                var arr = [];
                if (res.list && res.list.length > 0) {
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            time: function (x) {
                                return new Date(x).Format('yyyy-MM-dd hh:mm');
                            },
                            use_time: function (x) {
                                return x ? new Date(o.use_time).Format('yyyy-MM-dd hh:mm') : '';
                            },
                            state: function (x) {
                                if (x == _gbl.state.Complete.v)
                                    return '已使用';
                                else {
                                    if (new Date().getTime() > o.end_time)
                                        return '已过期';
                                    else
                                        return '未使用';
                                }
                            },
                            type: function (x) {
                                return _fields.getDesc(_fields.bonusType, x);
                            },
                            action: function (x) {
                                return x ? _fields.getDesc(_fields.actions, o.action) : '人工发放';
                            },
                            expiry: function (x) {
                                return new Date(o.begin_time).Format('yyyy-MM-dd hh:mm') + '-至-' + new Date(o.end_time).Format('yyyy-MM-dd hh:mm');
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));
                    $(pager).pager({
                        pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                            ZC_api.loadBonusRecordList(pn, s);
                        }
                    });
                } else {
                    $(ele).html('');
                }
            }else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    loadCouponRecordList: function (pn, size) {
        var ele = $('#coupon_list');
        var pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            state: $('#state').val()
        };
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/coupon/getAllCouponRecord", data, function (res) {
            var tmpl = $('#coupon_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        use_time: function (x) {
                            return x ? new Date(o.use_time).Format('yyyy-MM-dd hh:mm') : '';
                        },
                        state: function (x) {
                            if (x == _gbl.state.Complete.v)
                                return '已使用';
                            else {
                                if (new Date().getTime() > o.end_time)
                                    return '已过期';
                                else
                                    return '未使用';
                            }
                        },
                        rate: function (x) {
                            return (x * 100).toFixed(2) + '%';
                        },
                        action: function (x) {
                            return x ? _fields.getDesc(_fields.actions, o.action) : '人工发放';
                        },
                        expiry: function (x) {
                            return new Date(o.begin_time).Format('yyyy-MM-dd hh:mm') + '-至-' + new Date(o.end_time).Format('yyyy-MM-dd hh:mm');
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadCouponRecordList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadchannelct: function (isExport) {
        var ele = $('#channel_list');
        var data = {
            sTime: $('#sTime').val(),
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            channelTy:$('#channel').val(),
            isExport: isExport
        };
        $.post("/channel/getChannelCt", data, function (res) {
            if (!isExport) {
                var tmpl = $('#channel_tmpl').html();
                var arr = [];
                if (res.list&& res.list.length > 0) {
                    $.each(res.list, function (i, o) {
                        arr.push(DataProxy.setTmplDta(o, tmpl, {
                            channelName: function (x) {
                                return x;
                            }, todayRegister: function (x) {
                                return x == null ? 0 : x;
                            }, todayRealName: function (x) {
                                return x == null ? 0 : x;
                            }, todayBindCard: function (x) {
                                return x == null ? 0 : x;
                            }, todayRechargeNum: function (x) {
                                return x == null ? 0 : x;
                            }, todayTradeNum: function (x) {
                                return x == null ? 0 : x;

                            }, todayRecharge: function (x) {
                                return x == null ? 0 : x;
                            }, todayTrade: function (x) {
                                return x == null ? 0 : x;
                            }, todayWithdraw: function (x) {
                                return x == null ? 0 : x;

                            }, totalRegister: function (x) {
                                return x == null ? 0 : x;
                            }, totalRealName: function (x) {
                                return x == null ? 0 : x;
                            }, totalBindCard: function (x) {
                                return x == null ? 0 : x;
                            }, totalRechargeNum: function (x) {
                                return x == null ? 0 : x;
                            }, totalTradeNum: function (x) {
                                return x == null ? 0 : x;
                            }, totalRecharge: function (x) {
                                return x == null ? 0 : x;
                            }, totalWithdraw: function (x) {
                                return x == null ? 0 : x;
                            }, totalTrade: function (x) {
                                return x == null ? 0 : x;
                            }, waitReceive: function (x) {
                                return x == 0 ? 0 :(o.paymentCorpus+o.paymentInterest).toFixed(2);
                            }
                        }));
                    });
                    $(ele).html('').append(arr.join(''));

                } else {
                    $(ele).html('');
                }
            } else {
                confirm({
                    title: '导出', content: '确认导出吗', okText: '是', noText: '否', ok: function () {
                        window.open('/util/downExcel/' + res.fileName)
                    }, no: function () {

                    }
                });
            }
        });
    },

    /**
     * 意见反馈列表
     * @param pn
     * @param size
     */
    loadComplainList: function (pn, size) {
        var ele = $('#complain_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val()};
        if ($('#param').val()) data.param = $('#param').val();
        $.post("/content/getComplainList", data, function (res) {
            var tmpl = $('#complain_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        add_time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        mobile: function (x) {
                            return x == null ? '' : x;
                        },
                        real_name: function (x) {
                            return x == null ? '' : x;
                        },
                        content: function (x) {
                            return x == null ? '' : x;
                        },
                        handle: function (x) {
                            return '<a onClick="remove(' + o.id + ')">删除</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadComplainList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadSpreadList: function (pn, size,isExport) {
        var ele = $('#Spread_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val(),isExport: isExport};
        $.post("/channel/getSpreadList", data, function (res) {
            var tmpl = $('#Spread_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return x==null?'':new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        id: function (x) {
                            return x == null ? '' : x;
                        },
                        name:function(x){
                            return x==null ? '':x;
                        },
                        code:function(x){
                            return x==null ? '':x;
                        },
                        register_adr: function (x) {
                            return x == null ? '' : x;
                        },
                        handle: function (x) {
                            return '<a href="javascript:void(0);"  onclick="edit(' + o.id + ')" >修改</a>'
                        },
                        download_adr: function (x) {
                            return x == null ? '' : x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadSpreadList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadExportList: function (pn, size) {
        var ele = $('#export_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size};
        $.post("/util/getExports", data, function (res) {
            var tmpl = $('#export_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        handle: function (x) {
                            return '<a href="javascript:;" onclick="edit(' + o.id + ')">修改</a>&nbsp;&nbsp; || &nbsp;&nbsp;<a href="javascript:;" onclick="exports(' + o.id + ')">导出</a> ';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadExportList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAppPushMessageList: function (pn, size) {
        var ele = $('#appPushMessage_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val()};
        $.post("/appManager/getAppPushMessageList", data, function (res) {
            var tmpl = $('#appPushMessage_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        add_time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        id: function (x) {
                            return x == null ? '' : x;
                        },
                        title: function (x) {
                            return x == null ? '' : x;
                        },
                        content: function (x) {
                            return x == null ? '' : x;
                        },
                        transmission_content: function (x) {
                            return x == null ? '' : x;
                        },
                        status: function (x) {
                            if(x == _fields.state.Complete.v){
                                return "成功";
                            }
                            else if(x == _fields.state.Expiry.v){
                                return "定时—待发送";
                            }
                            else{
                                return "失败";
                            }
                        },
                        timingTime:function(x){
                            return o.timing_time||'--';
                        },
                        handle: function (x) {
                            return '--';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAppPushMessageList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    loadAppUploadList: function (pn, size) {
        var ele = $('#appUpload_list');
        var pager = $('#page');
        var data = {pageNo: pn, pageSize: size, bTime: $('#bTime').val(), eTime: $('#eTime').val()};
        $.post("/appManager/getAppUploadList", data, function (res) {
            var tmpl = $('#appUpload_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        time: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm');
                        },
                        id: function (x) {
                            return x == null ? '' : x;
                        },
                        verSion: function (x) {
                            return x == null ? '' : x;
                        },
                        versionName: function (x) {
                            return x == null ? '' : x;
                        },
                        type:function(x){
                          return x = 0?'Android':'IOS'
                        },
                        content: function (x) {
                            return x == null ? '' : x;
                        },
                        isForce: function (x) {
                            if(x == _fields.state.Complete.v){
                                return "是";
                            }else{
                                return "否";
                            }
                        },
                        downloadUrl: function (x) {
                            return x == null ? '' : x;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadAppUploadList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    //显示银行信息
    loadBanklimit:function(req, res){
        var ele = $('#banklimit_list');
        $.post("/banklimit/getBankLimitAll", { } ,function (res) {
            var result=res.data;
            var tmpl = $('#banklimit_tmpl').html();
            var arr = [];
            if(result && result.length > 0 ){
               $.each(result,function (i,o) {
                   arr.push(DataProxy.setTmplDta(o,tmpl,{
                       bankCode: function (x) {
                           return x == null ? '' : x;
                       },
                       bankName: function (x) {
                       return x == null ? '' : x;
                       },
                       limitSingle: function (x) {
                           return x == null ? '' : x;
                       },
                       limitDaily: function (x) {
                           return x == null ? '' : x;
                       },
                       limitMonthly: function (x) {
                           return x == null ? '' : x;
                       },
                       state:function (x) {
                          if(x==0){
                              return "关闭"
                          }else {
                              return "正常使用"
                          }
                       },
                       deleteState:function (x) {
                           if(x==0){
                               return  "已撤销状态"
                           }else {
                               return "正常使用状态"
                           }
                       },
                       handle: function (x) {
                           return '<a href="javascript:;" onclick="edit(' + o.id + ')">编辑</a> ';
                       }

                   }));
               });
                $(ele).html('').append(arr.join(''));
            }else{

            }

        });
    }
}