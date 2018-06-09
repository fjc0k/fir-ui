<script>
import CSSModules from 'vue-css-modules'
import { numericType, oneOf } from '../_utils'

export default {
  name: 'FProgress',

  inject: {
    ProgressStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ProgressStyles')
  ],

  props: {
    percent: numericType(0, 0, 100),
    fixed: {
      type: Boolean,
      default: true
    },
    unfilled: {
      type: Boolean,
      default: true
    }
  },

  render() {
    const { percent } = this

    return <div styleName="@progress :fixed :unfilled">
      <div styleName="bar" style={{
        width: `${percent}%`
      }} />
    </div>
  }
}
</script>
