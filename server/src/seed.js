import { pool } from './db.js'

const SAMPLE_SUGGESTIONS = [
  {
    title: 'Add dark mode support',
    category: 'UI',
    description:
      'A dark theme toggle would help reduce eye strain when using the app at night and matches what most users expect from modern apps.',
  },
  {
    title: 'Simplify the onboarding flow',
    category: 'UX',
    description:
      'New users get lost during signup because there are too many steps before they reach the main dashboard. Cutting it down to 2-3 steps would help.',
  },
  {
    title: 'Add keyboard shortcuts',
    category: 'Enhancement',
    description:
      'Power users would benefit from shortcuts for common actions like creating a new item or searching, instead of relying only on mouse clicks.',
  },
  {
    title: 'Fix broken image upload on Safari',
    category: 'Bug',
    description:
      'Uploading an image on Safari silently fails and no error is shown to the user, which makes it look like the upload succeeded when it did not.',
  },
  {
    title: 'Export suggestions to CSV',
    category: 'Feature',
    description:
      'It would be helpful for reviewers to export the current filtered list of suggestions to a CSV file for sharing with stakeholders offline.',
  },
]

async function run() {
  for (const s of SAMPLE_SUGGESTIONS) {
    await pool.query(
      'insert into suggestions (title, category, description) values ($1, $2, $3)',
      [s.title, s.category, s.description],
    )
  }
  console.log(`Seeded ${SAMPLE_SUGGESTIONS.length} sample suggestions.`)
  await pool.end()
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
