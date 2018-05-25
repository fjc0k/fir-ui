<script>
import * as styles from '../styles'

export default {
  name: 'FContainer',

  props: {
    styles: Object
  },

  styles,

  provide() {
    return this.styles || this.$options.styles
  },

  render() {
    return <div>{this.$slots.default}</div>
  }
}
</script>
