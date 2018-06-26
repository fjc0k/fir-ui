<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { AUTO, CHECKBOX, RADIO, AGREE } from './consts'

export default {
  name: 'FChooseGroup',

  inject: {
    ChooseStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      ChooseGroup: this
    }
  },

  mixins: [
    Messenger,
    CSSModules('ChooseStyles')
  ],

  props: {
    value: null,
    direction: {
      type: String,
      enum: ['horizontal', 'vertical']
    },
    square: {
      type: [Boolean, String],
      enum: ['auto', true, false]
    },
    disabled: Boolean,
    type: {
      type: String,
      enum: [AUTO, RADIO, CHECKBOX, AGREE]
    }
  },

  render() {
    return <div styleName="group $direction">
      {this.$slots.default}
    </div>
  }
}
</script>
