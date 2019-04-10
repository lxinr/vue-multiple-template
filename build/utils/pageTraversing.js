// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const path = require('path')
const { viewsDir } = require('../../config')

let hwps = [], entry = {
  // common: [ 'axios', 'vue' ]
}

glob.sync('*/', {
  cwd: viewsDir
}).forEach(item => {
  item = item.replace(/\/$/, '')
  let temp = {
    template: path.join(viewsDir, item, 'index.html'),
    filename: `${item}.html`,
    // chunksSortMode: 'dependency',
    chunks: [ item ]
    // chunks: [ 'common', item ]
  }
  hwps.push(new HtmlWebpackPlugin(temp))
  entry[item] = path.resolve(viewsDir, item, 'index.js')
})

module.exports = {
  hwps,
  entry
}