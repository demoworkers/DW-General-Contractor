import { useState, useRef } from 'react'
import { nanoid } from 'nanoid'

import { ContextMenu } from 'primereact/contextmenu'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'

import { PlusIcon } from '@heroicons/react/24/outline'

import { sumAmounts } from '../../utils/sumAmounts'

const _ITEMS = [
  {
    id: '0',
    label: 'Bathroom Remodeling Labor',
    children: [
      {
        id: '0-0',
        label:
          'General Conditions (job site protection, job site clean up, dumping fee from construction waste)',
        qty: '1.00',
        pricePerQty: '0',
      },
      {
        id: '0-1',
        label: 'Demolition and Debris removal of Kitchen Keep Walls intact',
        qty: '1.00',
        pricePerQty: '1000',
      },
      {
        id: '0-2',
        label: 'Demolition and Debris removal of kitchen - full gut',
        qty: '1.00',
        pricePerQty: '1200',
      },
    ],
  },
  {
    id: '1',
    label: 'Cabinets',
    children: [
      {
        id: '1-0',
        label:
          "Cabinets - install of new kitchen cabinets per final project specifications - price doesn't include any framing or blocking",
        qty: '14.00',
        pricePerQty: '150',
      },
    ],
  },
  {
    id: '2',
    label: 'Plumbing - price includes rough material only',
    children: [
      {
        id: '2-0',
        label:
          'Sink and Faucet - standard plumbing to install new sink, drain, and faucet',
        qty: '1.00',
        pricePerQty: '300',
      },
      {
        id: '2-1',
        label:
          'Garbage Disposal - stanard plumbing to install new garbage disposal',
        qty: '1.00',
        pricePerQty: '150',
      },
      {
        id: '2-2',
        label:
          'Add dishwasher - plumbing to add new dishwasher right next to sink - standard install included in price',
        qty: '1.00',
        pricePerQty: '500',
      },
      {
        id: '2-3',
        label: 'Appliances - standard plumbing to installl all appliances',
        qty: '1.00',
        pricePerQty: '350',
      },
    ],
  },
]

const WorkScopeWithQuotes = ({
  nodes,
  onNodeUpdate,
  onNodeAdd,
  onNodeDelete,
}) => {
  const cm = useRef(null)
  const [items, setItems] = useState(_ITEMS)
  const [selectedItem, setSelectedItem] = useState([])

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
      label: 'New item',
    }

    if (itemIndex !== null) {
      newItem.qty = '0'
      newItem.pricePerQty = '0'
      updatedItems[itemIndex].children.push(newItem)
    } else {
      newItem.children = []
      updatedItems.push(newItem)
    }

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

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          Scope of Work
        </h3>
      </div>
      <ContextMenu model={CONTEXT_MENU_ITEMS} ref={cm} />

      <div className="p-4 bg-white border border-gray-200 rounded-sm">
        {items.map((item, itemIdx) => (
          <div key={item.id} className="mb-8">
            <h6 className="flex justify-between font-bold text-md itemLabelMain text-slate-900">
              <InputText
                value={item.label}
                onChange={(e) => setItemValue(e.target.value, itemIdx)}
              />
              <button
                type="button"
                onClick={() => addNewItem(itemIdx)}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
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
                            className="w-max-[60%] w-[60%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-4"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Qty
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Price per Qty
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.children.map((nestedItem, nestedItemIdx) => (
                          <tr
                            key={nestedItem.id}
                            onContextMenu={(e) => {
                              setSelectedItem([itemIdx, nestedItemIdx])
                              cm.current.show(e)
                            }}
                            className="border-b border-gray-200 divide-x divide-gray-200 "
                          >
                            <td className="w-max-[60%] w-[60%] py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-4">
                              <div className="font-medium text-gray-900 itemLabel">
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
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell">
                              <InputNumber
                                inputId="decimal-qty"
                                value={nestedItem.qty}
                                onValueChange={(e) =>
                                  setItemValue(
                                    e.value,
                                    itemIdx,
                                    nestedItemIdx,
                                    'qty'
                                  )
                                }
                                mode="decimal"
                                locale="en-US"
                                minFractionDigits={2}
                              />
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell">
                              <InputNumber
                                inputId="currency-pricePerQty"
                                value={nestedItem.pricePerQty}
                                onValueChange={(e) =>
                                  setItemValue(
                                    e.value,
                                    itemIdx,
                                    nestedItemIdx,
                                    'pricePerQty'
                                  )
                                }
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                              />
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-gray-500 itemAmount sm:pr-6 md:pr-4">
                              <InputNumber
                                inputId="currency-amount"
                                value={nestedItem.qty * nestedItem.pricePerQty}
                                onValueChange={(e) => {}}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                disabled
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {item.children.length > 0 && (
                        <tfoot>
                          <tr className="tracking-tighter uppercase">
                            <th
                              scope="row"
                              colSpan={3}
                              className="hidden pt-4 pl-6 pr-3 text-sm font-semibold text-right text-gray-900 sm:table-cell md:pl-4"
                            >
                              Total
                            </th>
                            <th
                              scope="row"
                              className="pt-4 pl-4 pr-3 text-sm font-semibold text-left text-gray-900 sm:hidden"
                            >
                              Total
                            </th>
                            <td className="pt-4 pl-3 pr-4 text-sm font-semibold text-right text-gray-900 itemSumAmount sm:pr-6 md:pr-4">
                              <InputNumber
                                inputId="currency-us"
                                value={sumAmounts(item.children)}
                                onValueChange={(e) => {}}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                disabled
                              />
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
      </div>
    </>
  )
}

export default WorkScopeWithQuotes
