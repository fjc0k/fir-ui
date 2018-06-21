<template>
  <div v-transfer-to-body>
    <transition :appear="appear" name="f--fade">
      <div
        styleName="@popup $position through=maskThrough transparent=maskTransparent"
        :style="{ zIndex }"
        @click.passive="handleMaskClick"
        v-show="localVisible">
        <transition :name="popupTransition" :appear="appear" v-on="$listeners">
          <slot />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { transferDOMToBody } from '../_directives'
import { toggleVisibility } from '../_mixins'
import maskProps from './maskProps'

let zIndex = 5000

export default {
  name: 'FPopup',

  inject: {
    PopupStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('PopupStyles')
  ],

  directives: {
    transferToBody: transferDOMToBody
  },

  props: {
    position: {
      type: String,
      enum: ['center', 'top', 'right', 'bottom', 'left']
    },
    zIndex: {
      numeric: true,
      default: () => zIndex++
    },
    appear: {
      type: Boolean,
      default: true
    },
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  computed: {
    popupTransition() {
      const { position } = this
      return position === 'center' ? 'f--fade' : `f--slide-from-${position}`
    }
  },

  methods: {
    handleMaskClick(e) {
      if (e.target !== e.currentTarget) return
      this.$emit('mask-click', e)
      if (this.maskClosable) {
        this.hide()
      }
    }
  }
}
</script>
