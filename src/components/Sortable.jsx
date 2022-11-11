import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import React, { useState } from 'react'
import { Tree } from 'primereact/tree'

import {
  BackspaceIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const Sortable = ({
  treeNodes,
  sortableHeader,
  onChange,
  onSelect,
  onDelete,
}) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null)

  const handleNodeDelete = (e, updatedNode, revertDelete = false) => {
    e.stopPropagation()
    onDelete(updatedNode, revertDelete)
    return false
  }

  const deleteButton = (node) => {
    if (node.type === 'menu' && node.children?.length) {
      return null
    }

    return (
      <button
        type="button"
        onClick={(e) => handleNodeDelete(e, node, node.pendingDelete)}
        className={clsx(
          'node-delete-btn absolute right-4 mt-1 inline-flex items-center rounded-md border-slate-900 px-1 py-1 text-sm font-medium leading-4 text-slate-900 shadow-md hover:bg-red-400',
          node.pendingDelete && 'hover:bg-amber-400'
        )}
      >
        {node.pendingDelete ? (
          <BackspaceIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
        ) : (
          <TrashIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
        )}
      </button>
    )
  }

  const checkIcon = (node) => {
    return node.isNewNode ? (
      <CheckCircleIcon className="inline-block w-4 h-4 mb-1 ml-3 text-emerald-400" />
    ) : null
  }

  const warningIcon = (node) => {
    return node.pendingUpdate ? (
      <ExclamationTriangleIcon className="inline-block w-4 h-4 mb-1 ml-3 text-orange-300" />
    ) : null
  }

  const deleteIcon = (node) => {
    return node.pendingDelete ? (
      <XCircleIcon className="inline-block w-4 h-4 mb-1 ml-3 text-red-500" />
    ) : null
  }

  const nodeTemplate = (node, options) => {
    let label = (
      <>
        <b>{node.label}</b>
        {checkIcon(node)}
        {warningIcon(node)}
        {deleteIcon(node)}
        {deleteButton(node)}
      </>
    )

    if (node.link) {
      label = (
        <>
          <span>{node.label}</span>
          {checkIcon(node)}
          {warningIcon(node)}
          {deleteIcon(node)}
          {deleteButton(node)}
        </>
      )
    }

    return <span className={options.className}>{label}</span>
  }

  return (
    <div>
      <div className="card">
        <Tree
          value={treeNodes}
          dragdropScope="demo"
          header={(options) => sortableHeader(options.filterInput.onChange)}
          filter
          filterMode="lenient"
          nodeTemplate={nodeTemplate}
          selectionMode="single"
          selectionKeys={selectedNodeKey}
          onSelect={onSelect}
          onSelectionChange={(e) => setSelectedNodeKey(e.value)}
          onDragDrop={(event) => onChange(event.value)}
        />
      </div>
    </div>
  )
}

export default Sortable
