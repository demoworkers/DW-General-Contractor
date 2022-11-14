import { nanoid } from 'nanoid'
import { useState } from 'react'
import { insert } from '../../utils/arrayManipulate'
import ActionButton from './ActionButton'
import DividerWithButton from './DividerWithButton'
import EmptyState from './EmptyState'
import { TextField } from './Fields'
import ScopeItem from './ScopeItem'

const Stage1 = ({ stageConfig }) => {
  const [scopeItems, setScopeItems] = useState(stageConfig.scopeOfWork || [])

  const [showFirstFields, setShowFirstFields] = useState(false)

  const handleAddItem = () => {
    const newItem = {
      id: nanoid(),
      label: 'Label',
      children: [],
    }
    let updatedScopeItems = [...scopeItems]
    updatedScopeItems.push(newItem)
    setScopeItems(updatedScopeItems)
  }

  const handleItemUpdate = (itemIdx, newValue) => {
    let updatedScopeItems = [...scopeItems]
    updatedScopeItems[itemIdx].label = newValue
    setScopeItems(updatedScopeItems)
  }

  const handleItemDelete = (itemIdx) => {
    let updatedScopeItems = [...scopeItems]
    updatedScopeItems.splice(itemIdx, 1)
    setScopeItems(updatedScopeItems)
  }

  const handleChildAction = (
    type,
    parentIdx,
    childIdx = undefined,
    newValue = undefined
  ) => {
    let updatedScopeItems = [...scopeItems]
    let isUpdated = false
    switch (type) {
      case 'new':
        isUpdated = true

        updatedScopeItems[parentIdx].children.push({
          id: nanoid(),
          label: newValue,
        })
        break

      case 'edit':
        isUpdated = true

        updatedScopeItems[parentIdx].children[childIdx].label = newValue
        break

      case 'delete':
        isUpdated = true

        updatedScopeItems[parentIdx].children.splice(childIdx, 1)
        break

      default:
        break
    }

    if (isUpdated) {
      setScopeItems(updatedScopeItems)
    }
  }

  const renderItems = () => {
    if (!scopeItems.length && !showFirstFields) {
      return (
        <div className="px-4 py-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6">
          <EmptyState onClick={handleAddItem} />
        </div>
      )
    }

    if (showFirstFields) {
      return (
        <div className="px-4 py-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <TextField id="scope-of-work" label="Title" />
            <div className="flex items-end">
              <ActionButton
                type="new"
                showIcon={false}
                onClick={() => handleAddItem(0)}
              >
                Save
              </ActionButton>
            </div>
          </div>
        </div>
      )
    }

    if (scopeItems.length) {
      return (
        <>
          {scopeItems.map((scopeItem, index) => {
            const isLast = index === scopeItems.length - 1
            return (
              <div key={scopeItem.id}>
                <ScopeItem
                  scopeItemIdx={index}
                  scopeItem={scopeItem}
                  onChildAction={handleChildAction}
                  onUpdate={handleItemUpdate}
                  onDelete={handleItemDelete}
                />
                {isLast && <DividerWithButton onClick={handleAddItem} />}
              </div>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="mt-8">
      <h3 className="mb-2 font-bold">Scope of Work</h3>
      <div className="">{renderItems()}</div>
    </div>
  )
}

export default Stage1
