<script>
import CSSModules from 'vue-css-modules'
import { MutationObserver } from 'vue-observable'
import { styler, chain, delay, tween, action, easing } from 'popmotion'
import { numericType } from '../_utils'

export default {
  name: 'FMarquee',

  inject: ['MarqueeStyles'],

  mixins: [
    CSSModules('MarqueeStyles')
  ],

  props: {
    speed: numericType(30), // 每秒多少像素
    delay: numericType(1.5) // 延迟多少秒
  },

  methods: {
    runMarquee(marqueeWidth, wrapperWidth, marqueeStyler, from = 0) {
      if (this._stop) return
      const delayMS = this.delay * 1000
      const to = marqueeWidth - wrapperWidth + 5 - from
      const duration = (to / this.speed) * 1000
      this._action = chain(
        tween({
          duration,
          from,
          to: 0 - to,
          ease: easing.linear
        }),
        delay(delayMS),
        action(({ update, complete }) => complete(update(0))),
        delay(delayMS)
      ).start({
        update: marqueeStyler.set('x'),
        complete: () => {
          this.runMarquee(marqueeWidth, wrapperWidth, marqueeStyler)
        }
      })
    },
    marquee() {
      this.$nextTick(() => {
        this._action && this._action.stop()
        const wrapperEl = this.$el
        const marqueeEl = this.$refs.marquee
        const wrapperWidth = wrapperEl.clientWidth / 2
        const marqueeWidth = marqueeEl.offsetWidth
        const marqueeStyler = styler(marqueeEl)
        if (marqueeWidth > wrapperWidth) {
          this._stop = false
          this.runMarquee(marqueeWidth, wrapperWidth, marqueeStyler)
        } else {
          this._stop = true
          marqueeStyler.set('x', 0)
        }
      })
    }
  },

  mounted() {
    this.$nextTick(this.marquee)
  },

  render() {
    return <div styleName="@marquee">
      <MutationObserver onMutation={this.marquee}>
        <div styleName="inner" ref="marquee">
          {this.$slots.default}
        </div>
      </MutationObserver>
    </div>
  }
}
</script>
