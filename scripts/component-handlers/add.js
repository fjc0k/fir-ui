const _ = require('lodash')
const { resolve } = require('path')
const fs = require('fs-extra')

const componentsPath = resolve(__dirname, '../../src')

// eslint-disable-next-line
module.exports = (componentName, { model, nodes, data, functional, override, no_inherit, ENUM }) => {
  componentName = _.kebabCase(componentName)

  const componentFilePath = resolve(componentsPath, `${componentName}/${componentName}.js`)

  if (fs.pathExistsSync(componentFilePath) && !override) return

  fs.outputFileSync(
    componentFilePath,
    [
      functional ? `import createElement from 'vue-css-modules/lib/create-element'` : `import CSSModules from 'vue-css-modules'`,
      model ? `import betterSync from 'vue-better-sync'` : null,
      data ? `import mergeData from 'vue-merge-data'` : null,
      ENUM ? `import { includes } from 'lodash'` : null,
      nodes ? `import extractNodes from '../_utils/extract-nodes'` : null,
      `import styles from './${componentName}.styl'`,
      ``,
      ENUM ? `const ENUM = {
  size: ['large', 'small']
}\n` : null,
      `export default {`,
      `  name: 'f-${componentName}',\n`,
      functional ? `  functional: true,\n` : null,
      no_inherit ? `  inheritAttrs: false,\n` : null, // eslint-disable-line
      `  styles,\n`,
      ...(!functional ? [ // eslint-disable-line
        `  mixins: [`,
        `    CSSModules(styles),`,
        model ? (
          `    betterSync({\n` +
          `      prop: 'value',\n` +
          `      event: 'input'\n` +
          `    })`
        ) : null,
        `  ],\n`] : []),
      `  props: {`,
      ENUM ? `    size: {
      type: String,
      default: ENUM.size[0],
      validator: includes.bind(null, ENUM.size)
    },` : null,
      `  },\n`,
      `  render(h${functional ? ', { data, props, children, slots }' : ''}) {`,
      functional ? `    h = createElement(h, styles, props)\n` : null,
      nodes ? (
        functional ?
          `    const { x } = extractNodes(['x'], props, slots())` :
          `    const { x } = extractNodes(['x'], this.$props, this.$slots)`
      ) + '\n' : null,
      `    return h('div', { styleName: '@${componentName}' })`,
      `  }`,
      `}\n`
    ].filter(v => !_.isNil(v)).join('\n')
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
