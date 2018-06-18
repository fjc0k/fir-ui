<template>
  <Popup
    v-model="localVisible"
    position="bottom"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div styleName="@action-sheet" v-show="localVisible">
      <div styleName="title" v-if="title || $slots.title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div styleName="message" v-if="message || $slots.message">
        <slot name="message">
          {{ message }}
        </slot>
      </div>
      <div styleName="list">
        <div
          :styleName="[
            'item',
            !!item.danger && 'danger'
          ]"
          :style="{ color: item.color }"
          @click="handleItemClick(item, index)"
          v-for="(item, index) in localData"
          :key="index">
          <slot :item="item" :index="index">
            {{ item.label }}
          </slot>
        </div>
        <div styleName="item cancel" @click="hide" v-if="showCancel">
          <div styleName="mask" />
          <slot name="cancelText">
            {{ cancelText }}
          </slot>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { normalizeData, isThenable } from '../_utils'
import { toggleVisibility } from '../_mixins'
import Popup from '../Popup/Popup.vue'
import maskProps from '../Popup/maskProps'

export default {
  name: 'FActionSheet',

  inject: {
    ActionSheetStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('ActionSheetStyles')
  ],

  props: {
    title: String,
    message: String,
    data: {
      type: Array,
      default: () => [],
      transform: normalizeData
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  methods: {
    handleItemClick(item, index) {
      this.$emit('item-click', item, index)
      if (item.onClick) {
        const result = item.onClick(item, index)
        if (isThenable(result)) {
          result.then(this.hide)
        } else {
          this.hide()
        }
      } else {
        this.hide()
      }
    }
  },

  components: { Popup }
}
</script>
