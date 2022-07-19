// 练习：搜索当前项目下的js文件，并输出名字
const fs = require("fs");
const path = require("path");

const project_path = path.resolve(__dirname, "../../");
// console.log("project_path", project_path);


function deep_search(folder) {
    if (!fs.statSync(folder).isDirectory()) {
        throw new Error(`${folder} 不是一个文件夹`);
    }
    const list = fs.readdirSync(folder, "utf8");
    // list.forEach(function(item) {
    //
    // })
    // console.log(fs.statSync(path).isDirectory());
    list.forEach(item => {
        let sub_path = path.join(folder, item);
        // console.log("sub_path", sub_path);
        let file = fs.statSync(sub_path);
        if (file.isDirectory()) {
            deep_search(sub_path);
        } else {
            if (path.extname(sub_path) === ".js") {
                console.log(path.basename(sub_path));
            }
        }
    })
    // console.log(list);
}

deep_search(project_path);