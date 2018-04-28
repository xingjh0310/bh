var mysql=require('mysql');
var pool = mysql.createPool({
    host:com.env.mysql.host,
    user:com.env.mysql.user,
    password:com.env.mysql.password,
    port:com.env.mysql.port,
    database:com.env.mysql.database
})

exports.mysqlQuery=function(sql,callback){
    pool.getConnection(function (error, conn) {
        if(!error){
            conn.query(sql,function(err,result){
                conn.release()
                if(err){
                    callback(err);
                }
                else{
                    callback(null,result);
                }
            })
        }else{
            callback(error,null);
        }
    })
}