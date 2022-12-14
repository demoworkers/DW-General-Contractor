import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  let { projectId } = req.body

  projectId = Number(projectId)

  try {
    const project = await prisma.Projects.findUnique({
      where: {
        id: projectId,
      },
      select: {
        stage: true,
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
      },
    })
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not update the project',
      realError: error.message,
    })
  }
})
