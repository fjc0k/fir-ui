<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'

export default {
  name: 'FDivider',

  inject: {
    DividerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('DividerStyles')
  ],

  props: {
    type: {
      type: String,
      ...oneOf(['solid', 'dashed', 'dotted'])
    },
    align: {
      type: String,
      ...oneOf(['center', 'left', 'right'])
    },
    full: Boolean
  },

  render() {
    return <div styleName="@divider">
      <div styleName="inner $align :full">
        <div styleName="line left $type" />
        <div styleName="content">{this.$slots.default}</div>
        <div styleName="line right $type" />
      </div>
    </div>
  }
}
</script>
