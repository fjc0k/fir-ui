<template>
  <div :styleName="`@badge ${corner ? 'overflow-hidden' : ''}`">
    <slot />
    <div :styleName="`text :corner :dot :hot ${$slots.default ? 'has-attachment' : ''}`">
      <slot name="text" v-if="!dot">
        {{ localText }}
      </slot>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isNumber } from 'lodash'

export default {
  name: 'FBadge',

  inject: {
    BadgeStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('BadgeStyles')
  ],

  props: {
    text: [String, Number],
    overflowCount: {
      numeric: true,
      default: 99
    },
    corner: Boolean, // todo: 完善
    dot: Boolean,
    hot: Boolean
  },

  computed: {
    localText() {
      const { text, overflowCount } = this
      return (
        isNumber(text) ? (
          text > overflowCount ?
            `${overflowCount}+` :
            text
        ) : text
      )
    }
  }
}
</script>
