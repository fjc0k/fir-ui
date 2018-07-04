<template>
  <div styleName="@preview :plain">
    <slot />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import PreviewItem from './PreviewItem.vue'
import PreviewButton from './PreviewButton.vue'
import PreviewLine from './PreviewLine.vue'

export default {
  name: 'FPreview',

  subComponents: {
    Item: PreviewItem,
    Button: PreviewButton,
    Line: PreviewLine
  },

  inject: {
    PreviewStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('PreviewStyles')
  ],

  props: {
    plain: Boolean
  }
}
</script>
