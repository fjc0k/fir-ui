import { PROP_X, PROP_Y } from '../consts'

export default e => {
  const obj = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e
  return {
    [PROP_X]: obj.pageX,
    [PROP_Y]: obj.pageY
  }
}
