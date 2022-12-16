import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'

import fetcher from '../../lib/fetcher'

import StageNotes from './StageNotes'
import { Spinner } from './Spinner'
import Contractors from './Contractors'
import TableWithQuotes from './TableWithQuotes'
import { Ellipsis } from './Ellipsis'
import ImageUpload from './ImageUpload'

const contractorsDB = ''
const stageNotesDB = ''
const workScopeDB = []
const photosDB = []

const StageLayout = ({
  projectInfo: { id: projectId, stage: projectActiveStage },
  enabledSections = {},
  onStageComplete,
}) => {
  const [contractors, setContractors] = useState(contractorsDB)
  const [workScope, setWorkScope] = useState(workScopeDB)
  const [notes, setNotes] = useState(stageNotesDB)
  const [photos, setPhotos] = useState(photosDB)
  const [stageStatus, setStageStatus] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getStateValue = (response, type, defaultValue) => {
    if (response) {
      if (type === 'status') {
        return response[type]
      }

      if (response.config) {
        return response.config[type]
      }
    }
    return defaultValue
  }

  const setResponseState = (response) => {
    const stageStatusValue = getStateValue(response, 'status', 'UNDER_PROGRESS')
    setStageStatus(stageStatusValue)

    if (enabledSections.contractors) {
      const contractorsValues = getStateValue(response, 'contractors', '')
      setContractors(contractorsValues)
    }
    if (enabledSections.tableWithQuotes) {
      const quotesTableValues = getStateValue(response, 'workScope', [])
      setWorkScope(quotesTableValues)
    }
    if (enabledSections.photos) {
      const photosValues = getStateValue(response, 'photos', [])
      setPhotos(photosValues)
    }
    if (enabledSections.notes) {
      const notesValues = getStateValue(response, 'notes', [])
      setNotes(notesValues)
    }
  }

  // load data here
  useEffect(() => {
    async function fetchStageData() {
      // enable loading
      setIsLoading(true)
      // You can await here
      const response = await fetcher('stage/load', {
        projectId,
        projectStage: projectActiveStage,
      })

      // set in state
      setResponseState(response)

      // disable loading
      setIsLoading(false)
    }
    fetchStageData()
  }, [projectActiveStage])

  const handleStageSave = async (isNext = false) => {
    setIsSaving(true)
    // upload photos
    // api request - attach photos
    await fetcher('stage/save', {
      projectId,
      projectStage: projectActiveStage,
      config: {
        contractors,
        workScope,
        photos,
        notes,
      },
    })
    if (!isNext) {
      setIsSaving(false)
    }
  }

  const handleCompleteStage = async () => {
    await handleStageSave(true)
    await onStageComplete()
    // stop loading
    setIsSaving(false)
  }

  return isLoading ? (
    <Ellipsis />
  ) : (
    <>
      {enabledSections.contractors && (
        <Contractors
          selectedContractors={contractors}
          onContractorSelect={(val) => setContractors(val)}
        />
      )}
      {enabledSections.tableWithQuotes && (
        <TableWithQuotes
          sectionName={enabledSections.sectionName}
          items={workScope}
          setItems={setWorkScope}
        />
      )}
      {enabledSections.photos && (
        <ImageUpload images={photos} onImagesUpdate={setPhotos} />
      )}
      {enabledSections.notes && (
        <StageNotes notes={notes} setNotes={setNotes} />
      )}

      <footer className="flex justify-between pt-6 right-16 bottom-16">
        {stageStatus !== 'COMPLETED' && (
          <button
            type="button"
            onClick={isSaving ? null : handleCompleteStage}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            {isSaving ? (
              <Spinner />
            ) : (
              <>
                <span>Complete this Stage</span>
                {/* <ArrowRightIcon className="w-4 h-4 ml-1" /> */}
              </>
            )}
          </button>
        )}
        <button
          type="button"
          onClick={isSaving ? null : () => handleStageSave(false)}
          className="inline-flex items-center px-2 py-1 ml-auto text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isSaving ? (
            <Spinner />
          ) : (
            <>
              <CheckIcon className="w-4 h-4 mr-1" />
              <span>Save</span>
            </>
          )}
        </button>
      </footer>
    </>
  )
}

export default StageLayout
