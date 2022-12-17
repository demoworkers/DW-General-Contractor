import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { noteName, entry } = req.body

  let { noteId, projectId } = req.body

  projectId = Number(projectId)
  noteId = noteId ?? Number(noteId)

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

    res.status(200).json({
      success: true,
      message: 'Note saved',
      data: {},
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Note could not be saved',
    })
  }
})
