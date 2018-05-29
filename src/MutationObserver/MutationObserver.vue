<script>
export default {
  name: 'FMutationObserver',

  abstract: true,

  props: {
    observable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      observer: new MutationObserver(
        this.$emit.bind(this, 'mutate')
      )
    }
  },

  methods: {
    observe(observable) {
      this.$nextTick(() => {
        if (observable) {
          this.observer.observe(this.$el, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: false,
            attributes: false
          })
        } else {
          this.disconnect()
        }
      })
    },
    disconnect() {
      this.observer.disconnect()
    }
  },

  destroyed() {
    this.disconnect()
  },

  watch: {
    observable: {
      immediate: true,
      handler: 'observe'
    }
  },

  render() {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
</script>
