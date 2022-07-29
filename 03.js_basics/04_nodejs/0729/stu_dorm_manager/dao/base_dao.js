const pool = require("./db_connect.js");

class BaseDao {
    /**
     * 构造函数
     * @param table 表名
     * @param primary_key   表的主键，不支持联合主键(多个列名组成的主键)
     */
    constructor(table, primary_key) {
        this.table = table;
        this.primary_key = primary_key;
    }
    /**
     * 执行增删改的代码
     * @param sql   需要执行的sql命令
     * @param values    参数值数组
     * @param callback  回调函数
     */
    do_iud(sql, values, callback) {
        if (!Array.isArray(values)) {
            throw new Error("values 必须是一个数组");
        }
        const query = pool.query(sql, values, ((err, results) => {
            if (err) throw err;
            callback(results.affectedRows > 0, results.insertId);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    /**
     * 根据主键删除数据，不支持联合主键
     * @param ids
     * @param callback  回调函数
     */
    delete_by_ids(ids, callback) {
        const sql = `delete from ${this.table} where ${this.primary_key} in (?)`;
        this.do_iud(sql, [ids], callback);
    }

    /**
     * 添加
     * @param bean  添加的对象
     * @param callback
     */
    insert(bean, callback) {
        const sql = `insert into ${this.table} set ?`;
        this.do_iud(sql, [bean], callback);
    }

    /**
     * 更新，字段太多，或表中的数据太多，不推荐
     * @param bean  更新的对象
     * @param id    主键值
     * @param callback
     */
    update(bean, id, callback) {
        const sql = `update ${this.table} set ? where ${this.primary_key} = ?`;
        this.do_iud(sql, [bean, id], callback);
    }

    do_query(sql, values, callback) {
        const query = pool.query(sql, values, ((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    /**
     * 检测指定的列名是否存在指定的值
     * @param column
     * @param value
     * @param id    修改记录的id值，如果是添加则为0
     * @param callback
     */
    check_exists(column, value, id = 0, callback) {
        const sql = `select ${column} from ${this.table} where ${column} = ? and ${this.primary_key} != ?`;
        this.do_query(sql, [value, id], (results) => {
            callback(results.length > 0);
        })
    }

    /**
     * 获取当前查询的数据总数，支持条件
     * @param where
     * @param values
     * @param callback
     */
    find_count(where, values, callback) {
        const sql = `select count(1) total from ${this.table} ${where}`;
        this.do_query(sql, values, (results) => {
            callback(results.length > 0 ? results[0].total : 0);
        })
    }

    find_by_page(where, values, num, size, callback) {
        const sql = `select * from ${this.table} ${where} limit ${(num - 1) * size}, ${size}`;
        this.do_query(sql, values, callback);
    }
}

module.exports = BaseDao;