<template>
  <div styleName="@list">
    <div styleName="header" v-if="header || $slots.header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div styleName="body" v-if="$slots.default">
      <slot />
    </div>
    <div styleName="footer" v-if="footer || $slots.footer">
      <slot name="footer">
        {{ footer }}
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

  inject: ['ListStyles'],

  mixins: [
    CSSModules('ListStyles')
  ],

  props: {
    header: null,
    footer: null
  }
}
</script>
