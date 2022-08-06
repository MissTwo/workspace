const path = require('path');

module.exports = {
    //项目入口文件，项目可以有多个
    // entry: "./src/index.js",
    //多个入口写法
    entry: {
        index: "./src/index.js",
        welcome: "./src/welcome.js"
    },
    // 出口，打包之后的内容输出到哪里
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        clean: true, // 清除之前打包内容
    },
    // production：生产模式，js代码会压缩；development：开发模式
    mode: "development",
};
