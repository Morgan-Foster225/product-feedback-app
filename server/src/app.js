import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import { CATEGORIES } from './categories.js'

export const app = express()

app.use(cors())
app.use(express.json())

function validateSuggestion(body) {
  const { title, category, description } = body ?? {}

  if (typeof title !== 'string' || title.trim().length < 1 || title.length > 100) {
    return "'title' is required and must be between 1 and 100 characters."
  }
  if (typeof category !== 'string' || !CATEGORIES.includes(category)) {
    return `'category' is required and must be one of: ${CATEGORIES.join(', ')}.`
  }
  if (typeof description !== 'string' || description.trim().length < 1 || description.length > 500) {
    return "'description' is required and must be between 1 and 500 characters."
  }
  return null
}

app.get('/get-all-suggestions', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'select id, title, category, description, created_at from suggestions order by created_at desc'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load suggestions.' })
  }
})

app.get('/get-suggestions-by-category/:category', async (req, res) => {
  const { category } = req.params
  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: `Unknown category '${category}'. Expected one of: ${CATEGORIES.join(', ')}.`,
    })
  }
  try {
    const { rows } = await pool.query(
      'select id, title, category, description, created_at from suggestions where category = $1 order by created_at desc',
      [category]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load suggestions.' })
  }
})

app.post('/add-one-suggestion', async (req, res) => {
  const validationError = validateSuggestion(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  const { title, category, description } = req.body
  try {
    const { rows } = await pool.query(
      `insert into suggestions (title, category, description)
       values ($1, $2, $3)
       returning id, title, category, description, created_at`,
      [title.trim(), category, description.trim()]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to add suggestion.' })
  }
})
