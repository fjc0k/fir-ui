<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { patchIndex } from '../_utils'
import Popup from '../Popup/Popup.vue'
import TabBarItem from './TabBarItem.vue'

export default {
  name: 'FTabBar',

  subComponents: {
    Item: TabBarItem
  },

  model: {
    prop: 'selected',
    event: 'input'
  },

  inject: {
    TabBarStyles: {
      default: () => ({})
    }
  },

  provide() {
    return {
      TabBar: this
    }
  },

  mixins: [
    Messenger,
    CSSModules('TabBarStyles')
  ],

  props: {
    selected: {
      type: null,
      default: 0
    },
    visible: {
      type: Boolean,
      default: true
    }
  },

  render() {
    const { visible } = this

    return <div styleName="placeholder">
      <Popup
        visible={visible}
        position="bottom"
        zIndex="100"
        appear={false}
        maskClosable={false}
        maskThrough
        maskTransparent>
        <div styleName="@tab-bar" v-show={visible}>
          {patchIndex(this.$slots.default)}
        </div>
      </Popup>
    </div>
  }
}
</script>
