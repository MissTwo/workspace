const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CSS分离插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CSS压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// JS压缩
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    // entry: path.join(__dirname, '../src', "index.js"),
    entry: {
        index: path.join(__dirname, '../src', "index.js"),
        welcome: path.join(__dirname, '../src', "welcome.js"),
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.join(__dirname, '../dist',),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 顺序不能乱
                // use: ["style-loader", "css-loader"]
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    devServer: {
        static: '../dist', // http://localhost:8080：该地址默认访问index.html
        port: 8080,
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
    },
    optimization: {
        // true与multiple一样，single，打包为一个文件
        // runtimeChunk: 'multiple' webpack5.74.0热替换配置
        // 只在production中有效，但是会让JS的压缩失效
        minimize: true, // 实现压缩，false不压缩
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    },
    //development    production
    mode: "production",
    plugins: [
        // 在dist中生成一个html文档，一个实例对应一个页面
        new HtmlWebpackPlugin({
            // title: "启帆科创Webpack", // 与template冲突，指定生成的html标题
            template: path.join(__dirname, '../src', "index.html"),
            filename: "app.html",
            // body，将引入js的script标签写在body中
            inject: "body",
            chunks: ["index", "welcome"]
        }),
        new HtmlWebpackPlugin({
            // title: "启帆科创Webpack", // 与template冲突，指定生成的html标题
            template: path.join(__dirname, '../src', "welcome.html"),
            filename: "welcome.html",
            // body，将引入js的script标签写在body中
            inject: "body",
            chunks: ["welcome"]
        }),
        new MiniCssExtractPlugin()
    ]
}