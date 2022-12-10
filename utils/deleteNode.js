export const deleteNode = (nodes, nodeKey) => {
  return nodes
    .map((node) => {
      if (node.key === nodeKey) {
        return null
      }
      return node
    })
    .filter(Boolean)
    .filter((node) => {
      if ('children' in node) {
        node.children = deleteNode(node.children, nodeKey)
      }
      return true
    })
}
