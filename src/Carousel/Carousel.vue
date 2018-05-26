<script>
import CSSModules from 'vue-css-modules'

export default {
  name: 'FCarousel',

  inject: ['CarouselStyles'],

  mixins: [
    CSSModules('CarouselStyles')
  ],

  render() {
    return <div styleName="@carousel">
      {this.$slots.default}
    </div>
  }
}
</script>
