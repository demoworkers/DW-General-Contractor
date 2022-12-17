import { Calendar } from 'primereact/calendar'

const DateSelect = ({ sectionLabel = 'Date', date = null, onDateUpdate }) => {
  const dateDate = date ? new Date(date) : null
  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          {sectionLabel}
        </h3>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-sm">
        <Calendar
          id="basic"
          value={dateDate}
          onChange={(e) => onDateUpdate(e.value)}
        />
      </div>
    </>
  )
}

export default DateSelect
