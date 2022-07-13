createMenu(adminMenu, ".list-group")
selectEffectToggle(document.querySelector("#item3"))
let dormManagement = Mock.mock({
    "dormManagement|20": [
        {
            "id|+1": 1,
            // "dormitory|1": [{"第一宿舍楼": "这是第一宿舍楼，位于东边"}, {"第二宿舍楼": "这是第二宿舍楼，位于西边"}, {"第三宿舍楼": "这是第三宿舍楼，位于北边"},{"第四宿舍楼": "这是第四宿舍楼，位于南边"}, {"第五宿舍楼": "这是第五宿舍楼，位于西南边"}],
            "dormitory|1": ["第一宿舍楼", "第二宿舍楼", "第三宿舍楼", "第四宿舍楼", "第五宿舍楼"],
            "description|1": ["这是第一宿舍楼，位于东边","这是第二宿舍楼，位于西边","这是第三宿舍楼，位于北边","这是第四宿舍楼，位于南边","这是第五宿舍楼，位于西南边"],
            "name": "@cname",
        }
    ]
})
// 宿舍管理员的数组对象
let dormManagementData = dormManagement.dormManagement

// // 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable( data) {
    let elementNode = $('tbody')
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.dormitory}</td>
                <td>${item.description}</td>
                <td>${item.name}、${item.name}</td>
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
let pagenation  = new Pagenation(currentPage, limit,dormManagementData,$('.mer-pagination'), redrawDormAdminTable)
window.pagenation = pagenation
pagenation.draw()

// 初始化绘制表格
// redrawDormAdminTable($('tbody'), dormManagementData)
// // 搜索后绘制表格
$('#search_btn').click(function () {
    searchDormManager(dormManagementData, $('input[name="dormitory"]').val());
})

// 搜索宿舍管理员信息方法封装
function searchDormManager(data, dormitory) {
    pagenation.data= dormManagementData
    if (dormitory != '') pagenation.data = pagenation.data.filter(item => item.dormitory.indexOf(dormitory) != -1)
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
    pagenation.data = dormManagementData
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
    for (let i = 0; i < dormManagementData.length; i++){
        if(dormManagementData[i].id===id){
            dormManagementData.splice(i, 1)
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
                    <label class="col-sm-3 control-label">名称</label>
                    <div class="col-sm-8">
                        <select id="editDormitory" style="width: 100%;">
                        <option value="0">请选择宿舍楼</option>
                        <option value="第一宿舍楼">第一宿舍楼</option>
                        <option value="第二宿舍楼">第二宿舍楼</option>
                        <option value="第三宿舍楼">第三宿舍楼</option>
                        <option value="第四宿舍楼">第四宿舍楼</option>
                        <option value="第五宿舍楼">第五宿舍楼</option>
                    </select>
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">简介</label>
                    <div class="col-sm-8">
                        <input id="editDescription" type="text" class="form-control" name="username" placeholder="请输入简介">
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">管理员</label>
                    <div class="col-sm-8">
                        <input id="editManager" type="text" class="form-control" name="phoneNumber" placeholder="请输入管理员">
                    </div>
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
    if(!($('#editDescription').val()&&$('#editManager').val()&&$('#editDormitory option:selected').val())){
        alert("信息填写有误！")
        return
    }
    // 添加信息
    if(id===undefined){
        let obj = {
            "id": dormManagementData.length+1,
            "dormitory":$('#editDormitory option:selected').val(),
            "description":$('#editDescription').val(),
            "name":$('#editManager').val(),
        };
        dormManagementData.push(obj)
        pagenation.data.push(obj)
        pagenation.draw()
        self.parentNode.parentNode.parentNode.remove()
        return;

    }
    // 修改信息
    $(`#row${id} td:nth-child(3)`).text($('#editDormitory option:selected').val())
    $(`#row${id} td:nth-child(4)`).text($('#editDescription').val())
    $(`#row${id} td:nth-child(5)`).text($('#editManager').val())
    self.parentNode.parentNode.parentNode.remove()
}

