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

    delete_by_primary_key(...primary_key_value) {
        console.log(primary_key_value);
        const sql = `delete from ${this.table} where ${this.primary_key} in (?)`;
        return this.do_iud(sql, primary_key_value);
    }

    update_by_primary_key(bean, primary_key_value) {
        delete bean[this.primary_key];
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
        return this.query_with_promise(sql, values).then(results => {
            return Promise.resolve(results.length > 0 ? results[0] : null);
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    find_by_primary_key(primary_key_value, columns) {
        const bean = {
            columns: columns,
            where: ` where ${this.primary_key} = ?`
        };
        return this.find_one(bean, [primary_key_value]);
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

    /**
     * 检测指定的字段值是否存在
     * @param {*} column 
     * @param {*} value 
     * @param {*} primary_key_value 主键值，为0时，表示添加，否则为编辑
     * @returns 
     */
    check_exists(column, value, primary_key_value = 0) {
        const sql = `
                    select ${column} 
                    from ${this.table} 
                    where ${column} = ? and ${this.primary_key} != ?
                    `;
        return this.query_with_promise(sql, [value, primary_key_value]).then((results) => {
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

    /**
     * 根据配置对象 config 生成对应的条件语句
     * @param config
     *          config = {
     *              username: {
     *                  type: "like",
     *                  value: "%值%",
     *                  prefix: "", //值前缀
     *                  suffix: "", //值后缀
     *              }
                    dorm_id: {
                        type: "=",
                        is_or: true // 使用or连接该条件，没有或者false，则使用and
                    }
                }
     */
    get_where_by_config(config, alias = "") {
        // config = config ? config : this.config;
        let where = "";
        let index = 0;
        for (const key in config) {
            const item = config[key];
            const type = item["type"];
            const is_or = item["is_or"];

            if (index > 0) {
                where += is_or ? " or " : " and ";
            } else {
                where += " where ";
            }
            where += `${alias}${key} ${type} ? `
            index++;
        }

        return where;
    }

    bind_where_config_value(args, config) {
        // config = config ? config : this.config;
        const values = [];
        for (const key in config) {
            const value = args[key];
            // console.log("1", key, value)
            if (!value) {
                delete config[key]
            } else {
                if (!args.hasOwnProperty(key)) {
                    continue;
                }
                const item = config[key];
                // console.log("2", key, item, value);
                item.value = (item.prefix ? item.prefix : "") + value + (item.suffix ? item.suffix : "");
                values.push(item.value);
            }
        }
        // console.log("values", values)
        return values;
    }
}

module.exports = BaseDao;