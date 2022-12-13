import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  BookOpenIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/20/solid'

import { prisma } from '../../../lib/prisma'

import MainLayout from '../../components/MainLayout'
import StageLayout from '../../components/StageLayout'
import NotesLayout from '../../components/NotesLayout'
import Navbar from '../../components/Navbar'
import Breadcrumbs from '../../components/Breadcrumbs'
import Stage1 from '../../components/Stage1'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  { name: 'Stages', id: 'stages' },
  { name: 'Notes', id: 'notes' },
]

const Project = ({ stageConfig }) => {
  const router = useRouter()
  const { id } = router.query

  const stage = 'BIDDING'

  // const { name: projectName } = stageConfig.projectInfo
  const projectName = 'Random Project'

  const [currentTab, setCurrentTab] = useState('stages')

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId)
  }

  return (
    <MainLayout>
      {/* <Navbar projectInfo={stageConfig.projectInfo} /> */}
      {/* NAVBAR */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
            {projectName}
          </h2>
        </div>
        <div className="flex mt-4 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Next Stage
          </button>
        </div>
      </div>
      {/* TABS */}
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.id === currentTab)}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={classNames(
                    tab.id === currentTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                  aria-current={tab.id === currentTab ? 'page' : undefined}
                >
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* <Breadcrumbs /> */}
      {/* {state === 'BIDDING' ? <Stage1 stageConfig={stageConfig} /> : null} */}
      {currentTab === 'stages' ? (
        <StageLayout projectId={id} stage={stage} />
      ) : (
        <NotesLayout projectId={id} />
      )}
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  let { id } = ctx.params

  id = Number(id)

  let stageConfig = {}

  try {
    const projectDetails = await prisma.ProjectDetails.findFirst({
      where: { projectsId: id },
      select: { config: true },
    })

    if (stageConfig) {
      stageConfig = projectDetails.config
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const projectInfo = await prisma.Projects.findFirst({
      where: { id },
      select: { name: true },
    })

    console.log(projectInfo)

    if (projectInfo) {
      stageConfig.projectInfo = projectInfo
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: { stageConfig },
  }
}

export default Project
