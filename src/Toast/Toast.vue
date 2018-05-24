<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :through="through"
    maskColor="transparent">
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

export default {
  name: 'Toast',

  inject: ['ToastStyles'],

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
    through: {
      type: Boolean,
      default: true
    },
    duration: numericType(3) // 秒
  },

  computed: {
    localIcon() {
      const { icon, type } = this
      return icon || (
        type === 'success' ? 'check-circle-o' :
          type === 'fail' ? 'close-circle-o' :
            type === 'offline' ? 'frown-o' :
              type === 'loading' ? 'loading' :
                null
      )
    }
  },

  components: { Popup, Icon },

  mounted() {
    const { duration } = this
    if (duration > 0) {
      setTimeout(this.hide, duration * 1000)
    }
  }
}
</script>
