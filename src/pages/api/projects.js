import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'
import { formattedDate, titleCase } from '../../../utils/formattedString'

export default validateRoute(async (req, res, user) => {
  const projects = await prisma.projects.findMany({})

  const formattedProjects = []

  projects.forEach((project) => {
    const projectStatus = titleCase(project.status)
    const projectState = titleCase(project.state)
    const projectCreatedDate = formattedDate(project.createdAt)

    formattedProjects.push({
      id: project.id,
      name: project.name,
      state: projectState,
      status: project.status,
      createdOn: projectCreatedDate,
    })
  })

  res.json(formattedProjects)
})
