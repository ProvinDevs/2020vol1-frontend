const path = require("path");

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
};
