<template>
  <div styleName="container" ref="container">
    <div styleName="@scroll $direction" ref="scroll">
      <div styleName="top" ref="top" v-if="$slots.top">
        <slot name="top" />
      </div>
      <slot />
      <div styleName="bottom" ref="bottom" v-if="$slots.bottom">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { oneOf, numericType } from '../_utils'
import Scroll from './Scroll'

export default {
  name: 'FScroll',

  inject: {
    ScrollStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ScrollStyles')
  ],

  props: {
    direction: {
      type: String,
      ...oneOf(['vertical', 'horizontal'])
    },
    bindToWrapper: Boolean,
    mode: {
      type: String,
      ...oneOf(['scroll', 'page'])
    },
    pageThreshold: numericType(0.1, 0, 1),
    pageIndex: 0
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new Scroll(this.$refs, {
        ...this.$props,
        klass: this.ScrollStyles,
        on: {
          scrollEnd: this.$emit.bind(this, 'scroll-end')
        }
      })
      this.scroll.start()
    })
  }
}
</script>
