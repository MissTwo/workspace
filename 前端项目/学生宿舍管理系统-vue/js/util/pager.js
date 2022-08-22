/**
 * 分页封装
 * @param selectors，选择器对象
 *              span_count：显示总数的标签
 *              ul_item_code：分页码
 *              select_page_size：控制每页显示数量
 * @param count，数据的总数
 */
function createPager(selectors = {}, count = 0, pageSize = 5, pageNum = 1) {
    // 获取页面元素
    let span_count = document.querySelector(selectors.span_count);
    let ul_item_code = document.querySelector(selectors.ul_item_code);
    // let select_page_size = document.querySelector(selectors.select_page_size);
    //
    span_count.textContent = count;

    /*
        数据总量、当前要显示第几页、一页显示多少条、一共有多少页、首页、上一页、下一页、尾页
     */
    // let pageNum = 0;
    // let pageSize = 0;
    let pageTotal = Math.ceil(count / pageSize);
    let first = 1;
    let pre = pageNum - 1;
    if (pre == first) {
        pre = first;
    }
    let next = pageNum + 1;
    let last = pageTotal;
    if (next == last) {
        next = last;
    }

    // 清除标签原有的内容
    while (ul_item_code.hasChildNodes()) {
        ul_item_code.firstChild.remove();
    }
    ul_item_code.insertAdjacentHTML("beforeend", `<li><a href="#">首页</a></li>`);
    ul_item_code.insertAdjacentHTML("beforeend", `<li><a href="#">上一页</a></li>`);
    for (let i = 0; i < pageTotal; i++) {
        ul_item_code.insertAdjacentHTML("beforeend", `<li><a href="#">${i + 1}</a></li>`);
    }
    ul_item_code.insertAdjacentHTML("beforeend", `<li><a href="#">下一页</a></li>`);
    ul_item_code.insertAdjacentHTML("beforeend", `<li><a href="#">尾页</a></li>`);

    return {
        pageNum, pageTotal, pageSize, count, first, last, next, pre
    }
}