<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'WingBlank',

  inject: ['WingBlankStyles'],

  mixins: [
    CSSModules('WingBlankStyles')
  ],

  props: {
    size: {
      type: String,
      ...oneOf(['lg', 'sm', 'md'])
    }
  },

  render() {
    return <div styleName="@wing-blank $size">
      {this.$slots.default}
    </div>
  }
}
</script>
