import './SuggestionCard.css'

export default function SuggestionCard({ suggestion }) {
  return (
    <article className="suggestion-card">
      <h3 className="suggestion-card__title">{suggestion.title}</h3>
      <p className="suggestion-card__description">{suggestion.description}</p>
      <span className="suggestion-card__tag">{suggestion.category}</span>
    </article>
  )
}
