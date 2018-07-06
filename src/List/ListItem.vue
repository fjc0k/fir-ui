<template>
  <component :is="tag" styleName="item feedback=localFeedback">
    <div styleName="icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <Icon styleName="iconfont" :name="icon" />
      </slot>
    </div>
    <div styleName="content">
      <div styleName="message">
        <div styleName="line">
          <div styleName="label" v-if="label || $slots.label">
            <slot name="label">
              {{ label }}
            </slot>
          </div>
          <div styleName="value" v-if="value || $slots.default">
            <slot>
              {{ value }}
            </slot>
          </div>
        </div>
        <div styleName="line" v-if="desc || $slots.desc">
          <div styleName="desc">
            <slot name="desc">
              {{ desc }}
            </slot>
          </div>
        </div>
      </div>
      <div styleName="extra" v-if="extra || $slots.extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
      <Icon styleName="arrow" name="right" v-if="linked" />
    </div>
  </component>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FListItem',

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
    icon: String,
    label: null,
    value: null,
    desc: null,
    extra: null,
    borderless: Boolean,
    linked: Boolean,
    labeled: Boolean,
    feedback: {
      type: Boolean,
      transform(bool) {
        return this.linked ? true : bool
      }
    }
  },

  computed: {
    tag() {
      return this.labeled ? 'label' : 'div'
    }
  },

  components: {
    Icon
  }
}
</script>
