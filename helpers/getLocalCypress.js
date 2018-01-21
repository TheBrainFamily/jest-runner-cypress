const path = require('path')
const findUp = require('find-up')

exports.getLocalCypress = rootDir => {
  const nodeModulesPath = findUp.sync('node_modules', { cwd: rootDir })
  return require(path.resolve(nodeModulesPath, 'cypress'))
}
