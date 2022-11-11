import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { useProjects } from '../../lib/hooks'

import fetcher from '../../lib/fetcher'

import MainLayout from '../components/MainLayout'
import LoadingTable from '../components/LoadingTable'
import ActionButton from '../components/ActionButton'
import ProjectSlideover from '../components/ProjectSlideover'

// import getServerSideProps from '../../lib/serverProps'

const Projects = ({ isAdmin }) => {
  const [isNew, setIsNew] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isSliderOverOpen, setIsSliderOverOpen] = useState(false)

  const { mutate } = useSWRConfig()

  const { data: projects, isLoading, isError } = useProjects()

  const handleAction = async (type, id) => {
    if (type === 'new') {
      setIsSliderOverOpen(true)
    }

    const updatedProjects = projects
      .map((project) => {
        if (project.id === id) {
          if (type === 'delete') {
            project = null
          }
        }
        return project
      })
      .filter(Boolean)

    const options = { optimisticData: updatedProjects, rollbackOnError: true }

    mutate('updateProject', fetcher('updateProject', { type, id }), options)
  }

  const handleSliderOverClose = (isOpen) => {
    setIsSliderOverOpen(isOpen)
    if (!isOpen) {
      setIsNew(false)
      setSelectedProject(null)
    }
  }

  const handleProjectUpdate = (updatedNode, isNewProject = false) => {
    // let updatedNodes = [...nodes]
    // if (isNew) {
    //   updatedNodes.unshift(updatedNode)
    // } else {
    //   updatedNodes = getUpdatedNodes(nodes, updatedNode, {
    //     type: 'update',
    //     add: true,
    //   })
    // }
    // update nodes
    // setNodes(updatedNodes)
    // hide slideover
    handleSliderOverClose(false)
  }

  const renderUsersOrEmpty = (renderProjects) => {
    if (renderProjects.length !== 0) {
      return renderProjects.map((project) => (
        <tr key={project.id}>
          <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
            <div className="flex items-center">
              <div className="font-medium text-gray-900">{project.name}</div>
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 capitalize rounded-full bg-slate-100">
              {project.state}
            </span>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            {project.status === 'OPEN' ? (
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 capitalize bg-green-100 rounded-full">
                Open
              </span>
            ) : (
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-200 rounded-full">
                Closed
              </span>
            )}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            {project.createdOn}
          </td>
          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
            <ActionButton
              type="edit"
              onClick={() => handleAction('edit', project.id)}
            />
            <ActionButton
              type="delete"
              onClick={() => handleAction('delete', project.id)}
            />
          </td>
        </tr>
      ))
    }

    return (
      <tr>
        <td className="p-8 text-center" colSpan="4">
          <div className="justify-center sm:flex">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              No members exist
            </h6>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <MainLayout isAdmin={isAdmin}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the projects including their name, status, state,
              and created date
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <ActionButton
              type="new"
              onClick={() => handleAction('new', undefined)}
            >
              Add Project
            </ActionButton>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created On
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td className="px-8 py-2" colSpan="4">
                          <LoadingTable columns={5} />
                        </td>
                      </tr>
                    ) : (
                      renderUsersOrEmpty(projects)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectSlideover
        isNewNode={isNew}
        treeNode={selectedProject}
        isOpen={isSliderOverOpen}
        onClose={handleSliderOverClose}
        onSave={handleProjectUpdate}
      />
    </MainLayout>
  )
}

// export { getServerSideProps }

export default Projects
