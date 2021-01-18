const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.ts"],

  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "img", to: "img" },
        { from: "font", to: "font" },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.ts/, use: "ts-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.ttf$/, use: "file-loader" },
    ],
  },
  resolve: { extensions: [".js", ".ts"] },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
  },
};
