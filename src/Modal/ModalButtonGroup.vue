<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FModalButtonGroup',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('ModalStyles')
  ],

  props: {
    direction: {
      type: String,
      enum: ['vertical', 'horizontal']
    }
  },

  render() {
    return <div styleName="button-group $direction">
      {this.$slots.default}
    </div>
  }
}
</script>
