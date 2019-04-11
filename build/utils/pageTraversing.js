// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const path = require('path')
const { viewsDir, primitive } = require('../../config')

let hwps = [], entry = {}

glob.sync('*/', {
  cwd: viewsDir
}).forEach(item => {
  item = item.replace(/\/$/, '')
  let temp = {
    template: path.join(viewsDir, item, 'index.html'),
    filename: `${item}.html`,
    chunks: [ primitive.indexOf(item) !== -1 ? '' : 'commons', item ]
  }
  hwps.push(new HtmlWebpackPlugin(temp))
  entry[item] = path.resolve(viewsDir, item, 'index.js')
})

module.exports = {
  hwps,
  entry
}