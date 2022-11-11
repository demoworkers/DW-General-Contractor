const LoadingTableRow = ({ totalColumns }) => {
  return (
    <div className="flex items-center justify-between pt-4">
      {totalColumns.map((column, index) => (
        <div key={column}>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          {index === 0 && (
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          )}
        </div>
      ))}
      {/* <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div>
        <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div>
        <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div> */}
    </div>
  )
}

const LoadingTable = ({ columns = 4 }) => {
  const totalColumns = new Array(columns)
    .fill(0)
    .map((item, index) => `${item + index}_row`)

  return (
    <div
      role="status"
      className="space-y-4 divide-y divide-gray-200 rounded animate-pulse"
    >
      {totalColumns.map((column) => (
        <LoadingTableRow totalColumns={totalColumns} key={column} />
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingTable
