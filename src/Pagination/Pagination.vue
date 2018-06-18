<template>
  <div styleName="@pagination $mode :disabled">
    <div styleName="indicator" v-if="showPointer">
      <div
        v-for="i in localTotal"
        :key="i"
        :styleName="['dot', i === localIndex && 'active']"
      />
    </div>
    <template v-else>
      <LocalButton @click.native="handlePrevClick" inline :disabled="disabled || localIndex <= 1" v-if="showButton">
        <slot name="prevText">{{ prevText }}</slot>
      </LocalButton>
      <div styleName="indicator" v-if="showNumber">
        <slot :index="localIndex" :total="localTotal" :disabled="disabled">
          <span styleName="active">{{ localIndex }}</span>/{{ localTotal }}
        </slot>
      </div>
      <LocalButton @click.native="handleNextClick" inline :disabled="disabled || localIndex >= localTotal" v-if="showButton">
        <slot name="nextText">{{ nextText }}</slot>
      </LocalButton>
    </template>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Button from '../Button/Button.vue'

export default {
  name: 'FPagination',

  model: {
    prop: 'index',
    event: 'input'
  },

  inject: {
    PaginationStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('PaginationStyles')
  ],

  props: {
    index: {
      numeric: true,
      default: 1,
      transform: index => parseInt(index, 10)
    },
    total: {
      numeric: true,
      default: 0,
      transform: index => parseInt(index, 10)
    },
    disabled: Boolean,
    mode: {
      type: String,
      enum: ['default', 'button', 'number', 'pointer']
    },
    prevText: {
      type: null,
      default: '上一页'
    },
    nextText: {
      type: null,
      default: '下一页'
    }
  },

  computed: {
    showPointer() {
      return this.mode === 'pointer'
    },
    showButton() {
      return this.mode === 'default' || this.mode === 'button'
    },
    showNumber() {
      return this.mode === 'default' || this.mode === 'number'
    }
  },

  methods: {
    handlePrevClick() {
      this.sendIndex(this.localIndex - 1)
    },
    handleNextClick() {
      this.sendIndex(this.localIndex + 1)
    }
  },

  components: {
    LocalButton: Button
  }
}
</script>
