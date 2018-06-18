<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import styles from './Flex.styl'
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
    Messenger,
    CSSModules('FlexStyles')
  ],

  props: {
    inline: Boolean,
    wrap: {
      type: String,
      enum: styles.flexWrap.split(/ /g)
    },
    direction: {
      type: String,
      enum: styles.flexDirection.split(/ /g)
    },
    alignContent: {
      type: String,
      enum: styles.alignContent.split(/ /g)
    },
    alignItems: {
      type: String,
      enum: styles.alignItems.split(/ /g)
    },
    justifyContent: {
      type: String,
      enum: styles.justifyContent.split(/ /g)
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
