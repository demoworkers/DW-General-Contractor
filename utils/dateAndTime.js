export const calculateTimeSince = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString)

  // Get the current time
  const now = new Date()

  // Calculate the difference between the given date and the current time
  const differenceInTime = now - date

  // Calculate the difference in minutes, hours, days, months, and years
  const minutes = Math.floor(differenceInTime / 1000 / 60)
  const hours = Math.floor(differenceInTime / 1000 / 60 / 60)
  const days = Math.floor(differenceInTime / 1000 / 60 / 60 / 24)
  const months = Math.floor(differenceInTime / 1000 / 60 / 60 / 24 / 30)
  const years = Math.floor(differenceInTime / 1000 / 60 / 60 / 24 / 365)

  // Create an array to store the time units and their values
  const timeUnits = []

  // Add the years to the array if the value is greater than 0
  if (years > 0) {
    timeUnits.push(`${years}y`)
  }

  // Add the months to the array if the value is greater than 0
  if (months > 0) {
    timeUnits.push(`${months}mo`)
  }

  // Add the days to the array if the value is greater than 0
  if (days > 0) {
    timeUnits.push(`${days}d`)
  }

  // Return a string with the time that has passed in shorthand
  if (timeUnits.length > 0) {
    // Join the time units with commas and "and"
    const timeSince = timeUnits.join(', ')
    if (timeUnits.length > 1) {
      const lastCommaIndex = timeSince.lastIndexOf(',')
      return `${timeSince.substring(
        0,
        lastCommaIndex
      )} and${timeSince.substring(lastCommaIndex + 1)} ago`
    } else {
      return `${timeSince} ago`
    }
  } else if (hours > 0) {
    return `${hours}h ago`
  } else {
    return `${minutes}m ago`
  }
}

export const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  // Check if the current year is the same as the year of the input date
  const currentYear = new Date().getFullYear()
  if (currentYear !== date.getFullYear()) {
    // If the current year is different, include the year in the date format
    options.year = 'numeric'
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
