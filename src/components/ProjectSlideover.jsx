import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

const defaultValues = {
  name: '',
  state: 'Bidding',
  status: 'Open',
}

const ProjectSlideover = ({
  isNew = false,
  projectDetails,
  isOpen = false,
  onClose,
  onSave,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      ...(projectDetails || defaultValues),
    },
  })

  useEffect(() => {
    reset(projectDetails || defaultValues)
  }, [projectDetails, isNew])

  const onSubmit = (data) => {
    const updatedData = { ...data }
    updatedData.label = updatedData.label.toUpperCase()
    if (isNew) {
      updatedData.key = nanoid()
      updatedData.isNewNode = true
    }
    onSave(updatedData, isNew)
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
                            Add New Project
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
                          {projectDetails?.type !== 'menu' && (
                            <div className="pt-6 pb-5">
                              <fieldset>
                                <legend className="text-sm font-medium text-gray-900">
                                  Resource type
                                </legend>
                                <div className="mt-2 space-y-5">
                                  <div className="relative flex items-start">
                                    <div className="absolute flex items-center h-5">
                                      <input
                                        id="asset-menu"
                                        value="menu"
                                        {...register('type')}
                                        aria-describedby="asset-menu-description"
                                        type="radio"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                      />
                                    </div>
                                    <div className="text-sm pl-7">
                                      <label
                                        htmlFor="asset-menu"
                                        className="font-medium text-gray-900"
                                      >
                                        Menu
                                      </label>
                                      <p
                                        id="asset-menu-description"
                                        className="text-gray-500"
                                      >
                                        Menu with nested items - all associated
                                        properties will be removed
                                      </p>
                                    </div>
                                  </div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex items-center h-5">
                                      <input
                                        id="asset-image"
                                        value="image"
                                        {...register('type')}
                                        aria-describedby="asset-image-description"
                                        type="radio"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                      />
                                    </div>
                                    <div className="text-sm pl-7">
                                      <label
                                        htmlFor="asset-image"
                                        className="font-medium text-gray-900"
                                      >
                                        Image
                                      </label>
                                      <p
                                        id="asset-image-description"
                                        className="text-gray-500"
                                      >
                                        Expandable image
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex items-center h-5">
                                        <input
                                          id="asset-video"
                                          value="video"
                                          {...register('type')}
                                          aria-describedby="asset-video-description"
                                          type="radio"
                                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                      </div>
                                      <div className="text-sm pl-7">
                                        <label
                                          htmlFor="asset-video"
                                          className="font-medium text-gray-900"
                                        >
                                          Video
                                        </label>
                                        <p
                                          id="asset-video-description"
                                          className="text-gray-500"
                                        >
                                          Auto-played video
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex items-center h-5">
                                        <input
                                          id="button"
                                          value="button"
                                          {...register('type')}
                                          aria-describedby="asset-video-description"
                                          type="radio"
                                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                      </div>
                                      <div className="text-sm pl-7">
                                        <label
                                          htmlFor="button"
                                          className="font-medium text-gray-900"
                                        >
                                          Button
                                        </label>
                                        <p
                                          id="button-description"
                                          className="text-gray-500"
                                        >
                                          Externally linked button
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          )}
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
