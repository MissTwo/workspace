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
