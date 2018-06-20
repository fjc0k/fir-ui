<template>
  <div styleName="@preview">
    <slot />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import PreviewItem from './PreviewItem.vue'
import PreviewButton from './PreviewButton.vue'

export default {
  name: 'FPreview',

  subComponents: {
    Item: PreviewItem,
    Button: PreviewButton
  },

  inject: {
    PreviewStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('PreviewStyles')
  ]
}
</script>
