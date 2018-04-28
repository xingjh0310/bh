/**
 * Created by Administrator on 2017/5/10.
 */
ApiIntegralMall = {


    GoodsTypeList: function (pn, size) {
        var ele = $('#goodsType_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            name: $("#name").val()
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getTypeList", data, function (res) {
            var tmpl = $('#goodsType_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        name: function (x) {
                            return x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        updateTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        goodsCount: function (x) {
                            return x > 0 ? x : 0;
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            if (o.state == 1) {
                                return '<a onClick="handle(&quot;详情&quot;,&quot;/integralmall/edittype?id=' + o.id + '&quot;)">编辑</a>' + "&nbsp;&nbsp;" + '---';
                            }
                            else {
                                return '<a onClick="handle(&quot;详情&quot;,&quot;/integralmall/edittype?id=' + o.id + '&quot;)">编辑</a>' + "&nbsp;&nbsp;" + '<a onClick="deleted(' + o.id + ')">删除</a>';
                            }
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.GoodsTypeList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }
    ,


    GoodsList: function (pn, size) {
        var ele = $('#Goods_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            type: $('#type').val(),
            state: $('#state').val(),
            name: $("#name").val(),
            integralSort:'',
            hadStockSort:''
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getGoodsList", data, function (res) {
            var tmpl = $('#Goods_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        name: function (x) {
                            return x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        offTime: function (x) {
                            return x == null ? '-----' : new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        price: function (x) {
                            return x == null ? 0 : x;
                        },
                        typeName: function (x) {
                            return x == null ? 0 : x;
                        },
                        integral: function (x) {
                            return x == null ? 0 : x;
                        },
                        hadStock: function (x) {
                            return x == null ? 0 : x;
                        },
                        stock: function (x) {
                            return x == null ? 0 : x;
                        },
                        state: function (x) {
                            return x == _gbl.state.Wait.v ? '下架' : '上架';
                        },
                        handle: function () {
                            var str = '';
                            if (o.state == 1) {
                                if (o.isRecommend == 0) {
                                    str += "&nbsp;&nbsp;" + '<a onClick="edit(' + o.id + ')">编辑</a> ' + '<a  onclick="lock(' + o.id + ',' + (o.state == 1 ? 0 : 1) + ')">' + (o.state == 0 ? '上架' : '下架') + '</a>' + "&nbsp;&nbsp;" + '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 1 + ',' + Date.parse(new Date()) + ')" >推荐</a>' + "&nbsp;&nbsp;" + '---';
                                } else if (o.isRecommend == 1) {
                                    str += "&nbsp;&nbsp;" + '<a onClick="edit(' + o.id + ')">编辑</a> ' + '<a  onclick="lock(' + o.id + ',' + (o.state == 1 ? 0 : 1) + ')">' + (o.state == 0 ? '上架' : '下架') + '</a>' + "&nbsp;&nbsp;" + '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 0 + ',' + o.beginTime + ')" >取消推荐</a>' + "&nbsp;&nbsp;" + '--- ';
                                }
                            } else {
                                str += '<a onClick="edit(' + o.id + ')">编辑</a> ' + '<a  onclick="lock(' + o.id + ',' + (o.state == 1 ? 0 : 1) + ')">' + (o.state == 0 ? '上架' : '下架') + '</a>' + "&nbsp;&nbsp;" + '<a onClick="deleted(' + o.id + ')">删除</a> ';
                            }

                            return str;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.GoodsList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },
    OrderList: function (pn, size) {
        var ele = $('#OrderList_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            goodsType: $('#goodsType').val(),
            state: $('#state').val(),
            name: $("#name").val(),
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getOrderList", data, function (res) {
            var tmpl = $('#OrderList_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        orderNum: function (x) {
                            return x == null ? 0 : x;
                        },
                        num: function (x) {
                            return x == null ? 0 : x;
                        },
                        price: function (x) {
                            return x == null ? 0 : (o.price * o.num);
                        },
                        typeName: function (x) {
                            return x == null ? 0 : x;
                        },
                        goodsName: function (x) {
                            return x == null ? 0 : x;
                        },
                        totalIntegral: function (x) {
                            return x == null ? 0 : x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        updateTime: function (x) {
                            return x == null ? '' : new Date(x).Format('yyyy-MM-dd hh:mm:ss');

                        },
                        state: function (x) {
                            if (x == 0) {
                                return '未发'
                            } else if (x == 1) {
                                return '已自动'
                            }
                            return '已手动'
                        },
                        handle: function () {
                            if (o.state == 0) {
                                return '<a onClick="handle(&quot;详情&quot;,&quot;/integralmall/orderdetail?id=' + o.id + '&quot;)">详情</a>&nbsp;&nbsp;|&nbsp;&nbsp;' + '<a onClick="sendGooods(&quot;撤销借款标&quot;,&quot;/integralmall/sendGoods?id=' + o.id + '&quot;)">发货</a>';
                            }
                            return '<a onClick="handle(&quot;详情&quot;,&quot;/integralmall/orderdetail?id=' + o.id + '&quot;)">详情</a>&nbsp;&nbsp;|&nbsp;&nbsp;' + '---';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.OrderList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }


    ,
    ActtivityList: function (pn, size) {
        var ele = $('#Activity_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            state: $('#state').val(),
            name: $("#name").val(),
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getActivityList", data, function (res) {
            var tmpl = $('#Activity_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        name: function (x) {
                            return x == null ? '---' : x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        beginTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        endTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');

                        },
                        integral: function (x) {
                            return (x.toFixed(2))
                        },
                        state: function (x) {
                            if (x == 0) {
                                return '未启用'
                            } else if (x == 1) {
                                return '已启用'
                            } else {
                                return '--'
                            }
                        },
                        handle: function () {
                            var str='';
                            if (o.isRecommend == 0) {
                                str += '<a onClick="edit(' + o.id + ')">修改</a>' + "&nbsp;&nbsp;" + '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 1 + ',' + Date.parse(new Date()) + ')" >推荐</a>';
                            } else if (o.isRecommend == 1) {
                                str += '<a onClick="edit(' + o.id + ')">修改</a>' + "&nbsp;&nbsp;" + '<a href="javascript:void(0)" onclick="recommend(' + o.id + ',' + 0 + ',' + o.beginTime + ')" >取消推荐</a>';
                            }
                            return str;
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.ActtivityList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }
    ,
    PrizeList: function (pn, size) {
        var ele = $('#Prize_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            name: $("#name").val(),
            lotteryActivityId: $("#lotteryActivityId").val()
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getPrizeList", data, function (res) {
            var tmpl = $('#Prize_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        name: function (x) {
                            return x == null ? '---' : x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        activityName: function (x) {
                            return x == null ? '---' : x;
                        },
                        count: function (x) {
                            return x == null ? 0 : x;
                        },
                        type: function (x) {
                            return _fields.getDesc(_fields.goodsType, x);
                        },
                        handle:function () {
                            return '<a onClick="editPrize(' + o.id + ')">奖品配置</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.PrizeList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }
    ,
    LotteryRecordList: function (pn, size) {
        var ele = $('#lotteryRecord_list');
        var pager = $('#page');
        var view = {
            pageNo: pn,
            pageSize: size,
            bTime: $('#bTime').val(),
            eTime: $('#eTime').val(),
            name: $("#name").val(),
            lotteryActivityId: $("#lotteryActivityId").val()
        };
        var data = {
            view: JSON.stringify(view)
        };
        $.post("/integralmall/getRecordList", data, function (res) {
            var tmpl = $('#lotteryRecord_tmpl').html();
            var arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        id: function (x) {
                            return x;
                        },
                        name: function (x) {
                            return x == null ? '---' : x;
                        },
                        createTime: function (x) {
                            return new Date(x).Format('yyyy-MM-dd hh:mm:ss');
                        },
                        lotteryActivityName: function (x) {
                            return x == null ? '---' : x;
                        },
                        lotteryPrizeName: function (x) {
                            return x == null ? '---' : x;
                        },
                        intergal: function (x) {
                            return x == null ? 0 : x;
                        },
                        realName: function (x) {
                            return x;
                        },
                        mobile: function (x) {
                            return x;
                        },
                        handle: function () {
                            if (o.state == 0) {
                                return '<a onClick="sendPrize(&quot;发货&quot;,&quot;/integralmall/sendprize?id=' + o.id + '&quot;)">发货</a>';
                            } else {
                                return '---'
                            }
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ApiIntegralMall.LotteryRecordList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }

}