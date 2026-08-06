import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { pool } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sql = readFileSync(path.join(__dirname, 'migrations/001_create_suggestions.sql'), 'utf8')

async function run() {
  await pool.query(sql)
  console.log('Migration applied: suggestions table ready.')
  await pool.end()
}

run().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
