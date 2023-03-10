import { useState } from 'react'
import Link from 'next/link'

import { Markup } from 'interweave'
import toast from 'react-hot-toast'

import fetcher from '../../../lib/fetcher'
import { useProjects } from '../../../lib/hooks'

import { titleCase } from '../../../utils/formattedString'

import MainLayout from '../../components/MainLayout'
import LoadingTable from '../../components/LoadingTable'
import ActionButton from '../../components/ActionButton'
import ProjectSlideover from '../../components/ProjectSlideover'
import StatusPill from '../../components/StatusPill'

import getServerSideProps from '../../../lib/serverProps'

const Projects = ({ userRole }) => {
  const [isNew, setIsNew] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isSliderOverOpen, setIsSliderOverOpen] = useState(false)

  const {
    data: projects,
    mutate: mutateAll,
    isLoading,
    isError,
  } = useProjects()

  const handleAction = async (type, item) => {
    if (type === 'new') {
      setIsNew(true)
    }

    if (type === 'edit') {
      setSelectedProject(item)
    }

    if (type === 'new' || type === 'edit') {
      setIsSliderOverOpen(true)
      return
    }

    const { id } = item

    const response = await fetcher('projects/update', {
      type,
      id,
    })

    // error
    if (!response.success) {
      toast.error(response.message)
      return
    }
    // success
    toast.success(response.message)
    // refetch
    mutateAll()
  }

  const handleSliderOverClose = (isOpen) => {
    setIsSliderOverOpen(isOpen)
    if (!isOpen) {
      setIsNew(false)
      setSelectedProject(null)
    }
  }

  const handleProjectUpdate = async (updatedProject, isNewProject = false) => {
    const type = isNewProject ? 'new' : 'edit'
    const id = isNewProject ? undefined : updatedProject.id

    const response = await fetcher('projects/update', {
      type,
      id,
      data: updatedProject,
    })

    // error
    if (!response.success) {
      toast.error(response.message)
      return
    }
    // success
    toast.success(response.message)
    // refetch
    mutateAll()
    // hide slideover
    handleSliderOverClose(false)
  }

  const renderNotes = (notes) => {
    return notes.length === 0 ? null : (
      <ul className="max-w-md ml-4 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.name}</span>
            <ul className="max-w-md ml-4 space-y-1 text-gray-500 list-disc dark:text-gray-400">
              {note.entries.map((entry) => (
                <li
                  key={`${note.id}-${entry.id}`}
                  className="ml-2 project-list-notes-container"
                >
                  <Markup content={entry.entry} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )
  }

  const renderDataOrEmpty = (renderProjects) => {
    if (renderProjects.length !== 0) {
      return renderProjects.map((project) => (
        <tr key={project.id}>
          <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
            <div className="flex items-center">
              <Link
                className="font-medium text-indigo-700"
                href={`/projects/${project.id}?stage=${project.stage}`}
              >
                {project.name}
              </Link>
            </div>
            {renderNotes(project.notes)}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 capitalize rounded-sm bg-slate-100">
              {titleCase(project.stage)}
            </span>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            <StatusPill
              margin="none"
              status={project.status === 'OPEN' ? 'success' : 'danger'}
              label={project.status}
            />
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            {project.createdOn}
          </td>
          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
            {(userRole.isAdmin || userRole.isManager) && (
              <>
                <ActionButton
                  type="edit"
                  onClick={() => handleAction('edit', project)}
                />
                <ActionButton
                  type="delete"
                  onClick={() => handleAction('delete', project)}
                />
              </>
            )}
          </td>
        </tr>
      ))
    }

    return (
      <tr>
        <td className="p-8 text-center" colSpan="5">
          <div className="justify-center sm:flex">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              No projects exist
            </h6>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the projects including their name, status, state,
              and created date
            </p>
          </div>
          {(userRole.isAdmin || userRole.isManager) && (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <ActionButton
                type="new"
                onClick={() => handleAction('new', undefined)}
              >
                Add Project
              </ActionButton>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-sm">
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
                        Stage
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
                        <td className="px-8 py-2" colSpan="5">
                          <LoadingTable columns={5} />
                        </td>
                      </tr>
                    ) : (
                      renderDataOrEmpty(projects)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectSlideover
        isNew={isNew}
        itemDetails={selectedProject}
        isOpen={isSliderOverOpen}
        onClose={handleSliderOverClose}
        onSave={handleProjectUpdate}
      />
    </MainLayout>
  )
}

export { getServerSideProps }

export default Projects
