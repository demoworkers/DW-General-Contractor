export default function fetcher(url, data = undefined, shouldStringify = true) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: shouldStringify ? JSON.stringify(data) : data,
  }).then(async (res) => {
    return res.json()
  })
}
