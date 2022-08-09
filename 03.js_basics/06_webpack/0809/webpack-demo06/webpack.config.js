const path = require("path");

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
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
