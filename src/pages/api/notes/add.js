import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { noteName, entry } = req.body

  let { noteId, projectId } = req.body

  projectId = Number(projectId)

  try {
    if (!noteId) {
      const note = await prisma.Notes.create({
        data: {
          name: noteName,
          createdBy: user.id,
          projectId,
        },
      })

      noteId = note.id
    }

    await prisma.NoteEntry.create({
      data: {
        entry,
        createdBy: user.id,
        noteId,
      },
    })
    res.json({ message: 'success' })
  } catch (error) {
    res.status(500)
    res.json({
      error: 'Could not add the note',
      realError: error.message,
    })
  }
})
