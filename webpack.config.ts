import * as path from "path";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    library: {
      type: "umd",
      name: "Flowchart",
    },
    path: path.resolve(
      __dirname,
      process.env.NODE_ENV === "production" ? "release" : "dist"
    ),
    filename: "flowchart.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/u,
        loader: "ts-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/u],
      },
    ],
  },

  resolve: {
    extensions: [".ts"],
  },

  plugins: [new webpack.ProgressPlugin({})],

  externals: {
    raphael: "Raphael",
  },

  optimization: {
    minimizer: [new TerserPlugin() as any],
  },
};

export default config;
