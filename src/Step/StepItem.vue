<template>
  <div styleName="item $status prev=isPrev">
    <div styleName="indicator">
      <div styleName="tail left" />
      <div styleName="state">
        <Icon styleName="icon" :name="icon" v-if="icon" />
        <Icon styleName="icon" name="cross-circle-o" v-else-if="isError" />
        <Icon styleName="icon" name="check-circle-o" v-else-if="isDone" />
        <div styleName="text" v-else-if="isProcess">
          {{ currentIndex + 1 }}
        </div>
        <Icon styleName="icon" name="ellipsis" v-else />
      </div>
      <div styleName="tail right" />
    </div>
    <div styleName="content">
      <div styleName="title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div styleName="desc">
        <slot name="desc">
          {{ desc }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FStepItem',

  inject: {
    StepStyles: {
      default: () => ({})
    },
    Step: {
      default: null
    }
  },

  mixins: [
    CSSModules('StepStyles')
  ],

  components: { Icon },

  props: {
    icon: String,
    title: null,
    desc: null
  },

  computed: {
    currentIndex() {
      return (this.$attrs && this.$attrs.index) || 0
    },
    activeIndex() {
      return (this.Step && this.Step.localCurrent) || 0
    },
    isDone() {
      return this.currentIndex < this.activeIndex
    },
    isPrev() {
      return this.currentIndex + 1 === this.activeIndex
    },
    isProcess() {
      return this.currentIndex === this.activeIndex
    },
    isWait() {
      return this.currentIndex > this.activeIndex
    },
    isError() {
      return this.isProcess && ((this.Step && this.Step.error) || false)
    },
    status() {
      return (
        this.isDone ? 'done' :
          this.isProcess ? 'process' :
            'wait'
      )
    }
  }
}
</script>
