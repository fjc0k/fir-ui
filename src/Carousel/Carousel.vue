<template>
  <div styleName="container $direction" ref="container">
    <MutationObserver :observable="observable" @mutate="handleMutate">
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
import { oneOf, numericType } from '../_utils'
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
      ...numericType(0),
      transform: 'integer'
    },
    direction: {
      type: String,
      ...oneOf(['horizontal', 'vertical'])
    },
    interval: {
      ...numericType(3000),
      transform: 'number'
    },
    threshold: {
      ...numericType(0.1, 0, 1),
      transform: 'number'
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
    handleMutate() {
      this.observable = false
      this.$nextTick(() => {
        this.scroll.start()
      })
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
