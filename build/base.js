const config = require('../config')
const { hwps, entry } = require('./utils/pageTraversing')
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const StyleLoader = require('./utils/styleLoader')

process.env.DIST_MODULE = config.disModule

const clientEnvironment = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DIST_MODULE': JSON.stringify(process.env.DIST_MODULE)
}

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
      '@src': config.srcDir,
      '@static': config.staticDir
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
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ config.srcDir ],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitError: true,
          failOnError: true
        }
      },
      {
        test: /\.scss$/ig,
        use: StyleLoader('sass-loader')
      },
      {
        test: /\.pug$/,
        oneOf: [
          // 用于在vue模板中使用lang="pug"
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // 用于在js中import
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/img/[name].[hash:${config.hashLength}].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/font/[name].[hash:${config.hashLength}].[ext]`
        }
      }
    ]
  },
  plugins: [
    ...hwps,
    new WebpackDeepScopeAnalysisPlugin(),
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量
    // https://webpack.docschina.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      ...clientEnvironment
    }),
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