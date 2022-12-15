import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'

import fetcher from '../../lib/fetcher'

import StageNotes from './StageNotes'
import StagePhotos from './StagePhotos'
import { Spinner } from './Spinner'
import Contractors from './Contractors'
import WorkScopeWithQuotes from './WorkScopeWithQuotes'
import { Ellipsis } from './Ellipsis'

const contractorsDB = ''
const stageNotesDB = ''
const workScopeDB = []

const StageLayout = ({
  projectInfo: { id: projectId, stage: projectActiveStage },
  enabledSections = {},
  onNextStage,
}) => {
  const [contractors, setContractors] = useState(contractorsDB)
  const [workScope, setWorkScope] = useState(workScopeDB)
  const [notes, setNotes] = useState(stageNotesDB)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const setResponseState = (response) => {
    if (response && response !== null && response.config) {
      setContractors(response.config.contractors || '')
      setWorkScope(response.config.workScope || [])
      setNotes(response.config.notes || '')
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

  const handleStageSave = async () => {
    setIsSaving(true)
    // upload photos
    // api request - attach photos
    await fetcher('stage/save', {
      projectId,
      projectStage: projectActiveStage,
      config: {
        contractors,
        workScope,
        notes,
      },
    })
    setIsSaving(false)
  }

  const handleNextStage = () => {
    onNextStage()
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
      {enabledSections.workScope && (
        <WorkScopeWithQuotes items={workScope} setItems={setWorkScope} />
      )}
      {enabledSections.photos && <StagePhotos />}
      {enabledSections.notes && (
        <StageNotes notes={notes} setNotes={setNotes} />
      )}

      <footer className="flex justify-between pt-6 right-16 bottom-16">
        <button
          type="button"
          onClick={isSaving ? null : handleNextStage}
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
        <button
          type="button"
          onClick={isSaving ? null : handleStageSave}
          className="inline-flex items-center px-2 py-1 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
