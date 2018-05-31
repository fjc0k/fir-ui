<script>
import { values } from 'lodash'
import Modal from './ModalBase.vue'
import ModalButtonGroup from './ModalButtonGroup.vue'
import ModalButton from './ModalButton.vue'

export default {
  name: 'FModalAlert',

  functional: true,

  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },

  render(h, { data, props: { cancelText, confirmText }, slots }) {
    return h(Modal, data, [
      <ModalButtonGroup direction="horizontal" slot="footer">
        <ModalButton>{cancelText}</ModalButton>
        <ModalButton>{confirmText}</ModalButton>
      </ModalButtonGroup>,
      ...values(slots())
    ])
  }
}
</script>
