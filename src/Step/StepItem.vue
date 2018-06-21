<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FStepItem',

  inject: {
    StepStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('StepStyles')
  ],

  render() {
    return <div styleName="@step-item"></div>
  }
}
</script>
