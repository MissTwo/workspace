const pool=require('./db_connect.js')
const BasicDao=require('./basic_dao')
const table="dorm_admins"

class DormAdminDao extends BasicDao{
    constructor(table, primary_key) {
        super(table, primary_key);
    }
    // pagination(where, values, num, size, callback) {
    //     super.pagination(where, values, num, size, callback);
    // }
}
module.exports={DormAdminDao}