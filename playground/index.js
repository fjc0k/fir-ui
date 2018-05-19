import Vue from 'vue'
import FirUI from '../src'
import App from './app.vue'

Vue.use(FirUI)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
