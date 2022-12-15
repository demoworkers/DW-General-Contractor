import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  let { projectId } = req.body

  projectId = Number(projectId)

  try {
    let completedStages = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
      select: {
        projectDetails: {
          where: {
            status: 'COMPLETED',
          },
          select: {
            stage: true,
          },
        },
      },
    })

    if (completedStages) {
      completedStages = completedStages.projectDetails
    }

    res.status(200).json(completedStages)
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not update the project',
      realError: error.message,
    })
  }
})
