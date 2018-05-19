const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

module.exports = componentName => {
  const ComponentName = _.upperFirst(_.camelCase(componentName))

  fs.removeSync(
    resolve(componentsPath, ComponentName)
  )

  require('./export')()
}
