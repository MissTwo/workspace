const pool=require('./db_connect.js')
// 密码连接数据库对比
function loginCheck(object,callback) {
    let sql='SELECT a.id FROM admins a WHERE a.account=?  AND a.password=? AND a.role=?'
    pool.query(sql,object,function (err,results) {
        callback(err,results)
    })
}

module.exports={loginCheck}