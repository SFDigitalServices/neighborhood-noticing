const HtmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Dotenv = require('dotenv-webpack');

const path = require('path')
const webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: ['file-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new webpack.EnvironmentPlugin({
    }),
    new Dotenv({
      safe: true
    })
  ]
}
