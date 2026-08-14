import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getSuggestions } from '../api/suggestions'
import LogoCard from '../components/LogoCard'
import SuggestionsBar from '../components/SuggestionsBar'
import CategoryFilter from '../components/CategoryFilter'
import SuggestionCard from '../components/SuggestionCard'
import EmptyIllustration from '../components/EmptyIllustration'
import './Home.css'

export default function Home() {
  const [suggestions, setSuggestions] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [status, setStatus] = useState('loading')

  const load = useCallback((category) => {
    setStatus('loading')
    getSuggestions({ category })
      .then((data) => {
        setSuggestions(data)
        setStatus('idle')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  useEffect(() => {
    load(activeCategory)
  }, [activeCategory, load])

  return (
    <div className="container board">
      <aside className="board__sidebar">
        <LogoCard />
        <div className="board__categories-card">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} wrap />
        </div>
      </aside>

      <main className="board__main">
        <div className="board__mobile-filter">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {status !== 'error' && <SuggestionsBar count={status === 'idle' ? suggestions.length : 0} />}

        {status === 'loading' && (
          <div className="board__state" role="status">
            Loading suggestions…
          </div>
        )}

        {status === 'error' && (
          <div className="board__state board__state--error" role="alert">
            <p>We couldn't load suggestions. Please try again.</p>
            <button type="button" className="btn btn--primary" onClick={() => load(activeCategory)}>
              Retry
            </button>
          </div>
        )}

        {status === 'idle' && suggestions.length === 0 && activeCategory === 'All' && (
          <div className="board__state board__state--empty">
            <EmptyIllustration />
            <h2>There is no feedback yet.</h2>
            <p>
              Got a suggestion? Found a bug that needs to be squashed? We love hearing about new
              ideas to improve our app.
            </p>
            <Link to="/add" className="btn btn--primary">
              + Add Feedback
            </Link>
          </div>
        )}

        {status === 'idle' && suggestions.length === 0 && activeCategory !== 'All' && (
          <div className="board__state board__state--empty">
            <p>No suggestions in this category yet.</p>
            <button type="button" className="btn btn--secondary" onClick={() => setActiveCategory('All')}>
              Clear filter
            </button>
          </div>
        )}

        {status === 'idle' && suggestions.length > 0 && (
          <div className="board__list">
            {suggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
