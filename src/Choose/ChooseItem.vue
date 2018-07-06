<template>
  <ListItem labeled>
    <slot />
    <template slot="desc" v-if="desc || $slots.desc">
      <slot name="desc">
        {{ desc }}
      </slot>
    </template>
    <template slot="extra" v-if="extra || $slots.extra">
      <slot name="extra">
        {{ extra }}
      </slot>
    </template>
    <Choose
      v-model="localSelected"
      v-bind="$attrs"
      slot="icon"
    />
  </ListItem>
</template>

<script>
import Messenger from 'vue-messenger'
import ListItem from '../List/ListItem.vue'
import Choose from './ChooseBase.vue'

export default {
  name: 'FChooseItem',

  inheritAttrs: false,

  model: {
    prop: 'selected',
    event: 'input'
  },

  mixins: [
    Messenger
  ],

  props: {
    selected: null,
    desc: null,
    extra: null
  },

  components: {
    ListItem,
    Choose
  }
}
</script>
