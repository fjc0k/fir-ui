export default {
  inserted(el) {
    if (el.parentNode) {
      el.parentNode.replaceChild(
        document.createComment(''),
        el
      )
      document.body.appendChild(el)
    }
  }
}
