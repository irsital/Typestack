var webpack = require("webpack")
var path = require("path");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var bootstrapPath = path.resolve(__dirname, "./node_modules/bootstrap/dist/css")

module.exports = {  
  entry: {
    app: "./app/main.ts"
  },
  output: {
    path: "./dist",
    publicPath: "./",
    filename: "[name].js?[chunkhash]"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
    modulesDirectories: ["node_modules", bootstrapPath]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts" },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css") },
      { test: /(.*)\/glyphicons(.*)/, loader: "file?name=fonts/[name].[ext]?[hash]" },
      { test: /\.(png|jpg)$/, loader: "file?name=images/[name].[ext]?[hash]" },
    ]
  },
  postcss: [
    autoprefixer({ browsers: ["last 2  versions"] })
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css?[contenthash]"),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index.jade",
      inject: "body"
    })
  ]
}