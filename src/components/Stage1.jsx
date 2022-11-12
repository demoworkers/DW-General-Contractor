import { nanoid } from 'nanoid'
import { useState } from 'react'
import { insert } from 'utils/arrayManipulate'
import ActionButton from './ActionButton'
import DividerWithButton from './DividerWithButton'
import EmptyState from './EmptyState'
import { TextField } from './Fields'
import ScopeItem from './ScopeItem'

const Stage1 = () => {
  const [scopeItems, setScopeItems] = useState([])
  const [showFirstFields, setShowFirstFields] = useState(false)

  const handleAddNewItem = () => {
    setShowFirstFields(true)
  }

  const handleAddItem = (addAtIndex) => {
    let newItem = {
      id: nanoid(),
      label: 'Bathroom Remodeling Labor',
      children: [
        {
          id: nanoid(),
          label:
            'General Conditions (job site protection, job site clean up, dumping fee from construction waste)',
        },
      ],
    }

    let updatedScopeItems = insert(scopeItems, addAtIndex, newItem)

    newItem = {
      id: nanoid(),
      label: 'Tile',
      children: [
        {
          id: nanoid(),
          label:
            'Wall Tile - install standard 12x24 wall tile in showeror tub area only - price may vary with final tile layout - price includes rough material (durock, screws, etc)',
        },
        {
          id: nanoid(),
          label:
            'Floor Tile - install standard 12x24 floor tile - price may vary with final tile layout - price includes rough material (durock, screws, etc)',
        },
      ],
    }

    updatedScopeItems = insert(updatedScopeItems, addAtIndex, newItem)

    setScopeItems(updatedScopeItems)

    if (showFirstFields) {
      setShowFirstFields(false)
    }
  }

  const renderItems = () => {
    if (!scopeItems.length && !showFirstFields) {
      return (
        <div className="px-4 py-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6">
          <EmptyState onClick={handleAddNewItem} />
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
                <ScopeItem scopeItem={scopeItem} />
                {isLast && (
                  <DividerWithButton onClick={() => console.log(index)} />
                )}
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
