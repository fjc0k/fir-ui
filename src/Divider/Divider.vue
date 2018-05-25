<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'Divider',

  inject: ['DividerStyles'],

  mixins: [
    CSSModules('DividerStyles')
  ],

  props: {
    align: {
      type: String,
      ...oneOf(['center', 'left', 'right'])
    },
    full: Boolean
  },

  render() {
    return <div styleName="@divider">
      <div styleName="inner $align :full">
        <div styleName="line left" />
        <div styleName="content">{this.$slots.default}</div>
        <div styleName="line right" />
      </div>
    </div>
  }
}
</script>
