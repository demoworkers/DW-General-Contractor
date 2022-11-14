import { prisma } from '../../../lib/prisma'

import MainLayout from '../../components/MainLayout'
import Navbar from '../../components/Navbar'
import Breadcrumbs from '../../components/Breadcrumbs'
import Stage1 from '../../components/Stage1'

const Project = ({ stageConfig }) => {
  const state = 'BIDDING'

  return (
    <MainLayout>
      <Navbar projectInfo={stageConfig.projectInfo} />
      <Breadcrumbs />
      {state === 'BIDDING' ? <Stage1 stageConfig={stageConfig} /> : null}
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
