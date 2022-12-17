import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { projectStage } = req.body
  let { projectId } = req.body

  projectId = Number(projectId)

  try {
    const project = await prisma.Projects.findUnique({
      where: {
        id: projectId,
      },
      select: {
        stage: true,
        projectDetails: {
          where: {
            stage: projectStage,
          },
        },
      },
    })

    let nextStage = 'BIDDING'

    switch (project.stage) {
      case 'BIDDING':
        nextStage = 'MATERIAL_SELECTION'
        break
      case 'MATERIAL_SELECTION':
        nextStage = 'RECONSTRUCTION'
        break
      case 'RECONSTRUCTION':
        nextStage = 'CONSTRUCTION'
        break

      case 'CONSTRUCTION':
        nextStage = 'PUNCH_LIST'
        break

      case 'PUNCH_LIST':
        nextStage = 'COMPLETED'
        break

      default:
        nextStage = 'BIDDING'
        break
    }

    await prisma.Projects.update({
      where: {
        id: projectId,
      },
      data: {
        stage: nextStage,
        projectDetails: {
          upsert: {
            create: { stage: projectStage, config: {} },
            where: { id: project.projectDetails[0].id },
            update: { status: 'COMPLETED' },
          },
        },
      },
    })

    res
      .status(200)
      .json({ success: true, message: 'Stage completed', data: {} })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Stage could not be completed',
    })
  }
})
