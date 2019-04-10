const path = require('path')

const root = path.join(__dirname, '..')

const srcPath = function() {
  return path.join(root, 'src', ...arguments)
}

const DIS_MODULE = 'multiple'

module.exports = {
  srcDir: srcPath(),
  distModule: DIS_MODULE,
  viewsDir: srcPath('views'),
  distDir: srcPath('..', 'dist', DIS_MODULE),
  staticDir: srcPath('static')
}