import '@globalStyle'
import ComponentRegister from 'vue-component-register'
import * as components from './components'

const FirUI = {
  components,
  install(Vue) {
    Vue.use(ComponentRegister)
    Object.keys(components).forEach(componentName => {
      const component = components[componentName]
      Vue.component(component.name, component)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FirUI)
}

export default FirUI
