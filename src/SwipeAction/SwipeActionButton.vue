<script>
import CSSModules from 'vue-css-modules'
import { noop } from 'lodash'
import { oneOf } from '../_utils'

export default {
  name: 'FSwipeActionButton',

  inject: {
    SwipeActionStyles: {
      default: () => ({})
    },
    SwipeAction: {
      default: null
    }
  },

  mixins: [
    CSSModules('SwipeActionStyles')
  ],

  props: {
    type: {
      type: String,
      ...oneOf(['danger', 'primary', 'cancel'])
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleClick() {
      const close = this.SwipeAction ? this.SwipeAction.close : noop
      this.$emit('click', close)
      if (this.autoClose) {
        close()
      }
    }
  },

  render() {
    return <div styleName="button $type" onClick={this.handleClick}>
      {this.$slots.default}
    </div>
  }
}
</script>
