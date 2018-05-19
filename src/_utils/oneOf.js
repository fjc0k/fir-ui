import { includes } from 'lodash'

export default (enumValues, defaultValue) => ({
  default: defaultValue || enumValues[0],
  validator: includes.bind(null, enumValues)
})
