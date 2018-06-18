<template>
  <div styleName="@nav-bar $mode">
    <div styleName="left">
      <slot name="left" />
    </div>
    <div styleName="title">
      <slot />
    </div>
    <div styleName="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FNavBar',

  inject: {
    NavBarStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('NavBarStyles')
  ],

  props: {
    mode: {
      type: String,
      enum: ['dark', 'light']
    }
  }
}
</script>
