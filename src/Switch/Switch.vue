<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { oneOf } from '../_utils'

export default {
  name: 'XSwitch',

  model: {
    prop: 'checked',
    event: 'input'
  },

  inject: ['SwitchStyles'],

  mixins: [
    Messenger,
    CSSModules('SwitchStyles')
  ],

  props: {
    checked: Boolean,
    disabled: Boolean,
    color: String,
    platform: {
      type: String,
      ...oneOf(['ios', 'android'])
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      this.sendChecked(checked)
    }
  },

  render() {
    const {
      localChecked,
      disabled,
      color,
      handleChange
    } = this

    return <label styleName="@switch $platform">
      <input
        styleName="checkbox"
        type="checkbox"
        domPropsChecked={localChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <div
        styleName="switcher :disabled"
        style={{
          backgroundColor: localChecked ? color : null
        }}
      />
    </label>
  }
}
</script>
