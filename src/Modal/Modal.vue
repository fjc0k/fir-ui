<script>
import ModalBase from './ModalBase.vue'
import ModalButton from './ModalButton.vue'
import ModalButtonGroup from './ModalButtonGroup.vue'
import ModalPopup from './ModalPopup.vue'
import ModalAlert from './ModalAlert.vue'
import ModalOperation from './ModalOperation.vue'

export default {
  ...ModalBase,
  subComponents: {
    ButtonGroup: ModalButtonGroup,
    Button: ModalButton,
    Popup: ModalPopup,
    Alert: ModalAlert,
    Operation: ModalOperation
  }
}
</script>
