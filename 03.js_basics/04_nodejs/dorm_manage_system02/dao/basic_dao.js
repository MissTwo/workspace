const pool=require('./db_connect.js')
// 封装为基本的一类方法
class BasicDao {
    constructor(table, primary_key) {
        this.table = table;
        this.primary_key = primary_key;
    }

    addDeleteUpdate(sql, values, callback) {
        if (!Array.isArray(values)) {
            throw new Error("values 必须是一个数组");
        }
        const query = pool.query(sql, values, ((err, results) => {
            if (err) throw err;
            callback(results.affectedRows > 0, results.insertId);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    delete(ids, callback) {
        const sql = `delete from ${this.table} where ${this.primary_key} in (?)`;
        this.addDeleteUpdate(sql, [ids], callback);
    }

    add(bean, callback) {
        const sql = `insert into ${this.table} set ?`;
        this.addDeleteUpdate(sql, [bean], callback);
    }


    update(bean, id, callback) {
        const sql = `update ${this.table} set ? where ${this.primary_key} = ?`;
        this.addDeleteUpdate(sql, [bean, id], callback);
    }

    do_query(sql, values, callback) {
        const query = pool.query(sql, values, ((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    checkExistence(column, value, id = 0, callback) {
        const sql = `select ${column} from ${this.table} where ${column} = ? and ${this.primary_key} != ?`;
        this.do_query(sql, [value, id], (results) => {
            callback(results.length > 0);
        })
    }

    total(where, values, callback) {
        const sql = `select count(1) total from ${this.table} ${where}`;
        this.do_query(sql, values, (results) => {
            callback(results.length > 0 ? results[0].total : 0);
        })
    }

    pagination(where, values, num, size, callback) {
        const sql = `select * from ${this.table} ${where} limit ${(num - 1) * size}, ${size}`;
        this.do_query(sql, values, callback);
    }
}
module.exports = BasicDao;
