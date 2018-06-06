import { chunk } from 'lodash'

export default (data, cols, filler) => {
  data = data.slice()
  const remainder = data.length % cols
  if (remainder !== 0) {
    let i = cols - remainder
    while (i--) {
      data.push(filler)
    }
  }
  return chunk(data, cols)
}
