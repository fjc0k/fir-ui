<script>
import CSSModules from 'vue-css-modules'
import styles from './Flex.styl'
import { oneOf, numericType } from '../_utils'

export default {
  name: 'FFlexItem',

  inject: {
    FlexStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('FlexStyles')
  ],

  props: {
    alignSelf: {
      type: String,
      ...oneOf(styles.alignSelf.split(/ /g))
    },
    order: numericType(0),
    grow: numericType(1),
    shrink: numericType(1),
    basis: {
      type: String,
      default: '0%'
    }
  },

  computed: {
    style() {
      return {
        order: this.order,
        'flex-grow': this.grow,
        'flex-shrink': this.shrink,
        'flex-basis': this.basis
      }
    }
  },

  render() {
    return <div
      style={this.style}
      styleName={`item align-self-${this.alignSelf}`}>
      {this.$slots.default}
    </div>
  }
}
</script>
