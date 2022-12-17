import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { noteId } = req.body

  try {
    const noteEntries = await prisma.NoteEntry.findMany({
      where: {
        noteId,
      },
      select: {
        id: true,
        entry: true,
        created_at: true,
        created_by: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    res.status(200).json({
      success: true,
      message: 'Entries loaded',
      data: { entries: noteEntries },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Entries not loaded',
    })
  }
})
