var cache=require('./cache');
var mysql=require('./mysql');
var midx = require('./midx');

/**
 * 渠道日报
 * @param day
 * @param callback
 * @returns {*}
 */
exports.getChannelDataByDay=function(day,callback){
    if(!day){
        return callback('日期格式不正确',null);
    }
    var sql='select ch.`name` channelName, IFNULL(t.registerCount,0) registerCount,IFNULL(t6.realNameCount,0) realNameCount,IFNULL(t7.bindCardCount,0) bindCardCount,ifnull(t1.withrawNum,0) withrawNum,ifnull(t1.withrawCount,0) withrawCount,ifnull(t1.withdrawAmount,0) withdrawAmount,ifnull(t2.rechargeNum,0) rechargeNum,ifnull(t2.rechargeCount,0) rechargeCount,ifnull(t2.rechargeAmount,0) rechargeAmount,ifnull(t3.investNum,0) investNum,ifnull(t3.investCount,0) investCount,ifnull(t3.investAmount,0) investAmount,ifnull(t4.newInvestNum,0) newInvestNum,ifnull(t4.newInvestAmount,0) newInvestAmount,ifnull(t5.newRechargeAmount,0) newRechargeAmount,ifnull(t5.newRechargeNum,0) newRechargeNum,ifnull(t8.thenCollect,0) thenCollect from t_channel ch left join (select count(1) registerCount,channel from t_user where time>="'+day+'" and time<="'+day+' 23:59:59" GROUP BY channel ) t on t.channel=ch.id LEFT JOIN ( select count(DISTINCT(c.account_id)) withrawNum,count(c.id) withrawCount,sum(c.amount) withdrawAmount,u.channel from c_withdraw c LEFT JOIN t_user u on c.account_id=u.account_id where c.pay_state=1 and c.time>="'+day+'" and c.time<="'+day+' 23:59:59" GROUP BY u.channel )t1  on ch.id=t1.channel LEFT JOIN ( select count(DISTINCT(c.account_id)) rechargeNum,count(c.id) rechargeCount,sum(c.amount) rechargeAmount,u.channel from c_recharge c LEFT JOIN t_user u on c.account_id=u.account_id where is_completed=1 and c.time>="'+day+'" and c.time<="'+day+' 23:59:59" GROUP BY u.channel )t2 on ch.id=t2.channel LEFT JOIN (select count(DISTINCT(c.account_id)) investNum,count(c.id) investCount,sum(c.amount) investAmount,u.channel from c_invests c LEFT JOIN t_user u on c.account_id=u.account_id where (c.state=1 or c.state=0) and c.time>="'+day+'" and c.time<="'+day+' 23:59:59" GROUP BY u.channel )t3 on ch.id=t3.channel left join ( select channel,IFNULL(sum(s1.amount),0) newInvestAmount, IFNULL(count(s1.account_id),0) newInvestNum from (select account_id,min(time) time,amount from ( select account_id,min(time) time,sum(amount) amount from c_invests where state=0 or state=1  GROUP BY  account_id,DATE_FORMAT(time, "%Y-%m-%d" ) )s2 GROUP BY account_id ) s1  left JOIN t_user u on u.account_id=s1.account_id where s1.time>="'+day+'" and s1.time<="'+day+' 23:59:59"  GROUP BY channel  ) t4  on ch.id=t4.channel left join (  select channel,IFNULL(sum(t.amount),0) newRechargeAmount ,IFNULL(count(t.account_id),0) newRechargeNum  from ( select account_id,min(time) time,amount from (select account_id,min(time) time,sum(amount) amount from c_recharge where is_completed=1 GROUP BY  account_id,DATE_FORMAT(time, "%Y-%m-%d" ) )t2 GROUP BY account_id ) t  left JOIN t_user u on u.account_id=t.account_id where t.time>="'+day+'" and t.time<="'+day+' 23:59:59" GROUP BY channel  ) t5 on ch.id=t5.channel left join (select count(1) realNameCount,channel from t_user where channel>=0 and real_name_time>="'+day+'" and real_name_time<="'+day+' 23:59:59" GROUP BY channel ) t6  on ch.id=t6.channel left join ( select count(1) bindCardCount,channel from c_account c INNER JOIN t_user u on c.id=u.account_id where c.bind_card=1 and c.bind_card_time>="'+day+'" and  bind_card_time<="'+day+' 23:59:59" and u.channel>=0 GROUP BY channel ) t7  on ch.id=t7.channel left join ( select IFNULL(sum(t1.s1),0) thenCollect,channel from (select investor_id,CONVERT(sum(if(state=0 and time<="'+day+' 23:59:59",payment_corpus,0)+if(state=0 and time<="'+day+' 23:59:59",payment_interest,0)+if(state=0 and time<="'+day+' 23:59:59",payment_coupon_interest,0)+if(state=1 and payment_time>"'+day+' 23:59:59",payment_corpus,0)+if(state=1 and payment_time>"'+day+' 23:59:59",payment_interest,0)+if(state=1 and payment_time>"'+day+' 23:59:59",payment_coupon_interest,0)),DECIMAL(20,2)) as s1 from c_bill_debt group by investor_id with rollup HAVING investor_id IS NOT NULL)t1 INNER JOIN t_user u on u.account_id=t1.investor_id where u.channel>=0 GROUP BY channel ) t8  on ch.id=t8.channel ';
    cache.getRedisByKey("channel_data_"+day, function (error, data) {
        if (error || !data) {
            mysql.mysqlQuery(sql,function(err,result){
                if(!err && result){
                    cache.setRedisByKey("channel_data_"+day,JSON.stringify( result), 60*5,function(err,body){
                        return callback(null,result);
                    })
                }
                else{
                    return callback(err,null);
                }
            })
        } else {
            return callback(null, JSON.parse(data));
        }
    });
}

/**
 * 渠道统计
 * @param req
 * @param res
 * @returns {*}
 */
exports.getChannelData=function(callback){
    var sql="select ch.`name` channelName, IFNULL(t.registerCount,0) registerCount,IFNULL(t.realNameCount,0) realNameCount,IFNULL(t.bindCardCount,0) bindCardCount,IFNULL(t.collectAmount,0) collectAmount,IFNULL(t.balance,0) balance,ifnull(t1.withrawNum,0) withrawNum,ifnull(t1.withrawCount,0) withrawCount,ifnull(t1.withdrawAmount,0) withdrawAmount,ifnull(t2.rechargeNum,0) rechargeNum,ifnull(t2.rechargeCount,0) rechargeCount,ifnull(t2.rechargeAmount,0) rechargeAmount,ifnull(t3.investNum,0) investNum,ifnull(t3.investCount,0) investCount,ifnull(t3.investAmount,0) investAmount from t_channel ch left join ( select count(1) registerCount,sum(a.collect_corpus+a.collect_interest) collectAmount,sum(if(u.real_name!='' and u.real_name is not null,1,0)) realNameCount,sum(if(a.bind_card=1,1,0)) bindCardCount,sum(balance) balance,channel from t_user u INNER JOIN c_account a on u.account_id=a.id where u.type=0 and channel>=0  GROUP BY channel ) t on t.channel=ch.id LEFT JOIN (  select count(DISTINCT(c.account_id)) withrawNum,count(c.id) withrawCount,sum(c.amount) withdrawAmount,u.channel from c_withdraw c LEFT JOIN t_user u on c.account_id=u.account_id where c.pay_state=1  and u.channel>=0 GROUP BY u.channel  )t1  on ch.id=t1.channel LEFT JOIN ( select count(DISTINCT(c.account_id)) rechargeNum,count(c.id) rechargeCount,sum(c.amount) rechargeAmount,u.channel from c_recharge c LEFT JOIN t_user u on c.account_id=u.account_id  where c.is_completed=1 and u.channel>=0  GROUP BY u.channel )t2 on ch.id=t2.channel LEFT JOIN (  select count(DISTINCT(c.account_id)) investNum,count(c.id) investCount,sum(c.amount) investAmount,u.channel from c_invests c LEFT JOIN t_user u on c.account_id=u.account_id where u.channel>=0 and (c.state=1 or c.state=0 ) GROUP BY u.channel )t3 on ch.id=t3.channel ";
    cache.getRedisByKey("channel_data", function (error, data) {
        if (error || !data) {
            mysql.mysqlQuery(sql,function(err,result){
                if(!err && result){
                    cache.setRedisByKey("channel_data",JSON.stringify( result), 60*5,function(err,body){
                        return callback(null,result);
                    })
                }
                else{
                    return callback(err,null);
                }
            })
        } else {
            return callback(null, JSON.parse(data));
        }
    });
}

/**
 * 获取平台数据
 */
exports.getYearAndSexRate =  function(call){
    midx('/account/getYearAndSexRate',{},function(err, body){
        call(err||null, body);
    })
}