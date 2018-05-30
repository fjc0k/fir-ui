<template>
  <Carousel
    :index="$slots.left ? 1 : 0"
    direction="horizontal"
    :indicator="false"
    :scrollOptions="scrollOptions"
    styleName="@swipe-action"
    @slide-end="handleSlideEnd"
    ref="carousel">
    <div styleName="actions" v-if="$slots.left">
      <slot name="left" />
    </div>
    <div styleName="content">
      <slot />
      <div
        v-show="showCover"
        styleName="cover"
        @click="close"
      />
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
    },
    showCover: false
  }),

  methods: {
    handleSlideEnd(index) {
      this.showCover = index !== (this.$slots.left ? 1 : 0)
    },
    close() {
      this.$refs.carousel.scroll.slideTo(this.$slots.left ? 1 : 0)
    },
    openLeft() {
      if (this.$slots.left) {
        this.$refs.carousel.scroll.slideTo(0)
      }
    },
    openRight() {
      if (this.$slots.right) {
        this.$refs.carousel.scroll.slideTo(this.$slots.left ? 2 : 1)
      }
    }
  },

  components: { Carousel }
}
</script>
