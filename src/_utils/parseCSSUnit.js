import isNumeric from './isNumeric'

export default (value, defaultUnit = 'px') => {
  if (isNumeric(value)) {
    return {
      value: Number(value),
      unit: defaultUnit
    }
  }
  const matches = value.toString().trim().match(/^(-?[\d+.-]+)([a-z]+|%)$/i)
  if (matches !== null) {
    return {
      value: Number(matches[1]),
      unit: matches[2]
    }
  }
  return {
    value: Number(value),
    unit: defaultUnit
  }
}
