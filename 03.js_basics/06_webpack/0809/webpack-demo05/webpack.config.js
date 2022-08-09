const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
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
    plugins: [
        // new HtmlWebpackPlugin(), // 生成一个默认的html页面
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html", // 名称需要指定，否则就是index.html
            inject: "body",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     presets: ["@babel/preset-env"],
                    // },
                },
            },
        ],
    },
};
