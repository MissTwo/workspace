const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: path.join(__dirname, "./src/index.js"),
    },
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.join(__dirname, "./dist"), // 如果没有会创建，只支持绝对路径
        clean: true,
    },
    devServer: {
        static: path.join(__dirname, "./dist"),
        port: 8080,
        compress: true,
        // open配置服务器打开时，自动打开的页面
        // host: "0.0.0.0"，默认值
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 esModule: false, // CSS中url引入图片的问题
            //             },
            //         },
            //     ],
            //     type: "javascript/auto", // CSS中url引入图片的问题
            // },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 30 * 1024,
                            esModule: false, // CSS中url引入图片的问题
                        },
                    },
                ],
                type: "javascript/auto", // CSS中url引入图片的问题
            },
            {
                test: /\.txt$/,
                use: ["raw-loader"]
            }
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin(), // 生成一个默认的html页面
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html", // 名称需要指定，否则就是index.html
            inject: "body",
            chunks: ["index"], // 不用写后缀，只是entry中的key值
        }),
    ],
};
