const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].bundle.js",
    clean: true,
  },
  mode: "none",
};
