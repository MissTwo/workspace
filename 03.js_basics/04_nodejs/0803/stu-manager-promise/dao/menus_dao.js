const BaseDao = require('./base_dao.js');
const table = "menus";
function get_config() {
    const where_config = {
        title: {
            type: "like",
            prefix: "%",
            suffix: "%",
            // alias: "b."
            // value: `%${username}%`
        },
        href: {
            type: "like",
            prefix: "%",
            suffix: "%",
            // alias: "b."
            // value: `%${username}%`
        },
        role: {
            type: "like",
            prefix: "%",
            suffix: "%",
            // alias: "b."
            // value: `%${username}%`
        },
    }

    return where_config;
}

class MenusDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }
    
    find_by_page(args) {
        const bean = {
            order_by: " sort asc ",
        }
        let config = get_config();
        let values = this.bind_where_config_value(args, config);
        bean.where = this.get_where_by_config(config);
        return super.find_by_page(bean, values);
    }

    find_count(args) {
        const bean = {}
        let config = get_config();
        let values = this.bind_where_config_value(args, config);
        bean.where = this.get_where_by_config(config);
        return super.find_count(bean, values);
    }

}

module.exports = new MenusDao(table, "id");