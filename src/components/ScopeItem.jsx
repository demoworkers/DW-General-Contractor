import { useState } from 'react'
import ActionButton from './ActionButton'
import { TextArea } from './Fields'

const ScopeItem = ({ scopeItem }) => {
  const [showNewItemField, setShowNewItemField] = useState(false)

  const { children: scopeItemChildren } = scopeItem

  return (
    <div className="px-4 py-4 mb-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6">
      <div className="pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {scopeItem.label}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <ActionButton
            type="new"
            className="mr-3"
            onClick={() => setShowNewItemField(true)}
          />
          <ActionButton className="mr-0" type="delete" />
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
                      <tr key={scopeItemChild.id} className="border-b">
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {scopeItemChild.label}
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                          <ActionButton type="edit" className="mr-3" />
                          <ActionButton type="delete" />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showNewItemField && (
        <div className="ml-4">
          <TextArea id="new-inner-item" label="wowS" />
        </div>
      )}
    </div>
  )
}

export default ScopeItem
