/**
 * 定义全局变量 : com.biz.fields ,转义type/state等数值
 */

(function () {
    this.com = this.com || {};
    com.biz = com.biz || {};
    com.biz.fields = {
        debtState: {
            //debt 相关
            "InConfirm": {v: 0, desc: "新发标"},
            "ApprovalPass": {v: 5, desc: "筹款中"},
            "Full": {v: 6, desc: "筹款中"},
            "ApprovalReject": {v: -5, desc: "审核失败"},
            "Cancel": {v: -6, desc: "撤标"},
            "InPayment": {v: 10, desc: "还款中"},
            "Overdue": {v: 11, desc: "逾期"},
            "EndPayment": {v: 15, desc: "还款完成"}
        },
        paymentType: {
            "Once": {v: 0, desc: "一次性还本付息"},
            "Monthly": {v: 1, desc: "按月付息,到期还本"},
            "Front": {v: 2, desc: "收益前置"},
            "Principal": {v: 3, desc: '等额本金'},
            "Interest": {v: 4, desc: '等额本息'}
        },
        periodUnit: {
            "Month": {v: 1, desc: "月"},
            "Day": {v: 2, desc: "天"}
        },
        awardType: {
            "Scale": {v: 1, desc: "比例"},
            "Fixed": {v: 2, desc: "固定"}
        },
        investType: {
            "Amount": {v: 0, desc: "金额"}
            //,"Share": {v: 1, desc: "份数"}
        },
        bonusType: {
            "Deductible": {v: 1, desc: "抵扣"},
            "Cash": {v: 2, desc: '现金'}
            //,"Share": {v: 1, desc: "份数"}
        },
        interestType: {
            "Now": {v: 0, desc: "即投即计息"},
            "Full": {v: 1, desc: "满标计息"}
        },
        gatWay: {
            "LINE": {v: 0, desc: "线下", hidden: true},
            "BF": {v: 1, desc: "宝付"},
            "HC": {v: 2, desc: "汇潮", hidden: true},
            "FY": {v: 3, desc: "富友"}
        },
        route: {
            "PC": {v: 1, desc: "PC"},
            "IOS": {v: 2, desc: "IOS"},
            "Android": {v: 3, desc: "Android"},
            "Wap": {v: 4, desc: 'Wap'}
        },
        state: {
            "Cancel": {v: -1, desc: "处理失败"},
            "Wait": {v: 0, desc: "等待处理"},
            "Complete": {v: 1, desc: "已处理"},
            "Expiry": {v: 2, desc: "过期"}
        },
        accountType: {
            "Investor": {v: 0, desc: "投资人"},
            "Borrower": {v: 1, desc: "借款人"}
        },
        newsType: {
            "Notice": {v: 0, desc: "平台公告"},
            "Inform": {v: 1, desc: "行业资讯"},
            "Help": {v: 2, desc: "帮助中心"},
            "Guide": {v: 3, desc: "移动端引导页"}
        },
        sendType: {
            "Sms": {v: 1, desc: "短信"},
            "Email": {v: 2, desc: "邮件"}
        },
        showType: {
            "PC": {v: 1, desc: "PC端"},
            "APP": {v: 2, desc: "移动端"}
        },
        protocolType: {
            "Debt": {v: 1, desc: "普通借款协议"}
        },
        fundType: {
            "Buy": {v: 1, desc: "购买"},
            "Debt": {v: 2, desc: "借款"},
            "InvestAward": {v: 3, desc: "投资奖励"},
            "PaymentInvest": {v: 4, desc: "接收回款"},
            "PaymentDebt": {v: 5, desc: "支付回款"},
            "ThawBuyFreeze": {v: 6, desc: "释放投标冻结"},
            "CancelInvest": {v: 7, desc: "撤标返还投资"},
            "CancelDebt": {v: 8, desc: "撤标返还已筹金额"},
            "Withdraw": {v: 9, desc: "提现"},
            "ThawWithdrawFreeze": {v: 10, desc: "释放提现冻结"},
            "CancelWithdraw": {v: 11, desc: "提现不通过"},
            "Recharge": {v: 12, desc: "在线充值"},
            "Debit": {v: 13, desc: "线下扣款"},
            "Bonus": {v: 14, desc: "红包"},
            "InviteAward": {v: 15, desc: "邀请奖励"},
            "LineRecharge": {v: 16, desc: "线下充值"},
            "PieceAward": {v: 17, desc: "续投奖励"},
            "CouponIterest": {v: 20, desc: "加息券收益"}
        },
        actions: {
            "Register": {v: 1, desc: '注册'},
            "Buy": {v: 2, desc: '购买'},
            "ValidEmail": {v: 3, desc: '邮件认证'},
            "Login": {v: 4, desc: '登录'},
            "PayPassword": {v: 5, desc: '设置交易密码'},
            "RealName": {v: 6, desc: '实名'},
            "BindCard": {v: 7, desc: '绑卡'},
            "Withdraw": {v: 8, desc: '提现', hidden: true},
            "Recharge": {v: 9, desc: '充值'},
            "Payment": {v: 10, desc: '回款', hidden: true},
            "WithdrawFail": {v: 11, desc: '提现失败'},
            "FullDebtAward": {v: 12, desc: '满标奖励'},
            "IntegralTranslation":{v: 14, desc: '积分平移'},
            "SignIn":{v:15,desc:"签到"},
            "Exchange":{v:16,desc:"商品兑换"},
            "Lottery":{v:17,desc:"活动抽奖"}

        },
        smsCodeType: {
            "Register": {v: 1, desc: '注册'},
            "PayPassword": {v: 2, desc: '交易密码'},
            "Password": {v: 3, desc: '登录密码'},
            "Email": {v: 4, desc: '邮箱'},
            "Bindcard":{v:5,desc:'绑卡'}
        }
        ,
        channelType: {
            "PC": {v: 0, desc: 'PC'}
        },
        lotteryType: {
            "Lattice": {v: 1, desc: "九宫格"},
            "Turntable": {v: 2, desc: "转盘"},
            "Normal": {v: 3, desc: "普通"}
        },
        investPeriodType: {
            "Hours": {v: 1, desc: "小时"},
            "Day": {v: 2, desc: "天"}

        },
        goodsType: {
            "Entity": {v: 1, desc: "实物"},
            "TelephoneFare": {v: 2, desc: "话费"},
            "Deductible": {v: 3, desc: '抵扣'},
            "Coupon": {v: 4, desc: '加息券'},
            "Integral": {v: 5, desc: '积分'}
        },
        debtType: {
            "New": {v: 1, desc: '新客标'},
            "Normal": {v: 2, desc: '常规标'},
            "SecKill": {v: 3, desc: '秒杀标'},
            "Customization": {v: 4, desc: '约标'},
            "Full" : {v: 5, desc: '已满标'}
        }
    }
    com.biz.fields.getDesc = function (type, v) {
        for (var key in type) {
            if (type[key].v == v)
                return type[key].desc;
        }
        return '';
    }
    if (typeof module !== 'undefined' && module.exports) {

    }
    //included directly via <script> tag
    else {
        this.__fields = com.biz.fields;
    }
})();

