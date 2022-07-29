// 单元测试，以后小部分功能模块为测试主体

const dao = require('../dao/dorms_dao.js');
function delete_test() {
    dao.delete_by_ids([9], (results) => {
        console.log("是否删除成功：", results);
    });
}
function insert_test() {
    dao.insert({name: "第一宿舍楼", intro: "aaaaaaaaa"}, (results, insertId) => {
        console.log("是否添加成功：", results, insertId);
    })
}

function update_test() {
    dao.update({name: "第N宿舍楼", intro: "bbbbbb"}, 10,(results, insertId) => {
        console.log("是否修改成功：", results);
    })
}

function find_count_test() {
    dao.find_count("where name = ?", ["xxx"], (count) => {
        console.log("查询到的数据总数为：", count);
    })
}

function check_exists_test() {
    dao.check_exists("name", ["第N宿舍楼"], 0, (isExist) => {
        console.log("数据是否存在", isExist);
    })
}

function find_by_page_test() {
    dao.find_by_page("", [], 1, 10, (count) => {
        console.log("查询到的数据总数为：", count);
    })
}

// delete_test();
// find_count_test();
// check_exists_test()
find_by_page_test();