import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { workScope, notes } = req.body
  let { projectId, stageId } = req.body

  projectId = Number(projectId)
  stageId = Number(stageId)

  const config = { workScope, notes }

  let updatedConfig = {}

  try {
    updatedConfig = await prisma.ProjectDetails.upsert({
      where: { id: stageId },
      create: {
        projectId,
        config,
      },
      update: {
        config,
      },
    })

    updatedConfig = updatedConfig.config
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not update the project',
      realError: error.message,
    })
  }

  res.json(updatedConfig)
})
