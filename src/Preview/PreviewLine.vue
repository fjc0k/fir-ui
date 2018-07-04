<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FPreviewLine',

  inject: {
    PreviewStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('PreviewStyles')
  ],

  render() {
    return <div styleName="line" />
  }
}
</script>
