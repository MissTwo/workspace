const path = require('path');
// 分离css
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin()
    ],
    // 加载器:除js模块以为的其他模块处理
    module: {
        rules: [{
            // css模块处理
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            // less格式的样式模块处理
            test: /\.less$/i,
            // compiles less to css
            use:[
                {loader: "style-loader"},
                {loader: "css-loader"},
                {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                            strictMath: true,
                        }
                    }

                }
            ]
        }, {
            // css的分离
            test: /\.css$/,
            use:[MiniCssExtractPlugin.loader,"css-loader"]
        },{
            // 将es6转换为es5的版本兼容低版本的浏览器
            test: /\.m?js$/,
            exclude: /node_modules/,
            use:{
                loader:'babel-loader',
                options: {
                    presets:['@babel/preset-env']
                }
            }
        }
        ]
    },
    // 错误映射对应
    devtool:'inline-source-map',
    // 模式
    mode: "development"
};