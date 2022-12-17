import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { type, id, data } = req.body

  const dbTable = prisma.projects

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

    res
      .status(201)
      .json({ success: true, message: 'Project updated', data: {} })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Project could not be updated' })
  }
})
