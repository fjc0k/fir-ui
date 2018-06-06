const path = require('path')
const createBaseConfig = require('./createBaseConfig')

const config = createBaseConfig({ isProd: true })

config.resolve
  .alias
    .set('@globalStyle', path.resolve(__dirname, '../../src/_styles/noGlobal.js'))

config.output
  .library('FirUI')
  .filename('[name].noGlobal.js')
  .libraryTarget('umd')
  .libraryExport('default')
  // Prevents webpack4 from referencing `window` in the UMD build
  // Source: https://git.io/vppgU
  .globalObject('typeof self !== "undefined" ? self : this')

config.plugin('extract-css')
  .tap(([opt]) => [{
    ...opt,
    filename: '[name].noGlobal.css'
  }])

config.plugins.delete('clean')

module.exports = config.toConfig()
