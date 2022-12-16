import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Skeleton } from 'primereact/skeleton'
import { useTeam } from 'lib/hooks'

const Contractors = ({ selectedContractors, onContractorSelect }) => {
  const { data: contractors, mutate: mutateAll, isLoading, isError } = useTeam()

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          Contractors
        </h3>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-sm">
        {!isLoading && (
          <MultiSelect
            value={selectedContractors}
            options={contractors}
            onChange={(e) => onContractorSelect(e.value)}
            optionLabel="name"
            placeholder="Select contractors"
            display="chip"
          />
        )}
      </div>
    </>
  )
}

export default Contractors
