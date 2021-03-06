<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FStepper',

  inject: {
    StepperStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('StepperStyles')
  ],

  props: {
    value: {
      numeric: true
    },
    min: {
      numeric: true,
      infinite: true,
      default: -Infinity
    },
    max: {
      numeric: true,
      infinite: true,
      default: Infinity
    },
    step: {
      numeric: true,
      default: 1
    },
    readonly: Boolean,
    disabled: Boolean
  },

  computed: {
    minusDisabled() {
      return this.disabled || (this.localValue - this.step < this.min)
    },
    plusDisabled() {
      return this.disabled || (this.localValue + this.step > this.max)
    }
  },

  methods: {
    handleInput(e) {
      const value = e.target.value.trim()
      if (!this.disabled && !this.readonly && value) {
        if (value >= this.min && value <= this.max) {
          this.sendValue(Number(value))
        } else {
          e.target.value = this.localValue
        }
      }
    },
    handleMinus() {
      if (!this.minusDisabled) {
        this.sendValue(this.localValue - this.step)
      }
    },
    handlePlus() {
      if (!this.plusDisabled) {
        this.sendValue(this.localValue + this.step)
      }
    }
  },

  render() {
    const {
      localValue,
      readonly,
      disabled,
      handleInput,
      handleMinus,
      handlePlus
    } = this

    return <div styleName="@stepper :disabled">
      <span styleName="minus disabled=minusDisabled" onClick={handleMinus}>
        <Icon name="minus" size="xxs" />
      </span>
      <div styleName="input-box">
        <input
          styleName="input"
          type="number"
          readonly={readonly || disabled}
          domPropsValue={localValue}
          onInput={handleInput}
        />
      </div>
      <span styleName="plus disabled=plusDisabled" onClick={handlePlus}>
        <Icon name="plus" size="xxs" />
      </span>
    </div>
  }
}
</script>
