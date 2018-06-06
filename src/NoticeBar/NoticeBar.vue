<template>
  <div styleName="@notice-bar" v-if="localVisible">
    <div styleName="icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <Icon :name="icon" size="xxs" />
      </slot>
    </div>
    <div styleName="content">
      <Marquee>
        <slot />
      </Marquee>
    </div>
    <div styleName="action">
      <Icon
        name="cross"
        size="md"
        @click.native="hide"
        v-if="mode === 'closable'"
      />
      <Icon
        name="right"
        size="md"
        @click.native="go"
        v-else-if="mode === 'link'"
      />
      <slot name="action" v-else />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { oneOf } from '../_utils'
import { toggleVisibility } from '../_mixins'
import Icon from '../Icon/Icon.vue'
import Marquee from '../Marquee/Marquee.vue'

export default {
  name: 'FNoticeBar',

  inject: {
    NoticeBarStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(true, true),
    CSSModules('NoticeBarStyles')
  ],

  props: {
    mode: {
      type: String,
      ...oneOf(['default', 'closable', 'link'])
    },
    icon: {
      type: String,
      default: 'voice'
    },
    url: String
  },

  components: {
    Icon,
    Marquee
  },

  methods: {
    go() {
      window.location.href = this.url
    }
  }
}
</script>
