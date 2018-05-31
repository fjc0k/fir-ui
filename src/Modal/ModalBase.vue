<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div styleName="@modal $position" v-show="localVisible">
      <div styleName="content">
        <div styleName="header" v-if="title || $slots.title">
          <div styleName="title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>
        <div styleName="body" v-if="$slots.default">
          <slot />
        </div>
        <div styleName="footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { toggleVisibility } from '../_mixins'
import { oneOf } from '../_utils'
import Popup from '../Popup/Popup.vue'
import maskProps from '../Popup/maskProps'

export default {
  name: 'FModal',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('ModalStyles')
  ],

  props: {
    position: {
      type: String,
      ...oneOf(['center', 'top', 'bottom'])
    },
    title: null,
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  components: { Popup }
}
</script>
