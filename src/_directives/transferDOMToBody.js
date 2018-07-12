export default {
  inserted(el) {
    if (el.parentNode) {
      el.parentNode.replaceChild(
        document.createComment(''),
        el
      )
      document.body.appendChild(el)
    }
  },
  unbind(el) {
    if (el) {
      document.body.removeChild(el)
    }
  }
}
