import { Fragment, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Markup } from 'interweave'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import fetcher from '../../lib/fetcher'
import { calculateTimeSince } from '../../utils/dateAndTime'

import { Spinner } from './Spinner'
import { Ellipsis } from './Ellipsis'
import FilePond from './FilePond'

const CONFIG = {
  toolbar: [
    'undo',
    'redo',
    '|',
    // 'heading',
    // '|',
    'bold',
    'italic',
    'blockQuote',
    'link',
    'numberedList',
    'bulletedList',
    // 'imageUpload',
    'insertTable',
    'mediaEmbed',
  ],
}

const Slideover = ({
  isNewNote,
  note: { id: noteId, name: noteName },
  isOpen = false,
  onClose,
  onSave,
}) => {
  // const [imageFiles, setImageFiles] = useState([])

  const [loadingNoteEntries, setLoadingNoteEntries] = useState(false)
  const [noteEntries, setNoteEntries] = useState([])

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [editorData, setEditorData] = useState('')

  const { CKEditor, ClassicEditor } = editorRef.current || {}

  // useEffect(() => {
  //   console.log({ imageFiles })
  // }, [imageFiles])

  useEffect(() => {
    async function fetchData() {
      setLoadingNoteEntries(true)
      const entries = await fetcher('notes/entries', {
        noteId,
      })
      setNoteEntries(entries)
      setLoadingNoteEntries(false)
    }

    if (isOpen) {
      fetchData()
    } else {
      setNoteEntries([])
      setEditorData('')
    }
  }, [isOpen])

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
    setEditorLoaded(true)
  }, [])

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm()

  const onSubmit = (data) => {
    onSave(data, editorData, noteId)
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
                            {isNewNote ? 'Add a new project note' : noteName}
                          </Dialog.Title>
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="text-indigo-200 bg-indigo-700 rounded-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
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
                          {isNewNote && (
                            <div className="pt-6 pb-5 space-y-6">
                              <div>
                                <label
                                  htmlFor="label"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Name
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="noteName"
                                    id="noteName"
                                    {...register('noteName')}
                                    className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="pt-2">
                            <span
                              htmlFor="label"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Details
                            </span>
                          </div>
                          {editorLoaded ? (
                            <CKEditor
                              editor={ClassicEditor}
                              data={editorData}
                              config={CONFIG}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor)
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData()
                                setEditorData(data)
                              }}
                            />
                          ) : (
                            <div className="flex justify-center py-6">
                              <Spinner />
                            </div>
                          )}
                          {/* <FilePond
                            files={imageFiles}
                            setFiles={(fileItems) => {
                              setImageFiles(
                                fileItems.map((fileItem) => fileItem.file)
                              )
                            }}
                          /> */}
                        </div>
                      </div>
                      {noteEntries.length > 0 && (
                        <div className="flex flex-col justify-between flex-1 noteEntries">
                          <div className="relative py-4">
                            <div
                              className="absolute inset-0 flex items-center"
                              aria-hidden="true"
                            >
                              <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center">
                              <span className="px-2 text-sm text-gray-500 bg-white">
                                Entries
                              </span>
                            </div>
                          </div>
                          {noteEntries.map((noteEntry) => (
                            <div key={noteEntry.id} className="px-4 mb-12">
                              <div className="mb-4">
                                <h6 className="text-sm font-bold leading-3">
                                  {noteEntry.created_by.firstName}{' '}
                                  {noteEntry.created_by.lastName}
                                </h6>
                                <span className="text-xs text-gray-600">
                                  {calculateTimeSince(noteEntry.created_at)}
                                </span>
                              </div>
                              <Markup content={noteEntry.entry} />
                            </div>
                          ))}
                        </div>
                      )}
                      {loadingNoteEntries && <Ellipsis />}
                    </div>
                    <div className="flex justify-end flex-shrink-0 px-4 py-4">
                      <button
                        type="button"
                        className="px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => onClose(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-2 py-1 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
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

export default Slideover
