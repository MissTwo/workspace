const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: path.join(__dirname, "../src/index.js"),
        welcome: path.join(__dirname, "../src/welcome.js")
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.join(__dirname, "../dist"),
        clean: true
    },
    // 使用npx webpack-dev-server --config ./config/webpack.config.js启动命令麻烦，
    // 去配置文件该应该serve配置再后用npm run serve启动服务器
    devServer: {
        static: "../dist",
        port: 8080,
        // "0.0.0.0"表示可以支持任何地址访问,'local-ip' | 'local-ipv4' | 'local-ipv6' | 'localhost' | '127.0.0.1'
        host: 'local-ipv4',
        // 设置启动打开的页面
        // open: ['app.html']
        open:{
            target:'app.html',
            app:{
                name:'chrome'
            }
        },
        compress: true,
        client: {
            overlay: true,
        },
        liveReload: true,
    },
    // css的样式处理
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"],
                // 分离css的情况
                use:[MiniCssExtractPlugin.loader,"css-loader"]

            },
        ],
    },
    mode: "development",
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            // title与template发生冲突，只能二选一
            // title:"hello",
            template: path.join(__dirname, "../src", "index.html"),
            filename: "app.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src", "welcome.html"),
            filename: "welcome.html",
            inject: "body",
            // 必须与入口出名字一致
            chunks: ["welcome"]
        })
    ]

};