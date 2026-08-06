import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../api/categories'
import './CategorySelect.css'

export default function CategorySelect({ value, onChange, invalid, describedBy, controlRef }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleOutsideClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="category-select" ref={rootRef}>
      <button
        type="button"
        ref={controlRef}
        className={`category-select__control${invalid ? ' category-select__control--invalid' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={describedBy}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        <span className={value ? '' : 'category-select__placeholder'}>
          {value || 'Select a category'}
        </span>
        <span
          className={`category-select__chevron${open ? ' category-select__chevron--open' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && (
        <ul className="category-select__menu" role="listbox">
          {CATEGORIES.map((category) => (
            <li key={category} role="option" aria-selected={category === value}>
              <button
                type="button"
                className={`category-select__option${category === value ? ' category-select__option--selected' : ''}`}
                onClick={() => {
                  onChange(category)
                  setOpen(false)
                }}
              >
                {category}
                {category === value && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
