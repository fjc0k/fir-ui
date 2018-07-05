<template>
  <Popup
    v-model="localVisible"
    position="bottom"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div styleName="@sheet" v-show="localVisible">
      <!-- // 头部 -->
      <div styleName="header" v-if="headerVisible">
        <!-- // 取消 -->
        <div styleName="action cancel" v-if="cancelText || $slots.cancel">
          <slot name="cancel">
            {{ cancelText }}
          </slot>
        </div>
        <!-- // 提示 -->
        <div styleName="tip">
          <!-- // 标题 -->
          <div styleName="title" v-if="title || $slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <!-- // 信息 -->
          <div styleName="message" v-if="message || $slots.message">
            <slot name="message">
              {{ message }}
            </slot>
          </div>
        </div>
        <!-- // 确认 -->
        <div styleName="action confirm" v-if="confirmText || $slots.confirm">
          <slot name="confirm">
            {{ confirmText }}
          </slot>
        </div>
      </div>
      <!-- // 内容 -->
      <div styleName="body">
        <slot />
      </div>
    </div>
  </Popup>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { toggleVisibility } from '../_mixins'
import Popup from '../Popup/Popup.vue'
import maskProps from '../Popup/maskProps'

export default {
  name: 'FSheet',

  inject: {
    SheetStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('SheetStyles')
  ],

  props: {
    title: String,
    message: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelClosable: {
      type: Boolean,
      default: true
    },
    confirmClosable: {
      type: Boolean,
      default: true
    },
    headerVisible: {
      type: Boolean,
      default: true
    },
    cancelVisible: {
      type: Boolean,
      default: true
    },
    confirmVisible: {
      type: Boolean,
      default: true
    },
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  methods: {
    // handleItemClick(item, index) {
    //   this.$emit('item-click', item, index)
    //   if (item.onClick) {
    //     const result = item.onClick(item, index)
    //     if (isThenable(result)) {
    //       result.then(this.hide)
    //     } else {
    //       this.hide()
    //     }
    //   } else {
    //     this.hide()
    //   }
    // }
  },

  components: { Popup }
}
</script>
