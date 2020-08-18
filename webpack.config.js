const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader?modules", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          fallback: "file-loader",
          name: "image/[name].[contenthash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: isEnvProduction,
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public"),
          globOptions: {
            ignore: ["index.html"],
          },
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/*/,
          to: "/index.html",
        },
      ],
    },
  },
};
