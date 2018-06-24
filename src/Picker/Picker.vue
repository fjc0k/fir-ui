<script>
import CSSModules from 'vue-css-modules'
import PickerView from './PickerView.vue'

export default {
  name: 'FPicker',

  subComponents: {
    View: PickerView
  },

  inject: {
    PickerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('PickerStyles')
  ],

  render() {
    return <div styleName="@picker"></div>
  }
}
</script>
