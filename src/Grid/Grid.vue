<script>
import CSSModules from 'vue-css-modules'
import GridItem from './GridItem.vue'
import { numericType, chunk } from '../_utils'

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
    CSSModules('GridStyles')
  ],

  props: {
    cols: numericType(4),
    rows: numericType(0),
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
