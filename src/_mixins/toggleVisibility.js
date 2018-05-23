import Messenger from 'vue-messenger'

const model = {
  prop: 'visible',
  event: 'input'
}

export default (defaultVisible, isModel) => ({
  ...(isModel ? { model } : {}),

  mixins: [Messenger],

  props: {
    visible: {
      type: Boolean,
      default: defaultVisible,
      sync: !isModel
    }
  },

  methods: {
    show() {
      this.sendVisible(true)
      this.$emit('show')
    },
    hide() {
      this.sendVisible(false)
      this.$emit('hide')
    },
    toggle() {
      this[this.localVisible ? 'hide' : 'show']()
    }
  }
})
