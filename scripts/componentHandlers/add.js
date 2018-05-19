const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

module.exports = (componentName, { functional, override }) => {
  componentName = _.camelCase(componentName)

  const ComponentName = _.upperFirst(componentName)

  const componentFilePath = resolve(componentsPath, `${componentName}/${ComponentName}.vue`)

  if (fs.pathExistsSync(componentFilePath) && !override) return

  fs.outputFileSync(
    componentFilePath,
    functional ? `


` : `
<template>
  <div styleName="${componentName}">

  </div>
</template>

<script>
  import CSSModules from 'vue-css-modules'
  import styles from './${ComponentName}.styl'

  export default {
    name: '${ComponentName}',

    mixins: [
      CSSModules()
    ]
  }
</script>
    `
  )
  fs.outputFileSync(
    resolve(componentsPath, `${componentName}/${componentName}.styl`),
    [
      `@require '../style/settings';`,
      ``,
      `.${componentName} {`,
      ``,
      `}`
    ].join('\n')
  )
  require('./export')()
}
