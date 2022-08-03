const BaseDao = require("../dao/base_dao.js");
const dao = new BaseDao("dorms", "id");
const pager = require('../utils/pager_helper.js');

function test_insert() {
    // dao.do_iud("insert into dorms set ?fdfdd", [{name: "test", intro: "test"}]).then(({result, insertId}) => {
    //     console.log(result, insertId);
    // }).catch(err => {
    //     console.log("test_insert");
    //     console.log(err);
    // })
    dao.insert({ name: "test", intro: "test" }).then(({ result, insertId }) => {
        // console.log(result, insertId);
    }).catch(err => {
        console.log("test_insert");
        console.log(err);
    })
}

// test_insert();

function test_delete_by_primary_key() {
    dao.delete_by_primary_key(6).then(({ result, insertId }) => {
        // console.log(result, insertId);
    }).catch(err => {
        console.log("test_delete_by_primary_key");
        console.log(err);
    })
}

// test_delete_by_primary_key()

function test_update_by_primary_key() {
    dao.update_by_primary_key({ name: "test1", intro: "test1" }, 7).then(({ result, insertId }) => {
        // console.log(result, insertId);
    }).catch(err => {
        console.log("test_update_by_primary_key");
        console.log(err);
    })
}

// test_update_by_primary_key()

function test_query() {
    dao.query_with_promise("select * from dorms").then(results => {
        // console.log(results);
    }).catch(err => {
        console.log("在test中");
        console.log(err);
    });
}

// test_query();

function test_find_one() {
    const bean = { 
        columns: "a.*, b.username",
        where: "where a.id = ?", 
        table: " dorms a join dorm_admins b on a.id = b.dorm_id ", 
        order_by: "a.id asc"
    };
    dao.find_one(bean, [1]).then(results => {
        // console.log(results);
    }).catch(err => {
        console.log("test_find_one");
        console.log(err);
    });
}
// test_find_one()

function test_find_count() {
    const bean = { 
        where: "where a.id = ?", 
        table: " dorms a join dorm_admins b on a.id = b.dorm_id ", 
    };
    dao.find_count(bean, [1]).then(results => {
        // console.log(results);
    }).catch(err => {
        console.log("test_find_count");
        console.log(err);
    });
}

// test_find_count()


function test_check_exists() {
    dao.check_exists("name", "第1栋宿舍楼1111").then(isExists => {
        console.log(isExists);
    }).catch(err => {
        console.log("test_check_exists");
        console.log(err);
    });
}
// test_check_exists();

function test_find_by_page() {
    // pager.count = 100;
    pager.page_size = 2;
    pager.page_num = 2;
    dao.find_by_page().then(results => {
        // console.log(results);
    }).catch(err => {
        console.log("test_find_by_page");
        console.log(err);
    });
}

test_find_by_page();