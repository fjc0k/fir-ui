<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { normalizeData } from '../_utils'

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
      default: () => []
    },
    disabled: Boolean,
    color: String
  },

  methods: {
    onReceiveData(data, transform) {
      transform(normalizeData(data))
    },
    handleItemClick(item) {
      if (!this.disabled) {
        this.sendValue(item.value)
        this.sendDetail(item)
      }
    }
  },

  computed: {
    ItemsNode() {
      const {
        value: selectedValue,
        localData,
        color,
        handleItemClick
      } = this

      return localData.map((item, index) => {
        const { label, value } = item
        const selected = selectedValue === value
        const itemStyle = {
          color: selected ? '#fff' : color,
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

  render() {
    return <div styleName="@segmented-control :disabled">
      {this.ItemsNode}
    </div>
  }
}
</script>
