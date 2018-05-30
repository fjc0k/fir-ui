<template>
  <Carousel
    :index="$slots.left ? 1 : 0"
    direction="horizontal"
    :indicator="false"
    :scrollOptions="scrollOptions"
    styleName="@swipe-action"
    ref="carousel">
    <div styleName="actions" v-if="$slots.left">
      <slot name="left" />
    </div>
    <div styleName="content">
      <slot />
    </div>
    <div styleName="actions" v-if="$slots.right">
      <slot name="right" />
    </div>
  </Carousel>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Carousel from '../Carousel/Carousel.vue'
import SwipeActionButton from './SwipeActionButton.vue'

export default {
  name: 'FSwipeAction',

  subComponents: {
    Button: SwipeActionButton
  },

  inject: {
    SwipeActionStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      SwipeAction: this
    }
  },

  mixins: [
    CSSModules('SwipeActionStyles')
  ],

  data: () => ({
    scrollOptions: {
      disableCross: true
    }
  }),

  methods: {
    close() {
      this.$refs.carousel.scroll.slideTo(this.$slots.left ? 1 : 0)
    }
  },

  components: { Carousel }
}
</script>
