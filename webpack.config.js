const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./app/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: "development",
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: "index.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
};
