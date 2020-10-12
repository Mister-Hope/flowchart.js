const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./lib/index"],
  devtool: "source-map", // always build source map
  externals: {
    raphael: "Raphael",
  },
  output: {
    path: path.join(__dirname, "release"),
    filename: "flowchart.js",
    publicPath: "/release/",
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        exclude: /node_modules/u,
      }),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "example"), // boolean | string | array, static file location
    port: 8080,
    host: "0.0.0.0",
    open: true,
  },
};
