<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FModalAlert',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  render() {
    return <div styleName="@modal-alert"></div>
  }
}
</script>
