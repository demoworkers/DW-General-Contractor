import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { type, id, data } = req.body

  const dbTable = prisma.projects

  let projects = []

  try {
    switch (type) {
      case 'activate':
        await dbTable.update({
          where: {
            id,
          },
          data: {
            approved: true,
          },
        })
        break
      case 'deactivate':
        await dbTable.update({
          where: {
            id,
          },
          data: {
            approved: false,
          },
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

    projects = await prisma.projects.findMany({})
  } catch (error) {
    res.status(500)
    res.json({ error: 'Could not update the project', wow: error.message })
  }

  res.json(projects)
})
