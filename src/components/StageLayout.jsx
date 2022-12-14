import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import { ArrowRightIcon } from '@heroicons/react/24/outline'

import fetcher from '../../lib/fetcher'

import StageNotes from './StageNotes'
import StagePhotos from './StagePhotos'
import { Spinner } from './Spinner'
import Contractors from './Contractors'
import WorkScopeWithQuotes from './WorkScopeWithQuotes'

const contractorsDB = ''
const stageNotesDB = ''
const workScopeDB = []

const workScopeDB1 = [
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

const StageLayout = ({
  projectId,
  stageId,
  enabledSections = {},
  onNextStage,
}) => {
  const [contractors, setContractors] = useState(contractorsDB)
  const [workScope, setWorkScope] = useState(workScopeDB)
  const [notes, setNotes] = useState(stageNotesDB)
  const [isSaving, setIsSaving] = useState(false)

  const handleStageSave = async () => {
    // setIsSaving(true)
    // // upload photos
    // // save here - attach photos
    // const updatedConfig = await fetcher('stage/save', {
    //   projectId,
    //   stageId,
    //   workScope,
    //   notes,
    // })
    // // Update State
    // setWorkScope(updatedConfig.workScope)
    // setWorkScope(updatedConfig.notes)
    debugger
    onNextStage()
    // Stop Loading
    setIsSaving(false)
  }

  return (
    <div>
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

      <footer className="flex justify-end pt-6 right-16 bottom-16">
        <button
          type="button"
          onClick={isSaving ? null : handleStageSave}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none"
        >
          {isSaving ? (
            <Spinner />
          ) : (
            <>
              <span>Next Stage</span>
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </footer>
    </div>
  )
}

export default StageLayout
