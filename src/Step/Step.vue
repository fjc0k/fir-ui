<template>
  <div styleName="@step">
    <div styleName="item">
      <div styleName="indicator">
        <div styleName="tail left" />
        <div styleName="icon">
          <f-icon name="voice" />
        </div>
        <div styleName="tail right" />
      </div>
      <div styleName="content">
        <div styleName="title">
          第一步
        </div>
        <div styleName="desc">
          第一步呀
        </div>
      </div>
    </div>
    <div styleName="item">
      <div styleName="indicator">
        <div styleName="tail left" />
        <div styleName="icon">
          <f-icon name="voice" />
        </div>
        <div styleName="tail right" />
      </div>
      <div styleName="content">
        <div styleName="title">
          第2步
        </div>
        <div styleName="desc">
          第2步呀
        </div>
      </div>
    </div>
    <div styleName="item">
      <div styleName="indicator">
        <div styleName="tail left" />
        <div styleName="icon">
          <f-icon name="voice" />
        </div>
        <div styleName="tail right" />
      </div>
      <div styleName="content">
        <div styleName="title">
          第3步
        </div>
        <div styleName="desc">
          第3步呀
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FStep',

  inject: {
    StepStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('StepStyles')
  ]
}
</script>
