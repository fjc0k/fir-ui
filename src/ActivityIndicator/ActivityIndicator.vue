<template>
  <div styleName="@activity-indicator $size">
    <Icon styleName="loading" name="loading" />
    <div styleName="tip" v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { toggleVisibility } from '../_mixins'
import { oneOf } from '../_utils'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'ActivityIndicator',

  inject: ['ActivityIndicatorStyles'],

  mixins: [
    toggleVisibility(true, true),
    CSSModules('ActivityIndicatorStyles')
  ],

  props: {
    size: {
      type: String,
      ...oneOf(['sm', 'lg'])
    }
  },

  components: { Icon }
}
</script>
