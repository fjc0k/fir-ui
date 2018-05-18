const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

module.exports = componentName => {
  componentName = _.kebabCase(componentName)

  fs.removeSync(
    resolve(componentsPath, componentName)
  )

  require('./export')()
}
