<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FDivider',

  inject: {
    DividerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('DividerStyles')
  ],

  props: {
    type: {
      type: String,
      enum: ['solid', 'dashed', 'dotted']
    },
    align: {
      type: String,
      enum: ['center', 'left', 'right']
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
