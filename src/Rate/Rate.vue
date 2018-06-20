<script>
import CSSModules from 'vue-css-modules'
import Messenger from 'vue-messenger'
import Icon from '../Icon/Icon.vue'

export default {
  name: 'FRate',

  inject: {
    RateStyles: {
      default: () => ({})
    }
  },

  mixins: [
    Messenger,
    CSSModules('RateStyles')
  ],

  props: {
    icon: String,
    character: String,
    value: {
      numeric: true,
      default: 0
    },
    count: {
      numeric: true,
      default: 5
    },
    readonly: Boolean
  },

  computed: {
    current() {
      return this.localValue - 1
    },
    Stars() {
      const { icon, character, count } = this
      const Stars = []
      for (let i = 0; i < count; i++) {
        Stars.push(
          icon ? <Icon name={icon} key={i} /> :
            character ? character :
              <Icon name="star" key={i} />
        )
      }
      return Stars
    }
  },

  methods: {
    handleStarClick(index) {
      if (this.readonly) return
      this.sendValue(index + 1)
    }
  },

  render() {
    const { current, Stars } = this

    return <div styleName="@rate">
      {Stars.map((Star, index) => (
        <span
          styleName={['star', index <= current && 'active']}
          onClick={this.handleStarClick.bind(this, index)}>
          {Star}
        </span>
      ))}
    </div>
  }
}
</script>
