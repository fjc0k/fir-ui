<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import autoSize from 'autosize'
import Input from '../Input/Input.vue'

export default {
  name: 'FTextarea',

  inject: {
    TextareaStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('TextareaStyles')
  ],

  props: {
    value: {
      type: null,
      on: {
        receive() {
          this.adjustHeight()
        }
      }
    },
    rows: {
      numeric: true,
      default: 2
    },
    autoHeight: Boolean
  },

  methods: {
    adjustHeight() {
      this.$nextTick(() => {
        const el = this.$el
        if (this.autoHeight) {
          if (this.__injected) {
            autoSize.update(el)
          } else {
            this.__injected = true
            autoSize(el)
          }
        } else {
          this.__injected = false
          autoSize.destroy(el)
        }
      })
    }
  },

  watch: {
    autoHeight: 'adjustHeight'
  },

  render(h) {
    const {
      rows,
      localValue,
      sendValue
    } = this

    return h(Input, {
      styleName: '@textarea',
      model: {
        value: localValue,
        callback: sendValue
      },
      attrs: {
        tag: 'textarea',
        rows: rows
      }
    })
  }
}
</script>
