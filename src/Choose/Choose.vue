<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isArray, isBoolean, includes } from 'lodash'

const AUTO = 'auto'
const CHECKBOX = 'checkbox'
const RADIO = 'radio'
const AGREE = 'agree'

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
    square: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      enum: [AUTO, RADIO, CHECKBOX, AGREE]
    },
    align: {
      type: String,
      enum: ['center', 'start', 'end']
    }
  },

  computed: {
    localType() {
      const { type, localSelected } = this
      return type === AUTO ? (
        isBoolean(localSelected) ?
          AGREE :
          isArray(localSelected) ?
            CHECKBOX :
            RADIO
      ) : type
    },
    inputType() {
      return this.localType === RADIO ? 'radio' : 'checkbox'
    },
    isSelected() {
      const { localType, localSelected, value } = this
      return (
        localType === CHECKBOX ?
          includes(localSelected, value) :
          localType === RADIO ?
            localSelected === value :
            localSelected
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { localType, localSelected, value } = this

      let selectedValue

      if (localType === CHECKBOX) {
        selectedValue = localSelected.slice()
        if (checked) {
          selectedValue.push(value)
        } else {
          selectedValue.splice(
            selectedValue.indexOf(value),
            1
          )
        }
      } else if (localType === AGREE) {
        selectedValue = checked
      } else {
        selectedValue = value
      }

      this.sendSelected(selectedValue)
    }
  },

  render() {
    const {
      inputType,
      isSelected,
      disabled,
      handleChange
    } = this

    return <label styleName="@choose $align :square :disabled">
      <input
        styleName="input"
        type={inputType}
        domPropsChecked={isSelected}
        disabled={disabled}
        onChange={handleChange}
      />
      <div styleName={`box ${inputType}`} />
      {this.$slots.default && (
        <div styleName="message">
          {this.$slots.default}
        </div>
      )}
    </label>
  }
}
</script>
