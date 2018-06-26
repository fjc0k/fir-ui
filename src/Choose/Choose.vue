<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isArray, isBoolean, includes } from 'lodash'
import ChooseGroup from './ChooseGroup.vue'
import { AUTO, CHECKBOX, RADIO, AGREE } from './consts'

export default {
  name: 'FChoose',

  subComponents: {
    Group: ChooseGroup
  },

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
      enum: [AUTO, true, false],
      default() {
        return this.ChooseGroup ? this.ChooseGroup.square : AUTO
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return this.ChooseGroup ? this.ChooseGroup.disabled : false
      }
    },
    type: {
      type: String,
      enum: [AUTO, RADIO, CHECKBOX, AGREE],
      default() {
        return this.ChooseGroup ? this.ChooseGroup.type : AUTO
      }
    }
  },

  computed: {
    localSelectedX() {
      return this.ChooseGroup ? this.ChooseGroup.localValue : this.localSelected
    },
    localSquare() {
      return this.square === AUTO ? this.chooseType === CHECKBOX : this.square
    },
    chooseType() {
      const { type, localSelectedX } = this
      return type === AUTO ? (
        isBoolean(localSelectedX) ?
          AGREE :
          isArray(localSelectedX) ?
            CHECKBOX :
            RADIO
      ) : type
    },
    inputType() {
      return this.chooseType === RADIO ? 'radio' : 'checkbox'
    },
    isSelected() {
      const { chooseType, localSelectedX, value } = this
      return (
        chooseType === CHECKBOX ?
          includes(localSelectedX, value) :
          chooseType === RADIO ?
            localSelectedX === value :
            localSelectedX
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { chooseType, localSelectedX, value } = this

      let selectedValue

      if (chooseType === CHECKBOX) {
        selectedValue = localSelectedX.slice()
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
