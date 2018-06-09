<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div styleName="@toast $position" v-show="localVisible">
      <div styleName="icon" v-if="localIcon">
        <Icon :name="localIcon" size="lg" />
      </div>
      <div styleName="info">
        <slot />
      </div>
    </div>
  </Popup>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { toggleVisibility } from '../_mixins'
import { oneOf, numericType } from '../_utils'
import Popup from '../Popup/Popup.vue'
import Icon from '../Icon/Icon.vue'
import maskProps from '../Popup/maskProps'

export default {
  name: 'FToast',

  inject: {
    ToastStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('ToastStyles')
  ],

  props: {
    type: {
      type: String,
      ...oneOf(['info', 'success', 'fail', 'loading', 'offline'])
    },
    icon: String,
    position: {
      type: String,
      ...oneOf(['center', 'top', 'bottom'])
    },
    duration: numericType(3), // 秒
    ...maskProps({
      closable: false,
      through: false,
      transparent: true
    })
  },

  computed: {
    localIcon() {
      const { icon, type } = this
      return icon || (
        type === 'success' ? 'success' :
          type === 'fail' ? 'fail' :
            type === 'offline' ? 'dislike' :
              type === 'loading' ? 'loading' :
                null
      )
    }
  },

  components: { Popup, Icon },

  methods: {
    timing(visible = this.visible) {
      if (visible) {
        const { duration } = this
        if (duration > 0) {
          this.timer = setTimeout(this.hide, duration * 1000)
        }
      } else {
        clearTimeout(this.timer)
      }
    },
    onReceiveVisible(visible) {
      this.timing(visible)
    },
    onSendVisible(visible) {
      this.timing(visible)
    }
  }
}
</script>
