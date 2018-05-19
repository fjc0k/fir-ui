const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')
const globby = require('globby')

const componentsPath = resolve(__dirname, '../../src')
const componentsFilePath = resolve(componentsPath, 'components.js')

module.exports = () => {
  const components = globby.sync(['*', '!{_*,style}'], {
    cwd: componentsPath,
    onlyDirectories: true
  })

  const exportCodes = components.map(componentName => {
    const ComponentName = _.upperFirst(_.camelCase(componentName))
    return `export { default as ${ComponentName} } from './${componentName}/${componentName}'`
  })

  fs.outputFileSync(
    componentsFilePath,
    exportCodes.join('\n') + '\n'
  )
}
