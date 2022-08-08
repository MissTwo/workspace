const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const port = 8080;
const publicPath = "http://localhost:" + port;

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        index: path.join(__dirname, "./src/index/index.js"),
    },
    output: {
        filename: "js/[name].[hash].bundle.js",
        path: path.join(__dirname, "./dist"), // 如果没有会创建，只支持绝对路径
        clean: true,
        assetModuleFilename: "images/[name]-[hash][ext]",
        // publicPath: publicPath // script标签中使用绝对引入js，可能被引起bug
    },
    devServer: {
        static: path.join(__dirname, "./dist"),
        port: port,
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
            // webpack5提供的
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg)$/,
            //     type: "asset/resource"
            // },
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg)$/,
            //     type: "asset/inline"
            // },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                },
                // 比assetModuleFilename优先高，就近原则
                // generator: {
                //     filename: "imgs/[name][ext]"
                // }
            },
            {
                test: /\.txt$/,
                type: "asset/source",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            },
            {
                test: /\.toml$/i,
                type: "json",
                parser: {
                    parse: toml.parse
                }
            },
            {
                test: /\.(yaml|yml)$/i,
                type: "json",
                parser: {
                    parse: yaml.parse
                }
            },
            {
                test: /\.json5$/i,
                type: "json",
                parser: {
                    parse: json5.parse
                }
            }
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin(), // 生成一个默认的html页面
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index/index.html"),
            filename: "views/index.html", // 名称需要指定，否则就是index.html
            inject: "body",
            chunks: ["index"], // 不用写后缀，只是entry中的key值
        }),
    ],
};
