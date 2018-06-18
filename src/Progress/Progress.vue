<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FProgress',

  inject: {
    ProgressStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('ProgressStyles')
  ],

  props: {
    percent: {
      numeric: true,
      default: 0,
      range: [0, 100]
    },
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
