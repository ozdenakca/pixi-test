var path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // Change to your "entry-point".
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    open: true,
  },
  externals: {
    //"pixi.js": "PIXI",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My PIXI App",
      template: "template/index.html",
    }),
    new webpack.ProvidePlugin({
      PIXI: "pixi.js",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' }
      ]
    })
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },

    ],
  },
};
