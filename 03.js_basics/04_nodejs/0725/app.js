const express = require('express');
const app = express();

const multer = require('multer');
const path = require("path");
const fs = require("fs");
// 配置保存的目录
const subFolder = "uploads";
const upload_folder = path.join("public", subFolder);
const create_folder = (folder) => {
    try {
        fs.accessSync(upload_folder);
    } catch (e) {
        fs.mkdirSync(folder, {recursive: true});
    }
}
create_folder(upload_folder);

// 配置multer中的保存的目录及文件名称的规则
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_folder);
    },
    filename: (req, file, cb) => {
        console.log("file1", file);
        const ext = path.extname(file.originalname);
        cb(null, `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`);
    }
})
// 生成multer对象
const upload = multer({
    storage
})

app.use(express.static(path.join(__dirname, "public")));

// avater就是文件html元素中name属性值
app.post("/upload.do", upload.single("avater"), function (req, res) {
    console.log(req.file);
    //保存到数据库的路径是
    console.log("保存到数据库的路径：", path.join(subFolder, path.basename(req.file.path)))
    res.send("上传成功");
});

// 最多上传10个，所有文件都通过avater字段来上传的
// app.post("/upload_multi.do", upload.array("avater", 10), function (req, res) {
//     console.log(req.files);
//     //保存到数据库的路径是
//     req.files.forEach(file => {
//         console.log("保存到数据库的路径：", path.join(subFolder, path.basename(file.path)))
//     });
//     res.send("上传成功");
// });

// 多文件上传，每个字段名称不一样
app.post("/upload_multi.do", upload.fields([{name: "avater", maxCount: 2}, {name: "head_pic", maxCount: 1}]), function (req, res) {
    console.log(req.files);//是一个对象了，
    //保存到数据库的路径是
    Object.values(req.files).forEach(files => {
        files.forEach(file => {
            console.log("保存到数据库的路径：", path.join(subFolder, path.basename(file.path)))
        })
    });
    res.send("上传成功");
});

app.listen(3000);