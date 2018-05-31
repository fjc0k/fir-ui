<script>
import CSSModules from 'vue-css-modules'
import styles from './Flex.styl'
import { oneOf } from '../_utils'
import FlexItem from './FlexItem.vue'

export default {
  name: 'FFlex',

  subComponents: {
    Item: FlexItem
  },

  inject: {
    FlexStyles: {
      default: () => ({})
    }
  },

  mixins: [
    CSSModules('FlexStyles')
  ],

  props: {
    inline: Boolean,
    wrap: {
      type: String,
      ...oneOf(styles.flexWrap.split(/ /g))
    },
    direction: {
      type: String,
      ...oneOf(styles.flexDirection.split(/ /g))
    },
    alignContent: {
      type: String,
      ...oneOf(styles.alignContent.split(/ /g))
    },
    alignItems: {
      type: String,
      ...oneOf(styles.alignItems.split(/ /g))
    },
    justifyContent: {
      type: String,
      ...oneOf(styles.justifyContent.split(/ /g))
    }
  },

  render() {
    return <div styleName={
      `@flex ` +
      `:inline ` +
      `wrap-${this.wrap} ` +
      `direction-${this.direction} ` +
      `align-content-${this.alignContent} ` +
      `align-items-${this.alignItems} ` +
      `justify-content-${this.justifyContent}`
    }>{this.$slots.default}</div>
  }
}
</script>
