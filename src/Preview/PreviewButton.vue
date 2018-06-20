<template>
  <div styleName="button $type">
    <slot />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FPreviewButton',

  inject: {
    PreviewStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('PreviewStyles')
  ],

  props: {
    type: {
      type: String,
      enum: ['default', 'primary', 'warning']
    }
  }
}
</script>
