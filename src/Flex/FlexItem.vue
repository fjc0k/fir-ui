<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import styles from './Flex.styl'

export default {
  name: 'FFlexItem',

  inject: {
    FlexStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('FlexStyles')
  ],

  props: {
    alignSelf: {
      type: String,
      enum: styles.alignSelf.split(/ /g)
    },
    order: {
      numeric: true,
      default: 0
    },
    grow: {
      numeric: true,
      default: 1
    },
    shrink: {
      numeric: true,
      default: 1
    },
    basis: {
      type: String,
      default: 'auto'
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
