<template>
  <div styleName="@steps $size $direction">
    <div styleName="step" v-for="(step, index) in localData" :key="index">
      <div styleName="tail" />
      <div styleName="icon">
        <Icon name="check-circle-o" v-if="index < currentIndex" />
        <template v-else-if="index === currentIndex">
          <Icon name="close" v-if="error" />
          <template v-else>{{ index + 1 }}</template>
        </template>
        <Icon name="ellipsis" v-else />
      </div>
      <div styleName="content">
        <div styleName="title">
          {{ step.label }}
        </div>
        <div styleName="desc">
          {{ step.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { findIndex } from 'lodash'
import { numericType, oneOf, normalizeData } from '../_utils'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FSteps',

  model: {
    prop: 'current',
    event: 'input'
  },

  inject: ['StepsStyles'],

  mixins: [
    Messenger,
    CSSModules('StepsStyles')
  ],

  props: {
    current: null,
    size: {
      type: String,
      ...oneOf(['lg', 'sm'])
    },
    direction: {
      type: String,
      ...oneOf(['vertical', 'horizontal'])
    },
    error: {
      type: Boolean,
      sync: true
    },
    data: {
      type: Array,
      default: () => [],
      watch: true
    }
  },

  computed: {
    currentIndex() {
      const index = findIndex(
        this.localData,
        ['value', this.localCurrent]
      )
      return index === -1 ? 0 : index
    }
  },

  methods: {
    onReceiveData(data, transform) {
      transform(normalizeData(data))
    }
  },

  components: { Icon }
}
</script>
