import { Tree } from 'primereact/tree'

import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const WorkScope = ({ nodes, onNodeAdd, onNodeDelete }) => {
  const plusIcon = (node) => {
    return node.children ? (
      <PlusCircleIcon
        className="inline-block w-6 h-6 mb-1 ml-3 cursor-pointer text-emerald-300"
        onClick={() => onNodeAdd(node.key)}
      />
    ) : null
  }
  const cancelIcon = (node) => {
    return (
      <XCircleIcon
        className="inline-block w-6 h-6 mb-1 ml-1 text-red-300 cursor-pointer"
        onClick={() => onNodeDelete(node.key)}
      />
    )
  }

  const nodeTemplate = (node, options) => {
    let label = (
      <>
        <b>{node.label}</b> {plusIcon(node)} {cancelIcon(node)}
      </>
    )

    if (!node.children) {
      label = (
        <>
          <span>{node.label}</span> {cancelIcon(node)}
        </>
      )
    }

    return <span className={options.className}>{label}</span>
  }

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">
          Scope of Work
        </h3>
        <div className="flex mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => onNodeAdd()}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add new
          </button>
        </div>
      </div>
      <Tree value={nodes} nodeTemplate={nodeTemplate} />
    </>
  )
}

export default WorkScope
