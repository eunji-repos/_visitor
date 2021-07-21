const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: {
    app: "./client/index.js",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-refresh/babel", "@babel/plugin-transform-runtime"],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  output: {
    filename: "main.js",
    path: path.join(__dirname + "/dist"),
    publicPath: "/dist/",
  },
  devServer: {
    index: "index.html",
    publicPath: "/dist/",
    hot: true,
    port: 3000,
  },
};
