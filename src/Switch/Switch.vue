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
    handleChange(e) {
      this.sendOn(e.target.checked)
    }
  },

  render() {
    const {
      localOn,
      disabled,
      color,
      handleChange
    } = this

    return <input
      styleName="@switch"
      type="checkbox"
      domPropsChecked={localOn}
      disabled={disabled}
      style={{ color: localOn ? color : null }}
      onChange={handleChange}
    />
  }
}
</script>
