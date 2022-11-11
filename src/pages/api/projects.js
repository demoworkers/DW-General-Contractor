import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'
import { getFormattedProjects } from '../../../utils/getFormattedProjects'

export default validateRoute(async (req, res, user) => {
  const projects = await prisma.projects.findMany({ orderBy: { id: 'asc' } })

  res.json(getFormattedProjects(projects))
})
