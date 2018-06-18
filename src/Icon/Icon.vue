<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import getIcon from 'vue-iconfont'
import SVGSprite from './sprite'

const Icon = getIcon({
  type: 'svg',
  sprite: SVGSprite
})

export default {
  name: 'FIcon',

  inject: {
    IconStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('IconStyles')
  ],

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      enum: ['default', 'md', 'xxs', 'xs', 'sm', 'lg']
    }
  },

  render() {
    return <Icon
      name={this.name}
      styleName="@icon $size $name"
    />
  }
}
</script>
