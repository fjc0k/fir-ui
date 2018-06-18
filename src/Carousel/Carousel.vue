<template>
  <div styleName="container $direction" ref="container">
    <MutationObserver :observable="observable" @mutate="refresh">
      <div styleName="@carousel" ref="scroll">
        <slot />
      </div>
    </MutationObserver>
    <slot name="indicator" :index="localIndex" :total="total" v-if="indicator">
      <Pagination
        styleName="indicator"
        :index="localIndex + 1"
        mode="pointer"
        :total="total"
      />
    </slot>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Carousel from './Carousel'
import Pagination from '../Pagination/Pagination.vue'
import MutationObserver from '../MutationObserver/MutationObserver.vue'

export default {
  name: 'FCarousel',

  model: {
    prop: 'index',
    event: 'input'
  },

  inject: {
    CarouselStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('CarouselStyles')
  ],

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: index => parseInt(index, 10)
    },
    direction: {
      type: String,
      enum: ['horizontal', 'vertical']
    },
    interval: {
      numeric: true,
      default: 3000,
      transform: Number
    },
    threshold: {
      numeric: true,
      default: 0.1,
      range: [0, 1],
      transform: Number
    },
    indicator: {
      type: Boolean,
      default: true
    },
    autoplay: Boolean,
    loop: Boolean,
    scrollOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    total: 0,
    observable: false
  }),

  methods: {
    onReceiveIndex(index) {
      if (this.scroll) {
        this.scroll.slideTo(index)
      }
    },
    refresh(options) {
      if (this.scroll) {
        this.observable = false
        this.$nextTick(() => {
          this.scroll.start(options)
        })
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new Carousel({
        container: this.$refs.container,
        scroll: this.$refs.scroll
      }, {
        ...this.scrollOptions,
        ...this.$props,
        index: this.localIndex,
        interval: this.localInterval,
        threshold: this.localThreshold,
        on: {
          ready: () => {
            this.observable = true
            this.total = this.scroll.totalPage
          },
          slideEnd: index => {
            this.$emit('slide-end', index)
            this.sendIndex(index)
          }
        }
      })
      this.scroll.start()
    })
  },

  components: { MutationObserver, Pagination }
}
</script>
