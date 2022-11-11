import useSWR from 'swr'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useViewerConfig = (tabType) => {
  const upperTabType = tabType?.toUpperCase() || 'PRIMARY'

  const { data, mutate, error } = useSWR('nodes', () =>
    fetcher('nodes', { tabType: upperTabType })
  )

  return {
    viewerConfig: data || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useTeam = () => {
  const { data, mutate, error } = useSWR('team', fetcher)

  return {
    data: data || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useProjects = () => {
  const { data, mutate, error } = useSWR('projects', fetcher)

  return {
    data: data || [],
    mutate,
    isLoading: !data && !error,
    isError: error,
  }
}
