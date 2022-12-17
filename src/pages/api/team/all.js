import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  try {
    const members = await prisma.user.findMany({})

    const formattedMembers = []

    members.forEach((teamMember) => {
      formattedMembers.push({
        id: teamMember.id,
        name: `${teamMember.firstName} ${teamMember.lastName}`,
        email: teamMember.email,
        role: teamMember.role,
        approved: teamMember.approved,
      })
    })

    res.status(200).json({
      success: true,
      data: { users: formattedMembers },
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Project could not be updated' })
  }
})
