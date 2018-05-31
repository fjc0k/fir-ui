<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FModalPrompt',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  render() {
    return <div styleName="@modal-prompt"></div>
  }
}
</script>
