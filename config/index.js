const path = require('path')

const root = path.join(__dirname, '..')

const srcPath = function() {
  return path.join(root, 'src', ...arguments)
}

const DIS_MODULE = ''

module.exports = {
  srcDir: srcPath(),
  distModule: DIS_MODULE,
  viewsDir: srcPath('views'),
  distDir: srcPath('..', 'dist', DIS_MODULE),
  staticDir: srcPath('static'),
  // 指定哪些是原生页面的文件目录
  primitive: ['user'],
  devServer: {
    host: '127.0.0.1',
    port: 81
  }
}