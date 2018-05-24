import isNumeric from './isNumeric'

export default (defaultValue, allowInfinityOrMin, max) => ({
  type: [String, Number],
  default: defaultValue,
  validator: max ? value => (
    isNumeric(value) &&
    value >= allowInfinityOrMin &&
    value <= max
  ) : (
    allowInfinityOrMin ? value => (
      value === Number.NEGATIVE_INFINITY ||
      value === Number.POSITIVE_INFINITY ||
      isNumeric(value)
    ) : isNumeric
  )
})
