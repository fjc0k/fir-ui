<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { patchIndex } from '../_utils'
import StepItem from './StepItem.vue'

export default {
  name: 'FStep',

  subComponents: {
    Item: StepItem
  },

  inject: {
    StepStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      Step: this
    }
  },

  mixins: [
    Messenger,
    CSSModules('StepStyles')
  ],

  props: {
    current: {
      numeric: true,
      default: 0,
      transform: Number
    },
    error: Boolean
  },

  render() {
    return <div styleName="@step :error">
      {patchIndex(this.$slots.default)}
    </div>
  }
}
</script>
