<template>
  <div styleName="@button">
    <slot />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'Button',

  inject: ['ButtonStyles'],

  mixins: [
    CSSModules('ButtonStyles')
  ]
}
</script>
