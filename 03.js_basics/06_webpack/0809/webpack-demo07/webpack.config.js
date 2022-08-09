const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 方式一
    // entry: {
    //     index: {
    //         import: "./src/index.js",
    //         dependOn: 'shared'
    //     },
    //     welcome: {
    //         import: "./src/welcome.js",
    //         dependOn: 'shared'
    //     },
    //     // math: "./src/math.js",
    //     // shared: ['jquery', 'lodash', 'math'] math是自定义模块解析不了
    //     shared: ['jquery', 'lodash']
    // },
    // 方式二
    entry: {
        index: "./src/index.js",
        welcome: "./src/welcome.js",
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].[hash].bundle.js",
        clean: true,
    },
    devServer: {
        port: 8080,
        compress: true,
        static: path.join(__dirname, "./dist"),
    },
    devtool: "inline-source-map", // eval是默认值
    plugins: [new HtmlWebpackPlugin()],
    // 方式二需要加上的
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //         // minSize: 10,
    //         minChunks: 2,
    //         // 如果指定了name，就只会打成一个文件
    //         name: "vendor", // name指定是的output中的[name]值
    //         // cacheGroups更详细的打包规则
    //         cacheGroups: {
    //             vendor: {
    //                 name: "aaa",
    //                 test: /[\\/]node_modules[\\/]/,
    //             },
    //             commons: {
    //                 test: /src/,
    //                 name: "commons",
    //                 // chunks: 'all',
    //                 minChunks: 2,
    //                 minSize: 10,
    //             },
    //         },
    //     },
    // },
    // 方式三，只处理第三方库
    // externalsType: 'script',
    // externals: {
    //     // 该就是在js中import的名称，即form 右边的值
    //     jQuery: [
    //         "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js",
    //         "$" // from 左边的值
    //     ],
    //     loDash: [
    //         "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js",
    //         "_"
    //     ]
    // },
};
