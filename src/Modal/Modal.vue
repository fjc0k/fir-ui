<script>
import ModalBase from './ModalBase.vue'
import ModalButton from './ModalButton.vue'
import ModalButtonGroup from './ModalButtonGroup.vue'

export default {
  ...ModalBase,
  subComponents: {
    ButtonGroup: ModalButtonGroup,
    Button: ModalButton
  }
}
</script>
