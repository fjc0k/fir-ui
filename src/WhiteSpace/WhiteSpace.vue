<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'FWhiteSpace',

  inject: ['WhiteSpaceStyles'],

  mixins: [
    CSSModules('WhiteSpaceStyles')
  ],

  props: {
    size: {
      type: String,
      ...oneOf(['md', 'xs', 'sm', 'lg', 'xl'])
    }
  },

  render() {
    return <div styleName="@white-space $size">
      {this.$slots.default}
    </div>
  }
}
</script>
