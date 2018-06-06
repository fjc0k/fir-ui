<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
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
import Popup from '../Popup/Popup.vue'
import maskProps from '../Popup/maskProps'
import { toggleVisibility } from '../_mixins'
import { oneOf } from '../_utils'

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
    position: {
      type: String,
      ...oneOf(['left', 'right'])
    },
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  computed: {
    localStyle() {
      return {
        width: this.width
      }
    }
  },

  components: { Popup }
}
</script>
