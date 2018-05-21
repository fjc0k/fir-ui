<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import autoSize from 'autosize'
import { numericType } from '../_utils'
import Input from '../Input/Input.vue'

export default {
  name: 'Textarea',

  inject: ['TextareaStyles'],

  mixins: [
    Messenger,
    CSSModules('TextareaStyles')
  ],

  props: {
    value: [String, Number],
    rows: numericType(2),
    autoHeight: Boolean
  },

  methods: {
    onReceiveValue() {
      this.adjustHeight()
    },
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

  render() {
    const {
      rows,
      localValue,
      sendValue
    } = this

    return <Input
      styleName="@textarea"
      tag="textarea"
      rows={rows}
      {...{
        model: {
          value: localValue,
          callback: sendValue
        }
      }}
      modelValue={localValue}
      modelCallback={sendValue}
    />
  }
}
</script>
