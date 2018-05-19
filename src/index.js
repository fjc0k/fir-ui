// import reset and global styles
import './_styles'

// import all components
import * as components from './components'

// normalize components
const normalizedComponents = []
Object.keys(components).forEach(componentName => {
  const component = components[componentName]
  if (Array.isArray(component)) {
    component.forEach(subComponent => {
      normalizedComponents.push(subComponent)
    })
  } else {
    normalizedComponents.push(component)
  }
})

// expose components and install method
export default {
  components: normalizedComponents,
  install(Vue, { prefix = 'f' } = {}) {
    normalizedComponents.forEach(Component => {
      Vue.component(`${prefix}${Component.name}`, Component)
    })
  }
}
