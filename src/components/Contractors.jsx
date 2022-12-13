import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Skeleton } from 'primereact/skeleton'

const Contractors = () => {
  const [selectedCities, setSelectedCities] = useState(null)

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]
  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          Contractors
        </h3>
      </div>
      <div className="p-4 bg-white border rounded-md border-gray-3300">
        <MultiSelect
          value={selectedCities}
          options={cities}
          onChange={(e) => setSelectedCities(e.value)}
          optionLabel="name"
          placeholder="Select contractors"
          display="chip"
        />
      </div>
    </>
  )
}

export default Contractors
