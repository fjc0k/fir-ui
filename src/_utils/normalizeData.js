import { isArray, isPlainObject, defaultTo } from 'lodash'

export default data => {
  // e.g. '10'
  if (!isArray(data)) {
    return [{
      label: data,
      value: data
    }]
  }

  return data.map(item => {
    // e.g. { label: '10', value: 10 }
    if (isPlainObject(item)) return item

    // e.g. ['10', 10]
    if (isArray(item)) {
      const [label, value, children, extra] = item
      return {
        label,
        value: defaultTo(value, label),
        ...(children && { children }),
        ...extra
      }
    }

    // e.g. '10'
    return {
      label: item,
      value: item
    }
  })
}
