import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { id, config } = req.body

  let udpatedConfig = []

  try {
    udpatedConfig = await prisma.ProjectDetails.update({
      where: { id },
      data: {
        config,
      },
      select: { config: true },
    })

    udpatedConfig = udpatedConfig.config
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not update the project',
      realError: error.message,
    })
  }

  res.json(udpatedConfig)
})
