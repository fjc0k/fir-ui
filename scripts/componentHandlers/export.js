const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')
const globby = require('globby')

const componentsPath = resolve(__dirname, '../../src')
const componentsFilePath = resolve(componentsPath, 'components.js')
const stylesFilePath = resolve(componentsPath, 'styles.js')

module.exports = () => {
  const components = globby.sync(['*', '!_*'], {
    cwd: componentsPath,
    onlyDirectories: true
  })

  const exportComponents = components.map(componentName => {
    const ComponentName = _.upperFirst(_.camelCase(componentName))
    return `export { default as ${ComponentName} } from './${ComponentName}/${ComponentName}.vue'`
  })

  const exportStyles = components.map(componentName => {
    const ComponentName = _.upperFirst(_.camelCase(componentName))
    return `export { default as ${ComponentName}Styles } from './${ComponentName}/${ComponentName}.styl'`
  })

  fs.outputFileSync(
    componentsFilePath,
    exportComponents.join('\n') + '\n'
  )

  fs.outputFileSync(
    stylesFilePath,
    exportStyles.join('\n') + '\n'
  )
}
