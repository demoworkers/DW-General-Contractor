import clsx from 'clsx'
import { useState } from 'react'
import ActionButton from './ActionButton'
import { TextArea, TextField } from './Fields'

const ScopeItemRow = ({ scopeItemChild, onSave, onDelete }) => {
  const [labelValue, setLabelValue] = useState(scopeItemChild.label)
  const [isEditActive, setIsEditActive] = useState(false)

  return (
    <tr key={scopeItemChild.id} className="border-b">
      <td className="w-88% border-r py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {!isEditActive ? (
          labelValue
        ) : (
          <TextArea
            value={labelValue}
            onChange={(e) => setLabelValue(e.target.value)}
          />
        )}
      </td>
      <td className="relative px-2 py-4 text-sm font-medium text-center">
        {isEditActive ? (
          <ActionButton
            type="activate"
            className="mr-0"
            onClick={() => {
              onSave(labelValue)
              setIsEditActive(false)
            }}
          />
        ) : (
          <div className="flex justify-center">
            <ActionButton
              type="edit"
              className="mr-3"
              onClick={() => setIsEditActive(true)}
            />
            <ActionButton
              type="delete"
              className="mr-0"
              onClick={() => onDelete(scopeItemChild)}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

const ScopeItem = ({
  scopeItem,
  scopeItemIdx,
  onChildAction,
  onUpdate,
  onDelete,
}) => {
  const [newChildLabelValue, setNewChildLabelValue] = useState('')
  const [showNewItemField, setShowNewItemField] = useState(false)

  const [labelValue, setLabelValue] = useState(scopeItem.label || '')
  const [isLabelEdit, setIsLabelEdit] = useState(false)

  const { children: scopeItemChildren } = scopeItem

  return (
    <div className="px-4 py-4 mb-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6">
      <div className="pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {!isLabelEdit ? (
            labelValue
          ) : (
            <TextField
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
            />
          )}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {isLabelEdit ? (
            <ActionButton
              type="activate"
              className="mr-0"
              onClick={() => {
                setIsLabelEdit(false)
                onUpdate(scopeItemIdx, labelValue)
              }}
            />
          ) : (
            <>
              <ActionButton
                type="new"
                className="mr-3"
                onClick={() => {
                  setNewChildLabelValue('')
                  setShowNewItemField(true)
                }}
              />
              <ActionButton
                type="edit"
                className="mr-3"
                onClick={() => {
                  setIsLabelEdit(true)
                }}
              />
              <ActionButton
                className="mr-0"
                type="delete"
                onClick={() => onDelete(scopeItemIdx)}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="bg-white">
                  {scopeItemChildren.map(
                    (scopeItemChild, scopeItemChildIdx) => (
                      <ScopeItemRow
                        key={scopeItemChild.id}
                        index={{ scopeItemIdx, scopeItemChildIdx }}
                        scopeItemChild={scopeItemChild}
                        onSave={(newValue) =>
                          onChildAction(
                            'edit',
                            scopeItemIdx,
                            scopeItemChildIdx,
                            newValue
                          )
                        }
                        onDelete={() =>
                          onChildAction(
                            'delete',
                            scopeItemIdx,
                            scopeItemChildIdx
                          )
                        }
                      />
                    )
                  )}
                  {showNewItemField && (
                    <tr>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 border-r sm:pl-6">
                        <TextArea
                          id="new-inner-item"
                          value={newChildLabelValue}
                          onChange={(e) =>
                            setNewChildLabelValue(e.target.value)
                          }
                        />
                      </td>
                      <td className="relative px-2 py-4 text-sm font-medium text-center">
                        <ActionButton
                          type="activate"
                          className="mr-0"
                          onClick={() => {
                            setShowNewItemField(false)
                            onChildAction(
                              'new',
                              scopeItemIdx,
                              undefined,
                              newChildLabelValue
                            )
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScopeItem
