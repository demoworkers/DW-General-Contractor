import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  let { projectId, projectStage } = req.body

  projectId = Number(projectId)

  try {
    let stageInfo = await prisma.projects.findUnique({
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

    res
      .status(200)
      .json({ success: true, message: 'Stage saved', data: { stageInfo } })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Stage could not be loaded',
    })
  }
})
