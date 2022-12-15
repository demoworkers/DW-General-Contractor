import { useState } from 'react'
import { useRouter } from 'next/router'

import { BookOpenIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { prisma } from '../../../../lib/prisma'
import fetcher from '../../../../lib/fetcher'

import MainLayout from '../../../components/MainLayout'
import StageLayout from '../../../components/StageLayout'
import NotesLayout from '../../../components/NotesLayout'
import NavbarTabs from '../../../components/NavbarTabs'
import StatusPill from '../../../components/StatusPill'

const ENABLED_SECTIONS = {
  BIDDING: {
    contractors: true,
    workScope: true,
    photos: true,
    notes: true,
  },
}

const Project = ({ projectInfoServerProps }) => {
  const router = useRouter()
  const { id, stage: activeStage } = router.query

  const [projectInfo, setProjectInfo] = useState(projectInfoServerProps)
  const [projectStatus, setProjectStatus] = useState(projectInfo?.status)
  const [projectStage, setProjectStage] = useState(projectInfo?.stage)
  const [isNoteTabActive, setIsNoteTabActive] = useState(false)

  const { name: projectName } = projectInfo

  let stageId = null
  if (projectInfo?.projectDetails?.length) {
    // stageId = projectInfo.projectDetails.filter(
    //   (projectDetail) => projectDetail.stage === projectStage
    // )[0].id
  }

  console.log(projectInfo)

  const handleNextStage = async () => {
    const response = await fetcher('stage/next', { projectId: id })
    console.log(response)
  }

  return (
    <MainLayout>
      {/* NAVBAR */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="relative text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
            {projectName}
            <StatusPill
              status={projectStatus === 'OPEN' ? 'success' : 'danger'}
              label={projectStatus}
            />
          </h2>
        </div>
        <div className="flex mt-4 md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setIsNoteTabActive(!isNoteTabActive)}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {!isNoteTabActive ? (
              <>
                <BookOpenIcon className="w-4 h-4 mr-1" />
                View Notes
              </>
            ) : (
              <>
                <XMarkIcon className="w-4 h-4 mr-1" /> Close Notes
              </>
            )}
          </button>
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <CheckIcon className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>
      {!isNoteTabActive ? (
        <>
          <NavbarTabs
            projectId={id}
            projectStage={projectStage}
            activeStage={activeStage}
          />
          <StageLayout
            projectInfo={{ id, stage: activeStage }}
            enabledSections={ENABLED_SECTIONS[activeStage]}
            onNextStage={handleNextStage}
          />
        </>
      ) : (
        <NotesLayout projectId={id} />
      )}
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  let { stage } = ctx.query
  let { id } = ctx.params

  id = Number(id)

  let projectInfo = {}

  if (!stage) {
    stage = 'BIDDING'
  }

  try {
    const project = await prisma.Projects.findFirst({
      where: { id },
      select: {
        name: true,
        status: true,
        stage: true,
        projectDetails: {
          where: {
            stage,
          },
          select: {
            id: true,
            config: true,
            stage: true,
          },
        },
      },
    })

    if (project) {
      projectInfo = project
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: { projectInfoServerProps: projectInfo },
  }
}

export default Project