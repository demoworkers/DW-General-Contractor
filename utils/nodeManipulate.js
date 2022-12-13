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

export const updateNode = (nodes, updatedNode) => {
  return nodes
    .map((node) => {
      if (node.key === updatedNode.key) {
        node.label = updatedNode.label
      }
      return node
    })
    .filter((node) => {
      if ('children' in node) {
        node.children = deleteNode(node.children, updatedNode)
      }
      return true
    })
}
