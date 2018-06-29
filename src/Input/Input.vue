<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'

export default {
  name: 'FInput',

  inject: {
    InputStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('InputStyles')
  ],

  props: {
    value: null,
    tag: {
      type: String,
      default: 'input'
    },
    type: {
      type: String,
      default: 'text'
    },
    lazy: Boolean
  },

  methods: {
    handleInput(e) {
      if (!this.lazy) {
        this.sendValue(e.target.value)
      }
    },
    handleChange(e) {
      if (this.lazy) {
        this.sendValue(e.target.value)
      }
    }
  },

  render() {
    const {
      tag: Component,
      type,
      localValue,
      handleInput,
      handleChange
    } = this

    return <Component
      styleName="@input"
      type={type}
      domPropsValue={localValue}
      onInput={handleInput}
      onChange={handleChange}
    />
  }
}
</script>
