import { normalizeData } from '../_utils'

export default keyMap => {
  return {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      localData() {
        return normalizeData(this.data, keyMap)
      }
    }
  }
}
