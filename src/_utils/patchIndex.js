export default vnodes => (vnodes || []).map((vnode, index) => {
  if (vnode.tag) {
    vnode.data = vnode.data || {}
    vnode.data.attrs = vnode.data.attrs || {}
    vnode.data.attrs.index = index
  }
  return vnode
})
