import { useState } from 'react'
import { nanoid } from 'nanoid'

import fetcher from '../../lib/fetcher'
import { deleteNode } from '../../utils/deleteNode'

import WorkScope from './WorkScope'
import StageNotes from './StageNotes'
import StagePhotos from './StagePhotos'

const workScopeDB = [
  {
    key: '0',
    label: 'Documents',
    children: [
      {
        key: '0-0',
        label: 'Work',
      },
      {
        key: '0-1',
        label: 'Home',
      },
    ],
  },
]

const StageLayout = ({ projectId, stage }) => {
  const [notes, setNotes] = useState('')

  const [workScope, setWorkScope] = useState(workScopeDB)

  const handleScopeItemAdd = (parentItemKey) => {
    let updatedWorkScope = JSON.parse(JSON.stringify(workScope))

    const newNode = {
      key: nanoid(),
      label: 'New Scope Item',
    }

    if (parentItemKey) {
      // add item in relevant parent
      updatedWorkScope = updatedWorkScope.map((scopeItem) => {
        if (scopeItem.key === parentItemKey) {
          scopeItem.children.push(newNode)
        }
        return scopeItem
      })
    } else {
      // add item at end
      newNode.children = []
      updatedWorkScope.push(newNode)
    }

    setWorkScope(updatedWorkScope)
  }

  const handleScopeItemDelete = (nodeKey) => {
    const updatedNodes = deleteNode(workScope, nodeKey)
    setWorkScope(updatedNodes)
  }

  return (
    <div>
      <WorkScope
        nodes={workScope}
        onNodeAdd={handleScopeItemAdd}
        onNodeDelete={handleScopeItemDelete}
      />
      <StagePhotos />
      <StageNotes notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default StageLayout
