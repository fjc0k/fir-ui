<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isNil } from 'lodash'
import { valueTypes } from 'popmotion';
import { normalizeData } from '../_utils'

const { color } = valueTypes

window.color = color

export default {
  name: 'FSegmentedControl',

  inject: {
    SegmentedControlStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('SegmentedControlStyles')
  ],

  props: {
    value: null,
    detail: {
      type: Object,
      sync: true
    },
    data: {
      type: Array,
      watch: true,
      transform: normalizeData,
      default: () => []
    },
    disabled: Boolean,
    color: String
  },

  data: () => ({
    ready: false
  }),

  methods: {
    handleItemClick(item) {
      if (!this.disabled) {
        this.sendValue(item.value)
        this.sendDetail(item)
      }
    }
  },

  computed: {
    isWhiteColor() {
      if (/^white$/i.test(this.color)) return true
      if (color.test(this.color)) {
        const { red, green, blue } = color.parse(this.color)
        if (red === 255 && green === 255 && blue === 255) {
          return true
        }
      }
      return false
    },
    activeColor() {
      return this.isWhiteColor ? getComputedStyle(this.$parent.$el).backgroundColor : '#fff'
    },
    localValueWithDefault() {
      const {
        localValue,
        localData
      } = this
      return isNil(localValue) ? localData[0] && localData[0].value : localValue
    },
    ItemsNode() {
      const {
        localValueWithDefault: selectedValue,
        localData,
        color,
        activeColor,
        handleItemClick
      } = this

      return localData.map((item, index) => {
        const { label, value } = item
        const selected = selectedValue === value
        if (selected && !this.notFirstRender) {
          this.notFirstRender = true
          this.sendDetail(item)
        }
        const itemStyle = {
          color: selected ? activeColor : color,
          backgroundColor: selected ? color : 'transparent',
          borderColor: color
        }
        const maskStyle = {
          backgroundColor: color
        }
        return <div
          styleName={['item', selected && 'selected']}
          style={itemStyle}
          key={index}
          onClick={handleItemClick.bind(this, item)}>
          <div styleName="mask" style={maskStyle} />
          {label}
        </div>
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.ready = true
    })
  },

  render() {
    return this.ready && (
      <div styleName="@segmented-control :disabled">
        {this.ItemsNode}
      </div>
    )
  }
}
</script>
