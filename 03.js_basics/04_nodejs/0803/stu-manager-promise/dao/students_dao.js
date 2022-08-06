const BaseDao = require('./base_dao.js');
const table = "students";

class StudentsDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }

    find_by_page(args) {
        const bean = {
            table: " dorms a right join students b on a.id = b.dorm_id ",
            order_by: " b.id ASC"
        }
        let values = [];
        bean.where = this.get_where_from_args(args, values, "b.");
        return super.find_by_page(bean, values);
    }

    find_count(args) {
        const bean = {}
        let values = [];
        bean.where = this.get_where_from_args(args, values);
        return super.find_count(bean, values);
    }

    get_where_from_args(args, values, alias = "") {
        let where = "";
        let is_and = false;
        if (args.name) {
            where += " where ";
            where += ` ${alias}name like ? `;
            values.push(`%${args.name}%`)
            is_and = true;
        }
        if (args.gender) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            where += ` ${alias}gender = ? `;
            values.push(args.gender)
            is_and = true;
        }
        if (args.phone) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            // 使用正则表达式实现模糊查询
            where += ` ${alias}phone REGEXP ? `;
            values.push(args.phone)
            is_and = true;
        }
        if (args.dorm_id) {
            where += is_and ? "" : " where ";
            where += is_and ? " and " : "";
            where += ` ${alias}dorm_id = ? `;
            values.push(args.dorm_id)
        }
        return where;
    }

    login({account, password}) {
        // const sql = `select * from ${table} where account = ?;` // 密码加密之后的内容不一致的情况处理
        // const sql = `select * from ${table} where account = ? and password = ?;`;
        const bean = {
            where: "where code = ? and password = ?"
        }
        return super.find_one(bean, [account, password])
    }
}

module.exports = new StudentsDao(table, "id");