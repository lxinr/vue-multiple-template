const config = require('../config')
const { hwps, entry } = require('./utils/pageTraversing')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const StyleLoader = require('./utils/styleLoader')
const baseConf = {
  entry: entry,
  // 外部扩展
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
  externals: {
    // vue: 'Vue',
    // axios: 'axios'
  },
  output: {
    filename: 'js/[name].js',
    path: config.distDir
  },
  // 解析模块请求的选项
  resolve: {
    // 自动解析确定的扩展,能够使用户在引入模块时不带扩展
    // import File from '../path/to/file'
    extensions: ['.wasm', '.mjs', '.js', '.json', '.css', '.scss', '.vue', '.jsx', '.ts'],
    // 别名
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@src': config.srcDir
    }
  },
  module: {
    noParse: [/static/],
    rules: [ 
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/ig,
        use: StyleLoader()
      }
    ]
  },
  plugins: [
    ...hwps,
    new WebpackDeepScopeAnalysisPlugin(),
    new VueLoaderPlugin(),
    // 将静态资源拷贝到dist
    new CopyWebpackPlugin([
      {
        from: config.staticDir,
        to: path.join(config.distDir, 'static')
      }
    ])
  ]
}

module.exports = baseConf