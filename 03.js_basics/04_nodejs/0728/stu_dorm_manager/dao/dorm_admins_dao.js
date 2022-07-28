/**
 * 只做查询不做任何处理，所有业务相关的代码都在router中
 * @type {Pool}
 */

const pool = require("./db_connect.js");
const table = "dorm_admins";

class DormAdminDao {
    // constructor() {
    // }

    find_by_page({username, gender, phone, dorm_id}, num, size, callback) {
        let where = "";
        let is_and = false;
        if (username) {
            where += " where ";
            where += ` username like '%${username}%' `;
            is_and = true;
        }
        if (gender) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            where += ` gender = '${gender}' `;
            is_and = true;
        }
        if (phone) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            // 使用正则表达式实现模糊查询
            where += ` phone REGEXP '${phone}' `;
            is_and = true;
        }
        if (dorm_id) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            where += ` dorm_id = '${dorm_id}' `;
        }
        const sql = `select *
                     from ${table} ${where}
                     limit ${(num - 1) * size}, ${size}`;

        const query = pool.query(sql, ((err, results) => {
            if (err) throw err;
            callback(results);
        }));
        console.log("当前正在执行的sql命令：", query.sql);
    }

    /**
     * 根据id删除数据
     * @param ids
     * @param callback  回调函数
     */
    delete_by_ids(ids, callback) {
        const sql = `delete from ${table} where id in (?)`;
        const query = pool.query(sql, [ids], ((err, results) => {
            if (err) throw err;
            callback(results.affectedRows > 0);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    /**
     * 添加
     * @param bean  添加的对象
     * @param callback
     */
    insert(bean, callback) {
        const sql = `insert into ${table} set ?`;
        const query = pool.query(sql, [bean], ((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results.affectedRows > 0, results.insertId);
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
        const sql = `select * from ${table} where ${column} = ? and id != ?`;
        const query = pool.query(sql, [value, id], ((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results.length > 0);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }

    /**
     * 更新，字段太多，或表中的数据太多，不推荐
     * @param bean  更新的对象
     * @param id    更新的id值
     * @param callback
     */
    update(bean, id, callback) {
        const sql = `update ${table} set ? where id = ?`;
        const query = pool.query(sql, [bean, id], ((err, results) => {
            if (err) throw err;
            console.log(results);
            callback(results.affectedRows > 0);
            console.log("当前正在执行的sql命令：", query.sql)
        }));
    }
}

module.exports = new DormAdminDao();