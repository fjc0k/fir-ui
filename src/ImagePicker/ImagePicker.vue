<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import { chunk, toArray } from 'lodash'
import { numericType } from '../_utils'
import { getOrientation, getRotation } from './utils'
import Icon from '../Icon/Icon.vue'

const IMAGE_SELECTOR = 0

export default {
  name: 'FImagePicker',

  model: {
    prop: 'files',
    event: 'input'
  },

  inject: {
    ImagePickerStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('ImagePickerStyles')
  ],

  props: {
    files: {
      type: Array,
      default: () => []
    },
    selectable: Boolean,
    multiple: Boolean,
    accept: {
      type: String,
      default: 'image/*'
    },
    cols: numericType(4)
  },

  methods: {
    addImage(image) {
      const { localFiles } = this
      const files = localFiles.slice()
      files.push(image)
      this.$emit('add', image)
      this.$emit('change', files, localFiles)
      this.sendFiles(files)
    },
    parseFile(file, index) {
      const reader = new FileReader()
      reader.onload = e => {
        const dataURL = e.target.result

        if (!dataURL) {
          this.$emit('fail', file, index)
          return
        }

        let orientation = 1
        getOrientation(file, res => {
          // -2: not jpeg , -1: not defined
          if (res > 0) {
            orientation = res
          }
          this.addImage({
            url: dataURL,
            orientation,
            file
          })
        })
      }
      reader.readAsDataURL(file)
    },
    handleRemoveClick(image, index) {
      const { localFiles } = this
      const files = localFiles.slice()
      files.splice(index, 1)
      this.$emit('remove', image, index)
      this.$emit('change', files, localFiles)
      this.sendFiles(files)
    },
    handleInputChange({ target: { files } }) {
      toArray(files).forEach(this.parseFile)
    },
    handleImageClick(image, index) {
      this.$emit('image-click', image, index)
    }
  },

  computed: {
    lists() {
      const { cols } = this
      const items = [
        ...this.localFiles,
        IMAGE_SELECTOR
      ]
      const remainder = items.length % cols
      if (remainder !== 0) {
        let i = cols - remainder
        while (i--) {
          items.push(null)
        }
      }
      return chunk(items, cols)
    },
    ListsNode() {
      const {
        multiple,
        accept,
        lists,
        handleRemoveClick,
        handleInputChange,
        handleImageClick
      } = this
      return lists.map((list, listIndex) => (
        <div styleName="list" key={listIndex}>
          {list.map((item, itemIndex) => (
            <div styleName="item" key={itemIndex}>
              {item === IMAGE_SELECTOR ? (
                <div styleName="content select">
                  <Icon styleName="add" name="plus" />
                  <input
                    styleName="input"
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleInputChange}
                  />
                </div>
              ) : item && [
                <Icon
                  styleName="remove"
                  name="close"
                  nativeOnClick={handleRemoveClick.bind(this, item, itemIndex)}
                />,
                <div
                  styleName="content image"
                  style={{
                    backgroundImage: `url(${item.url})`,
                    transform: `rotate(${getRotation(item.orientation)}deg)`
                  }}
                  onClick={handleImageClick.bind(this, item, itemIndex)}
                />
              ]}
            </div>
          ))}
        </div>
      ))
    }
  },

  render() {
    return <div styleName="@image-picker">
      {this.ListsNode}
    </div>
  }
}
</script>
