<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FListItemBrief',

  inject: {
    ListStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('ListStyles')
  ],

  render() {
    return <div styleName="@list-item-brief brief">
      {this.$slots.default}
    </div>
  }
}
</script>
