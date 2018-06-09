import VueClipboards from 'vue-clipboards'
import FirUI from '../../dist/fir-ui.noGlobal.js'

import '../../dist/fir-ui.noGlobal.css'

export default ({ Vue }) => {
  Vue.use(VueClipboards)
  Vue.use(FirUI)
}
