const merge = require('webpack-merge')
const config = require('../config')
// https://makeup1122.github.io/2018/10/12/webpack-UglifyJS-issue/
// ES6代码压缩
const TerserPlugin = require('terser-webpack-plugin')
// 用于将组件内的css分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
process.env.NODE_ENV = 'production'

const devConf = {
  mode: 'production',
  // https://www.webpackjs.com/configuration/stats/#stats
  stats: {
    assets: true,
    builtAt: true,
    children: false,
    chunks: false,
    modules: false
  },
  optimization: {
    minimize: true,
    // 告知 webpack 使用可读取模块标识符(readable module identifiers)，来帮助更好地调试
    namedModules: true,
    // 告知 webpack 使用可读取 chunk 标识符(readable chunk identifiers)，来帮助更好地调试
    namedChunks: true,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'commons',
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        cache: false,
        terserOptions: {
          warnings: false,
          compress: {
            unused: true,
            comparisons: false,
            drop_console: false, // 是否删除所有的 `console` 语句，可以兼容ie浏览器
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      path: config.distDir
    })
  ]
}

module.exports = merge(require('./base'), { ...devConf })