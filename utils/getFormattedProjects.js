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
      state: project.state,
      status: project.status,
      createdOn: projectCreatedDate,
    })
  })
  return formattedProjects
}
