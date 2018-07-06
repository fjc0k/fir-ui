<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isArray, isBoolean, includes } from 'lodash'
import { AUTO, CHECKBOX, RADIO, AGREE } from './consts'

export default {
  name: 'FChoose',

  model: {
    prop: 'selected',
    event: 'input'
  },

  inject: {
    ChooseStyles: {
      default: () => ({})
    },
    ChooseGroup: {
      default: null
    }
  },

  mixins: [
    Messenger,
    CSSModules('ChooseStyles')
  ],

  props: {
    selected: null,
    value: null,
    square: {
      type: [Boolean, String],
      enum: [AUTO, true, false]
    },
    type: {
      type: String,
      enum: [AUTO, RADIO, CHECKBOX, AGREE]
    },
    disabled: Boolean
  },

  computed: {
    chooseType() {
      const { type, localSelected } = this
      return type === AUTO ? (
        isBoolean(localSelected) ?
          AGREE :
          isArray(localSelected) ?
            CHECKBOX :
            RADIO
      ) : type
    },
    localSquare() {
      return this.square === AUTO ? this.chooseType === CHECKBOX : this.square
    },
    inputType() {
      return this.chooseType === RADIO ? 'radio' : 'checkbox'
    },
    isSelected() {
      const { chooseType, localSelected, value } = this
      return (
        chooseType === CHECKBOX ?
          includes(localSelected, value) :
          chooseType === RADIO ?
            localSelected === value :
            localSelected
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { chooseType, localSelected, value } = this

      let selectedValue

      if (chooseType === CHECKBOX) {
        selectedValue = localSelected.slice()
        if (checked) {
          selectedValue.push(value)
        } else {
          selectedValue.splice(
            selectedValue.indexOf(value),
            1
          )
        }
      } else if (chooseType === AGREE) {
        selectedValue = checked
      } else {
        selectedValue = value
      }

      if (this.ChooseGroup) {
        this.ChooseGroup.sendValue(selectedValue)
      } else {
        this.sendSelected(selectedValue)
      }
    }
  },

  render() {
    const {
      inputType,
      isSelected,
      disabled,
      handleChange
    } = this

    return <label styleName="@choose square=localSquare :disabled">
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
