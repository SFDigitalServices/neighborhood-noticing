const HtmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
      filename: 'index.html',
      googleMapsApiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    }),
    new webpack.EnvironmentPlugin({
      VUE_APP_CITYGRAM_TAG: null,
      VUE_APP_CITYGRAM_URL: 'http://localhost:5000',

      VUE_APP_GOOGLE_MAPS_API_KEY: null,

      VUE_APP_MAP_LAT: 0,
      VUE_APP_MAP_LNG: 0,
      VUE_APP_MAP_ZOOM: 16 // default zoom level
    })
  ]
}
