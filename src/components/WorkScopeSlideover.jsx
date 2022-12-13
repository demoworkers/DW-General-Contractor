import { Fragment, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const WorkScopeSlideover = ({
  isOpen = false,
  itemDetails,
  onClose,
  onSave,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm()

  useEffect(() => {
    reset({ scopeItemDetails: itemDetails?.label || '' })
  }, [itemDetails])

  const onSubmit = (data) => {
    onSave(data)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-lg pointer-events-auto">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
                  >
                    <div className="flex-1 h-0 overflow-y-auto">
                      <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Edit work scope item
                          </Dialog.Title>
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => onClose(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div className="px-4 divide-y divide-gray-200 sm:px-6">
                          <div className="pt-6 pb-5 space-y-6">
                            <div>
                              <label
                                htmlFor="label"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Item details
                              </label>
                              <div className="mt-1">
                                <textarea
                                  name="scopeItemDetails"
                                  id="scopeItemDetails"
                                  {...register('scopeItemDetails')}
                                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end flex-shrink-0 px-4 py-4">
                      <button
                        type="button"
                        className="px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => onClose(false)}
                      >
                        Cancel
                      </button>
                      {isDirty ? (
                        <button
                          type="submit"
                          className="inline-flex justify-center px-2 py-1 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex justify-center px-2 py-1 ml-4 text-sm font-medium text-white bg-indigo-300 border border-transparent rounded-md shadow-sm cursor-not-allowed hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default WorkScopeSlideover
