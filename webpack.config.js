const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isEnvProduction ? "production" : "development",
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "js/[name].[contenthash:8].js",
},
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "ts-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: isEnvProduction,
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
