import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { type, userId } = req.body

  let users

  try {
    switch (type) {
      case 'activate':
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            approved: true,
          },
        })
        break
      case 'deactivate':
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            approved: false,
          },
        })
        break
      case 'delete':
        await prisma.user.delete({
          where: {
            id: userId,
          },
        })
        break

      default:
        break
    }

    res
      .status(201)
      .json({ success: true, message: 'User role updated', data: {} })
  } catch (error) {
    res.status(500).json({ success: false, error: 'User could not be updated' })
  }
})
