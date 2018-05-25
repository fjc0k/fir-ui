<script>
import CSSModules from 'vue-css-modules'
import { numericType, oneOf } from '../_utils'

export default {
  name: 'FProgress',

  inject: ['ProgressStyles'],

  mixins: [
    CSSModules('ProgressStyles')
  ],

  props: {
    percent: numericType(0, 0, 100),
    position: {
      type: String,
      ...oneOf(['fixed', 'normal'])
    },
    unfilled: {
      type: Boolean,
      default: true
    }
  },

  render() {
    const { percent } = this

    return <div styleName="@progress $position :unfilled">
      <div styleName="bar" style={{
        width: `${percent}%`
      }} />
    </div>
  }
}
</script>
