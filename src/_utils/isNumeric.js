import { isNumber, isString } from 'lodash'

export default value => {
  return (isNumber(value) || (isString(value) && Boolean(value.trim()))) && isFinite(value)
}
