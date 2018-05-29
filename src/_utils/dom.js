export default {
  prepend(target, el) {
    if (target.firstChild) {
      target.insertBefore(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  },
  append(target, el) {
    target.appendChild(el)
  },
  nextTick(callback) {
    setTimeout(callback, 0)
  },
  clone(node, flag) {
    const cloned = node.cloneNode(true)
    if (flag) {
      cloned.dataset.cloned = true
    }
    return cloned
  }
}
