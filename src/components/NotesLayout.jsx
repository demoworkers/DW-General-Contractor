import { useState } from 'react'
import { useRouter } from 'next/router'
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import fetcher from '../../lib/fetcher'
import { useNotes } from '../../lib/hooks'
import { formatDate } from '../../utils/dateAndTime'

import Slideover from './Slideover'
import { PlusIcon } from '@heroicons/react/24/outline'

const NotesLayout = ({ projectId }) => {
  const {
    data: notes,
    mutate: mutateAll,
    isLoading,
    isError,
  } = useNotes(projectId)

  const [isNewNote, setIsNewNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const [isSliderOverOpen, setIsSliderOverOpen] = useState(false)

  const openSlideover = () => {
    setIsSliderOverOpen(true)
  }

  const handleSliderOverClose = (isOpen) => {
    setIsSliderOverOpen(isOpen)
    if (!isOpen) {
      setIsNewNote(false)
      setSelectedNote(null)
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    openSlideover()
  }

  const handleNodeUpdate = async ({ noteName }, entry) => {
    const response = await fetcher('notes/add', {
      projectId: projectId,
      noteName,
      entry,
    })
  }

  return (
    <>
      <div className="my-4 md:flex md:items-center md:justify-end">
        <div className="flex-1 min-w-0">
          <h3 className="relative text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
            Notes
          </h3>
        </div>
        <div className="flex mt-4 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              setIsNewNote(true)
              openSlideover()
            }}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add note
          </button>
        </div>
      </div>
      <div className="mb-4 bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200 1">
          {notes.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                onClick={() => handleNoteClick(note)}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium truncate text-slate-900">
                          {note.name}
                        </p>
                      </div>
                      <div className="flex mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p className="text-sm">
                            <time dateTime={formatDate(note.created_at)}>
                              {formatDate(note.created_at)}
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-5">
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Slideover
        isNewNote={isNewNote}
        note={
          selectedNote || {
            id: null,
            name: null,
          }
        }
        isOpen={isSliderOverOpen}
        onClose={handleSliderOverClose}
        onSave={handleNodeUpdate}
      />
    </>
  )
}

export default NotesLayout
