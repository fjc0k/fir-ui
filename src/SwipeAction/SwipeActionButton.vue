<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'FSwipeActionButton',

  inject: {
    SwipeActionStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('SwipeActionStyles')
  ],

  props: {
    type: {
      type: String,
      ...oneOf(['danger', 'primary', 'cancel'])
    }
  },

  render() {
    return <div styleName="button $type">
      {this.$slots.default}
    </div>
  }
}
</script>
