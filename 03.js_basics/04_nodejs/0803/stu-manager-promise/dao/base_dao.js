const pool = require('./db_connect.js');
const pager = require('../utils/pager_helper.js');

class BaseDao {
    constructor(table, primary_key) {
        this.table = table;
        this.primary_key = primary_key;
    }

    query_with_promise(sql, values = []) {
        return new Promise(function (resolve, reject) {
            const query_obj = pool.query(sql, values, function (err, results) {
                if (err) reject(err);
                console.log("当前正执行的SQL命令：", query_obj.sql);
                console.log("查询结果：", results);
                resolve(results);
            })
        })
    }

    do_iud(sql, values) {
        return this.query_with_promise(sql, values).then(function (results) {
            return Promise.resolve({ result: results.affectedRows, insertId: results.insertId })
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    insert(bean) {
        const sql = `insert into ${this.table} set ?`;
        return this.do_iud(sql, [bean]);
    }

    delete_by_primary_key(primary_key_value) {
        const sql = `delete from ${this.table} where ${this.primary_key} = ?`;
        return this.do_iud(sql, [primary_key_value]);
    }

    update_by_primary_key(bean, primary_key_value) {
        const sql = `update ${this.table} set ? where ${this.primary_key} = ?`;
        return this.do_iud(sql, [bean, primary_key_value]);
    }

    //一个表还是多个表
    find_one({ columns, where, table } = {}, values) {
        const sql = `
                    select ${columns ? columns : " * "} 
                    from ${table ? table : this.table} 
                    ${where ? where : ""} 
                    limit 0, 1
                    `;
        return this.query_with_promise(sql, values);
    }

    find_by_page({ columns, where, table, group_by, having, order_by } = {}, values) {
        const sql = `
                    select ${columns ? columns : " * "} 
                    from ${table ? table : this.table} 
                    ${where ? where : ""} 
                    ${group_by ? group_by : ""} 
                    ${having ? having : ""} 
                    ${order_by ? "order by " + order_by : "order by " + this.primary_key}
                    limit ${pager.start}, ${pager.page_size}
                `;
        return this.query_with_promise(sql, values);
    }

    find_count({ where, table }, values) {
        const sql = `
                    select count(1) total 
                    from ${table ? table : this.table} 
                    ${where ? where : ""} 
                    `;
        return this.query_with_promise(sql, values).then(results => {
            return Promise.resolve(results.length > 0 ? results[0].total : 0);
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    check_exists(column, value) {
        const sql = `
                    select ${column} 
                    from ${this.table} 
                    where ${column} = ? 
                    `;
        return this.query_with_promise(sql, [value]).then((results) => {
            return Promise.resolve(results.length > 0)
        }).catch(err => Promise.reject(err));
    }

    find_all({ columns, where, table, order_by } = {}, values) {
        const sql = `
                    select ${columns ? columns : " * "} 
                    from ${table ? table : this.table} 
                    ${where ? where : ""} 
                    ${order_by ? "order by " + order_by : "order by " + this.primary_key}
                `;
        return this.query_with_promise(sql, values);
    }
}

module.exports = BaseDao;