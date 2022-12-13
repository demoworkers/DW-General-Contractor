import { useState } from 'react'
import { nanoid } from 'nanoid'

import fetcher from '../../lib/fetcher'
import { deleteNode, updateNode } from '../../utils/nodeManipulate'

import WorkScope from './WorkScope'
import StageNotes from './StageNotes'
import StagePhotos from './StagePhotos'
import { Spinner } from './Spinner'

const workScopeDB = []
const stageNotesDB = ''

const StageLayout = ({ projectId, stage }) => {
  const [workScope, setWorkScope] = useState(workScopeDB)
  const [notes, setNotes] = useState(stageNotesDB)
  const [isSaving, setIsSaving] = useState(false)

  const handleScopeItemUpdate = (updatedNode) => {
    const updatedNodes = updateNode(workScope, updatedNode)
    setWorkScope(updatedNodes)
  }

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

  const handleStageSave = async () => {
    setIsSaving(true)
    // upload photos
    // save here - attach photos
    const updatedConfig = await fetcher('stage/save', {
      projectId,
      stageId: 1,
      workScope,
      notes,
    })
    // Update State
    setWorkScope(updatedConfig.workScope)
    setWorkScope(updatedConfig.notes)
    // Stop Loading
    setIsSaving(false)
  }

  return (
    <div>
      <WorkScope
        nodes={workScope}
        onNodeUpdate={handleScopeItemUpdate}
        onNodeAdd={handleScopeItemAdd}
        onNodeDelete={handleScopeItemDelete}
      />
      <StagePhotos />
      <StageNotes notes={notes} setNotes={setNotes} />

      <footer className="flex justify-end pt-6 right-16 bottom-16">
        <button
          type="button"
          onClick={isSaving ? null : handleStageSave}
          className="inline-flex items-center px-4 py-1 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isSaving ? <Spinner /> : 'Save'}
        </button>
      </footer>
    </div>
  )
}

export default StageLayout
