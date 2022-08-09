const path=require('path');
// html页面的创建
const HtmlWebpackPlugin=require('html-webpack-plugin');
// 服务器的配置
// const Webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
module.exports = {
    entry: {
        index:'./src/js/index.js'
    },
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].bundle.js',
        clean: true,
    },
    mode: 'development',
    plugins: [
        // 一个html需要创建对应的一个html页面
        new HtmlWebpackPlugin({
            // 指定模板
            template: path.join(__dirname, '../src/html/index.html'),
            // 文件名字
            filename: 'index.html',
            // 注入js的位置,默认是head
            inject:"body",
            // 指定html引入的模块，模块名称就是entry入口中的key
            chunks:["index"]
        }),

    ],
    devServer:{
        static:"../dist",
        port:8080,
        // 'local-ip' | 'local-ipv4' | 'local-ipv6'，只支持局域网ip地址访问
        // localhost, 127.0.0.1
        // 0.0.0.0：支持任何地址访问
        // host: '0.0.0.0',
        // open: ['app.html'],
        // open: {
        //     target: 'app.html',
        //     app: {
        //         name: 'chrome'
        //     }
        // },
        compress: true, // 只是网络传输时，使用gzip压缩之后再传输
        // client: {
        //     logging: 'info',
        //     overlay:true
        // },
        // hot: true, // 热替换
        // liveReload: true, // 热加载

    }
}
