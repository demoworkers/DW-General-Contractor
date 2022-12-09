import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { projectId } = req.body

  try {
    const notes = await prisma.notes.findMany({
      where: {
        projectId: Number(projectId),
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        created_by: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    res.json(notes)
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not add the note',
      realError: error.message,
    })
  }
})
