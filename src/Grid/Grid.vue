<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import GridItem from './GridItem.vue'
import { chunk } from '../_utils'

export default {
  name: 'FGrid',

  subComponents: {
    Item: GridItem
  },

  inject: {
    GridStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      FGrid: this
    }
  },

  mixins: [
    Messenger,
    CSSModules('GridStyles')
  ],

  props: {
    cols: {
      numeric: true,
      default: 4
    },
    rows: {
      numeric: true,
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    square: {
      type: Boolean,
      default: true
    }
  },

  render() {
    const {
      cols
    } = this

    return <div styleName={`@grid :border :square cols${cols}`}>
      {chunk(this.$slots.default, cols, <GridItem styleName="placeholder" />).map(group => (
        <div styleName="line">
          {group}
        </div>
      ))}
    </div>
  }
}
</script>
