import { formattedDate } from './formattedString'

export const getFormattedProjects = (projects) => {
  const formattedProjects = []

  projects.forEach((project) => {
    // const projectStatus = titleCase(project.status)
    // const projectState = titleCase(project.state)
    // const projectStatus = titleCase(project.status)
    // const projectState = titleCase(project.state)
    const projectCreatedDate = formattedDate(project.createdAt)

    formattedProjects.push({
      id: project.id,
      name: project.name,
      stage: project.stage,
      status: project.status,
      notes: project.notes,
      createdOn: projectCreatedDate,
    })
  })
  return formattedProjects
}
