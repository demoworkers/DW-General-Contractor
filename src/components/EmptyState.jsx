import { PlusIcon } from '@heroicons/react/20/solid'

const EmptyState = ({ onClick }) => {
  return (
    <div className="text-center">
      <svg
        className="w-12 h-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No scope items</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by adding a new item.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          New Item
        </button>
      </div>
    </div>
  )
}

export default EmptyState
