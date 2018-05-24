<script>
import CSSModules from 'vue-css-modules'
import getIcon from 'vue-iconfont'
import SVGSprite from './sprite'
import { oneOf } from '../_utils'

const Icon = getIcon({
  type: 'svg',
  sprite: SVGSprite
})

export default {
  name: 'Icon',

  inject: ['IconStyles'],

  mixins: [CSSModules('IconStyles')],

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      ...oneOf(['md', 'xxs', 'xs', 'sm', 'lg'])
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
