const path = require('path')
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createBaseConfig = require('./createBaseConfig')

const config = createBaseConfig({ isProd: false })

config.devServer
  .contentBase('./dist')
  .port(9143)
  .hot(true)

config.plugin('named').use(NamedModulesPlugin)

config.plugin('hot').use(HotModuleReplacementPlugin)

config.plugin('html').use(HtmlWebpackPlugin, [{
  template: path.resolve(__dirname, '../../playground/index.html')
}])

module.exports = config.toConfig()
