/* eslint camelcase: 0 */
const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

module.exports = (componentName, { functional, override, parent }) => {
  componentName = _.camelCase(componentName)
  const component_name = _.kebabCase(componentName)
  const ComponentName = _.upperFirst(componentName)
  const ParentComponentName = parent && _.upperFirst(_.camelCase(parent))

  const componentFilePath = resolve(componentsPath, `${ParentComponentName || ComponentName}/${ComponentName}.vue`)

  if (fs.pathExistsSync(componentFilePath) && !override) return

  fs.outputFileSync(
    componentFilePath,
    (functional ? `
<script>
import CSSModules from 'vue-css-modules/lib/create-element'

export default {
  name: '${ComponentName}',

  functional: true,

  inject: ['${ParentComponentName || ComponentName}Styles'],

  render(h, ctx) {
    h = CSSModules(h, '${ParentComponentName || ComponentName}Styles', ctx)

    const { data, props, children } = ctx

    return h('div', {
      styleName: '@${component_name}'
    }, children)
  }
}
</script>
    ` : `
<script>
import CSSModules from 'vue-css-modules'

export default {
  name: '${ComponentName}',

  inject: ['${ParentComponentName || ComponentName}Styles'],

  mixins: [
    CSSModules('${ParentComponentName || ComponentName}Styles')
  ],

  render() {
    return <div styleName="@${component_name}"></div>
  }
}
</script>
    `).trim() + '\n'
  )
  ParentComponentName || fs.outputFileSync(
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
