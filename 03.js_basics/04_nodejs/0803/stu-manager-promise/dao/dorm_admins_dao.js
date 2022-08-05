const BaseDao = require('./base_dao.js');
const table = "dorm_admins";
function get_config() {
    const where_config = {
        username: {
            type: "like",
            prefix: "%",
            suffix: "%",
            // alias: "b."
            // value: `%${username}%`
        },
        gender: {
            type: "=",
            // value: gender,
            is_or: false,
            // alias: "b."
        },
        phone: {
            type: "regexp",
            // value: phone,
            // alias: "b."
        },
        dorm_id: {
            type: "=",
            // value: dorm_id,
            is_or: false,
            // alias: "b."
        },
    }

    return where_config;
}

class DormAdminsDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }

    find_by_page(args) {
        const bean = {
            table: " dorms a right join dorm_admins b on a.id = b.dorm_id ",
            order_by: " b.id ASC"
        }

        // bean.where = this.get_where_from_args(args, values, "b.");
        let config = get_config();
        let values = this.bind_where_config_value(args, config);
        bean.where = this.get_where_by_config(config, "b.");
        return super.find_by_page(bean, values);
    }

    find_count(args) {
        const bean = {}
        let config = get_config();
        let values = this.bind_where_config_value(args, config);
        bean.where = this.get_where_by_config(config);
        return super.find_count(bean, values);
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

module.exports = new DormAdminsDao(table, "id");