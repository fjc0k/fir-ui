import { includes } from 'lodash'

export default function (enumValues) {
  const defaultValue = arguments.length === 2 ? arguments[1] : enumValues[0]
  return {
    default: defaultValue,
    validator: includes.bind(null, enumValues)
  }
}
