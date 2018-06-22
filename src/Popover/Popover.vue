<script>
import CSSModules from 'vue-css-modules'
import { toggleVisibility } from '../_mixins'
import { transferDOMToBody } from '../_directives'
import Popper from 'popper.js'

export default {
  name: 'FPopover',

  inject: {
    PopoverStyles: {
      default: () => ({})
    }
  },

  mixins: [
    toggleVisibility(false, true),
    CSSModules('PopoverStyles')
  ],

  directives: {
    transferToBody: transferDOMToBody
  },

  props: {
    visible: Boolean,
    placement: {
      type: String,
      enum: [
        'auto', 'top', 'right', 'bottom', 'left',
        'auto-start', 'top-start', 'right-start', 'bottom-start', 'left-start',
        'auto-end', 'top-end', 'right-end', 'bottom-end', 'left-end'
      ]
    },
    message: null
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$el.firstChild) {
        this.target = this.$el.firstChild
        this.$el.parentNode.replaceChild(this.target, this.$el)
        this.createPopper()
      }
    })
  },

  watch: {
    placement: 'createPopper'
  },

  methods: {
    createPopper() {
      if (this.popper) {
        this.popper.destroy()
      }
      this.popper = new Popper(this.target, this.$refs.popper, {
        placement: this.placement,
        modifiers: {
          arrow: {
            element: this.$refs.arrow
          },
          flip: {
            enabled: false
          }
        }
      })
    }
  },

  beforeDestroy() {
    this.popper && this.popper.destroy()
  },

  render() {
    const child = this.$slots.default && this.$slots.default[0]
    if (!child) return null
    return <div>
      {child}
      <div
        ref="popper"
        styleName="@popover $placement :visible"
        v-transfer-to-body>
        <div styleName="message">
          {this.$slots.message || this.message}
        </div>
        <div ref="arrow" styleName="arrow" />
      </div>
    </div>
  }
}
</script>
