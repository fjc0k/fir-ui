import * as components from './components'

export default {
  install(Vue, { prefix = 'f' } = {}) {
    Object.keys(components).forEach(componentName => {
      const component = components[componentName]
      if (Array.isArray(component)) {
        component.forEach(subComponent => {
          Vue.component(prefix + subComponent.name, subComponent)
        })
      } else {
        Vue.component(prefix + component.name, component)
      }
    })
  }
}
