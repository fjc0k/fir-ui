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
import { isNumber } from 'lodash'
import { numericType } from '../_utils'

export default {
  name: 'FBadge',

  inject: {
    BadgeStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('BadgeStyles')
  ],

  props: {
    text: [String, Number],
    overflowCount: numericType(99),
    corner: Boolean,
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
