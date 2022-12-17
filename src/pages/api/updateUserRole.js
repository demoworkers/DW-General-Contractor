import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { userId, role } = req.body

  const newRole = role.toUpperCase()

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    })
    res
      .status(201)
      .json({ success: true, message: 'User role updated', data: {} })
  } catch (error) {
    res.status(500).json({ success: false, error: 'User could not be updated' })
  }
})
