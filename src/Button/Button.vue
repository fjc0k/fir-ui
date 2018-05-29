<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FButton',

  inject: {
    ButtonStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ButtonStyles')
  ],

  props: {
    type: {
      type: String,
      ...oneOf(['default', 'primary', 'ghost', 'warning'])
    },
    size: {
      type: String,
      ...oneOf(['lg', 'sm'])
    },
    icon: String,
    disabled: Boolean,
    inline: Boolean
  },

  computed: {
    IconNode() {
      return this.icon ? <Icon
        name={this.icon}
        size={this.size === 'lg' ? 'md' : 'xxs'}
        styleName="icon"
      /> : null
    }
  },

  render() {
    return <a styleName="@button $type $size :inline :disabled">
      {this.IconNode}
      {this.$slots.default}
    </a>
  }
}
</script>
