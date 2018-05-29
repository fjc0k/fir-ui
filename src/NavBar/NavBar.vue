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
import { oneOf } from '../_utils'

export default {
  name: 'FNavBar',

  inject: {
    NavBarStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('NavBarStyles')
  ],

  props: {
    mode: {
      type: String,
      ...oneOf(['dark', 'light'])
    }
  }
}
</script>
