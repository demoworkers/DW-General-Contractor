import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  let { projectId, projectStage } = req.body

  projectId = Number(projectId)

  let stageInfo = {}

  try {
    stageInfo = await prisma.projects.findUnique({
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

    if (stageInfo && stageInfo.projectDetails[0]) {
      stageInfo = stageInfo.projectDetails[0]
    }

    res.status(200).json(stageInfo)
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not update the project',
      realError: error.message,
    })
  }
})
