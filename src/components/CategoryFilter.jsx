import { CATEGORIES } from '../api/categories'
import './CategoryFilter.css'

const PILLS = ['All', ...CATEGORIES]

export default function CategoryFilter({ active, onChange, wrap = false }) {
  function handleClick(category) {
    if (category === 'All' || category === active) {
      onChange('All')
    } else {
      onChange(category)
    }
  }

  return (
    <div
      className={`category-filter${wrap ? ' category-filter--wrap' : ''}`}
      role="group"
      aria-label="Filter by category"
    >
      {PILLS.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            className={`category-filter__pill${isActive ? ' category-filter__pill--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
