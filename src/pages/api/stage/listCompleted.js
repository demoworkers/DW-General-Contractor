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

    res.status(200).json({
      success: true,
      message: 'Stage saved',
      data: { list: completedStages },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Completed stages not loaded',
    })
  }
})
