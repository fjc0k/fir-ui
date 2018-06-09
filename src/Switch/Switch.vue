<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { oneOf } from '../_utils'

export default {
  name: 'FSwitch',

  model: {
    prop: 'on',
    event: 'input'
  },

  inject: {
    SwitchStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('SwitchStyles')
  ],

  props: {
    on: Boolean,
    disabled: Boolean,
    color: String
  },

  methods: {
    handleChange({ target: { checked } }) {
      this.sendOn(checked)
    }
  },

  render() {
    const {
      localOn,
      disabled,
      color,
      handleChange
    } = this

    return <label styleName="@switch">
      <input
        styleName="checkbox"
        type="checkbox"
        domPropsChecked={localOn}
        disabled={disabled}
        onChange={handleChange}
      />
      <div
        styleName="switcher :disabled"
        style={{
          backgroundColor: localOn ? color : null
        }}
      />
    </label>
  }
}
</script>
