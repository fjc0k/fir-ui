<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { isArray, fill, range, findIndex } from 'lodash'
import { normalizeData, parseCSSUnit } from '../_utils'
import Picker from './Picker'

export default {
  name: 'FPickerView',

  inject: {
    PickerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('PickerStyles')
  ],

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: value => value.slice()
      // on: {
      //   receive() {
      //     this.$nextTick(() => {
      //       this.picker && this.picker.forEach(
      //         (picker, groupIndex) => picker.wheelTo(this.selectedIndex[groupIndex])
      //       )
      //     })
      //   }
      // }
    },
    detail: {
      type: Array,
      default: () => [],
      sync: true
    },
    data: {
      type: Array,
      default: () => [],
      transform(data) {
        return data.map(normalizeData)
      },
      on: {
        receive() {
          this.$nextTick(() => {
            this.listenWheel()
            this.picker && this.picker.forEach((picker, groupIndex) => picker.start({
              index: this.selectedIndex[groupIndex]
            }))
          })
        }
      }
    },
    itemHeight: {
      type: String,
      default: '2em'
    },
    visibleItemCount: {
      numeric: true,
      default: 5
    },
    divider: {
      type: null,
      transform(divider) {
        if (isArray(divider)) {
          return divider
        }
        return this.groupCount > 0 ? fill(Array(this.groupCount - 1), divider) : []
      }
    },
    caption: {
      type: null,
      transform(caption) {
        if (isArray(caption)) {
          return caption
        }
        return fill(Array(this.groupCount), caption)
      }
    },
    cascaded: Boolean
  },

  data: () => ({
    picker: []
  }),

  computed: {
    groups() {
      const { localData, cascaded, selectedIndex } = this
      if (!cascaded) return localData
      let lastItem = localData
      return selectedIndex.map(index => {
        const group = lastItem[index]
        // lastItem = lastItem
        return group
      })
    },
    groupCount() {
      return this.data.length
    },
    selectedIndex() {
      const { localValue, localData, groupCount } = this
      const selectedIndex = range(groupCount).map(index => {
        if (index in localValue) {
          const foundIndex = findIndex(
            localData[index],
            ['value', localValue[index]]
          )
          return foundIndex === -1 ? 0 : foundIndex
        }
        return 0
      })
      if (!this.detailProvided) {
        this.detailProvided = true // eslint-disable-line vue/no-side-effects-in-computed-properties
        this.sendDetail(
          selectedIndex.map(
            (itemIndex, groupIndex) => localData[groupIndex][itemIndex]
          )
        )
      }
      return selectedIndex
    },
    styles() {
      const { visibleItemCount, itemHeight, groupCount, localDivider } = this

      const { value: pureItemHeight, unit } = parseCSSUnit(itemHeight)

      const pickerHeight = `${pureItemHeight * visibleItemCount}${unit}`
      const pickerHalfHeight = `${pureItemHeight * ((visibleItemCount - 1) / 2)}${unit}`
      const groupWidth = `${100 / (groupCount + (localDivider ? localDivider.length : 0))}%`

      return {
        container: {
          height: pickerHeight
        },
        mask: {
          backgroundSize: `100% ${pickerHalfHeight}`
        },
        indicator: {
          height: itemHeight,
          top: pickerHalfHeight
        },
        caption: {
          maxWidth: groupWidth
        },
        group: {
          maxWidth: groupWidth, // 限制宽度：单行溢出文本显示省略号
          padding: `${pickerHalfHeight} 0` // 上下留白：上下空白区域可滑动
        },
        item: {
          height: itemHeight,
          lineHeight: itemHeight
        },
        divider: {
          maxWidth: groupWidth,
          height: pickerHeight
        }
      }
    }
  },

  methods: {
    listenWheel() {
      const { selectedIndex, $refs: { groups } } = this
      groups && groups.forEach((groupEl, groupIndex) => {
        if (groupEl.__picker) return

        groupEl.__picker = true

        this.picker[groupIndex] = new Picker({
          container: this.$refs.container,
          scroll: groupEl
        }, {
          index: selectedIndex[groupIndex],
          on: {
            wheelEnd: (index, isNative) => {
              console.log(index, isNative)
              const value = this.localData[groupIndex][index].value
              if (value === this.localValue[groupIndex]) return
              const localValue = this.localValue.slice()
              localValue[groupIndex] = value
              this.sendValue(localValue.slice(0, this.localData.length))
              this.sendDetail(
                this.selectedIndex.map(
                  (itemIndex, groupIndex) => this.localData[groupIndex][itemIndex]
                ).slice(0, this.localData.length)
              )
            }
          }
        })

        this.picker[groupIndex].start()
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.listenWheel()
    })
  },

  render() {
    const { localData, styles, localDivider, localCaption } = this

    return (
      <div styleName="view">
        {localCaption && (
          <div styleName="caption">
            {localCaption.map((caption, groupIndex) => [
              <div styleName="caption-item" style={styles.caption} key={groupIndex}>
                {caption}
              </div>,
              localDivider && localDivider[groupIndex] && (
                <div styleName="caption-item" style={styles.caption} key={`_${groupIndex}`} />
              )
            ])}
          </div>
        )}
        <div styleName="container" style={styles.container} ref="container">
          <div styleName="mask" style={styles.mask} />
          <div styleName="indicator" style={styles.indicator} />
          <div styleName="content">
            {localData.map((group, groupIndex) => {
              return [
                <div
                  styleName="group"
                  style={styles.group}
                  key={groupIndex}
                  ref="groups"
                  refInFor>
                  {group.map((item, itemIndex) => {
                    return (
                      <div styleName="item" style={styles.item} key={itemIndex}>
                        {item.label}
                      </div>
                    )
                  })}
                </div>,
                localDivider && localDivider[groupIndex] && (
                  <div styleName="divider" style={styles.divider} key={`_${groupIndex}`}>
                    <span styleName="divider-content">
                      {localDivider[groupIndex]}
                    </span>
                  </div>
                )
              ]
            })}
          </div>
        </div>
      </div>
    )
  }
}
</script>
