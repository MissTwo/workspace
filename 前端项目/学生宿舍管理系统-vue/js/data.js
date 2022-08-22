/**
 * 产生随机测试数据
 */
(function () {
    let dataJsonStr = localStorage.getItem("data");
	// 保证随机数据只产生一次
    if (!dataJsonStr) {
        let dorms = [
            {id: 1, name: "第一宿舍楼", intro: "这是第一宿舍楼，位于XXX"},
            {id: 2, name: "第二宿舍楼", intro: "这是第二宿舍楼，位于XXX"},
            {id: 3, name: "第三宿舍楼", intro: "这是第三宿舍楼，位于XXX"},
            {id: 4, name: "第四宿舍楼", intro: "这是第四宿舍楼，位于XXX"},
            {id: 5, name: "第五宿舍楼", intro: "这是第五宿舍楼，位于XXX"}
        ]
        let Random = Mock.Random;
        Random.extend({
            getDormId: function () {
                let array = [];
                dorms.forEach(value => {
                    array.push(value.id);
                });
                return this.pick(array);
            }
        })
        let stuData = Mock.mock({
            "students|100": [{
                "id|+1": 1,
                "code": /^2021\d{4}$/,
                "sname": "@cname",
                "gender": "@integer(0, 1)",
                "dormId": "@getDormId",
                "roomId": /\d{3}/,
                "password": "123",
                "phone": /^1[3456789]\d{9}$/
            }]
        });
        console.log(stuData);
        Random.extend({
            getStuId: function () {
                let array = [];
                stuData.students.forEach(value => {
                    array.push(value.id);
                });
                return this.pick(array);
            }
        });
        let data = Mock.mock({
            "dormAdmins|20": [{
                "id|+1": 1,
                "username": "@cname",
                "gender": "@integer(0, 1)",
                "phone": /^1[3456789]\d{9}$/,
                "account": /\w{5,18}/,
                "password": "123",
                "dormId": "@getDormId"
            }],
            "absences|200": [{
                "id|+1": 1,
                "studId": "@getStuId",
                "createDate": "@datetime('2021-MM-dd HH:mm:ss')",
                "remark": "@cparagraph(2)"
            }]
        });

        data.dorms = dorms;
        data.students = stuData.students;
        // data.dormMap = new Map();
        // // console.log("data.js:::" + data.dormMap.size);
        // dorms.forEach(value => {
        //     data.dormMap.set(value.id, value);
        // });
        // let stuMap = new Map();
        // stuData.students.forEach(value => {
        //     // console.log(value);
        //     stuMap.set(value.id, value);
        // });
        // data.stuMap = stuMap;
        // console.log(data);
        // console.log(JSON.stringify(data));
        localStorage.setItem("data", JSON.stringify(data));
        // console.log(localStorage.getItem("data"));
    }
})();