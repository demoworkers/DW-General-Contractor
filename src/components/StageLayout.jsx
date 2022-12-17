import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { CheckIcon } from '@heroicons/react/24/outline'

import fetcher from '../../lib/fetcher'

import StageNotes from './StageNotes'
import { Spinner } from './Spinner'
import Contractors from './Contractors'
import TableWithQuotes from './TableWithQuotes'
import { Ellipsis } from './Ellipsis'
import ImageUpload from './ImageUpload'
import DateSelect from './DateSelect'

const StageLayout = ({
  projectInfo: { id: projectId, stage: projectActiveStage },
  enabledSections = {},
  onStageComplete,
}) => {
  const [contractors, setContractors] = useState('')
  const [workScope, setWorkScope] = useState([])
  const [notes, setNotes] = useState('')
  const [photos, setPhotos] = useState([])
  const [colorDrawings, setColorDrawings] = useState([])
  const [dateSelect, setDateSelect] = useState(null)

  const [stageStatus, setStageStatus] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getStateValue = (response, type, defaultValue) => {
    if (response) {
      if (type === 'status') {
        return response[type]
      }

      if (response.config) {
        return response.config[type] || defaultValue
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
    if (enabledSections.colorDrawings) {
      const colorDrawingsValues = getStateValue(response, 'colorDrawings', [])
      setColorDrawings(colorDrawingsValues)
    }
    if (enabledSections.colorDrawings) {
      const dateSelectValues = getStateValue(response, 'dateSelect', [])
      setDateSelect(dateSelectValues)
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

      if (response.success) {
        // set in state
        setResponseState(response.data.stageInfo)
      } else {
        // show error toast
        toast.error(response.message)
      }

      // disable loading
      setIsLoading(false)
    }
    fetchStageData()
  }, [projectActiveStage])

  const handleStageSave = async (isNext = false) => {
    setIsSaving(true)

    const config = {}
    if (enabledSections.contractors) {
      config.contractors = contractors
    }
    if (enabledSections.tableWithQuotes) {
      config.workScope = workScope
    }
    if (enabledSections.photos) {
      config.photos = photos
    }
    if (enabledSections.notes) {
      config.notes = notes
    }
    if (enabledSections.colorDrawings) {
      config.colorDrawings = colorDrawings
    }
    if (enabledSections.dateSelect) {
      config.dateSelect = dateSelect
    }

    const response = await fetcher('stage/save', {
      projectId,
      projectStage: projectActiveStage,
      config,
    })

    if (response.success) {
      if (!isNext) {
        setIsSaving(false)
      }

      // show success toast
      toast.success(response.message)

      return true
    }

    // show error toast
    toast.error(response.message)
    return false
  }

  const handleCompleteStage = async () => {
    const isStageSaved = await handleStageSave(true)
    if (isStageSaved) {
      await onStageComplete()
    }
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
        <ImageUpload
          buttonId="photos"
          images={photos}
          onImagesUpdate={setPhotos}
        />
      )}
      {enabledSections.dateSelect && (
        <DateSelect
          sectionLabel={enabledSections.dateSelectLabel}
          date={dateSelect}
          onDateUpdate={setDateSelect}
        />
      )}
      {enabledSections.notes && (
        <StageNotes notes={notes} setNotes={setNotes} />
      )}

      {enabledSections.colorDrawings && (
        <ImageUpload
          buttonId="colorDrawings"
          sectionLabel={enabledSections.colorDrawingsLabel}
          images={colorDrawings}
          onImagesUpdate={setColorDrawings}
        />
      )}

      <footer className="flex justify-between pt-6 right-16 bottom-16">
        {stageStatus !== 'COMPLETED' && (
          <button
            type="button"
            onClick={isSaving ? null : handleCompleteStage}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            {isSaving ? <Spinner /> : <span>Complete this Stage</span>}
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
