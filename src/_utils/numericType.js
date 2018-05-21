import isNumeric from './isNumeric'

export default defaultValue => ({
  type: [String, Number],
  default: defaultValue,
  validator: isNumeric
})
