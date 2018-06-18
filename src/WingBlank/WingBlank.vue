<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FWingBlank',

  inject: {
    WingBlankStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('WingBlankStyles')
  ],

  props: {
    size: {
      type: String,
      enum: ['lg', 'sm', 'md']
    }
  },

  render() {
    return <div styleName="@wing-blank $size">
      {this.$slots.default}
    </div>
  }
}
</script>
