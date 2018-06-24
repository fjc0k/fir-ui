<template>
  <PickerView
    v-model="localValue"
    :data="pickerData"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { normalizeData } from '../_utils'
import PickerView from '../Picker/PickerView.vue'

const normalizeCascadedData = data => normalizeData(data).map(item => {
  if (item.children) {
    item.children = normalizeCascadedData(item.children)
  }
  return item
})

export default {
  name: 'FCascadedPickerView',

  inheritAttrs: false,

  inject: {
    CascadedPickerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('CascadedPickerStyles')
  ],

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: value => value.slice()
    },
    data: {
      type: Array,
      default: () => [],
      transform: normalizeCascadedData
    }
  },

  computed: {
    pickerData() {
      return [this.localData]
    }
  },

  components: { PickerView }
}
</script>
