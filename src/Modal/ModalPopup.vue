<script>
import { values } from 'lodash'
import Modal from './ModalBase.vue'

export default {
  name: 'FModalPopup',

  functional: true,

  render(h, { data, slots }) {
    data.attrs = data.attrs || {}
    data.attrs.position = 'bottom'
    return h(Modal, data, values(slots()))
  }
}
</script>
