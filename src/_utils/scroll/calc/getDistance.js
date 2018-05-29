import { PROP_X, PROP_Y } from '../consts'

export default (original, current) => {
  const deltaX = original[PROP_X] - current[PROP_X]
  const deltaY = original[PROP_Y] - current[PROP_Y]

  return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
}
