<template>
  <List>
    <template slot="header" v-if="title || $slots.title">
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <slot />
    <template slot="footer" v-if="tip || $slots.tip">
      <slot name="tip">
        {{ tip }}
      </slot>
    </template>
  </List>
</template>

<script>
import CSSModules from 'vue-css-modules'
import List from '../List/List.vue'
import FormItem from './FormItem.vue'

export default {
  name: 'FForm',

  inheritAttrs: false,

  subComponents: {
    Item: FormItem
  },

  inject: {
    FormStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      FForm: this
    }
  },

  mixins: [
    CSSModules('FormStyles')
  ],

  props: {
    title: null,
    tip: null,
    labelWidth: String
  },

  components: { List }
}
</script>
