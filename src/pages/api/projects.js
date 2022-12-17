import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'
import { getFormattedProjects } from '../../../utils/getFormattedProjects'

export default validateRoute(async (req, res, user) => {
  try {
    const projects = await prisma.projects.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const formattedProjects = getFormattedProjects(projects)

    res.status(200).json({
      success: true,
      message: 'Stage saved',
      data: { projects: formattedProjects },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Projects not loaded',
    })
  }
})
