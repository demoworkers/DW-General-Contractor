import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  // TOOD: Check if user has permissions

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
    res.status(201)
    res.json({ message: 'Updated' })
  } catch (error) {
    res.status(500)
    res.json({ error: 'Could not update the team member' })
  }
})
