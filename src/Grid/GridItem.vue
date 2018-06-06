<template>
  <div styleName="item">
    <div styleName="content">
      <div styleName="inner-content">
        <div styleName="icon" v-if="icon || $slots.icon">
          <slot name="icon">
            <Icon :name="icon" :size="(
              FGrid ? (
                FGrid.cols <= 2 ? 'lg' :
                FGrid.cols >= 6 ? 'default' :
                'md'
              ) : 'md'
            )" />
          </slot>
        </div>
        <div styleName="text">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FGridItem',

  inject: {
    GridStyles: {
      default: () => ({})
    },
    FGrid: {
      default: null
    }
  },

  mixins: [
    CSSModules('GridStyles')
  ],

  props: {
    icon: String
  },

  components: { Icon }
}
</script>
