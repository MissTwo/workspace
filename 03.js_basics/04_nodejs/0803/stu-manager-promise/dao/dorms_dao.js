const BaseDao = require('./base_dao.js');
const table = "dorms";

class DormsDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }
    
    /**
     *  select a.id, a.name, a.intro, GROUP_CONCAT(b.username SEPARATOR ', ')
        from dorms a left join dorm_admins b on a.id = b.dorm_id 
        group by a.id, a.name, a.intro
        ;
     * */
    find_by_page(args) {
        const bean = {
            columns: "a.id, a.name, a.intro, GROUP_CONCAT(b.username SEPARATOR ', ') dorm_admin_names",
            table: " dorms a left join dorm_admins b on a.id = b.dorm_id ",
            group_by: " group by a.id, a.name, a.intro "
        }
        return super.find_by_page(bean);
    }
}

module.exports = new DormsDao(table, "id");