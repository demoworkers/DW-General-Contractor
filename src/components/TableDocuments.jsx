import { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import {
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ContextMenu } from 'primereact/contextmenu'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

import { Spinner } from './Spinner'

const TableDocuments = ({ userRole, sectionName, items, setItems }) => {
  const uploadButtonRef = useRef(null)

  const cm = useRef(null)
  const [selectedItem, setSelectedItem] = useState([])
  const [loading, setLoading] = useState(false)

  const setItemValue = (
    updateValue,
    itemIndex,
    nestedItemIndex = null,
    type = null
  ) => {
    const updatedItems = JSON.parse(JSON.stringify(items))
    if (nestedItemIndex !== null) {
      updatedItems[itemIndex].children[nestedItemIndex][type] = updateValue
    } else {
      updatedItems[itemIndex].label = updateValue
    }

    setItems(updatedItems)
  }

  const addNewItem = (itemIndex = null) => {
    const updatedItems = JSON.parse(JSON.stringify(items))

    // Create new item
    const newItem = {
      id: nanoid(),
      label: 'Documents',
    }

    if (itemIndex !== null) {
      updatedItems[itemIndex].children.push(newItem)
    } else {
      newItem.children = []
      updatedItems.push(newItem)
    }

    // set in state
    setItems(updatedItems)
  }

  const deleteItem = (itemIndex) => {
    let updatedItems = JSON.parse(JSON.stringify(items))

    // filter out the deleted item
    updatedItems = updatedItems.filter((item, itemIdx) => itemIdx !== itemIndex)

    // set in state
    setItems(updatedItems)
  }

  const handleItemDelete = () => {
    const updatedItems = JSON.parse(JSON.stringify(items))

    // extract indexes
    const itemIndex = selectedItem[0]
    const nestedItemIndex = selectedItem[1]

    // filter/delete nested item
    updatedItems[itemIndex].children = updatedItems[itemIndex].children.filter(
      (nestedItem, nestedItemIdx) => nestedItemIdx !== nestedItemIndex
    )

    // set in state
    setItems(updatedItems)
  }

  const CONTEXT_MENU_ITEMS = [
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: handleItemDelete,
    },
  ]

  const handleFileChange = async (event, itemIdx, nestedItemIdx) => {
    setLoading(true)

    const selectedFiles = event.target.files

    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i += 1) {
      formData.append('files', selectedFiles[i])
    }

    const response = await fetch(
      `${window.location.origin}/api/upload/document`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const res = await response.json()

    // reset file upload button
    uploadButtonRef.current.value = ''

    setLoading(false)

    if (!res.success) {
      // show error toast
      toast.error(res.error)
      return
    }

    const updatedItems = JSON.parse(JSON.stringify(items))

    updatedItems[itemIdx].children[nestedItemIdx].url = res.data.url

    // set in state
    setItems(updatedItems)
  }

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          {sectionName}
        </h3>
      </div>
      <ContextMenu model={CONTEXT_MENU_ITEMS} ref={cm} />

      <div className="p-4 bg-white border border-gray-200 rounded-sm">
        {items.map((item, itemIdx) => (
          <div key={item.id} className="mb-8">
            <h6 className="flex justify-between font-bold text-md itemLabelMain text-slate-900">
              {userRole.isUser ? (
                item.label
              ) : (
                <>
                  <InputText
                    value={item.label}
                    onChange={(e) => setItemValue(e.target.value, itemIdx)}
                  />
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => deleteItem(itemIdx)}
                      className="inline-flex items-center px-2 py-1 mr-4 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-sm shadow-sm hover:border-red-300 hover:bg-red-50 focus:outline-none"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => addNewItem(itemIdx)}
                      className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </h6>
            <div className="flex flex-col mt-2">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-sm">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr className="tracking-tighter uppercase divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="w-max-[50%] w-[50%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-4"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            File
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.children.map((nestedItem, nestedItemIdx) => (
                          <tr
                            key={nestedItem.id}
                            onContextMenu={(e) => {
                              if (!userRole.isUser) {
                                setSelectedItem([itemIdx, nestedItemIdx])
                                cm.current.show(e)
                              }
                            }}
                            className="border-b border-gray-200 divide-x divide-gray-200 "
                          >
                            <td className="w-max-[60%] w-[60%] py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-4">
                              <div className="font-medium text-gray-900 itemLabel">
                                {userRole.isUser ? (
                                  nestedItem.label
                                ) : (
                                  <InputTextarea
                                    value={nestedItem.label}
                                    onChange={(e) =>
                                      setItemValue(
                                        e.target.value,
                                        itemIdx,
                                        nestedItemIdx,
                                        'label'
                                      )
                                    }
                                    autoResize
                                  />
                                )}
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">
                              {nestedItem.url ? (
                                <a
                                  href={nestedItem.url}
                                  className="flex items-center justify-center p-1 text-blue-500 rounded-sm bg-slate-300 hover:bg-slate-400"
                                  download
                                >
                                  <ArrowDownTrayIcon className="w-4 mr-4" />
                                  View File
                                </a>
                              ) : (
                                <label
                                  htmlFor="documents"
                                  className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-transparent border-gray-300 rounded-sm shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none"
                                >
                                  {loading ? (
                                    <Spinner className="ml-1" />
                                  ) : (
                                    <>
                                      <PlusIcon className="w-4 h-4 mr-1" /> Add
                                    </>
                                  )}
                                  <input
                                    ref={uploadButtonRef}
                                    id="documents"
                                    name="files"
                                    type="file"
                                    multiple
                                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        itemIdx,
                                        nestedItemIdx
                                      )
                                    }
                                    className="hidden"
                                  />
                                </label>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!userRole.isUser && (
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => addNewItem()}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TableDocuments
