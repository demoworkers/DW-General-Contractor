export const Ellipsis = () => {
  return (
    <div className="top-0 left-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center px-5 py-2 ">
        <div className="relative block w-20 h-5 mt-2 loader-dots">
          <div className="absolute top-0 w-3 h-3 mt-1 bg-indigo-500 rounded-full" />
          <div className="absolute top-0 w-3 h-3 mt-1 bg-indigo-500 rounded-full" />
          <div className="absolute top-0 w-3 h-3 mt-1 bg-indigo-500 rounded-full" />
          <div className="absolute top-0 w-3 h-3 mt-1 bg-indigo-500 rounded-full" />
        </div>
        <div className="mt-2 text-xs font-light text-center text-gray-500 sr-only">
          Loading...
        </div>
      </div>
    </div>
  )
}
