export const getUpdatedNodes = (
  nodes,
  updatedNode,
  action = { type: '', add: false }
) => {
  const updatedNodes = JSON.parse(JSON.stringify(nodes))

  const processNodes = (tabs, updatedTab, tabAction) => {
    // eslint-disable-next-line no-restricted-syntax
    for (let tab of tabs) {
      if (tab.key === updatedTab.key) {
        tab.id = updatedTab.id
        tab.key = updatedTab.key
        tab.label = updatedTab.label

        tab.pendingUpdate = tabAction.type === 'update' && tabAction.add
        tab.pendingDelete = tabAction.type === 'delete' && tabAction.add

        if (tabAction.type === 'update') {
          switch (updatedTab.type) {
            case 'menu':
              delete tab.link
              delete tab.buttonText
              delete tab.icon
              break

            case 'image':
              tab.link = updatedTab.link
              tab.icon = 'pi pi-fw pi-image'
              break

            case 'video':
              tab.link = updatedTab.link
              tab.icon = 'pi pi-fw pi-video'
              break

            case 'default':
              tab.link = updatedTab.link
              tab.icon = 'pi pi-fw pi-video'
              break

            case 'button':
              tab.buttonText = updatedTab.buttonText
              tab.icon = 'pi pi-fw pi-external-link'
              break

            default:
              break
          }

          tab.type = updatedTab.type
        }
      } else if (tab.children && tab.children.length > 0) {
        processNodes(tab.children, updatedTab, tabAction)
      }
    }
  }

  processNodes(updatedNodes, updatedNode, action)
  return updatedNodes
}

export const resetNodeStylesAndDeleteNodes = (nodes) => {
  return nodes
    .map((node) => {
      const updatedNode = { ...node }
      if (updatedNode.pendingUpdate) {
        delete updatedNode.pendingUpdate
      }
      if (updatedNode.isNewNode) {
        delete updatedNode.isNewNode
      }
      return updatedNode
    })
    .filter((node) => {
      if ('children' in node) {
        node.children = resetNodeStylesAndDeleteNodes(node.children)
      }
      return !node.pendingDelete
    })
}
