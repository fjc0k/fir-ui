<template>
  <div styleName="@list">
    <div styleName="title" v-if="title || $slots.title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div styleName="content :borderless" v-if="$slots.default">
      <slot />
    </div>
    <div styleName="tip" v-if="tip || $slots.tip">
      <slot name="tip">
        {{ tip }}
      </slot>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import ListItem from './ListItem.vue'

export default {
  name: 'FList',

  subComponents: {
    Item: ListItem
  },

  inject: {
    ListStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ListStyles')
  ],

  props: {
    title: null,
    tip: null,
    borderless: Boolean
  }
}
</script>
