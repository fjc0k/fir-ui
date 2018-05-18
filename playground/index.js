import Vue from 'vue'
import Vam from '../src'
import App from './app.vue'

Vue.use(Vam)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
