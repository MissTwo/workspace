const BaseDao = require('./base_dao.js');
const table = "admins";

class AdminsDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }
    
    find_by_page(args) {
        const bean = {
            columns: "a.id, a.name, a.intro, GROUP_CONCAT(b.username SEPARATOR ', ') dorm_admin_names",
            table: " dorms a left join dorm_admins b on a.id = b.dorm_id ",
            group_by: " group by a.id, a.name, a.intro ",
        }
        let values = [];
        bean.where = this.get_where_from_args(args, values, "a.");
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
        if(args.name) {
            where = ` where ${alias}name like ? `
            values.push(`%${args.name}%`)
        }
        return where;
    }

    login({account, password}) {
        // const sql = `select * from ${table} where account = ?;` // 密码加密之后的内容不一致的情况处理
        // const sql = `select * from ${table} where account = ? and password = ?;`;
        const bean = {
            where: "where account = ? and password = ?"
        }
        return super.find_one(bean, [account, password])
    }
}

module.exports = new AdminsDao(table, "id");