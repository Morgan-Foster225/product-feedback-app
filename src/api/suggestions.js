const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

async function parseErrorMessage(res, fallback) {
  try {
    const body = await res.json()
    return body.error || fallback
  } catch {
    return fallback
  }
}

export async function getSuggestions({ category } = {}) {
  const url =
    !category || category === 'All'
      ? `${BASE_URL}/get-all-suggestions`
      : `${BASE_URL}/get-suggestions-by-category/${encodeURIComponent(category)}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, 'Failed to load suggestions'))
  }
  return res.json()
}

export async function addSuggestion({ title, category, description }) {
  const res = await fetch(`${BASE_URL}/add-one-suggestion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category, description }),
  })
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, 'Failed to add suggestion'))
  }
  return res.json()
}
