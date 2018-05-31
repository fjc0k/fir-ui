<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FModalOperation',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  render() {
    return <div styleName="@modal-operation"></div>
  }
}
</script>
