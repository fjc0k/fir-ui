/* eslint camelcase: 0 */
const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

module.exports = (componentName, { functional, override }) => {
  componentName = _.camelCase(componentName)
  const component_name = _.kebabCase(componentName)
  const ComponentName = _.upperFirst(componentName)

  const componentFilePath = resolve(componentsPath, `${ComponentName}/${ComponentName}.vue`)

  if (fs.pathExistsSync(componentFilePath) && !override) return

  fs.outputFileSync(
    componentFilePath,
    (functional ? `
<script>
import CSSModules from 'vue-css-modules/lib/create-element'

export default {
  name: '${ComponentName}',

  functional: true,

  inject: ['${ComponentName}Styles'],

  render(h, ctx) {
    h = CSSModules(h, '${ComponentName}Styles', ctx)

    const { data, props, children } = ctx

    return h('div', {
      styleName: '@${component_name}'
    }, children)
  }
}
</script>
    ` : `
<template>
  <div styleName="@${component_name}"></div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: '${ComponentName}',

  inject: ['${ComponentName}Styles'],

  mixins: [
    CSSModules('${ComponentName}Styles')
  ]
}
</script>
    `).trim() + '\n'
  )
  fs.outputFileSync(
    resolve(componentsPath, `${ComponentName}/${ComponentName}.styl`),
    [
      `@require '../_styles/settings';`,
      ``,
      `.${component_name} {`,
      ``,
      `}`
    ].join('\n')
  )
  require('./export')()
}
