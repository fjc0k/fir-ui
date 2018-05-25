export default ({ closable = true, transparent = false, through = false } = {}) => ({
  maskClosable: {
    type: Boolean,
    default: closable
  },
  maskTransparent: {
    type: Boolean,
    default: transparent
  },
  maskThrough: {
    type: Boolean,
    default: through
  }
})
