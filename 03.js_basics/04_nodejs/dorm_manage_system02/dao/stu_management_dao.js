const pool=require('./db_connect.js')
const BasicDao=require('./basic_dao')
const table="students"

class StuManagementDao extends BasicDao{
    constructor(table, primary_key) {
        super(table, primary_key);
    }
}
module.exports={StuManagementDao}