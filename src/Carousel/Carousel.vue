<template>
  <div styleName="container $direction" ref="container">
    <MutationObserver :observable="observable" @mutate="handleMutate">
      <div styleName="@carousel" ref="scroll">
        <slot />
      </div>
    </MutationObserver>
    <slot name="indicator" :index="localIndex" :total="total">
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
    autoplay: Boolean,
    loop: Boolean
  },

  data: () => ({
    total: 0,
    observable: false
  }),

  methods: {
    initiated() {
      this.observable = true
    },
    slideEnd(index) {
      this.sendIndex(index)
    },
    handleMutate() {
      this.observable = false
      this.$nextTick(() => {
        this.scroll.start()
      })
      console.log('mute')
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new Carousel({
        container: this.$refs.container,
        scroll: this.$refs.scroll
      }, {
        ...this.$props,
        index: this.localIndex,
        interval: this.localInterval,
        threshold: this.localThreshold,
        on: {
          initiated: this.initiated,
          slideEnd: this.slideEnd,
          afterStart: () => {
            this.total = this.scroll.totalPage
          }
        }
      })
      this.scroll.start()
    })
  },

  components: { MutationObserver, Pagination }
}
</script>
