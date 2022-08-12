createMenu(studentMenu, ".list-group")
selectEffectToggle(document.querySelector("#item1"))
let studentAbsence = Mock.mock({
    "studentAbsence|2": [
        {
            "id|+1": 1,
            "studentID":20221684,
            "name": "郭美丽",
            "dormitory|1": "第三宿舍楼",
            "dormitoryNumber": 324,
            "date":"@datetime",
            "remark":"@cparagraph(1, 2)",

        }
    ]
})

// 宿舍管理员的数组对象
let studentAbsenceData = studentAbsence.studentAbsence
redrawDormAdminTable( studentAbsenceData)
// 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable( data) {
    let elementNode = $('tbody')
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'>
                <td>${item.id}</td>
                <td>${item.studentID}</td>
                <td>${item.name}</td>
                <td>${item.dormitory}</td>
                <td>${item.dormitoryNumber}</td>
                <td>${item.date}</td>
                <td>${item.remark}</td>
                
            </tr>`)
    })
}

