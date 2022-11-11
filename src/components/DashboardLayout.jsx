import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useViewerConfig } from '../../lib/hooks'
import { getUpdatedNodes } from '../../utils/processNodes'

import {
  PlusIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

import fetcher from '../../lib/fetcher'

import Tabs from './Tabs'
import Sortable from './Sortable'
import Slideover from './Slideover'
import { Spinner } from './Spinner'
import MainLayout from './MainLayout'

const Dashboard = ({ isAdmin }) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [nodes, setNodes] = useState([])
  const [isSliderOverOpen, setIsSliderOverOpen] = useState(false)
  const [isNewNode, setIsNewNode] = useState(false)
  const [selectedTreeNode, setSelectedTreeNode] = useState(null)
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)

  const router = useRouter()

  const { tab } = router.query

  // const { viewerConfig, mutate, isLoading, isError } = useViewerConfig(tab)

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      mutate()
    }
  }, [tab])

  useEffect(() => {
    if (viewerConfig) {
      if (viewerConfig.status === 401) {
        router.push('/login')
        return
      }
      setNodes(viewerConfig.nodes)
    }
  }, [viewerConfig])

  const handleTreeNodeSelect = (selectedNode) => {
    const { node } = selectedNode
    // set selected node - to be passed over to the slide over
    setSelectedTreeNode(node)
    // open slide over
    setIsSliderOverOpen(true)
  }

  const handleSliderOverClose = (isOpen) => {
    setIsSliderOverOpen(isOpen)
    if (!isOpen) {
      setIsNewNode(false)
      setSelectedTreeNode(null)
    }
  }

  const addNewNode = () => {
    setIsNewNode(true)
    setIsSliderOverOpen(true)
  }

  const handleNodeUpdate = (updatedNode, isNew = false) => {
    let updatedNodes = [...nodes]
    if (isNew) {
      updatedNodes.unshift(updatedNode)
    } else {
      updatedNodes = getUpdatedNodes(nodes, updatedNode, {
        type: 'update',
        add: true,
      })
    }
    // update nodes
    setNodes(updatedNodes)
    // hide slideover
    handleSliderOverClose(false)
  }

  const handleNodeDelete = (updatedNode, revertDelete) => {
    const updatedNodes = getUpdatedNodes(nodes, updatedNode, {
      type: 'delete',
      add: !revertDelete,
    })
    // update nodes
    setNodes(updatedNodes)
  }

  const handleSaveNodes = async () => {
    setIsSaveButtonLoading(true)
    const updatedNodes = await fetcher('saveNodes', {
      tabType: tab,
      nodes,
    })

    if (updatedNodes) {
      setNodes(updatedNodes.nodes)
    }

    setIsSaveButtonLoading(false)
  }

  const sortableHeader = (filterOnChange) => {
    return (
      <div className="flex pb-4 mb-4 border-b">
        <div className="relative flex-1 mr-8 rounded-md shadow-sm">
          <input
            onChange={filterOnChange}
            type="text"
            id="sortable-search"
            className="block w-full p-1 pr-10 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <MagnifyingGlassIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={addNewNode}
            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white border border-gray-200 rounded-md text-slate-900 hover:bg-emerald-200 focus:outline-none focus:ring-1 focus:ring-emerald-300 focus:ring-offset-1"
          >
            <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add New
          </button>
          <button
            type="button"
            onClick={handleSaveNodes}
            className="inline-flex items-center px-3 py-2 ml-3 text-sm font-medium leading-4 text-white border border-gray-200 rounded-md text-slate-900 hover:bg-sky-200 focus:outline-none focus:ring-1 focus:ring-sky-300 focus:ring-offset-1"
          >
            {isSaveButtonLoading ? (
              <Spinner className="w-4 h-4 mr-1 mb" />
            ) : (
              <>
                <CheckIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <MainLayout isAdmin={isAdmin}>
      <Tabs selectedTab={tab?.toLowerCase()} />
      {isLoading ? (
        <div className="flex justify-center align-center">
          <Spinner />
        </div>
      ) : (
        <Sortable
          treeNodes={nodes}
          sortableHeader={sortableHeader}
          onSelect={handleTreeNodeSelect}
          onChange={setNodes}
          onDelete={handleNodeDelete}
        />
      )}
      <Slideover
        isNewNode={isNewNode}
        treeNode={selectedTreeNode}
        isOpen={isSliderOverOpen}
        onClose={handleSliderOverClose}
        onSave={handleNodeUpdate}
      />
    </MainLayout>
  )
}

export default Dashboard
