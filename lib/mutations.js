import fetcher from './fetcher'

export const auth = (mode, body) => {
  return fetcher(`${mode}`, body)
}
