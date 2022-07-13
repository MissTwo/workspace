createMenu(managerMenu, ".list-group")
selectEffectToggle(document.querySelector("#item1"))
console.log(1)
let managerStudents = Mock.mock({
    "managerStudent|60": [
        {
            "id|+1": 1,
            "studentID|+1":20220000,
            "name": "@cname",
            "gender|1": ["男", "女"],
            "phoneNumber": /^1\d{10}/,
            "dormitory": "第三宿舍楼",
            "dormitoryNumber|100-599": 100,
        }
    ]
})
// 宿舍管理员的数组对象
let managerStudentsData = managerStudents.managerStudent
// // 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable( data) {
    let elementNode = $('tbody')
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.studentID}</td>,
                <td>${item.name}</td>
                <td>${item.gender}</td>
                <td>${item.phoneNumber}</td>
                <td>${item.dormitory}</td>
                <td>${item.dormitoryNumber}</td>

                <td>
                    <input type="button" value="编辑" onclick="editRow(${item.id})">
                    <input type="button" value="删除" onclick="deleteRow(${item.id})">
                </td>
            </tr>`)
    })
}


// 分页的方法封装
let limit = 5
let currentPage = 1
let pagenation  = new Pagenation(currentPage, limit,managerStudentsData,$('.mer-pagination'), redrawDormAdminTable)
window.pagenation = pagenation
pagenation.draw()

// 初始化绘制表格
// redrawDormAdminTable($('tbody'), managerStudentsData)
// // 搜索后绘制表格
$('#search_btn').click(function () {
    searchDormManager(managerStudentsData, $('input[name="dorm-manager_name"]').val(), $('input[name="dorm-manager_phoneNumber"]').val(), $("#gender option:selected").val());
})

// 搜索宿舍管理员信息方法封装
function searchDormManager(data, name, phoneNumber, gender, dormitory) {
    pagenation.data= managerStudentsData
    if (name != '') pagenation.data = pagenation.data.filter(item => item.name.indexOf(name) != -1)
    if (phoneNumber != '') pagenation.data = pagenation.data.filter(item => item.phoneNumber.indexOf(phoneNumber) != -1)
    if (gender != 0) pagenation.data = pagenation.data.filter(item => item.gender == gender)
    pagenation.currentPage=1
    pagenation.draw()
}

// 批量删除点击事件绑定
$('#delete-data').click(() => {
    if ($('td>input[type="checkbox"]:checked').length === 0) return
    if (!confirm("确定要删除选中的这些信息吗？")) return
    $('td>input[type="checkbox"]:checked').__proto__.forEach = Array.prototype.forEach
    $('td>input[type="checkbox"]:checked').forEach(i => {
        deleteFromData(Number(i.value))
    })
    if ($('#select-all')) $('#select-all').prop("checked", false);
})
// // 重置按钮，绘制所有的数据
$('#reset_btn').click(() => {
    pagenation.data = managerStudentsData
    pagenation.currentPage=1
    pagenation.draw()
})

// // 删除每一行的操作
function deleteRow(id) {
    if (!confirm("确定要删除选中的这些信息吗？")) return
    deleteFromData(id)
}
// 批量删除
function deleteFromData(id){
    for (let i = 0; i < pagenation.data.length; i++){
        if(pagenation.data[i].id===id){
            pagenation.data.splice(i, 1)
            break
        }
    }
    for (let i = 0; i < managerStudentsData.length; i++){
        if(managerStudentsData[i].id===id){
            managerStudentsData.splice(i, 1)
            break
        }
    }
    pagenation.draw()
}

// 编辑与修改模块

// 修改与添加的模板
function creatEdit(id) {
    $('#main-content').append(
        `<form class="form-horizontal" id="edited">
                <h4>基本信息</h4>
                <div class="form-group">
                    <label class="col-sm-3 control-label">姓名</label>
                    <div class="col-sm-8">
                        <input id="editName" type="text" class="form-control" name="name" placeholder="请输入姓名">
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">寝室号</label>
                    <div class="col-sm-8">
                        <input id="editDormNum" type="text" class="form-control" name="username" placeholder="请输入寝室号">
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">手机号</label>
                    <div class="col-sm-8">
                        <input id="editPhoneNum" type="text" class="form-control" name="phoneNumber" placeholder="请输入手机号">
                    </div>
                </div>
               <div class="form-group">
                    <select id="editGender">
                        <option value="0">请选择性别</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                    <select id="editDormitory">
                        <option value="0">请选择宿舍楼</option>
                        <option value="第一宿舍楼">第一宿舍楼</option>
                        <option value="第二宿舍楼">第二宿舍楼</option>
                        <option value="第三宿舍楼">第三宿舍楼</option>
                        <option value="第四宿舍楼">第四宿舍楼</option>
                        <option value="第五宿舍楼">第五宿舍楼</option>
                    </select>
                </div>
                <div class="form-group">
                    <div style="text-align: center">
                        <button type="button" class="btn btn-primary" onclick="confirmCreate(this,${id})">确认</button>
                        <button type="button" class="btn btn-danger" onclick="cancelCreat(this)">取消</button>
                    </div>
                </div>
            </form>`)
}
// 取消添加或修改
function cancelCreat(self) {
    self.parentNode.parentNode.parentNode.remove()
}
//添加数据按钮
$('#add-data').click(function() {
    creatEdit()
})
// 编辑每一行
function editRow(id) {
    let row = document.querySelector(`#row${id}`)
    // 创建编辑框
    creatEdit(`${id}`)
}
// 修改数据确认与编辑数据的确认
function confirmCreate(self,id) {
    if(!($('#editName').val()&&$('#editGender option:selected').val()&&$('#editPhoneNum').val()&&$('#editDormitory option:selected').val()&&$('#editDormNum').val())){
        alert("信息填写有误！")
        return
    }
    // 添加信息
    if(id===undefined){
        let obj = {
            "id": managerStudentsData.length+1,
            "studentID": (managerStudentsData[managerStudentsData.length-1].studentID)+1,
            "name":$('#editName').val(),
            "gender":$('#editGender option:selected').val(),
            "phoneNumber":$('#editPhoneNum').val(),
            "dormitory":$('#editDormitory option:selected').val(),
            "dormitoryNumber": $('#editDormNum').val(),
        };
        managerStudentsData.push(obj)
        pagenation.data.push(obj)
        pagenation.draw()
        self.parentNode.parentNode.parentNode.remove()
        return;
    }
    // // 修改信息
    $(`#row${id} td:nth-child(4)`).text($('#editName').val())
    $(`#row${id} td:nth-child(5)`).text($('#editGender option:selected').val())
    $(`#row${id} td:nth-child(6)`).text($('#editPhoneNum').val())
    $(`#row${id} td:nth-child(7)`).text($('#editDormitory option:selected').val())
    $(`#row${id} td:nth-child(8)`).text($('#editUserName').val())
    self.parentNode.parentNode.parentNode.remove()
}

