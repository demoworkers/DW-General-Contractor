import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { projectStage, config } = req.body
  let { projectId } = req.body

  projectId = Number(projectId)

  const projectDetails = {
    // projectId,
    config,
    stage: projectStage,
  }

  try {
    // get stage id - if exists
    const projectInfo = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
      select: {
        projectDetails: {
          where: {
            stage: projectStage,
          },
          select: {
            id: true,
          },
        },
      },
    })

    let stageId = 0

    const previousDetails = projectInfo.projectDetails[0]
    if (previousDetails) {
      stageId = previousDetails.id
    }

    // update using projects model
    await prisma.projects.update({
      where: { id: projectId },
      data: {
        projectDetails: {
          upsert: {
            create: { ...projectDetails },
            where: { id: stageId },
            update: { config },
          },
        },
      },
    })

    res.status(200).json({ success: true, message: 'Stage saved', data: {} })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Stage could not be saved',
    })
  }
})
