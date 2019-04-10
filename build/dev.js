const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')

process.env.NODE_ENV = 'development'

const devConf = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    inline: true,
    host: '127.0.0.1',
    port: 80,
    contentBase: config.distDir,
    publicPath: '/',
    open: false,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(require('./base'), { ...devConf })