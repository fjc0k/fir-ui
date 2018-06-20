<template>
  <div styleName="item">
    <div styleName="label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div styleName="value">
      <slot>
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FPreviewItem',

  inject: {
    PreviewStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('PreviewStyles')
  ],

  props: {
    label: null,
    value: null
  }
}
</script>
