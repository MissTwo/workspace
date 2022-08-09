const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css文件分离
const CssMinimizePlugin = require('css-minimizer-webpack-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// js压缩
const TerserPlugin = require('terser-webpack-plugin');

const toml = require('toml');
const yaml = require('yamljs');
// const json5= require('json5');

module.exports = {
    // 提取公共部分：方式一
    // entry: {
    //     index: {
    //         import:path.join(__dirname, "../src/index.js"),
    //         dependOn:'shared'
    //     },
    //     welcome:{
    //         import:path.join(__dirname, "../src/welcome.js"),
    //         // dependOn:'shared'
    //     },
    //     shared:['jquery']
    // },
    // 提取公共部分方式二
    entry: {
        index: path.join(__dirname, "../src/index.js"),
        welcome: path.join(__dirname, "../src/welcome.js")
    },

    output: {
        filename: '[name].[hash].bundle.js',
        path: path.join(__dirname, "../dist"),
        clean: true
        // assertModuleFilename:'text/[hash][ext]'
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
        open: {
            target: 'app.html',
            app: {
                name: 'chrome'
            }
        },
        compress: true,
        client: {
            overlay: true
        },
        liveReload: true
    },
    // css的样式处理
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"],
                // 分离css的情况
                use: [MiniCssExtractPlugin.loader, "css-loader"]

            },
            // css种引入图片的方法
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg)$/,
            //         use: [
            //             {
            //                 loader: "file-loader",
            //                 options: {
            //                     esModule: false, // CSS中url引入图片的问题
            //                 },
            //             },
            //         ],
            //         type: "javascript/auto", // CSS中url引入图片的问题
            // }
            // js引入图片处理
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 30 * 1024,
                            esModule: false // CSS中url引入图片的问题
                        }
                    }
                ],
                type: "javascript/auto" // CSS中url引入图片的问题
            }
            // 文本处理
            // {
            //     test: /\.txt$/,
            //     use:'raw-loader'
            // }
            // webpack5处理文本
            // {
            //     test: /\.txt$/,
            //     type:'assert/source',
            //     generator:{
            //         filename:'text/[name].[ext]'
            //     }
            // },
            // {
            //     test: /\.toml$/,
            //     type: 'json',
            //     parser:{
            //         parser:toml.parser
            //     }
            // },
            // {
            //     test: /\.yaml$/,
            //     type:'json',
            //     parser:{
            //         parser:yaml.parse
            //     }
            // },
            // {
            //     test: /\.json5$/,
            //     type: 'json',
            //     parser:{
            //         parser:json5.parse
            //     }
            // }

        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new MiniCssExtractPlugin(),
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups:{
                commons:{
                    test:/[\\/]node_modules[\\/]/,
                    name: 'commons',
                    minChunks:2,
                }
            }

        },
    },

    // development production
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