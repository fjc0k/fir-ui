<template>
  <form
    styleName="@search-bar"
    action="#">
    <div styleName="input-box">
      <Icon styleName="icon" name="search" />
      <input
        styleName="input"
        type="search"
        v-model="localValue"
        v-bind="$attrs"
        ref="input"
      />
      <Icon styleName="icon clear" name="close" />
    </div>
    <div styleName="cancel">
      <slot name="cancelText">
        {{ cancelText }}
      </slot>
    </div>
  </form>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FSearchBar',

  inheritAttrs: false,

  inject: ['SearchBarStyles'],

  mixins: [
    Messenger,
    CSSModules('SearchBarStyles')
  ],

  props: {
    value: [String, Number],
    alwaysShowCancel: Boolean,
    cancelText: {
      type: String,
      default: '取消'
    }
  },

  components: { Icon },

  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
