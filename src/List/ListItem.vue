<template>
  <div styleName="@list-item $align :error :disabled">
    <div styleName="thumb" v-if="thumb || $slots.thumb">
      <slot name="thumb">
        <img :src="thumb" />
      </slot>
    </div>
    <div styleName="line multiple=multipleLine :wrap">
      <div styleName="content" v-if="$slots.default">
        <slot />
      </div>
      <div styleName="extra" v-if="extra || $slots.extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
      <div styleName="arrow $arrow" v-if="arrow">
        <Icon name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'
import Icon from '../Icon/Icon.vue'
import ListItemBrief from './ListItemBrief.vue'

export default {
  name: 'FListItem',

  subComponents: {
    Brief: ListItemBrief
  },

  inject: ['ListStyles'],

  mixins: [
    CSSModules('ListStyles')
  ],

  props: {
    thumb: String,
    extra: null,
    arrow: {
      type: String,
      ...oneOf(['horizontal', 'up', 'down', 'empty'], null)
    },
    align: {
      type: String,
      ...oneOf(['middle', 'top', 'bottom'])
    },
    error: Boolean,
    multipleLine: Boolean,
    wrap: Boolean,
    disabled: Boolean
  },

  components: { Icon }
}
</script>
