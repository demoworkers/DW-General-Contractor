import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { RadioButton } from './RadioButton'

const defaultValues = {
  name: '',
}

const ProjectSlideover = ({
  isNew = false,
  itemDetails,
  isOpen = false,
  onClose,
  onSave,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      ...(itemDetails || defaultValues),
    },
  })

  useEffect(() => {
    reset(itemDetails || defaultValues)
  }, [itemDetails, isNew])

  const onSubmit = (data) => {
    onSave(data, isNew)
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
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
                  >
                    <div className="flex-1 h-0 overflow-y-auto">
                      <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            {isNew ? 'Add New Project' : 'Edit Project'}
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
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  {...register('name')}
                                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          {!isNew && (
                            <div className="pt-6 pb-5">
                              <fieldset>
                                <legend className="text-sm font-medium text-gray-900">
                                  Status
                                </legend>
                                <RadioButton
                                  id="status-open"
                                  value="OPEN"
                                  {...register('status')}
                                >
                                  Open
                                </RadioButton>
                                <RadioButton
                                  id="status-closed"
                                  value="CLOSED"
                                  {...register('status')}
                                >
                                  Closed
                                </RadioButton>
                              </fieldset>
                            </div>
                          )}
                          {/*  <div className="pt-6 pb-5">
                            <fieldset>
                              <legend className="text-sm font-medium text-gray-900">
                                State
                              </legend>
                              <RadioButton
                                id="state-bidding"
                                value="BIDDING"
                                {...register('state')}
                              >
                                Bidding
                              </RadioButton>
                              <RadioButton
                                id="state-material-selection"
                                value="MATERIAL_SELECTION"
                                {...register('state')}
                              >
                                Material Selection
                              </RadioButton>
                              <RadioButton
                                id="state-reconstruction"
                                value="RECONSTRUCTION"
                                {...register('state')}
                              >
                                Reconstruction
                              </RadioButton>
                              <RadioButton
                                id="state-construction"
                                value="CONSTRUCTION"
                                {...register('state')}
                              >
                                Construction
                              </RadioButton>
                              <RadioButton
                                id="state-punch-list"
                                value="PUNCH_LIST"
                                {...register('state')}
                              >
                                Punch List
                              </RadioButton>
                            </fieldset>
                          </div>*/}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end flex-shrink-0 px-4 py-4">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => onClose(false)}
                      >
                        Cancel
                      </button>
                      {isDirty ? (
                        <button
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-300 border border-transparent rounded-md shadow-sm cursor-not-allowed hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
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

export default ProjectSlideover
