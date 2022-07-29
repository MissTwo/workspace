/**
 * 只做查询不做任何处理，所有业务相关的代码都在router中
 */

const BaseDao = require("./base_dao.js");
const table = "dorms_bak";

class DormsDao extends BaseDao {
    constructor(table, primary_key) {
        super(table, primary_key);
    }
}

let dao = new DormsDao(table, "id");

module.exports = dao;