<script>
import CSSModules from 'vue-css-modules'
import CascadedPickerView from './CascadedPickerView.vue'

export default {
  name: 'FCascadedPicker',

  subComponents: {
    View: CascadedPickerView
  },

  inject: {
    CascadedPickerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('CascadedPickerStyles')
  ],

  render() {
    return <div styleName="@cascaded-picker"></div>
  }
}
</script>
