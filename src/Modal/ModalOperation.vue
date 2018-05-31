<script>
import Modal from './ModalBase.vue'
import ModalButtonGroup from './ModalButtonGroup.vue'

export default {
  name: 'FModalOperation',

  functional: true,

  render(h, { data, children }) {
    data.attrs = data.attrs || {}
    data.attrs.extraStyleName = 'operation'
    return h(Modal, data, [
      <ModalButtonGroup>
        {children}
      </ModalButtonGroup>
    ])
  }
}
</script>
