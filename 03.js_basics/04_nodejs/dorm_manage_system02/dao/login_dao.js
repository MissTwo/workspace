const pool = require('./db_connect.js')

// 密码连接数据库对比
function loginCheck(table,object) {
    let sql = `SELECT a.id,a.account,a.role FROM ${table} a WHERE a.account=?  AND a.password=? AND a.role=?`
    return new Promise((resolve, reject) => {
        pool.query(sql, object, (err, results) => {
            if (err)reject(err)
            resolve(results)
        })
    })

}

module.exports = {loginCheck}