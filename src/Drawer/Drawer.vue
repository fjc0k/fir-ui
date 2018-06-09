<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent"
    @before-enter="handleBeforeEnter"
    @before-leave="handleBeforeLeave"
    @after-leave="handleAfterLeave">
    <div
      v-show="localVisible"
      styleName="@drawer"
      :style="localStyle"
      ref="drawer">
      <slot />
    </div>
  </Popup>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { styler, tween } from 'popmotion'
import Popup from '../Popup/Popup.vue'
import maskProps from '../Popup/maskProps'
import { toggleVisibility } from '../_mixins'
import { oneOf, parseCSSUnit } from '../_utils'

export default {
  name: 'FDrawer',

  inject: {
    DrawerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('DrawerStyles')
  ],

  props: {
    width: {
      type: String,
      default: '70%'
    },
    backgroundColor: String,
    position: {
      type: String,
      ...oneOf(['left', 'right'])
    },
    push: Boolean,
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  computed: {
    localStyle() {
      return {
        width: this.width,
        backgroundColor: this.backgroundColor
      }
    },
    localWidth() {
      return parseCSSUnit(this.width)
    },
    tweenTarget() {
      const width = this.localWidth.value
      return this.position === 'left' ? width : -width
    }
  },

  methods: {
    handleBeforeEnter() {
      if (!this.push) return
      this.bodyCSS = document.body.style.cssText
      document.body.style.cssText += 'overflow:hidden'
      const { unit } = this.localWidth
      const bodyStyler = styler(this.$root.$el)
      tween({
        from: 0,
        to: this.tweenTarget,
        duration: 320
      })
        .pipe(v => `${v}${unit}`)
        .start(bodyStyler.set('x'))
    },
    handleBeforeLeave() {
      if (!this.push) return
      const { unit } = this.localWidth
      const bodyStyler = styler(this.$root.$el)
      tween({
        from: this.tweenTarget,
        to: 0,
        duration: 320
      })
        .pipe(v => `${v}${unit}`)
        .start(bodyStyler.set('x'))
    },
    handleAfterLeave() {
      if (!this.push) return
      document.body.style.cssText = this.bodyCSS
    }
  },

  components: { Popup }
}
</script>
