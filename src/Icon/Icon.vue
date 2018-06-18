<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import getIcon from 'vue-iconfont'
import SVGSprite from './sprite'

const types = [
  'fa',
  'fas',
  'far',
  'fal',
  'fab',
  'ion',
  'md'
]

const Icons = {
  default: getIcon({
    type: 'svg',
    sprite: SVGSprite
  }),
  fa: getIcon({
    type: 'font',
    prefix: 'fa',
    family: 'fa'
  }),
  fas: getIcon({
    type: 'font',
    prefix: 'fa',
    family: 'fas'
  }),
  far: getIcon({
    type: 'font',
    prefix: 'fa',
    family: 'far'
  }),
  fal: getIcon({
    type: 'font',
    prefix: 'fa',
    family: 'fal'
  }),
  fab: getIcon({
    type: 'font',
    prefix: 'fa',
    family: 'fab'
  }),
  ion: getIcon({
    type: 'font',
    prefix: 'ion',
    family: 'ion'
  }),
  md: getIcon({
    type: 'font',
    prefix: '',
    family: 'material-icons',
    component: {
      beforeRender(_, ctx) {
        ctx.children = String(ctx.props.name).replace(/-/g, '_')
        ctx.props.name = null
      }
    }
  })
}

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

  computed: {
    typeAndName() {
      const [type, name] = this.name ? this.name.split(/-(.+)?/, 2) : []
      if (types.indexOf(type) >= 0 && name) {
        return [type, name]
      }
      return ['default', this.name]
    },
    Icon() {
      const [type] = this.typeAndName
      return Icons[type]
    }
  },

  render() {
    const { Icon, typeAndName } = this
    return <Icon
      name={typeAndName[1]}
      styleName="@icon $size $name"
    />
  }
}
</script>
