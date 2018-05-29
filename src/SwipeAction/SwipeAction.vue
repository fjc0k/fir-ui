<template>
  <Carousel
    direction="horizontal"
    :indicator="false"
    styleName="@swipe-action">
    <div styleName="actions">
      <slot name="left" />
    </div>
    <div styleName="content">
      <slot />
    </div>
    <div styleName="actions">
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

  mixins: [
    CSSModules('SwipeActionStyles')
  ],

  components: { Carousel }
}
</script>
