<template>
  <div styleName="@image :square :circle">
    <div styleName="holder" v-if="square" />
    <div
      styleName="img :background"
      :style="{ backgroundImage: `url(${src})` }"
      v-bind="$attrs"
      v-if="background"
    />
    <img
      styleName="img"
      :src="src"
      v-bind="$attrs"
      v-else
    />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FImage',

  inheritAttrs: false,

  inject: {
    ImageStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ImageStyles')
  ],

  props: {
    src: String,
    square: Boolean,
    circle: Boolean,
    background: Boolean
  }
}
</script>
