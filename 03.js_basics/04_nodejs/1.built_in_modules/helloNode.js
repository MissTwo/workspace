// // 文件的读取
// require('fs').readFile('demo.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });
// // 文件的重写
// require('fs').writeFile('demo.txt', '重写文本内容', (err) => {
//     if (err) throw err;
//     console.log("改写内容成功");
// });
// // 文件的内容添加
// require('fs').appendFile('demo.txt', '这是追加的内容', (err) => {
//     if (err) throw err;
//     console.log("追加内容成功");
// });
// // 创建多级目录
//
// require('fs').mkdir('a/b/c', {recursive: true}, (err) => {
//     if (err) throw err;
// });
//

// 依次读取2个文件
// require('fs').readFile('01.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     require('fs').readFile('02.txt', 'utf8', (err, data) => {
//         if (err) throw err;
//         console.log(data);
//
//     })
// })

// 异步的写法,没有返回值
// let a=require('fs').readFileSync('demo.txt','utf8');
// console.log(a)

// 读取文件夹
require('fs').readdir('./',function(err,files){
    console.log(files)
})

// 读取文件夹的同步写法
// console.log(require('fs').readdirSync('./'))