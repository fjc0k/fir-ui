<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Marquee from './Marquee'
import MutationObserver from '../MutationObserver/MutationObserver.vue'

export default {
  name: 'FMarquee',

  inject: {
    MarqueeStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('MarqueeStyles')
  ],

  props: {
    speed: { // 每秒多少像素
      numeric: true,
      default: 30
    },
    delay: { // 延迟多少秒
      numeric: true,
      default: 1.5
    }
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
    return <div styleName="wrapper">
      <div styleName="@marquee">
        <MutationObserver onMutate={this.start}>
          <div styleName="inner" ref="marquee">
            {this.$slots.default}
          </div>
        </MutationObserver>
      </div>
    </div>
  }
}
</script>
