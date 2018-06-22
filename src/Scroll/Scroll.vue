<template>
  <div styleName="container" ref="container">
    <div styleName="@scroll :horizontal :vertical" ref="scroll">
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
    horizontal: Boolean
  },

  computed: {
    vertical() {
      return !this.horizontal
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new Scroll(this.$refs, {
        direction: this.horizontal ? 'horizontal' : 'vertical',
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
