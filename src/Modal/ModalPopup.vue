<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FModalPopup',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  render() {
    return <div styleName="@modal-popup"></div>
  }
}
</script>
