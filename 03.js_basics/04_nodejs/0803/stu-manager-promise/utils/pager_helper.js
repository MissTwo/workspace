
let PagerHelper = (function () {
    let _page_size = 0;
    let _count = 0;
    let _page_num = 0;
    // 私有函数
    function getBound() {
        this.start = (this.page_size * (this.page_num - 1));// 起始包含边界值
        this.end = this.page_size * this.page_num // 不包含后边界值

        this.total = this.count % this.page_size === 0 ? this.count / this.page_size : Math.ceil(this.count / this.page_size);// 一共多少页
        this.pre_num = this.first;
        if (this.page_num > 1) {
            this.pre_num = this.page_num - 1;
        }
        this.last = this.total;

        this.next_num = this.last;
        if (this.page_num < this.total) {
            this.next_num = this.page_num + 1;
        }
        // console.log("pager helper", this.count, this.total, this.page_size, this.page_num);
    }
    return class {
        first = 1; 
        constructor(page_size = 0, count = 0) {
            _page_size = page_size;
            _count = count;
            _page_num = 1;

            getBound.call(this)
        }
        set page_num(value) {
            _page_num = value;
            getBound.call(this)
        }
        get page_num() {
            return _page_num;
        }

        set page_size(value) {
            _page_size = value;
            this.page_num = 1;
            getBound.call(this)
        }
        get page_size() {
            return _page_size;
        }

        set count(value) {
            _count = value;
            // this.page_num = 1;
            // this.getBound()
            getBound.call(this)
        }
        get count() {
            return _count;
        }
    }
})()

module.exports = new PagerHelper();