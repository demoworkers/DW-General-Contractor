import useSWR from 'swr'
import fetcher from './fetcher'

export const useTeam = () => {
  const { data, mutate, error } = useSWR('team/all', fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: data?.data?.users || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useProjects = () => {
  const { data, mutate, error } = useSWR('projects/all', fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: data?.data?.projects || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useNotes = (projectId) => {
  const { data, mutate, error } = useSWR(
    'notes/all',
    () => fetcher('notes/all', { projectId }),
    { revalidateOnFocus: false }
  )

  return {
    data: data?.data?.notes || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}
