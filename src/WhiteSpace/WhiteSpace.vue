<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FWhiteSpace',

  inject: {
    WhiteSpaceStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('WhiteSpaceStyles')
  ],

  props: {
    size: {
      type: String,
      enum: ['md', 'xs', 'sm', 'lg', 'xl']
    }
  },

  render() {
    return <div styleName="@white-space $size">
      {this.$slots.default}
    </div>
  }
}
</script>
