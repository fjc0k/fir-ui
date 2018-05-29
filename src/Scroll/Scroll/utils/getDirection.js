import {
  DIRECTION_NONE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_DOWN,
  PROP_X,
  PROP_Y
} from '../consts'

export default (original, current) => {
  const deltaX = original[PROP_X] - current[PROP_X]
  const deltaY = original[PROP_Y] - current[PROP_Y]

  if (deltaX === deltaY) return DIRECTION_NONE

  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT
  }

  return deltaY < 0 ? DIRECTION_UP : DIRECTION_DOWN
}
