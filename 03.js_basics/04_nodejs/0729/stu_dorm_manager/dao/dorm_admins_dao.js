/**
 * 只做查询不做任何处理，所有业务相关的代码都在router中
 * @type {Pool}
 */

const pool = require("./db_connect.js");
const BaseDao = require("./base_dao.js");
const table = "dorm_admins";

class DormAdminDao extends BaseDao{
    constructor(table, primary_key) {
        super(table, primary_key);
    }

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
}

module.exports = new DormAdminDao(table, "id");