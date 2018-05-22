import isNumeric from './isNumeric'

export default (defaultValue, allowInfinity) => ({
  type: [String, Number],
  default: defaultValue,
  validator: allowInfinity ? value => (
    value === Number.NEGATIVE_INFINITY ||
    value === Number.POSITIVE_INFINITY ||
    isNumeric(value)
  ) : isNumeric
})
