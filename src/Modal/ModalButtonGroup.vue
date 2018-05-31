<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'FModalButtonGroup',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  props: {
    direction: {
      type: String,
      ...oneOf(['vertical', 'horizontal'])
    }
  },

  render() {
    return <div styleName="button-group $direction">
      {this.$slots.default}
    </div>
  }
}
</script>
