import { useState } from 'react'
import { Tree } from 'primereact/tree'

import {
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

import WorkScopeSlideover from './WorkScopeSlideover'

const WorkScope = ({ nodes, onNodeUpdate, onNodeAdd, onNodeDelete }) => {
  const [isSliderOverOpen, setIsSliderOverOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState(null)

  const handleNodeClick = (node) => {
    setSelectedNode(node)
    setIsSliderOverOpen(true)
  }

  const editIcon = (node) => {
    return (
      <PencilSquareIcon
        className="inline-block w-5 h-5 mb-1 ml-3 text-blue-300 cursor-pointer"
        onClick={() => handleNodeClick(node)}
      />
    )
  }

  const plusIcon = (node) => {
    return node.children ? (
      <PlusCircleIcon
        className="inline-block w-6 h-6 mb-1 ml-1 cursor-pointer text-emerald-300"
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
        <b>{node.label}</b>
        <span className="node-actions">
          {editIcon(node)} {plusIcon(node)} {cancelIcon(node)}
        </span>
      </>
    )

    if (!node.children) {
      label = (
        <>
          <span>{node.label}</span>
          <span className="node-actions">
            {editIcon(node)} {cancelIcon(node)}
          </span>
        </>
      )
    }

    const nodeValue = <span className={options.className}>{label}</span>
    return nodeValue
  }

  const handleSlideOverClose = (isOpen) => {
    setIsSliderOverOpen(isOpen)
    if (!isOpen) {
      setSelectedNode(null)
    }
  }

  const handleNodeUpdate = (value) => {
    onNodeUpdate({ key: selectedNode.key, label: value.scopeItemDetails })
    handleSlideOverClose(!isSliderOverOpen)
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
            <PlusIcon className="w-4 h-4 mr-1" />
            Add new
          </button>
        </div>
      </div>
      {nodes.length === 0 ? (
        <div className="py-1 text-center bg-white border border-gray-200 rounded-md">
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
          <h3 className="mt-1.5 text-sm font-medium text-gray-900">
            No work scope
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new work scope.
          </p>
        </div>
      ) : (
        <Tree value={nodes} nodeTemplate={nodeTemplate} />
      )}
      <WorkScopeSlideover
        itemDetails={selectedNode}
        isOpen={isSliderOverOpen}
        onClose={handleSlideOverClose}
        onSave={handleNodeUpdate}
      />
    </>
  )
}

export default WorkScope
