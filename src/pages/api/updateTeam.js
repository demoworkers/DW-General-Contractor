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

    users = await prisma.user.findMany({})
  } catch (error) {
    res.status(500)
    res.json({ error: 'Could not update the team member' })
  }

  res.json(users)
})
