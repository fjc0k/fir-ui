<script>
import ChooseBase from './ChooseBase.vue'
import ChooseItem from './ChooseItem.vue'

export default {
  subComponents: {
    Item: ChooseItem
  },
  ...ChooseBase
}
</script>
