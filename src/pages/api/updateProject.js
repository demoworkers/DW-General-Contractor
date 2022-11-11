import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

import { getFormattedProjects } from '../../../utils/getFormattedProjects'

export default validateRoute(async (req, res, user) => {
  const { type, id, data } = req.body

  const dbTable = prisma.projects

  let projects = []

  try {
    switch (type) {
      case 'new':
        await dbTable.create({
          data,
        })
        break
      case 'edit':
        if (data.id) {
          delete data.id
        }
        if (data.createdOn) {
          delete data.createdOn
        }
        await dbTable.update({
          where: {
            id,
          },
          data,
        })
        break
      case 'delete':
        await dbTable.delete({
          where: {
            id,
          },
        })
        break

      default:
        break
    }

    projects = await prisma.projects.findMany({ orderBy: { id: 'asc' } })

    projects = getFormattedProjects(projects)
  } catch (error) {
    res.status(500)
    res.json({ error: 'Could not update the project', wow: error.message })
  }

  res.json(projects)
})
