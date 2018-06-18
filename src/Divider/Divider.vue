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
      enum: ['default', 'primary', 'warning']
    },
    line: {
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
    return <div styleName="@divider $type">
      <div styleName="inner $align :full">
        <div styleName="line left $line" />
        <div styleName="content">{this.$slots.default}</div>
        <div styleName="line right $line" />
      </div>
    </div>
  }
}
</script>
