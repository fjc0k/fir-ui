<script>
import CSSModules from 'vue-css-modules'
import { MutationObserver } from 'vue-observable'
import { numericType } from '../_utils'
import Marquee from './Marquee'

export default {
  name: 'FMarquee',

  inject: {
    MarqueeStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('MarqueeStyles')
  ],

  props: {
    speed: numericType(30), // 每秒多少像素
    delay: numericType(1.5) // 延迟多少秒
  },

  methods: {
    start() {
      this.marquee && this.marquee.start()
    },
    stop() {
      this.marquee && this.marquee.stop()
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.marquee = new Marquee(
        this.$el,
        this.$refs.marquee,
        this.$props
      )
      this.start()
    })
  },

  render() {
    return <div styleName="@marquee">
      <MutationObserver onMutation={this.start}>
        <div styleName="inner" ref="marquee">
          {this.$slots.default}
        </div>
      </MutationObserver>
    </div>
  }
}
</script>
