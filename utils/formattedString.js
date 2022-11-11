import { format } from 'date-fns'

export const titleCase = (string) => {
  return string
    .toLowerCase()
    .replace(/[_]+/g, ' ')
    .replace(/\b\w/g, (s) => s.toUpperCase())
}

export const formattedDate = (string) => {
  return format(new Date(string), 'PP')
}
