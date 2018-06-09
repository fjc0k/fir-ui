<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isArray, isBoolean, includes } from 'lodash'

const CHECKBOX = 1
const RADIO = 2
const AGREE = 3

export default {
  name: 'FChoose',

  model: {
    prop: 'selected',
    event: 'input'
  },

  inject: {
    ChooseStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('ChooseStyles')
  ],

  props: {
    selected: null,
    value: null,
    disabled: Boolean
  },

  computed: {
    type() {
      const { localSelected } = this
      return (
        isBoolean(localSelected) ?
          AGREE :
          isArray(localSelected) ?
            CHECKBOX :
            RADIO
      )
    },
    nativeType() {
      return this.type === RADIO ? 'radio' : 'checkbox'
    },
    isSelected() {
      const { type, localSelected, value } = this
      return (
        type === CHECKBOX ?
          includes(localSelected, value) :
          type === RADIO ?
            localSelected === value :
            localSelected
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { type, localSelected, value } = this

      let selectedValue

      if (type === CHECKBOX) {
        selectedValue = localSelected.slice()
        if (checked) {
          selectedValue.push(value)
        } else {
          selectedValue.splice(
            selectedValue.indexOf(value),
            1
          )
        }
      } else if (type === AGREE) {
        selectedValue = checked
      } else {
        selectedValue = value
      }

      this.sendSelected(selectedValue)
    }
  },

  render() {
    const {
      nativeType,
      isSelected,
      disabled,
      color,
      handleChange
    } = this

    return <label styleName="@choose">
      <input
        styleName="input"
        type={nativeType}
        domPropsChecked={isSelected}
        disabled={disabled}
        onChange={handleChange}
      />
      <div styleName={`box ${nativeType}`} />
      {this.$slots.default}
    </label>
  }
}
</script>
