import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  let { projectId, projectStage } = req.body

  projectId = Number(projectId)

  let isAuthorized = true

  try {
    let project = await prisma.projects.findUnique({
      where: { id: projectId },
      select: {
        projectDetails: {
          where: {
            stage: projectStage,
          },
          select: {
            status: true,
            config: true,
          },
        },
      },
    })

    const [projectDetail] = project.projectDetails

    if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
      isAuthorized = false
    }

    if (projectDetail) {
      project = projectDetail
      if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
        // check if the user is in "contractors"
        if (Array.isArray(project.config.contractors)) {
          isAuthorized = project.config.contractors.some((contractor) => {
            return contractor.id === user.id
          })
        } else {
          isAuthorized = false
        }

        // remove items that are only for MANAGERS
        if (isAuthorized) {
          delete project.config.contractors
        }
      }

      if (!isAuthorized) {
        project = {}
      }
    }

    res.status(200).json({
      success: true,
      isAuthorized,
      message: 'Stage loaded',
      data: { stageInfo: project },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Stage could not be loaded',
    })
  }
})
