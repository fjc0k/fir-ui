<template>
  <div styleName="@card :full">
    <div
      styleName="header"
      v-if="thumb || $slots.thumb || title || $slots.title || extraTitle || $slots.extraTitle">
      <div styleName="thumb" v-if="thumb || $slots.thumb">
        <slot name="thumb">
          <img :src="thumb" />
        </slot>
      </div>
      <div styleName="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div styleName="extra-title">
        <slot name="extraTitle">{{ extraTitle }}</slot>
      </div>
    </div>
    <div styleName="body">
      <div styleName="content">
        <slot>{{ content }}</slot>
      </div>
    </div>
    <div
      styleName="footer"
      v-if="note || $slots.note || extraNote || $slots.extraNote">
      <div styleName="note">
        <slot name="note">{{ note }}</slot>
      </div>
      <div styleName="extra-note">
        <slot name="extraNote">{{ extraNote }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FCard',

  inject: {
    CardStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('CardStyles')
  ],

  props: {
    thumb: String,
    title: null,
    extraTitle: null,
    content: null,
    note: null,
    extraNote: null,
    full: Boolean
  }
}
</script>
