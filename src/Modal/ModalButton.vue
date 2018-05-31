<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FModalButton',

  inject: {
    ModalStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ModalStyles')
  ],

  render() {
    return <div styleName="button">
      {this.$slots.default}
    </div>
  }
}
</script>
