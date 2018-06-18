<template>
  <div styleName="@list-item $align :feedback :error :disabled">
    <div styleName="thumb" v-if="thumb || $slots.thumb">
      <slot name="thumb">
        <img :src="thumb" />
      </slot>
    </div>
    <div styleName="line multiple=multipleLine :wrap">
      <slot name="content">
        <div styleName="content" v-if="$slots.default">
          <slot />
        </div>
      </slot>
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
import Messenger from 'vue-messenger'
import Icon from '../Icon/Icon.vue'
import ListItemBrief from './ListItemBrief.vue'

export default {
  name: 'FListItem',

  subComponents: {
    Brief: ListItemBrief
  },

  inject: {
    ListStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('ListStyles')
  ],

  props: {
    thumb: String,
    extra: null,
    arrow: {
      type: String,
      enum: ['horizontal', 'up', 'down', 'empty'],
      default: null
    },
    align: {
      type: String,
      enum: ['middle', 'top', 'bottom']
    },
    error: Boolean,
    multipleLine: Boolean,
    wrap: Boolean,
    disabled: Boolean,
    feedback: {
      type: Boolean,
      default: true
    }
  },

  components: { Icon }
}
</script>
