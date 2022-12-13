import { useState } from 'react'
import { Tree } from 'primereact/tree'

import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import {
  PencilSquareIcon,
  PlusCircleIcon,
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
            Add new
          </button>
        </div>
      </div>
      <Tree value={nodes} nodeTemplate={nodeTemplate} />
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
