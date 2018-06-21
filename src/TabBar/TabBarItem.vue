<template>
  <div styleName="item :selected" @click="handleClick">
    <component
      :is="badge ? 'Badge' : 'div'"
      v-bind="badge"
      styleName="icon">
      <slot name="selectedIcon" v-if="selected && (selectedIcon || $slots.selectedIcon)">
        <Icon :name="selectedIcon" />
      </slot>
      <slot name="icon" v-else>
        <Icon :name="icon" />
      </slot>
    </component>
    <div styleName="label">
      <slot />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Icon from '../Icon/Icon.vue'
import Badge from '../Badge/Badge.vue'

export default {
  name: 'FTabBarItem',

  inject: {
    TabBarStyles: {
      default: () => ({})
    },
    TabBar: {
      default: null
    }
  },

  mixins: [
    CSSModules('TabBarStyles')
  ],

  components: { Icon, Badge },

  props: {
    value: {
      type: null,
      default() {
        return this.$attrs.index
      }
    },
    icon: String,
    selectedIcon: String,
    badge: Object
  },

  computed: {
    selected() {
      return this.TabBar && this.TabBar.localSelected === this.value
    }
  },

  methods: {
    handleClick() {
      if (this.TabBar) {
        this.TabBar.sendSelected(this.value)
      }
    }
  }
}
</script>
