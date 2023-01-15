import { prisma } from '../../../../lib/prisma'
import { validateRoute } from '../../../../lib/auth'
import { getFormattedProjects } from '../../../../utils/getFormattedProjects'

export default validateRoute(async (req, res, user) => {
  try {
    let projects = []

    projects = await prisma.projects.findMany({
      select: {
        id: true,
        name: true,
        stage: true,
        status: true,
        createdAt: true,
        projectDetails: true,
        notes: {
          select: {
            id: true,
            name: true,
            entries: {
              select: {
                id: true,
                entry: true,
                created_by: {
                  select: {
                    firstName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
      projects = projects.filter((project) => {
        return project.projectDetails.some((projectDetail) => {
          return projectDetail.config.contractors.some((contractor) => {
            return contractor.id === user.id
          })
        })
      })
    }

    const formattedProjects = getFormattedProjects(projects)

    res.status(200).json({
      success: true,
      message: 'Stage saved',
      data: { projects: formattedProjects },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      // error: 'Projects not loaded',
      error: error.message,
    })
  }
})
