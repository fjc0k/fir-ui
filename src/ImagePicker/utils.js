// http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
export function getOrientation(file, callback) {
  const reader = new FileReader()
  reader.onload = e => {
    const view = new DataView(e.target.result)
    if (view.getUint16(0, false) !== 0xffd8) {
      return callback(-2)
    }
    const length = view.byteLength
    let offset = 2
    while (offset < length) {
      const marker = view.getUint16(offset, false)
      offset += 2
      if (marker === 0xffe1) {
        const tmp = view.getUint32((offset += 2), false)
        if (tmp !== 0x45786966) {
          return callback(-1)
        }
        const little = view.getUint16((offset += 6), false) === 0x4949
        offset += view.getUint32(offset + 4, little)
        const tags = view.getUint16(offset, little)
        offset += 2
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + (i * 12), little) === 0x0112) {
            return callback(view.getUint16(offset + (i * 12) + 8, little))
          }
        }
      } else if ((marker & 0xff00) !== 0xff00) { // eslint-disable-line no-negated-condition
        break
      } else {
        offset += view.getUint16(offset, false)
      }
    }
    return callback(-1)
  }
  reader.readAsArrayBuffer(file.slice(0, 64 * 1024))
}

export function getRotation(orientation = 1) {
  return (
    orientation === 3 ? 180 :
      orientation === 6 ? 90 :
        orientation === 8 ? 270 :
          0
  )
}
