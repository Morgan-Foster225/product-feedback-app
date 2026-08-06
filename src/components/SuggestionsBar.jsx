import { Link } from 'react-router-dom'
import './SuggestionsBar.css'

export default function SuggestionsBar({ count }) {
  return (
    <div className="suggestions-bar">
      <span className="suggestions-bar__count">
        <span className="suggestions-bar__icon" aria-hidden="true">
          💡
        </span>
        {count} Suggestion{count === 1 ? '' : 's'}
      </span>
      <Link to="/add" className="suggestions-bar__add">
        + Add Feedback
      </Link>
    </div>
  )
}
